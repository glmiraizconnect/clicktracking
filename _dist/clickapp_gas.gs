var shname_history = '企業情報更新履歴'; // sheet name for Company info history.
var shname_clicklog = 'クリックログ'; // sheet name to store click log.
/**
 * doGet - make log into shid for company info logging.
 * @param {GoogleAppsScript.Events.DoGet} e;
 * @return {GoogleAppsScript.Content.TextOutput} uuid
 */
var doGet = function (e) {
    var url = ''; // retun the url to be redirected (This value will net to be used to make the redirect faster.)
    try {
        url = doLog(e);
    }
    catch (ex) {
    }
    return (ContentService.createTextOutput(JSON.stringify([url])).setMimeType(ContentService.MimeType.JSON));
};
/**
 * doLog - make log into shid for company info logging.
 * @param {GoogleAppsScript.Events.DoGet} e;
 * @return {string} url
 */
var doLog = function (e) {
    try {
        var sid = e.parameter.shid;
        var companyid = e.parameter.coid;
        var ss = SpreadsheetApp.openById(sid);
        var sh = ss.getSheetByName(shname_history);
        var shlog = ss.getSheetByName(shname_clicklog);
        var tf = sh.getRange("B:B").createTextFinder(('000000' + companyid).slice(-6)).matchEntireCell(true);
        var rng = tf.findPrevious();
        if (rng != null) {
            var data = sh.getRange(rng.getRow(), 1, 1, 23).getValues();
            var row = data[0];
            LockService.getScriptLock().waitLock(10000);
            shlog.appendRow([new Date().toLocaleString(), row[0], row[1], row[2], row[3], row[4], row[6], row[7], row[8], row[11], row[12], row[20], row[15]]);
            LockService.getScriptLock().releaseLock();
            return;
        }
    }
    catch (ex) {
        Logger.log(ex.message);
        return;
    }
};
/**
 * encodeurl2 - encode url for up parameter of doGet. (will be used from Spreadsheet to encode url.)
 * @param {GoogleAppsScript.Events.DoGet} e;
 * @return {string} url
 */
var encodeurl2 = function (url) {
    return (Utilities.base64Encode(encodeURI(url)));
};
