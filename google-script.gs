/** @OnlyCurrentDoc */
// Opslag voor "Trabajo remoto en español": per platform aangevinkt (hecho), weggehaald (oculto), fase en notitie.
var FASES = ["", "interesa", "solicitado", "entrevista", "rechazado", "conseguido"];
function blad() { return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; }
function lees() {
var v = blad().getDataRange().getValues(), o = {};
for (var i = 1; i < v.length; i++) { if (v[i][0]) o[v[i][0]] = { hecho: v[i][1] === true, oculto: v[i][2] === true, fase: String(v[i][4] || ""), nota: String(v[i][5] || "").replace(/^'/, "") }; }
return o;
}
function antwoord(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function doGet() { return antwoord({ ok: true, estado: lees() }); }
function doPost(e) {
var slot = LockService.getScriptLock(); slot.waitLock(10000);
try {
var d = JSON.parse(e.postData.contents), id = String(d.id || "");
if (!/^[a-z0-9-]{1,40}$/.test(id)) return antwoord({ ok: false });
var fase = FASES.indexOf(d.fase) > -1 ? d.fase : "";
var nota = String(d.nota || "").slice(0, 500);
if (/^[=+\-@]/.test(nota)) nota = "'" + nota;
var b = blad(), v = b.getDataRange().getValues(), r = -1;
for (var i = 1; i < v.length; i++) { if (v[i][0] === id) { r = i + 1; break; } }
var rij = [id, d.hecho === true, d.oculto === true, new Date(), fase, nota];
if (r < 0) b.appendRow(rij); else b.getRange(r, 1, 1, 6).setValues([rij]);
return antwoord({ ok: true, estado: lees() });
} finally { slot.releaseLock(); }
}
