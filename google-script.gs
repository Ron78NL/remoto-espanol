/** @OnlyCurrentDoc */
// Opslag voor "Trabajo remoto en español": bewaart per platform of het aangevinkt (hecho) of weggehaald (oculto) is.
// Hoort bij het Google-rekenblad "Remoto ES – keuzes (niet verwijderen)". Gepubliceerd als web-app (Iedereen).
function blad() { return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; }
function lees() {
var v = blad().getDataRange().getValues(), o = {};
for (var i = 1; i < v.length; i++) { if (v[i][0]) o[v[i][0]] = { hecho: v[i][1] === true, oculto: v[i][2] === true }; }
return o;
}
function antwoord(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function doGet() { return antwoord({ ok: true, estado: lees() }); }
function doPost(e) {
var slot = LockService.getScriptLock(); slot.waitLock(10000);
try {
var d = JSON.parse(e.postData.contents), id = String(d.id || "");
if (!/^[a-z0-9-]{1,40}$/.test(id)) return antwoord({ ok: false });
var b = blad(), v = b.getDataRange().getValues(), r = -1;
for (var i = 1; i < v.length; i++) { if (v[i][0] === id) { r = i + 1; break; } }
var rij = [id, d.hecho === true, d.oculto === true, new Date()];
if (r < 0) b.appendRow(rij); else b.getRange(r, 1, 1, 4).setValues([rij]);
return antwoord({ ok: true, estado: lees() });
} finally { slot.releaseLock(); }
}
