const shname_history:string='企業情報更新履歴'; // sheet name for Company info history.
const shname_clicklog:string='クリックログ';    // sheet name to store click log.

/**
 * doGet - make log into shid for company info logging.
 * @param {GoogleAppsScript.Events.DoGet} e;
 * @return {GoogleAppsScript.Content.TextOutput} uuid
 */
let doGet=(e:GoogleAppsScript.Events.DoPost):GoogleAppsScript.Content.TextOutput=>{
      let url:string='';    // retun the url to be redirected (This value will net to be used to make the redirect faster.)
      try{
        url=doLog(e);
      } catch(ex){

      }
      return (ContentService.createTextOutput(JSON.stringify([url])).setMimeType(ContentService.MimeType.JSON))
}

/**
 * doLog - make log into shid for company info logging.
 * @param {GoogleAppsScript.Events.DoGet} e;
 * @return {string} url
 */
let doLog=(e:GoogleAppsScript.Events.DoPost):string=>{
  try{
  let sid:string=e.parameter.shid;
  let companyid:string=e.parameter.coid;

  let ss:GoogleAppsScript.Spreadsheet.Spreadsheet=SpreadsheetApp.openById(sid)
  let sh:GoogleAppsScript.Spreadsheet.Sheet=ss.getSheetByName(shname_history)
  let shlog:GoogleAppsScript.Spreadsheet.Sheet=ss.getSheetByName(shname_clicklog)
  let tf:GoogleAppsScript.Spreadsheet.TextFinder=sh.getRange("B:B").createTextFinder(('000000'+companyid).slice(-6)).matchEntireCell(true)
  let rng:GoogleAppsScript.Spreadsheet.Range=tf.findPrevious()
  if (rng!=null){
    let data:any[][]=sh.getRange(rng.getRow(),1,1,23).getValues()
    let row:any[]=data[0]
    LockService.getScriptLock().waitLock(10000);
    shlog.appendRow([new Date().toLocaleString(),row[0],row[1],row[2],row[3],row[4],row[6],row[7],row[8],row[11],row[12],row[20],row[15]])
    LockService.getScriptLock().releaseLock();
    return;
  }
  } catch(ex){
      Logger.log(ex.message)
    return 
  }
}
/**
 * encodeurl2 - encode url for up parameter of doGet. (will be used from Spreadsheet to encode url.)
 * @param {GoogleAppsScript.Events.DoGet} e;
 * @return {string} url
 */
let encodeurl2=(url)=>{
  return(Utilities.base64Encode(encodeURI(url)))
}
