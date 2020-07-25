let infoRanklist = document.querySelector('#info-ranklist');
let infoWebsite = document.querySelector('#info-website');
let infoProbNum = document.querySelector('#info-prob-num');
let infoPdf = document.querySelector('#info-pdf');
let infoPractice = document.querySelector('#info-practice');

function getChartObj(title, xText, yText, cat, datOff, datUnoff) {
  return {
    colors: ['rgb(97, 97, 102)', 'rgb(124, 181, 236)'],
    chart: window.innerWidth < 992 ? {
      type: 'bar',
      backgroundColor: 'transparent',
    } : {
      type: 'column',
      backgroundColor: 'transparent',
      height: '350px'
    },
    title: {
      text: title
    },
    xAxis: {
      categories: cat,
      labels: {
        style: {
          fontSize: '16px'
        }
      },
      title: {
        text: xText,
        style: {
          fontSize: '16px'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: yText,
        style: {
          fontSize: '16px',
          height: '320px'
        }
      },
      stackLabels: {
        enabled: true,
        style: {
          fontSize: '16px'
        }
      }
    },
    tooltip: {
      enabled: true,
      headerFormat: '',
      pointFormat: '{series.name}：{point.y}'
    },
    plotOptions: {
      bar: {
        stacking: 'normal'
      },
      column: {
        stacking: 'normal'
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: '非正式赛队',
      showInLegend: false,
      data: datUnoff
    }, {
      name: '正式赛队',
      showInLegend: false,
      data: datOff
    }]
  };
}

let currentSelected = 0;
function update(idx) {
  currentSelected = idx;

  let prob = problems[idx];

  let keys = [infoRanklist, infoWebsite, infoPdf, infoPractice];
  let values = [prob.ranklist, prob.website, prob.pdf, prob.practice];
  for (let i = 0; i < 4; i++) {
    let k = keys[i];
    let v = values[i];
    if (v != null) {
      k.innerHTML = `<a href="${v}" target="_blank">点此</a>`;
    } else {
      k.innerHTML = 'N/A';
    }
  }

  infoProbNum.innerHTML = prob.probNum.toString();

  let probCodeAc = [];
  for (let i = 0; i < prob.probNum; i++) {
    probCodeAc.push([
      String.fromCharCode(65 + i),
      prob.hasOwnProperty('probOffAc') ? prob.probOffAc[i] : prob.probAc[i],
      prob.hasOwnProperty('probUnoffAc') ? prob.probUnoffAc[i] : 0
    ]);
  }
  probCodeAc.sort((a, b) => {
    if (a[1] + a[2] != b[1] + b[2]) {
      return b[1] + b[2] - a[1] - a[2];
    } else {
      return a[0] < b[0] ? -1 : 1;
    }
  });

  let probCat = [];
  let probDatOff = [];
  let probDatUnoff = [];
  for (let i = 0; i < prob.probNum; i++) {
    probCat.push(probCodeAc[i][0]);
    probDatOff.push(probCodeAc[i][1]);
    probDatUnoff.push(probCodeAc[i][2]);
  }
  Highcharts.chart('prob-chart', getChartObj(
    '题目通过数统计', '题目编号', '通过数', probCat, probDatOff, probDatUnoff
  ));

  let teamCat = [];
  for (let i = 0; i <= prob.probNum; i++) {
    teamCat.push(i);
  }
  Highcharts.chart('team-chart', getChartObj(
    '队伍过题数统计', '过题数', '队伍数', teamCat,
    prob.hasOwnProperty('teamOffAc') ? prob.teamOffAc : prob.teamAc,
    prob.hasOwnProperty('teamUnoffAc') ? prob.teamUnoffAc : function() {
      let ret = [];
      for (let i = 0; i < prob.teamAc.length; i++) {
        ret.push(0);
      }
      return ret;
    }()
  ));
}

function renderList() {
  let list = document.querySelector('#contest-list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  if (window.innerWidth >= 992) {
    list.setAttribute('class', 'list-group');

    for (let i = 0; i < problems.length; i++) {
      let prob = problems[i];
      let anc = document.createElement('a');
      if (i == currentSelected) {
        anc.setAttribute('class', 'list-group-item list-group-item-action active');
      } else {
        anc.setAttribute('class', 'list-group-item list-group-item-action');
      }
      anc.setAttribute('data-toggle', 'list');
      anc.innerHTML = prob.name;

      anc.onclick = e => update(i);

      list.appendChild(anc);
    }
  } else {
    let select = document.createElement('select');

    for (let i = 0; i < problems.length; i++) {
      let prob = problems[i];
      let opt = document.createElement('option');
      if (i == currentSelected) {
        opt.setAttribute('selected', 'selected');
      }
      opt.innerHTML = prob.name;

      select.appendChild(opt);
    }

    select.onchange = e => update(select.options.selectedIndex);

    list.appendChild(select);
  }

  update(currentSelected);

  let nav = document.querySelector('#nav');
  nav.style.zIndex = 9999;
}

let oldWidth = window.innerWidth;
window.onresize = function(e) {
  if (oldWidth >= 992 && window.innerWidth < 992) {
    renderList();
  } else if (oldWidth < 992 && window.innerWidth >= 992) {
    renderList();
  }
  oldWidth = window.innerWidth;
}

renderList();
