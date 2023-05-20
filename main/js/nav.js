let navNode = document.getElementsByTagName("mynav")[0];
let active = navNode.getAttribute("active");

let navIndexText = `<li class="nav-item ${active == "index" ? "active" : ""}">
  <a class="nav-link" href=".">首页</a>
</li>`;

let navAboutText = `<li class="nav-item ${active == "about" ? "active" : ""}">
  <a class="nav-link" href="about.html">关于我们</a>
</li>`;

let navCasesText = `<li class="nav-item ${active == "cases" ? "active" : ""}">
  <a class="nav-link" href="cases.html">成功案例</a>
</li>`;

let navProblemsText = `<li class="nav-item ${active == "problems" ? "active" : ""}">
  <a class="nav-link" href="/wiki">竞赛合集</a>
</li>`;

let navContactText = `<li class="nav-item">
  <a class="nav-link" href="contact.html" data-toggle="modal" data-target="#contact-modal">联系我们</a>
</li>`;

let contactModalText = `<div class="modal fade" id="contact-modal" tabindex="-1" role="dialog" aria-labelledby="contact-modal-label" aria-hidden="true" style="z-index: 99999">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="contact-modal-label">联系我们</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <center>如果您希望委托我们工作，请联系<br><font size="28"><a href="mailto:i@sua.ac">i@sua.ac</a></font><br>我们会根据您的需求进一步与您商谈</center>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>`;

navNode.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href=".">SUA 程序设计竞赛命题组</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      ${navIndexText}
      ${navAboutText}
      ${navCasesText}
      ${navProblemsText}
      ${navContactText}
    </ul>
  </div>
</nav>

${contactModalText}`;
