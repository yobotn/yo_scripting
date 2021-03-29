function onCheckbox(e) {
  /**
   * Script Variables (You should config these variables only)
   * 
   * @param     workingSheet                in which sheet the function will triger the webhook
   * @param     columToWatchCheckboxes      which column to watch when checkbox is ticked, column number A=1, B=2
   * @param     webhook                     webhook url
   */
  const workingSheet = ""
  const columToWatchCheckboxes = 7;
  const webhook = "https://hook.integromat.com/kax2yxf";
  
  /**
   * Default Spreadsheet variables
   * 
   * @param     spreadsheet                 spreadsheet instance
   * @param     sheet                       selected sheet to triger the webhook
   * @param     actualSheet                 current sheet name when function triggered
   */
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(workingSheet);
  const actualSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();

  /**
   * 1. Stop the function if not in the right sheet
   * 2. Stop the function if not in the right column number
   */
  if (actualSheet !== workingSheet){ return; }
  if (e.range.getColumn() !== columToWatchCheckboxes) { return; }
 
  /**
   * Check Checkbox value if true to send the webhook
   */
  if (e.range.getValue() == true) {
        
    /**
     * Get Headers
     */
    const headers = sheet.getDataRange().offset(0, 0, 1).getValues()[0];

    /**
     * Get Row Values
     */
    let rowRange = sheet.getRange(e.range.getRowIndex(), 1, 1, sheet.getLastColumn());
    const values = rowRange.getValues();

    /**
     * Generate Payload
     */
    let payload ={}

    payload["row_number"] = e.range.getRowIndex();
      
    for (i = 0; i < headers.length; i++) {
      let name = headers[i];
      payload[name] = values[0][i];
    }

    /**
     * Prepare the webhook requset
     */
    let options = {
      "method" : "post",
      "payload" : payload
    };

    let request = UrlFetchApp.fetch(webhook, options);

    let response = request.getContentText()

    Browser.msgBox(response);

    /**
     * In case you would like to treat response as JSON data,
     * Use this script below with JSON response example as { "status": "ok" }
     */
    
    /*
    let json = request.getContentText()
    let data = JSON.parse(json);
    Browser.msgBox(data.status);
    */

  }

}