function run_rpa(macro_name, wait_to_close) {
  
  var html = `<script>

  // open new tab
  var win = open('','_blank');

  // create new element
  var element = win.document.createElement('script');

  // set type of element
  element.type='text/javascript';

  // inject our rpa bookmarklet script
  element.innerHTML = "javascript:(function() {try {var evt = new CustomEvent('kantuRunMacro', {detail: {name: '${macro_name}',from: 'bookmark',storageMode: 'browser',closeRPA: 1}});window.dispatchEvent(evt);} catch (e) {alert('UI.Vision RPA Bookmarklet error: ' + e.toString());}})();    setTimeout(function () {   window.close();  }, ${wait_to_close});";

  // append <script> to body
  win.document.body.appendChild(element);

  //close sheets popup
  google.script.host.close();

  </script>`;

  var userInterface = HtmlService.createHtmlOutput(html);
    
  SpreadsheetApp.getUi().showModalDialog(userInterface, 'One Second...');

}