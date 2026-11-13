# Trabajo remoto en español

Eén pagina met platformen, bedrijven en zoeksites voor Spaanstalig remote werk vanuit België.
Elke kaart heeft een label: kan vanuit België / land nakijken / enkel als je elders woont.
Taalknop Spaans ↔ Nederlands.

- Website: https://ron78nl.github.io/remoto-espanol/ (installeerbaar op gsm: "Zet op beginscherm").
- Per kaart: vinkje "Ya me registré" en knop "✕ No me sirve" (haalt het platform uit de lijst; terug te zetten onderaan bij "Quitadas").
  Op de GitHub-site worden die keuzes per toestel bewaard (in de browser).
- Per kaart "Mijn opvolging": fase (interessant, gesolliciteerd, gesprek, afgewezen, gelukt) en een notitie; overzicht bovenaan bij "Mijn sollicitaties".
- Platformen staan in de lijst `P` onderaan in `index.html`. Na een wijziging: in `sw.js` het getal achter `"rre-"` verhogen.
- Opgezocht op 13 november 2026.

## Koppeling gsm ↔ laptop
- Keuzes worden bewaard in het Google-rekenblad "Remoto ES – keuzes (niet verwijderen)" in Ron's Drive.
- Het script daarachter staat in `google-script.gs` (kopie) en is gepubliceerd als web-app; het adres staat in `index.html` als `SYNC_URL`.
- Zonder internet toont de site de laatst bewaarde lijst van dat toestel.

## Vertaler (tabblad "Traductor")
- Vertalen, eigen tekst laten verbeteren (met uitleg in het Spaans) of een bericht laten schrijven.
- Loopt via hetzelfde Google-script (`accion: "traducir"`), dat Claude aanroept (model claude-sonnet-5-5; ander model kan via scripteigenschap `MODEL`).
- De Anthropic-sleutel staat in het script onder Projectinstellingen → Scripteigenschappen → `ANTHROPIC_API_KEY` (nooit in de code).
- Maximaal 60 vertalingen per dag (`MAX_PER_DAG` in het script), zodat de kosten beperkt blijven.

## Cv
- Knop "Mi CV" bovenaan opent het Spaanse cv in Google Drive. Het bestand is alleen gedeeld met haar Gmail-account (en Ron als eigenaar); het cv zelf staat niet in deze openbare repository.
- Nieuwe versie van het cv: in Drive "Versies beheren" → nieuwe versie uploaden, dan blijft de link gelijk.
