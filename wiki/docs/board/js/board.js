
function dorank(){
	var count=0,lastkey="",lastrank=0;
	$("#board tr:not(.hidden) td.rank").each(function(i){
		var row=$(this).closest('tr');
		var key=row.find('.solved').text()+"|"+row.find('.penalty').text();
		if(row.is('.unofficial')){
			$(this).html('*');
			return;
		}
		count+=1;
		if(key != lastkey)
			lastrank=count;
		lastkey=key;
		$(this).html(lastrank);
	});

	var schoolDict = {};
	count = 0; lastkey = ""; lastrank = 0;
	$("#board tr:not(.hidden) td.schoolrank").each(function(i){
		var row=$(this).closest('tr');
		var key=row.find('.solved').text()+"|"+row.find('.penalty').text();
		var schoolName = row.find('.school').text();
		if(row.is('.unofficial') || typeof schoolDict[schoolName] != 'undefined'){
			$(this).html('-');
			return;
		}
		count+=1;
		schoolDict[schoolName] = count;
		if(key != lastkey)
			lastrank=count;
		lastkey=key;
		$(this).html(lastrank);
	});
}

var url=decodeURI(window.location.href);
var scrollParam=url.match(/.+[?&]scroll=(\d+).*/);
if(scrollParam != null) scrollParam=parseInt(scrollParam[1],10);
var filterParam=url.match(/.+[?&]filter=([a-z1-9]+).*/);
if(filterParam != null) filterParam=filterParam[1];


function scrollPage(){
	var len=$('#board tr').length;
	var dis=$("#tbottom").offset().top;
	$('html, body').animate({
	   scrollTop: dis
	}, dis*scrollParam,function(){
		$('html, body').animate({
		   scrollTop: $("#ttop").offset().top
		}, len *20, function(){
			setTimeout(refresh,5000);
		})
	});
}

function refresh(){
	location.reload(true);
}



if(!localStorage.concerned){
	localStorage.concerned="[]";
}
var concerned=JSON.parse(localStorage.concerned);


$("td.untried").each(function(i){
	$(this).attr("onclick","popdown()");
});

$("td.prob_d").filter(":not(.untried)").each(function(i){
	$(this).attr("onclick","showsub(this)");
});

function concernedok(){
	$('tr.concerned').each(function(){
		$(this).removeClass('concerned');
	});
	concerned.forEach(function(v,i){
		$("#"+v).addClass('concerned');
	});
}
$("td.team").each(function(i){
	$(this).attr("onclick","showteam(this)");
});

var timeElapsed=$('#time_elapsed').attr('sec');
if (timeElapsed < 0) {
    timeElapsed = 0;
}
$('#time_elapsed').append(secondsToTime(timeElapsed));

concernedok();
if(filterParam != null) {
	$("#board tbody tr:not(."+filterParam+")").each(function(){
		$(this).addClass('hidden');
	});
}
dorank();
function concernclick(o){
	var tid=$(o).attr('tid');
	var k=concerned.indexOf(tid);
	var tr=$("#"+tid);
	if( $(o).is(':checked')){
		if(k==-1){
			concerned.push(tid);
			tr.addClass('concerned');
		}
	}else{
		if(k!=-1){
			concerned.splice(k,1);
			tr.removeClass('concerned');
		}
	}
	localStorage.concerned=JSON.stringify(concerned);
}

if(scrollParam != null ){
	scrollPage();
}

var exportLink = document.createElement('a');
exportLink.href = '#';
exportLink.innerHTML = '导出数据';

var exportTextArea = document.createElement('textarea');
exportTextArea.rows = 20;
exportTextArea.cols = 80;
exportTextArea.style.display = 'none';

var mainDiv = document.getElementById('maindiv');
var boardTable = document.getElementById('board');

mainDiv.insertBefore(exportLink, boardTable);
mainDiv.insertBefore(exportTextArea, boardTable);

exportLink.onclick = function() {
	if (exportTextArea.style.display == 'none') {
		exportTextArea.innerHTML = genCfGhostData();
		exportTextArea.style.display = 'block';
	} else {
		exportTextArea.style.display = 'none';
	}
}

function genCfGhostData() {
	var result = `@contest "${document.getElementById('contest_title').innerHTML}"\n`;
	result += `@contlen ${parseInt(document.getElementById('time_elapsed').getAttribute('sec')) / 60}\n`;
	var numProbs = document.getElementsByClassName('prob_h').length / 2;
	result += `@problems ${numProbs}\n`;

	var teams = [];
	var submissions = [];

	var tbody = boardTable.children[1];
	for (var i = 0; i < tbody.children.length; i++) {
		var teamRow = tbody.children[i];

		var teamName = teamRow.getElementsByClassName('team')[0].innerHTML;
		var tdSchool = teamRow.getElementsByClassName('school');
		if (tdSchool.length > 0) {
			teamName += `（${tdSchool[0].innerHTML}）`;
		}
		teams.push(`@t ${i + 1},0,1,${teamName}`);

		var probs = teamRow.getElementsByClassName('prob_d');
		for (var j = 0; j < probs.length; j++) {
			var prob = probs[j];
			var probId = String.fromCharCode(65 + j);
			if (prob.hasAttribute('rec')) {
				var rec = prob.getAttribute('rec');
				var time = 0, cnt = 0;
				for (var k = 0; k < rec.length; k++) {
					if (rec.charAt(k) == 'A' || rec.charAt(k) == 'R') {
						cnt++;
						submissions.push(`@s ${i + 1},${probId},${cnt},${time},${rec.charAt(k) == 'A' ? 'OK' : 'RJ'}`);
						time = 0;
					} else {
						time = time * 10 + parseInt(rec.charAt(k));
					}
				}
			}
		}
	}

	result += `@teams ${teams.length}\n`;
	result += `@submissions ${submissions.length}\n`;
	for (var i = 0; i < numProbs; i++) {
		var probId = String.fromCharCode(65 + i);
		result += `@p ${probId},${probId},20,0\n`;
	}
	teams.push(`@t ${teams.length + 1},0,1,Пополнить команду`);

	result += teams.join('\n') + '\n' + submissions.join('\n') + '\n';
	return result;
}
