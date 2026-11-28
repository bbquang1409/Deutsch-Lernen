/* ============================================================
   DEUTSCH-LERNEN · Schreibwerkstatt A1 — Aufgabendaten
   15 Formulare (75 Felder) + 15 E-Mails (120 Ideen-Sätze mit
   Leitpunkt-Tags, Grammatik-Hints, 🔑 Wort-Hilfe & Mustertext)
   ============================================================ */
window.SCHREIBEN_CONFIG = {
  level: 'A1',
  storageKey: 'dl_schreiben_a1_v1',
  guideHeading: 'Von der Aufgabe zum eigenen A1-Satz',
  guides: [
    ['1 · Aufgabe verstehen', 'Wer schreibt? An wen? Warum? du, Sie oder ihr? Markiere die <strong>3–4 Inhaltspunkte</strong>. (Đọc đề: ai viết cho ai, vì sao.)'],
    ['2 · Ideen sammeln', 'Zu jedem Inhaltspunkt ein bis zwei kurze Sätze planen. <strong>Ein Punkt = eine Information.</strong> (Mỗi ý một thông tin rõ ràng.)'],
    ['3 · Satz bauen (Position 2)', 'Das konjugierte Verb steht auf Position 2: <strong>Ich komme am Montag. / Am Montag komme ich.</strong> Mit <strong>denn</strong> bleibt die Reihenfolge: …, denn ich habe Fieber. Mit <strong>deshalb</strong> steht das Verb vor ich: …, deshalb bleibe ich zu Hause.'],
    ['4 · Zeitform: Gegenwart oder Vergangenheit', 'Frage dich: Wann passiert es?<br><strong>Gegenwart</strong> (hiện tại): heute, jetzt, morgen → <em>Ich habe Fieber.</em><br><strong>Vergangenheit</strong> (quá khứ): gestern, letzte Woche → Perfekt (<em>Ich bin zum Arzt gegangen</em>) oder <strong>war / hatte</strong> (<em>Gestern war ich beim Arzt.</em>).'],
    ['5 · Anrede und Gruß: du / ihr', 'Freunde & Familie: <strong>Liebe Anna, / Lieber Tom, / Liebe Lena, lieber Paul,</strong> · du/dein, ihr/euer · <em>Viele Grüße / Liebe Grüße</em>.'],
    ['6 · Anrede und Gruß: Sie', 'Amt, Schule, Firma: <strong>Sehr geehrte Damen und Herren,</strong> · bekannte Person mit Sie: <em>Sehr geehrte Frau Müller,</em> · Sie/Ihr/Ihnen groß · <em>Mit freundlichen Grüßen</em>.'],
    ['7 · Teil 1 · Formular', 'Übertrage nur Angaben, die wirklich im Dokument stehen. Achtung: Im Text stehen oft Zusatzdaten (Öffnungszeiten, Preise), die nicht ins Formular gehören.'],
    ['8 · Teil 2 · E-Mail (Prüfung)', 'Etwa 30–50 Wörter. Checkliste: <strong>Anrede – alle Leitpunkte – Gruß – du/Sie konsequent</strong>. Nutze Schritt 02 zum Trainieren und teste dich danach im <strong>⏱ Prüfungsmodus</strong>!']
  ],
  redemittel: {
    email: {
      'Anrede': ['Liebe(r) …,', 'Hallo …,', 'Sehr geehrte Frau … / Sehr geehrter Herr …,', 'Sehr geehrte Damen und Herren,'],
      'Satzanfänge': ['Vielen Dank für …', 'Ich schreibe dir/Ihnen, denn …', 'Leider kann ich nicht kommen, denn …', 'Deshalb möchte ich …', 'Können Sie mir bitte …?', 'Kannst du bitte …?'],
      'Schluss & Gruß': ['Ich freue mich auf deine/Ihre Antwort.', 'Bis Samstag! / Bis bald!', 'Viele Grüße', 'Mit freundlichen Grüßen']
    }
  },
  parts: [
    {
      id: 'form',
      label: 'Teil 1 · Formular',
      shortLabel: 'Formular',
      icon: '📄',
      type: 'form',
      items: [
        {
          title: 'Sprachkurs-Anmeldung', theme: 'Kurs & Arbeit', instruction: 'Lies die Anmeldekarte und ergänze das Formular.',
          brand: 'Sprachzentrum Leipzig', doctitle: 'Anmeldebestätigung', sub: 'Kundenservice', intro: 'Guten Tag! Ihre Anmeldung ist bei uns eingegangen.',
          narrative: 'Frau Laura Fischer, geboren am 12.04.2007, wohnt in Leipzig. Sie hat sich für den Sprachkurs angemeldet. Unterrichtssprache: Deutsch. Bitte bringen Sie Ihren Ausweis mit.',
          extra: 'Bei Fragen rufen Sie Frau Neumann an: Tel. 0341 55 20 48.', ref: 'SZ-2048', issued: '15.06.2026',
          fields: [{ key: 'Name', value: 'Fischer' }, { key: 'Vorname', value: 'Laura' }, { key: 'Geburtsdatum', value: '12.04.2007' }, { key: 'Wohnort', value: 'Leipzig' }, { key: 'Sprache', value: 'Deutsch' }]
        },
        {
          title: 'Hotelreservierung', theme: 'Urlaub & Reisen', instruction: 'Übertrage die Angaben der Buchungsbestätigung.',
          brand: 'Hotel Am Markt · Dresden', doctitle: 'Buchungsbestätigung', sub: 'Ihre Buchung', intro: 'Vielen Dank für Ihre Buchung. Wir freuen uns auf Ihren Besuch.',
          narrative: 'Sehr geehrter Herr Weber, für Jonas Weber haben wir ein Einzelzimmer reserviert. Ihre Anreise ist am 14.08.2026; Sie reisen am 17.08.2026 wieder ab. Frühstück ab 7 Uhr.',
          extra: 'Das Hotel liegt in der Marktstraße 5.', ref: 'HM-3817', issued: '20.06.2026',
          fields: [{ key: 'Name', value: 'Weber' }, { key: 'Vorname', value: 'Jonas' }, { key: 'Anreise', value: '14.08.2026' }, { key: 'Abreise', value: '17.08.2026' }, { key: 'Zimmer', value: 'Einzelzimmer' }]
        },
        {
          title: 'Bibliotheksausweis', theme: 'Freizeit', instruction: 'Lies den Ausweis und ergänze die Anmeldung.',
          brand: 'Stadtbibliothek Leipzig', doctitle: 'Bibliothekskarte', sub: 'Kundenservice', intro: 'Willkommen in unserer Bibliothek!',
          narrative: 'Dieser Ausweis gehört Anna Schneider (geboren am 03.11.2004). Die Adresse lautet Bahnhofstraße 12, 04109 Leipzig. Bitte zeigen Sie die Karte beim Ausleihen vor.',
          extra: 'Der Ausweis ist drei Jahre gültig. Die Bibliothek ist Montag bis Freitag von 9 bis 18 Uhr geöffnet.', ref: 'BIB-1026', issued: '01.03.2026',
          fields: [{ key: 'Name', value: 'Schneider' }, { key: 'Vorname', value: 'Anna' }, { key: 'Geburtsdatum', value: '03.11.2004' }, { key: 'Straße', value: 'Bahnhofstraße 12' }, { key: 'PLZ', value: '04109' }]
        },
        {
          title: 'Sportverein', theme: 'Gesundheit & Kurs', instruction: 'Übertrage die Angaben aus der Mitgliedskarte.',
          brand: 'SV Grün-Weiß Leipzig', doctitle: 'Mitgliedsbestätigung', sub: 'Kundenservice', intro: 'Herzlich willkommen in unserem Verein!',
          narrative: 'Felix Hoffmann ist jetzt Mitglied. Sport: Fußball. Das Training findet immer am Mittwoch um 18:30 Uhr statt. Bitte Sportschuhe mitbringen.',
          extra: 'Der Verein hat 120 Mitglieder.', ref: 'SV-5082', issued: '01.03.2026',
          fields: [{ key: 'Name', value: 'Hoffmann' }, { key: 'Vorname', value: 'Felix' }, { key: 'Sportart', value: 'Fußball' }, { key: 'Trainingstag', value: 'Mittwoch' }, { key: 'Uhrzeit', value: '18:30' }]
        },
        {
          title: 'Zugticket', theme: 'Urlaub & Reisen', instruction: 'Lies die Fahrkarte und ergänze das Reiseformular.',
          brand: 'DB Reisezentrum', doctitle: 'Fahrkarte', sub: 'Reiseinformation', intro: 'Ihre Reiseverbindung auf einen Blick.',
          narrative: 'Fahrt am 21.07.2026: von Berlin nach Hamburg. Der Zug fährt um 09:15 Uhr von Gleis 4 ab. Bitte halten Sie die Fahrkarte bereit.',
          extra: 'Ankunft in Hamburg: 12:48 Uhr.', ref: 'ICE-2714', issued: '10.07.2026',
          fields: [{ key: 'Von', value: 'Berlin' }, { key: 'Nach', value: 'Hamburg' }, { key: 'Datum', value: '21.07.2026' }, { key: 'Abfahrt', value: '09:15' }, { key: 'Gleis', value: '4' }]
        },
        {
          title: 'Arzttermin', theme: 'Gesundheit & Kurs', instruction: 'Lies die Terminbestätigung und ergänze das Formular.',
          brand: 'Praxis Dr. Weber', doctitle: 'Terminbestätigung', sub: 'Ihr nächster Termin', intro: 'Wir haben folgenden Termin für Sie reserviert.',
          narrative: 'Guten Tag, Tom Müller. Ihr Termin bei Dr. Weber ist am 05.12.2026 um 10:30 Uhr. Bitte bringen Sie Ihre Gesundheitskarte mit.',
          extra: 'Die Praxis ist von 8 bis 12 Uhr geöffnet.', ref: 'PR-3118', issued: '20.11.2026',
          fields: [{ key: 'Name', value: 'Müller' }, { key: 'Vorname', value: 'Tom' }, { key: 'Datum', value: '05.12.2026' }, { key: 'Uhrzeit', value: '10:30' }, { key: 'Arzt', value: 'Dr. Weber' }]
        },
        {
          title: 'Ferienwohnung', theme: 'Wohnen', instruction: 'Lies die Reservierungsdaten und ergänze die Anmeldung.',
          brand: 'Ferienhaus Ostsee', doctitle: 'Reservierungsbestätigung', sub: 'Kundenservice', intro: 'Vielen Dank für Ihre Reservierung.',
          narrative: 'Wir bestätigen die Buchung für Clara Becker in Lübeck. Sie reisen insgesamt mit 3 Personen an und bleiben 4 Nächte. Die Schlüsselübergabe ist ab 15 Uhr.',
          extra: 'Die Wohnung hat 2 Zimmer und liegt im 3. Stock.', ref: 'FW-6631', issued: '02.06.2026',
          fields: [{ key: 'Name', value: 'Becker' }, { key: 'Vorname', value: 'Clara' }, { key: 'Ort', value: 'Lübeck' }, { key: 'Personen', value: '3' }, { key: 'Nächte', value: '4' }]
        },
        {
          title: 'Kursbescheinigung', theme: 'Kurs & Arbeit', instruction: 'Lies die Kursbescheinigung und übertrage die Daten.',
          brand: 'Volkshochschule München', doctitle: 'Teilnahmebescheinigung', sub: 'Kundenservice', intro: 'Wir bestätigen Ihre Kursteilnahme.',
          narrative: 'Hiermit bestätigen wir, dass Lisa Bauer für den Kurs Deutsch A1 angemeldet ist. Kursbeginn: 02.09.2026. Unterrichtsraum: 205. Bitte erscheinen Sie pünktlich.',
          extra: 'Der Kurs hat 40 Unterrichtseinheiten.', ref: 'VHS-9042', issued: '28.08.2026',
          fields: [{ key: 'Name', value: 'Bauer' }, { key: 'Vorname', value: 'Lisa' }, { key: 'Kurs', value: 'Deutsch A1' }, { key: 'Beginn', value: '02.09.2026' }, { key: 'Raum', value: '205' }]
        },
        {
          title: 'Fitnessstudio', theme: 'Freizeit', instruction: 'Lies die Mitgliedskarte und ergänze das Formular.',
          brand: 'Fitness Punkt · Leipzig', doctitle: 'Mitgliedskarte', sub: 'Ihr Vertrag', intro: 'Willkommen im Studio!',
          narrative: 'Mia Keller, geboren am 22.09.1999, ist Mitglied im Fitnessstudio. Ihre Mitgliedsnummer ist 70418. Der Vertrag läuft 12 Monate.',
          extra: 'Das Studio ist täglich von 6 bis 23 Uhr geöffnet. Der Monatsbeitrag beträgt 29 Euro.', ref: 'FIT-7041', issued: '05.01.2026',
          fields: [{ key: 'Name', value: 'Keller' }, { key: 'Vorname', value: 'Mia' }, { key: 'Geburtsdatum', value: '22.09.1999' }, { key: 'Mitgliedsnummer', value: '70418' }, { key: 'Vertrag', value: '12 Monate' }]
        },
        {
          title: 'Flugbuchung', theme: 'Urlaub & Reisen', instruction: 'Lies die Bordkarte und ergänze das Reiseformular.',
          brand: 'Flughafen Leipzig/Halle', doctitle: 'Bordkarte', sub: 'Ihr Flug', intro: 'Gute Reise!',
          narrative: 'Herr Paul Hartmann fliegt am 09.01.2027 nach Wien. Der Abflug ist um 06:40 Uhr.',
          extra: 'Boarding beginnt um 06:00 Uhr am Gate B12. Das Gepäck darf 20 kg wiegen.', ref: 'FL-4471', issued: '20.12.2026',
          fields: [{ key: 'Name', value: 'Hartmann' }, { key: 'Vorname', value: 'Paul' }, { key: 'Nach', value: 'Wien' }, { key: 'Datum', value: '09.01.2027' }, { key: 'Abflug', value: '06:40' }]
        },
        {
          title: 'Schwimmkurs', theme: 'Freizeit', instruction: 'Lies die Anmeldebestätigung und ergänze das Formular.',
          brand: 'Stadtbad Leipzig', doctitle: 'Anmeldebestätigung', sub: 'Kursangebot', intro: 'Ihre Anmeldung ist bestätigt.',
          narrative: 'Sara Richter ist für den Kurs Schwimmen für Anfänger angemeldet. Der Kurs findet immer am Donnerstag statt. Kursbeginn: 15.01.2027.',
          extra: 'Das Schwimmbad liegt in der Parkstraße 8. Der Kurs kostet 60 Euro.', ref: 'SB-2210', issued: '06.11.2026',
          fields: [{ key: 'Name', value: 'Richter' }, { key: 'Vorname', value: 'Sara' }, { key: 'Kurs', value: 'Schwimmen für Anfänger' }, { key: 'Tag', value: 'Donnerstag' }, { key: 'Beginn', value: '15.01.2027' }]
        },
        {
          title: 'Paketkarte', theme: 'Wohnen', instruction: 'Lies die Benachrichtigungskarte und ergänze das Formular.',
          brand: 'Post & Paket', doctitle: 'Benachrichtigungskarte', sub: 'Sendungsverfolgung', intro: 'Wir haben ein Paket für Sie.',
          narrative: 'Das Paket ist für Ben Lange. Die Adresse lautet Gartenweg 7, 01067 Dresden.',
          extra: 'Das Paket wiegt 3 kg. Die Sendungsnummer ist 90 22 17 55. Zustellung: Montag bis Samstag.', ref: 'PK-3092', issued: '04.11.2026',
          fields: [{ key: 'Name', value: 'Lange' }, { key: 'Vorname', value: 'Ben' }, { key: 'Straße', value: 'Gartenweg 7' }, { key: 'PLZ', value: '01067' }, { key: 'Ort', value: 'Dresden' }]
        },
        {
          title: 'Handyvertrag', theme: 'Kurs & Arbeit', instruction: 'Lies die Vertragsbestätigung und ergänze das Formular.',
          brand: 'MobilFunk Plus', doctitle: 'Vertragsbestätigung', sub: 'Ihr Tarif', intro: 'Danke für Ihren Auftrag.',
          narrative: 'Eva Neumann hat den Tarif Smart 10 gewählt. Ihre neue Rufnummer ist 0176 5551234. Der Vertrag beginnt am 01.12.2026.',
          extra: 'Der Preis beträgt 15 Euro pro Monat. Die Kundenhotline erreichen Sie unter 0800 123456.', ref: 'MF-8830', issued: '02.11.2026',
          fields: [{ key: 'Name', value: 'Neumann' }, { key: 'Vorname', value: 'Eva' }, { key: 'Tarif', value: 'Smart 10' }, { key: 'Rufnummer', value: '0176 5551234' }, { key: 'Beginn', value: '01.12.2026' }]
        },
        {
          title: 'Prüfungsanmeldung', theme: 'Kurs & Arbeit', instruction: 'Lies die Anmeldung und ergänze das Formular.',
          brand: 'Prüfungszentrum Dresden', doctitle: 'Prüfungsanmeldung', sub: 'Ihre Prüfung', intro: 'Ihre Anmeldung ist eingegangen.',
          narrative: 'Nina Wolf ist zur Prüfung Start Deutsch 1 angemeldet. Die Prüfung ist am 16.01.2027 um 09:00 Uhr. Bitte bringen Sie Ihren Ausweis mit.',
          extra: 'Die Prüfungsgebühr beträgt 110 Euro. Bitte seien Sie um 08:30 Uhr da.', ref: 'PZ-5521', issued: '05.11.2026',
          fields: [{ key: 'Name', value: 'Wolf' }, { key: 'Vorname', value: 'Nina' }, { key: 'Prüfung', value: 'Start Deutsch 1' }, { key: 'Datum', value: '16.01.2027' }, { key: 'Uhrzeit', value: '09:00' }]
        },
        {
          title: 'Restaurantreservierung', theme: 'Freizeit', instruction: 'Lies die Reservierungsbestätigung und ergänze das Formular.',
          brand: 'Restaurant Zur Linde', doctitle: 'Reservierungsbestätigung', sub: 'Ihr Tisch', intro: 'Wir freuen uns auf Sie.',
          narrative: 'Tim Schulz hat einen Tisch für 4 Personen reserviert. Datum: 20.11.2026, Uhrzeit: 19:30 Uhr. Bitte seien Sie pünktlich.',
          extra: 'Die Küche schließt um 22 Uhr. Der Tisch hat die Nummer 12.', ref: 'RL-1204', issued: '06.11.2026',
          fields: [{ key: 'Name', value: 'Schulz' }, { key: 'Vorname', value: 'Tim' }, { key: 'Datum', value: '20.11.2026' }, { key: 'Uhrzeit', value: '19:30' }, { key: 'Personen', value: '4' }]
        }
      ]
    },
    {
      id: 'email',
      label: 'Teil 2 · E-Mail',
      shortLabel: 'E-Mail',
      icon: '✉️',
      type: 'writing',
      examMinutes: 20,
      minWords: 30,
      wordTarget: 'ca. 30–50 Wörter',
      items: [
        {
          title: 'Einladung annehmen', theme: 'Fest & Freunde', register: 'informell (du)',
          scenario: 'Du hast von deiner Freundin Frieda eine Einladung zur Einweihungsfeier bekommen. Die Feier ist am Samstag um 16 Uhr. Du möchtest gern kommen. Schreibe Frieda eine E-Mail.',
          points: ['Bedanke dich für die Einladung.', 'Sage, dass du kommst.', 'Frage, ob du eine Freundin oder einen Freund mitbringen darfst.'],
          analysis: ['Wer schreibt an wen? (du oder Sie?)', 'Wann beginnt die Party?', 'Welche 3 Inhaltspunkte musst du beantworten?', 'Welche Anrede und welcher Gruß passen?'],
          anrede: 'Liebe Frieda,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Dank', hint: 'Vielen Dank für …', keywords: ['Vielen Dank', 'Einladung', 'Einweihungsparty', 'Samstag'], vi: 'Cảm ơn bạn đã mời tôi đến dự tiệc tân gia vào thứ Bảy.', answers: ['Vielen Dank für deine Einladung zur Einweihungsparty am Samstag.'] },
            { pointTag: 'Punkt 2 · Zusage', hint: 'deshalb + Inversion', keywords: ['müssen', 'arbeiten', 'deshalb', 'Zeit haben'], vi: 'Tôi không phải đi làm vào thứ Bảy, vì vậy tôi có thời gian đến dự tiệc của bạn.', answers: ['Ich muss am Samstag nicht arbeiten, deshalb habe ich Zeit für deine Party.'] },
            { pointTag: 'Punkt 1 · Freude', hint: 'Perfekt: bekommen / freuen', keywords: ['gestern', 'bekommen', 'sich freuen'], vi: 'Hôm qua tôi đã nhận được thư mời của bạn và tôi rất vui.', answers: ['Gestern habe ich deine Einladung bekommen und ich habe mich sehr gefreut.'] },
            { pointTag: 'Punkt 2 · Zusage', hint: 'Modalverb: möchte + mitbringen', keywords: ['kommen', '16 Uhr', 'möchten', 'Kuchen', 'mitbringen'], vi: 'Tôi sẽ đến lúc 16 giờ và tôi muốn mang theo một chiếc bánh.', answers: ['Ich komme um 16 Uhr und möchte einen Kuchen mitbringen.'] },
            { pointTag: 'Punkt 3 · Frage', hint: 'Ja/Nein-Frage: Darf ich …?', keywords: ['Freund / Freundin', 'möchten', 'dürfen', 'mitbringen'], vi: 'Bạn tôi cũng muốn đến dự tiệc; tôi có thể dẫn bạn ấy theo không?', answers: ['Mein Freund möchte auch zur Party kommen. Darf ich ihn mitbringen?', 'Meine Freundin möchte auch zur Party kommen. Darf ich sie mitbringen?'] },
            { pointTag: 'Punkt 2 · Extra', hint: 'Perfekt: gekauft', keywords: ['kleines Geschenk', 'neue Wohnung', 'kaufen'], vi: 'Tôi đã mua một món quà nhỏ cho căn hộ mới của bạn.', answers: ['Ich habe ein kleines Geschenk für deine neue Wohnung gekauft.'] },
            { pointTag: 'Schluss', hint: 'denn + normale Wortstellung', keywords: ['sich freuen', 'denn', 'können', 'sich treffen'], vi: 'Tôi rất vui vì chúng ta có thể gặp nhau vào thứ Bảy.', answers: ['Ich freue mich, denn wir können uns am Samstag treffen.'] },
            { pointTag: 'Schluss', hint: 'Bis Samstag!', keywords: ['Samstag', 'wünschen', 'schöne Party'], vi: 'Hẹn gặp bạn vào thứ Bảy, tôi chúc bạn có một buổi tiệc vui vẻ.', answers: ['Bis Samstag! Ich wünsche dir eine schöne Party.'] }
          ],
          muster: 'Liebe Frieda,\n\nvielen Dank für deine Einladung zur Einweihungsparty am Samstag! Ich habe mich sehr gefreut.\n\nIch komme gern um 16 Uhr und möchte einen Kuchen mitbringen. Mein Freund möchte auch zur Party kommen. Darf ich ihn mitbringen?\n\nBis Samstag!\nViele Grüße\n[Dein Name]'
        },
        {
          title: 'Einladung absagen', theme: 'Fest & Freunde', register: 'informell (du)',
          scenario: 'Dein Freund Stefan hat dich für Samstag zu seiner Einweihungsfeier eingeladen. Leider musst du an diesem Tag arbeiten. Schreibe Stefan eine E-Mail.',
          points: ['Bedanke dich für die Einladung.', 'Sage ab und erkläre, warum du nicht kommen kannst.', 'Schlage ein Treffen an einem anderen Tag vor.'],
          analysis: ['An wen schreibst du (du/Sie)?', 'Warum kannst du am Samstag nicht kommen?', 'Welchen alternativen Tag schlägst du vor?'],
          anrede: 'Lieber Stefan,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Dank', hint: 'Vielen Dank für …', keywords: ['Vielen Dank', 'Einladung', 'Einweihungsparty', 'Samstag'], vi: 'Cảm ơn bạn đã mời tôi đến dự tiệc tân gia vào thứ Bảy.', answers: ['Vielen Dank für deine Einladung zur Einweihungsparty am Samstag.'] },
            { pointTag: 'Punkt 2 · Absage', hint: 'denn + Modalverb', keywords: ['leidtun', 'können', 'denn', 'müssen', 'arbeiten'], vi: 'Tôi rất tiếc, nhưng tôi không thể đến vì thứ Bảy tôi phải làm việc.', answers: ['Es tut mir leid, aber ich kann nicht kommen, denn ich muss am Samstag arbeiten.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'hatte (Präteritum)', keywords: ['letzte Woche', 'frei haben', 'diese Woche', 'viel Arbeit'], vi: 'Tuần trước tôi đã được nghỉ, nhưng tuần này tôi có rất nhiều việc.', answers: ['Letzte Woche hatte ich frei, aber diese Woche habe ich viel Arbeit.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'Perfekt: angerufen', keywords: ['gestern', 'Chef', 'anrufen', 'müssen', 'arbeiten'], vi: 'Hôm qua sếp đã gọi cho tôi và tôi phải làm việc vào thứ Bảy.', answers: ['Gestern hat mein Chef mich angerufen und ich muss am Samstag arbeiten.'] },
            { pointTag: 'Punkt 3 · Geschenk', hint: 'Perfekt + möchten', keywords: ['Geschenk', 'kaufen', 'nächste Woche', 'mitbringen'], vi: 'Tôi đã mua một món quà cho bạn và muốn mang đến vào tuần sau.', answers: ['Ich habe ein Geschenk für dich gekauft und möchte es nächste Woche mitbringen.'] },
            { pointTag: 'Punkt 3 · Treffen', hint: 'Können wir uns …?', keywords: ['Sonntag', 'frei haben', 'Café', 'sich treffen'], vi: 'Chủ nhật tôi có thời gian rảnh; chúng ta có thể gặp nhau ở quán cà phê không?', answers: ['Am Sonntag habe ich frei. Können wir uns im Café treffen?'] },
            { pointTag: 'Punkt 3 · Extra', hint: 'Perfekt + hatte', keywords: ['letztes Mal', 'zusammen', 'Kaffee trinken', 'viel Spaß'], vi: 'Lần trước chúng ta đã uống cà phê cùng nhau và tôi đã rất vui.', answers: ['Letztes Mal haben wir zusammen Kaffee getrunken und ich hatte viel Spaß.'] },
            { pointTag: 'Schluss', hint: 'wünschen + Dat.', keywords: ['wünschen', 'schöne Party', 'nächste Woche'], vi: 'Chúc bạn có một buổi tiệc vui vẻ và hẹn gặp lại vào tuần sau.', answers: ['Ich wünsche dir eine schöne Party. Bis nächste Woche!'] }
          ],
          muster: 'Lieber Stefan,\n\nvielen Dank für deine Einladung zur Einweihungsparty am Samstag. Es tut mir leid, aber ich kann nicht kommen, denn ich muss am Samstag arbeiten.\n\nAm Sonntag habe ich frei. Können wir uns im Café treffen? Ich möchte dir dann auch mein Geschenk geben.\n\nIch wünsche dir eine schöne Party!\nViele Grüße\n[Dein Name]'
        },
        {
          title: 'Krankmeldung im Kurs', theme: 'Gesundheit & Kurs', register: 'halbformell (Sie)',
          scenario: 'Du besuchst einen Deutschkurs. Am Montag hast du Fieber und kannst nicht am Unterricht teilnehmen. Schreibe deiner Kursleiterin Frau Müller eine E-Mail.',
          points: ['Erkläre, warum du schreibst.', 'Sage, wann du wieder zum Kurs kommen kannst.', 'Frage nach den Hausaufgaben.'],
          analysis: ['Schreibst du Frau Müller mit du oder Sie?', 'Welche Punkte brauchen Vergangenheit (gestern/war)?', 'Welche Bitte stellst du am Ende?'],
          anrede: 'Sehr geehrte Frau Müller,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Grund', hint: 'denn + Sie-Register', keywords: ['schreiben', 'Ihnen', 'Montag', 'Deutschkurs'], vi: 'Tôi viết thư vì thứ Hai tôi không thể đến lớp tiếng Đức.', answers: ['Ich schreibe Ihnen, denn ich kann am Montag nicht zum Deutschkurs kommen.'] },
            { pointTag: 'Punkt 1 · Grund', hint: 'deshalb + Inversion', keywords: ['seit gestern', 'Fieber', 'Kopfschmerzen', 'zu Hause bleiben'], vi: 'Từ hôm qua tôi bị sốt và đau đầu, vì vậy tôi phải ở nhà.', answers: ['Seit gestern habe ich Fieber und Kopfschmerzen, deshalb muss ich zu Hause bleiben.'] },
            { pointTag: 'Punkt 1 · Arzt', hint: 'war beim Arzt', keywords: ['gestern', 'Arzt', 'sagen', 'sich ausruhen'], vi: 'Hôm qua tôi đã đi khám bác sĩ và bác sĩ bảo tôi phải nghỉ ngơi.', answers: ['Gestern war ich beim Arzt und er hat gesagt: Ich muss mich ausruhen.', 'Gestern war ich beim Arzt. Ich soll mich ausruhen.'] },
            { pointTag: 'Punkt 1 · Extra', hint: 'war + Perfekt (gegangen)', keywords: ['letzte Woche', 'gesund', 'jeden Tag', 'heute', 'krank'], vi: 'Tuần trước tôi vẫn khỏe và đã đi học mỗi ngày, nhưng hôm nay tôi bị ốm nên phải nghỉ học.', answers: ['Letzte Woche war ich noch gesund und bin jeden Tag zum Kurs gegangen, aber heute bin ich krank und muss zu Hause bleiben.'] },
            { pointTag: 'Punkt 2 · Rückkehr', hint: 'Position 1: Am Mittwoch', keywords: ['Mittwoch', 'hoffentlich', 'wieder gesund', 'dann'], vi: 'Hy vọng thứ Tư tôi khỏe lại. Khi đó tôi có thể trở lại lớp.', answers: ['Am Mittwoch bin ich hoffentlich wieder gesund. Dann kann ich zum Kurs kommen.'] },
            { pointTag: 'Punkt 3 · Bitte', hint: 'Können Sie mir bitte …?', keywords: ['können', 'Hausaufgaben', 'per E-Mail', 'schicken'], vi: 'Bà có thể vui lòng gửi bài tập về nhà qua email cho tôi không?', answers: ['Können Sie mir bitte die Hausaufgaben per E-Mail schicken?'] },
            { pointTag: 'Punkt 3 · Grund', hint: 'denn + möchten', keywords: ['Aufgaben', 'zu Hause machen', 'nichts verpassen'], vi: 'Tôi muốn làm bài tập ở nhà vì tôi không muốn bỏ lỡ bài học.', answers: ['Ich möchte die Aufgaben zu Hause machen, denn ich möchte nichts verpassen.', 'Ich möchte die Hausaufgaben zu Hause machen, denn ich möchte nichts verpassen.'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank für Ihre …', keywords: ['Hilfe', 'wünschen', 'schöner Tag'], vi: 'Cảm ơn bà đã giúp đỡ và chúc bà một ngày tốt lành.', answers: ['Vielen Dank für Ihre Hilfe. Ich wünsche Ihnen einen schönen Tag.'] }
          ],
          muster: 'Sehr geehrte Frau Müller,\n\nich schreibe Ihnen, denn ich kann am Montag nicht zum Deutschkurs kommen. Seit gestern habe ich Fieber und Kopfschmerzen, deshalb muss ich zu Hause bleiben.\n\nAm Mittwoch bin ich hoffentlich wieder gesund. Können Sie mir bitte die Hausaufgaben per E-Mail schicken?\n\nVielen Dank für Ihre Hilfe.\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Urlaub erzählen', theme: 'Urlaub & Reisen', register: 'informell (du)',
          scenario: 'Du hast letzte Woche Urlaub gemacht. Deine Freundin Katharina möchte wissen, wie dein Urlaub war. Schreibe ihr eine E-Mail.',
          points: ['Schreibe, wo und mit wem du Urlaub gemacht hast.', 'Erzähle, was du dort gemacht hast.', 'Sage, was dir besonders gefallen hat.', 'Schlage ein Treffen vor.'],
          analysis: ['Welche Zeitform brauchst du für den Urlaub letzte Woche?', 'Wo warst du und mit wem?', 'Wann möchtest du Katharina treffen?'],
          anrede: 'Liebe Katharina,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Ort', hint: 'Perfekt: Urlaub gemacht', keywords: ['letzte Woche', 'Familie', 'Urlaub machen', 'Berlin'], vi: 'Tuần trước tôi đã đi nghỉ ở Berlin cùng gia đình.', answers: ['Letzte Woche habe ich mit meiner Familie Urlaub in Berlin gemacht.'] },
            { pointTag: 'Punkt 2 · Wetter', hint: 'waren + war + spazieren gegangen', keywords: ['vier Tage', 'Wetter', 'schön', 'deshalb', 'spazieren gehen'], vi: 'Chúng tôi đã ở Berlin bốn ngày, và trong thời gian đó thời tiết rất đẹp nên chúng tôi đã đi dạo nhiều.', answers: ['Wir waren vier Tage in Berlin. Das Wetter war sehr schön, deshalb sind wir dort viel spazieren gegangen.'] },
            { pointTag: 'Punkt 1 · Fahrt', hint: 'Perfekt mit sein: gefahren', keywords: ['mit dem Zug', 'fahren', 'kein Auto', 'dauern', 'drei Stunden'], vi: 'Chúng tôi đã đi đến Berlin bằng tàu hỏa vì chúng tôi không có ô tô, và chuyến đi mất ba giờ.', answers: ['Wir sind mit dem Zug nach Berlin gefahren, denn wir haben kein Auto. Die Fahrt hat drei Stunden gedauert.'] },
            { pointTag: 'Punkt 2 · Aktivität', hint: 'Perfekt: besichtigt / gemacht', keywords: ['am ersten Tag', 'Stadt', 'besichtigen', 'Fotos machen'], vi: 'Ngày đầu tiên chúng tôi đã tham quan thành phố và chụp nhiều ảnh.', answers: ['Am ersten Tag haben wir die Stadt besichtigt und viele Fotos gemacht.'] },
            { pointTag: 'Punkt 2 · Aktivität', hint: 'hat geregnet + deshalb', keywords: ['Dienstag', 'regnen', 'deshalb', 'Museum', 'gehen'], vi: 'Hôm thứ Ba trời mưa, vì vậy chúng tôi đã đi bảo tàng.', answers: ['Am Dienstag hat es geregnet, deshalb sind wir ins Museum gegangen.'] },
            { pointTag: 'Punkt 2 · Essen', hint: 'Perfekt: gegessen + war', keywords: ['am Abend', 'kleines Restaurant', 'in der Nähe', 'lecker'], vi: 'Vào buổi tối, chúng tôi đã ăn tại một nhà hàng nhỏ gần khách sạn, và đồ ăn ở đó rất ngon.', answers: ['Am Abend haben wir in einem kleinen Restaurant in der Nähe vom Hotel gegessen und das Essen war dort sehr lecker.'] },
            { pointTag: 'Punkt 3 · Meinung', hint: 'hat mir gut gefallen', keywords: ['Reise', 'gefallen', 'denn', 'interessante Orte'], vi: 'Tôi rất thích chuyến đi vì Berlin có nhiều địa điểm thú vị.', answers: ['Die Reise hat mir sehr gut gefallen, denn Berlin hat viele interessante Orte.'] },
            { pointTag: 'Punkt 4 · Treffen', hint: 'Hast du … Zeit?', keywords: ['Samstag', 'Zeit haben', 'treffen', 'Fotos zeigen'], vi: 'Thứ Bảy bạn có thời gian không? Tôi muốn gặp bạn và cho bạn xem ảnh.', answers: ['Hast du am Samstag Zeit? Ich möchte dich treffen und dir die Fotos zeigen.'] }
          ],
          muster: 'Liebe Katharina,\n\nletzte Woche habe ich mit meiner Familie Urlaub in Berlin gemacht. Wir waren vier Tage dort und haben die Stadt besichtigt und viele Fotos gemacht. Die Reise hat mir sehr gut gefallen, denn Berlin hat viele interessante Orte.\n\nHast du am Samstag Zeit? Ich möchte dich treffen und dir die Fotos zeigen!\n\nViele Grüße\n[Dein Name]'
        },
        {
          title: 'Postkarte aus Hamburg', theme: 'Urlaub & Reisen', register: 'informell (du)',
          scenario: 'Du bist seit zwei Tagen in Hamburg und machst dort Urlaub. Dein Freund Thomas wartet auf eine Nachricht von dir. Schreibe ihm eine Postkarte.',
          points: ['Sage, wo du bist und wie das Wetter ist.', 'Erzähle, was du gestern gemacht hast.', 'Schreibe, was du morgen machen möchtest.'],
          analysis: ['Wo bist du gerade?', 'Was erzählst du im Perfekt (gestern) und was im Präsens (morgen)?', 'Anrede und Gruß für Thomas?'],
          anrede: 'Lieber Thomas,', gruss: 'Liebe Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Ort', hint: 'vor zwei Tagen + Perfekt', keywords: ['vor zwei Tagen', 'Hamburg', 'ankommen', 'Urlaub machen'], vi: 'Tôi đã đến Hamburg cách đây hai ngày và hiện đang nghỉ ở đây.', answers: ['Ich bin vor zwei Tagen in Hamburg angekommen und mache hier Urlaub.', 'Ich bin vor zwei Tagen nach Hamburg gefahren und mache hier Urlaub.'] },
            { pointTag: 'Punkt 1 · Wetter', hint: 'war + deshalb', keywords: ['gestern', 'Wetter', 'Hafen', 'spazieren gehen', 'Schiffe'], vi: 'Hôm qua thời tiết rất đẹp, vì vậy tôi đã đi dạo ở cảng và ngắm những con tàu lớn.', answers: ['Gestern war das Wetter sehr schön, deshalb bin ich am Hafen spazieren gegangen und habe die großen Schiffe gesehen.'] },
            { pointTag: 'Punkt 2 · Gestern', hint: 'Perfekt mit sein + haben', keywords: ['eine Stunde', 'Schiff / Boot', 'fahren', 'Fotos machen'], vi: 'Hôm qua tôi đã đi thuyền trên sông trong một giờ và chụp rất nhiều ảnh cho gia đình.', answers: ['Gestern bin ich eine Stunde mit dem Schiff gefahren und habe viele Fotos für meine Familie gemacht.', 'Gestern bin ich eine Stunde mit dem Boot gefahren und habe viele Fotos für meine Familie gemacht.'] },
            { pointTag: 'Punkt 2 · Gestern', hint: 'Perfekt: gegessen', keywords: ['am Abend', 'Fisch', 'Restaurant', 'Hotel', 'essen'], vi: 'Buổi tối tôi đã ăn cá ở một nhà hàng nhỏ gần khách sạn.', answers: ['Am Abend habe ich in einem kleinen Restaurant beim Hotel Fisch gegessen.'] },
            { pointTag: 'Punkt 2 · Gefühl', hint: 'war + hatte', keywords: ['gestern', 'müde', 'aber', 'toller Tag'], vi: 'Hôm qua tôi đã rất mệt, nhưng tôi đã có một ngày tuyệt vời.', answers: ['Gestern war ich sehr müde, aber ich hatte einen tollen Tag.'] },
            { pointTag: 'Punkt 1 · Wetter', hint: 'Heute Morgen + Perfekt', keywords: ['heute Morgen', 'regnen', 'deshalb', 'Buch lesen'], vi: 'Sáng nay trời mưa, vì vậy tôi đã ở khách sạn và đọc sách.', answers: ['Heute Morgen hat es geregnet, deshalb war ich im Hotel und habe ein Buch gelesen.'] },
            { pointTag: 'Punkt 3 · Morgen', hint: 'möchte + Infinitiv', keywords: ['morgen', 'Museum', 'danach', 'Geschenke kaufen'], vi: 'Ngày mai tôi muốn đi bảo tàng và sau đó mua vài món quà.', answers: ['Morgen möchte ich ins Museum gehen und danach ein paar Geschenke kaufen.'] },
            { pointTag: 'Schluss', hint: 'Am Sonntag …', keywords: ['Sonntag', 'zurückfahren', 'erzählen', 'Reise'], vi: 'Tôi sẽ trở về vào Chủ nhật và sau đó tôi sẽ kể cho bạn nghe về chuyến đi.', answers: ['Am Sonntag fahre ich zurück und erzähle dir dann von meiner Reise.'] }
          ],
          muster: 'Lieber Thomas,\n\nich bin vor zwei Tagen in Hamburg angekommen und mache hier Urlaub. Gestern war das Wetter schön, deshalb bin ich am Hafen spazieren gegangen und mit dem Schiff gefahren. Heute Morgen hat es geregnet.\n\nMorgen möchte ich ins Museum gehen und ein paar Geschenke kaufen. Am Sonntag fahre ich zurück!\n\nLiebe Grüße\n[Dein Name]'
        },
        {
          title: 'Informationen in Lübeck', theme: 'Urlaub & Reisen', register: 'formell (Sie)',
          scenario: 'Du möchtest im Sommer einige Tage nach Lübeck fahren. Du kennst die Stadt noch nicht und suchst eine günstige Unterkunft. Schreibe an die Touristeninformation Lübeck.',
          points: ['Sage, wann du nach Lübeck reisen möchtest.', 'Bitte um Informationen zu Sehenswürdigkeiten.', 'Frage nach einer Jugendherberge.'],
          analysis: ['An welche Institution schreibst du? (Welche Anrede?)', 'Wann fährst du nach Lübeck?', 'Welche 2 Dinge bittest du um Informationen?'],
          anrede: 'Sehr geehrte Damen und Herren,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Reisezeit', hint: 'Im Sommer + möchte', keywords: ['im Sommer', 'Freund / Freundin', 'Lübeck', 'fahren'], vi: 'Mùa hè này tôi muốn đi Lübeck cùng một người bạn.', answers: ['Im Sommer möchte ich mit einem Freund nach Lübeck fahren.', 'Im Sommer möchte ich mit einer Freundin nach Lübeck fahren.', 'Diesen Sommer möchte ich mit einem Freund nach Lübeck fahren.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'noch nie + deshalb', keywords: ['noch nie', 'Lübeck', 'deshalb', 'Informationen brauchen'], vi: 'Chúng tôi chưa từng đến Lübeck, vì vậy chúng tôi cần thông tin về thành phố.', answers: ['Wir waren noch nie in Lübeck, deshalb brauchen wir Informationen über die Stadt.'] },
            { pointTag: 'Punkt 1 · Dauer', hint: 'möchten + besichtigen', keywords: ['drei Tage', 'bleiben', 'Sehenswürdigkeiten', 'besichtigen'], vi: 'Chúng tôi muốn ở lại ba ngày và tham quan những địa điểm nổi tiếng.', answers: ['Wir möchten drei Tage bleiben und die bekannten Sehenswürdigkeiten besichtigen.'] },
            { pointTag: 'Punkt 2 · Bitte', hint: 'Können Sie mir bitte …?', keywords: ['Informationen', 'Sehenswürdigkeiten', 'schicken'], vi: 'Quý vị có thể vui lòng gửi cho tôi thông tin về các địa điểm tham quan ở Lübeck không?', answers: ['Können Sie mir bitte Informationen über die Sehenswürdigkeiten in Lübeck schicken?'] },
            { pointTag: 'Punkt 2 · Extra', hint: 'denn + nicht kennen', keywords: ['Stadtplan', 'brauchen', 'denn', 'Stadt kennen'], vi: 'Tôi cũng cần một bản đồ thành phố vì tôi chưa biết nơi này.', answers: ['Ich brauche auch einen Stadtplan, denn ich kenne die Stadt nicht.'] },
            { pointTag: 'Punkt 3 · Unterkunft', hint: 'deshalb + übernachten', keywords: ['nicht viel Geld', 'deshalb', 'Jugendherberge', 'übernachten'], vi: 'Chúng tôi không có nhiều tiền, vì vậy chúng tôi muốn ở nhà nghỉ thanh niên.', answers: ['Wir haben nicht viel Geld, deshalb möchten wir in einer Jugendherberge übernachten.'] },
            { pointTag: 'Punkt 3 · Frage', hint: 'Adresse und Preis', keywords: ['Adresse', 'Preis', 'Zimmer', 'sagen'], vi: 'Quý vị có thể vui lòng cho tôi biết địa chỉ và giá phòng không?', answers: ['Können Sie mir bitte die Adresse und den Preis für ein Zimmer sagen?'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank im Voraus', keywords: ['im Voraus', 'Hilfe', 'sich freuen auf', 'Antwort'], vi: 'Xin cảm ơn quý vị trước vì đã giúp đỡ; tôi mong nhận được câu trả lời.', answers: ['Vielen Dank im Voraus für Ihre Hilfe. Ich freue mich auf Ihre Antwort.'] }
          ],
          muster: 'Sehr geehrte Damen und Herren,\n\nim Sommer möchte ich drei Tage nach Lübeck fahren. Können Sie mir bitte Informationen über die Sehenswürdigkeiten und einen Stadtplan schicken?\n\nWir möchten gern in einer Jugendherberge übernachten. Können Sie mir bitte die Adresse und den Preis sagen?\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Verabredung im Museum', theme: 'Freizeit', register: 'informell (du)',
          scenario: 'Du möchtest am Samstag mit deinem Freund Tom ins Museum gehen und danach einen Kaffee trinken. Schreibe Tom eine Nachricht.',
          points: ['Schlage einen Tag und eine Uhrzeit vor.', 'Sage, was ihr zusammen machen könnt.', 'Frage, ob Tom Zeit hat und mitkommen möchte.'],
          analysis: ['Wen lädst du ein (du/Sie)?', 'Wann und wo wollt ihr euch treffen?', 'Welcher Plan für danach passt?'],
          anrede: 'Lieber Tom,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Plan', hint: 'Am Samstag + möchte', keywords: ['Samstag', 'Museum', 'danach', 'Kaffee trinken'], vi: 'Thứ Bảy này tôi muốn đi bảo tàng và sau đó uống cà phê.', answers: ['Am Samstag möchte ich ins Museum gehen und danach einen Kaffee trinken.'] },
            { pointTag: 'Punkt 1 · Grund', hint: 'Perfekt + deshalb', keywords: ['letzte Woche', 'viel arbeiten', 'Wochenende', 'sich ausruhen'], vi: 'Tuần trước tôi đã đi làm rất nhiều, vì vậy cuối tuần này tôi muốn nghỉ ngơi.', answers: ['Letzte Woche habe ich viel gearbeitet, deshalb möchte ich mich am Wochenende ausruhen.'] },
            { pointTag: 'Punkt 2 · Info', hint: 'im Internet nachgesehen', keywords: ['Internet', 'nachsehen', 'Museum', 'bis 18 Uhr geöffnet'], vi: 'Tôi đã xem thông tin trên mạng và bảo tàng mở cửa đến 18 giờ.', answers: ['Ich habe im Internet nachgesehen und das Museum ist bis 18 Uhr geöffnet.'] },
            { pointTag: 'Punkt 1 · Zeit', hint: 'um 15 Uhr vor dem Museum', keywords: ['15 Uhr', 'vor dem Museum', 'treffen', 'Eintrittskarten kaufen'], vi: 'Tôi muốn gặp bạn lúc 15 giờ trước cửa bảo tàng để chúng ta có thể cùng nhau mua vé vào cửa.', answers: ['Ich möchte dich um 15 Uhr vor dem Museum treffen. Dann können wir zusammen die Eintrittskarten kaufen.'] },
            { pointTag: 'Punkt 2 · Danach', hint: 'Nach dem Museumsbesuch …', keywords: ['Museumsbesuch', 'Café', 'in der Nähe'], vi: 'Sau khi tham quan, chúng ta có thể đến quán cà phê gần đó.', answers: ['Nach dem Museumsbesuch können wir in das Café in der Nähe gehen.'] },
            { pointTag: 'Punkt 2 · Extra', hint: 'Perfekt + war', keywords: ['letztes Mal', 'dort', 'Kaffee trinken', 'sehr gut'], vi: 'Lần trước chúng ta đã uống cà phê ở đó và cà phê rất ngon.', answers: ['Letztes Mal haben wir dort Kaffee getrunken und der Kaffee war sehr gut.'] },
            { pointTag: 'Punkt 3 · Frage', hint: 'Hast du … und möchtest du …?', keywords: ['Samstag', 'Zeit haben', 'mitkommen'], vi: 'Bạn có thời gian vào thứ Bảy không, và bạn có muốn đi cùng tôi không?', answers: ['Hast du am Samstag Zeit und möchtest du mitkommen?'] },
            { pointTag: 'Punkt 3 · Alternative', hint: 'Wenn … / Dann …', keywords: ['keine Zeit', 'auch', 'Sonntag', 'gehen'], vi: 'Nếu bạn không có thời gian vào thứ Bảy, chúng ta cũng có thể đi vào Chủ nhật.', answers: ['Wenn du am Samstag keine Zeit hast, können wir auch am Sonntag gehen.', 'Du hast am Samstag keine Zeit? Dann können wir auch am Sonntag gehen.'] }
          ],
          muster: 'Lieber Tom,\n\nam Samstag möchte ich um 15 Uhr ins Museum gehen und danach im Café einen Kaffee trinken. Wir können uns vor dem Museum treffen und zusammen die Eintrittskarten kaufen.\n\nHast du am Samstag Zeit und möchtest du mitkommen? Sonst können wir auch am Sonntag gehen.\n\nViele Grüße\n[Dein Name]'
        },
        {
          title: 'Geburtstagseinladung', theme: 'Fest & Freunde', register: 'informell (ihr)',
          scenario: 'Du hast am Sonntag Geburtstag und möchtest zu Hause feiern. Du möchtest deine Freunde Lena und Paul einladen. Schreibe ihnen eine E-Mail.',
          points: ['Erkläre, warum du eine Party machst.', 'Sage, wann und wo die Party stattfindet.', 'Schreibe, wer noch kommt oder was die Gäste mitbringen sollen.'],
          analysis: ['Du schreibst an ZWEI Freunde: Nutze „ihr / euch“!', 'Wann und wo findet die Party statt?', 'Was sollen Lena und Paul mitbringen?'],
          anrede: 'Liebe Lena, lieber Paul,', gruss: 'Liebe Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Anlass', hint: 'Geburtstag haben', keywords: ['Sonntag', 'Geburtstag', 'zu Hause', 'Party machen'], vi: 'Chủ nhật này là sinh nhật tôi và tôi muốn tổ chức tiệc tại nhà.', answers: ['Am Sonntag habe ich Geburtstag und möchte zu Hause eine Party machen.'] },
            { pointTag: 'Punkt 1 · Vergleich', hint: 'Letztes Jahr (Perfekt)', keywords: ['letztes Jahr', 'Restaurant', 'feiern', 'dieses Jahr', 'zu Hause'], vi: 'Năm ngoái tôi đã tổ chức tiệc ở nhà hàng, nhưng năm nay tôi muốn ở nhà.', answers: ['Letztes Jahr habe ich im Restaurant gefeiert, aber dieses Jahr möchte ich zu Hause feiern.'] },
            { pointTag: 'Punkt 2 · Zeit & Ort', hint: 'beginnt um … und endet …', keywords: ['Geburtstagsparty', '17 Uhr', 'zu Hause', 'enden', '21 Uhr'], vi: 'Buổi tiệc sinh nhật của tôi bắt đầu lúc 17 giờ tại nhà và sẽ kết thúc vào khoảng 21 giờ tối.', answers: ['Meine Geburtstagsparty beginnt um 17 Uhr bei mir zu Hause und endet am Abend gegen 21 Uhr.'] },
            { pointTag: 'Punkt 3 · Gäste', hint: 'Perfekt: eingeladen', keywords: ['Anna und Max', 'einladen', 'die beiden', 'auch kommen'], vi: 'Tôi đã mời Anna và Max, và hai bạn ấy cũng sẽ đến.', answers: ['Ich habe Anna und Max eingeladen und die beiden kommen auch.'] },
            { pointTag: 'Punkt 3 · Essen', hint: 'Perfekt: gekauft', keywords: ['gestern', 'Getränke', 'Geburtstagskuchen', 'brauchen', 'Obst'], vi: 'Hôm qua tôi đã mua nước uống và một chiếc bánh sinh nhật lớn, nhưng tôi vẫn cần thêm một ít trái cây.', answers: ['Gestern habe ich Getränke und einen großen Geburtstagskuchen gekauft, aber ich brauche noch etwas Obst.'] },
            { pointTag: 'Punkt 3 · Bitte', hint: 'ihr-Form: Könnt ihr …?', keywords: ['können', 'ihr', 'Brot', 'Obst', 'mitbringen'], vi: 'Hai bạn có thể mang theo một ít bánh mì hoặc trái cây không?', answers: ['Könnt ihr bitte etwas Brot oder Obst mitbringen?'] },
            { pointTag: 'Schluss', hint: 'ihr / euch', keywords: ['Sonntag', 'Zeit haben', 'euch', 'sehen'], vi: 'Chủ nhật hai bạn có thời gian không? Tôi rất muốn gặp hai bạn.', answers: ['Habt ihr am Sonntag Zeit? Ich möchte euch sehr gern sehen.'] },
            { pointTag: 'Schluss', hint: 'Hoffentlich könnt ihr …', keywords: ['sich freuen auf', 'hoffentlich', 'kommen'], vi: 'Tôi rất mong chờ buổi tiệc. Hy vọng hai bạn có thể đến.', answers: ['Ich freue mich auf die Party. Hoffentlich könnt ihr kommen.'] }
          ],
          muster: 'Liebe Lena, lieber Paul,\n\nam Sonntag habe ich Geburtstag und möchte zu Hause eine Party machen. Die Party beginnt um 17 Uhr bei mir zu Hause. Anna und Max kommen auch.\n\nIch habe schon Getränke und Kuchen gekauft. Könnt ihr bitte etwas Brot oder Obst mitbringen? Habt ihr Zeit?\n\nLiebe Grüße\n[Dein Name]'
        },
        {
          title: 'Nachbarin einladen', theme: 'Wohnen', register: 'halbformell (Sie)',
          scenario: 'Du wohnst seit drei Wochen in einem neuen Haus. Am Samstag möchtest du eine kleine Einweihungsfeier machen und deine Nachbarin Frau Kowalski einladen. Schreibe ihr eine E-Mail. (Du heißt Sophie. Früher hast du in Dresden gewohnt, jetzt wohnst du im zweiten Stock in Leipzig.)',
          points: ['Stelle dich kurz vor.', 'Erkläre, warum und wann du feierst.', 'Lade Frau Kowalski ein und bitte um eine Antwort.'],
          analysis: ['Wie sprichst du deine Nachbarin Frau Kowalski an (Sie)?', 'Welche Infos zur Vorstellung stehen in der Aufgabe?', 'Bis wann bittest du um Antwort?'],
          anrede: 'Sehr geehrte Frau Kowalski,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Vorstellung', hint: 'Ihre neue Nachbarin', keywords: ['Name', 'Sophie', 'Ihre', 'neue Nachbarin'], vi: 'Tôi tên là Sophie và tôi là người hàng xóm mới của bà.', answers: ['Mein Name ist Sophie und ich bin Ihre neue Nachbarin.'] },
            { pointTag: 'Punkt 1 · Vorstellung', hint: 'Perfekt mit sein: gezogen', keywords: ['vor drei Wochen', 'Haus', 'ziehen', 'zweiter Stock'], vi: 'Tôi đã chuyển đến ngôi nhà này ba tuần trước và hiện đang sống ở tầng hai.', answers: ['Ich bin vor drei Wochen in dieses Haus gezogen und wohne jetzt im zweiten Stock.'] },
            { pointTag: 'Punkt 1 · Herkunft', hint: 'Perfekt: gewohnt', keywords: ['früher', 'Dresden', 'wohnen', 'jetzt', 'Leipzig'], vi: 'Trước đây tôi đã sống ở Dresden, nhưng bây giờ tôi sống ở Leipzig.', answers: ['Früher habe ich in Dresden gewohnt, aber jetzt wohne ich in Leipzig.'] },
            { pointTag: 'Punkt 2 · Anlass', hint: 'denn + kennenlernen', keywords: ['Samstag', 'Einweihungsparty', 'denn', 'Nachbarn kennenlernen'], vi: 'Thứ Bảy tôi tổ chức một buổi tiệc tân gia nhỏ vì tôi muốn làm quen với hàng xóm.', answers: ['Am Samstag mache ich eine kleine Einweihungsparty, denn ich möchte meine Nachbarn kennenlernen.'] },
            { pointTag: 'Punkt 2 · Zeit & Ort', hint: 'stattfinden', keywords: ['Party', '18 Uhr', 'beginnen', 'Wohnung', 'stattfinden'], vi: 'Buổi tiệc bắt đầu lúc 18 giờ và diễn ra tại căn hộ của tôi.', answers: ['Die Party beginnt um 18 Uhr und findet in meiner Wohnung statt.'] },
            { pointTag: 'Punkt 3 · Einladung', hint: 'deshalb + nichts mitbringen', keywords: ['Kuchen', 'Getränke', 'kaufen', 'deshalb', 'nichts mitbringen'], vi: 'Tôi đã mua bánh và nước uống, vì vậy bà không cần mang theo gì.', answers: ['Ich habe Kuchen und Getränke gekauft, deshalb müssen Sie nichts mitbringen.'] },
            { pointTag: 'Punkt 3 · Einladung', hint: 'Sie-Form: Haben Sie …?', keywords: ['Samstag', 'Zeit haben', 'Sie', 'einladen'], vi: 'Bà có thời gian vào thứ Bảy không? Tôi rất muốn mời bà đến.', answers: ['Haben Sie am Samstag Zeit? Ich möchte Sie gern einladen.'] },
            { pointTag: 'Punkt 3 · Antwort', hint: 'bis Freitag antworten', keywords: ['können', 'bitte', 'bis Freitag', 'antworten'], vi: 'Bà có thể vui lòng trả lời tôi trước thứ Sáu không?', answers: ['Können Sie mir bitte bis Freitag antworten?'] }
          ],
          muster: 'Sehr geehrte Frau Kowalski,\n\nmein Name ist Sophie und ich bin Ihre neue Nachbarin im zweiten Stock. Am Samstag mache ich um 18 Uhr eine kleine Einweihungsparty in meiner Wohnung, denn ich möchte meine Nachbarn kennenlernen.\n\nHaben Sie am Samstag Zeit? Ich möchte Sie gern einladen. Können Sie mir bitte bis Freitag antworten?\n\nMit freundlichen Grüßen\nSophie'
        },
        {
          title: 'A2-Kurs anfragen', theme: 'Kurs & Arbeit', register: 'formell (Sie)',
          scenario: 'Du hast den A1-Deutschkurs beendet und möchtest jetzt einen A2-Kurs besuchen. Auf der Webseite einer Sprachschule fehlen dir einige Informationen. Schreibe der Sprachschule eine E-Mail.',
          points: ['Erkläre, warum du schreibst.', 'Bitte um Informationen zu Beginn und Unterrichtszeiten.', 'Frage nach dem Kurspreis.'],
          analysis: ['Schreibst du an eine Firma/Schule (Sehr geehrte Damen und Herren)?', 'Welche Infos fehlen dir (Beginn, Zeiten, Preis)?', 'Wann kannst du lernen (Abend)?'],
          anrede: 'Sehr geehrte Damen und Herren,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Anlass', hint: 'Perfekt: beendet', keywords: ['A1-Kurs', 'beenden', 'jetzt', 'A2-Kurs', 'besuchen'], vi: 'Tôi đã học xong khóa A1 và bây giờ muốn học tiếp A2.', answers: ['Ich habe den A1-Kurs beendet und möchte jetzt einen A2-Kurs besuchen.'] },
            { pointTag: 'Punkt 1 · Hintergrund', hint: 'Perfekt + war', keywords: ['sechs Monate', 'Deutsch lernen', 'letzter Kurs', 'interessant'], vi: 'Tôi đã học tiếng Đức được sáu tháng và khóa học vừa rồi rất thú vị.', answers: ['Ich habe sechs Monate Deutsch gelernt und der letzte Kurs war sehr interessant.'] },
            { pointTag: 'Punkt 2 · Zeit', hint: 'Früher hatte ich …', keywords: ['früher', 'wenig Zeit', 'jetzt', 'am Abend', 'lernen'], vi: 'Trước đây tôi không có nhiều thời gian, nhưng bây giờ tôi có thể học buổi tối.', answers: ['Früher hatte ich wenig Zeit, aber jetzt kann ich am Abend lernen.', 'Früher hatte ich nicht viel Zeit, aber jetzt kann ich am Abend lernen.'] },
            { pointTag: 'Punkt 2 · Frage', hint: 'Haben Sie … und wann …?', keywords: ['A2-Kurs', 'am Abend', 'wann', 'beginnen'], vi: 'Quý vị có khóa A2 vào buổi tối không, và khóa học bắt đầu khi nào?', answers: ['Haben Sie einen A2-Kurs am Abend und wann beginnt der Kurs?'] },
            { pointTag: 'Punkt 2 · Wunsch', hint: 'denn + tagsüber', keywords: ['zweimal pro Woche', 'lernen', 'denn', 'tagsüber arbeiten'], vi: 'Tôi muốn học hai buổi mỗi tuần vì ban ngày tôi phải đi làm.', answers: ['Ich möchte zweimal pro Woche lernen, denn tagsüber muss ich arbeiten.'] },
            { pointTag: 'Punkt 2 · Bitte', hint: 'Können Sie mir bitte …?', keywords: ['Stundenplan', 'per E-Mail', 'schicken'], vi: 'Quý vị có thể vui lòng gửi cho tôi lịch học qua email không?', answers: ['Können Sie mir bitte den Stundenplan per E-Mail schicken?'] },
            { pointTag: 'Punkt 3 · Preis', hint: 'Wie lange … wie viel …?', keywords: ['wissen', 'wie lange dauern', 'wie viel kosten'], vi: 'Tôi cũng muốn biết khóa học kéo dài bao lâu và học phí là bao nhiêu.', answers: ['Ich möchte auch wissen: Wie lange dauert der Kurs und wie viel kostet er?'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank …', keywords: ['Hilfe', 'sich freuen auf', 'Antwort'], vi: 'Xin cảm ơn quý vị đã giúp đỡ; tôi mong sớm nhận được câu trả lời.', answers: ['Vielen Dank für Ihre Hilfe. Ich freue mich auf Ihre Antwort.'] }
          ],
          muster: 'Sehr geehrte Damen und Herren,\n\nich habe den A1-Kurs beendet und möchte jetzt einen A2-Kurs besuchen. Haben Sie einen A2-Kurs am Abend und wann beginnt der Kurs?\n\nKönnen Sie mir bitte den Stundenplan per E-Mail schicken? Ich möchte auch wissen, wie viel der Kurs kostet.\n\nVielen Dank für Ihre Hilfe.\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Geburtstag im Büro', theme: 'Kurs & Arbeit', register: 'halbformell (Sie)',
          scenario: 'Dein Kollege Herr Wagner hat dich für Montag um 15 Uhr zu einer kleinen Geburtstagsfeier im Büro eingeladen. Du hast bis 16 Uhr einen wichtigen Termin und kommst später. Schreibe Herrn Wagner eine E-Mail.',
          points: ['Bedanke dich für die Einladung.', 'Sage, dass du später kommst, und erkläre warum.', 'Frage, ob du bei der Vorbereitung helfen kannst.'],
          analysis: ['Wie sprichst du Herrn Wagner an?', 'Um wie viel Uhr kannst du erst kommen?', 'Wie bietest du deine Hilfe an?'],
          anrede: 'Sehr geehrter Herr Wagner,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Dank', hint: 'Vielen Dank für Ihre …', keywords: ['Vielen Dank', 'Einladung', 'Geburtstagsfeier', 'Montag', 'Büro'], vi: 'Cảm ơn ông đã mời tôi đến dự sinh nhật ở văn phòng vào thứ Hai.', answers: ['Vielen Dank für Ihre Einladung zur Geburtstagsfeier am Montag im Büro.'] },
            { pointTag: 'Punkt 2 · Termin', hint: 'aber + um 15 Uhr', keywords: ['gern kommen', 'aber', '15 Uhr', 'Termin haben'], vi: 'Tôi rất muốn đến, nhưng lúc 15 giờ tôi có một cuộc hẹn.', answers: ['Ich möchte gern kommen, aber um 15 Uhr habe ich einen Termin.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'Perfekt + deshalb', keywords: ['letzte Woche', 'Termin machen', 'deshalb', 'nicht absagen'], vi: 'Cuộc hẹn này đã được đặt từ tuần trước nên tôi không thể hủy.', answers: ['Ich habe diesen Termin letzte Woche gemacht, deshalb kann ich ihn nicht absagen.', 'Ich habe den Termin letzte Woche vereinbart, deshalb kann ich ihn nicht absagen.'] },
            { pointTag: 'Punkt 2 · Dauer', hint: 'dauern bis …', keywords: ['Termin', 'dauern', 'bis 16 Uhr'], vi: 'Cuộc hẹn kéo dài đến 16 giờ.', answers: ['Der Termin dauert bis 16 Uhr.'] },
            { pointTag: 'Punkt 2 · Später', hint: 'erst um 16 Uhr + deshalb', keywords: ['erst', '16 Uhr', 'deshalb', 'etwas später'], vi: 'Tôi chỉ có thể đến lúc 16 giờ, vì vậy tôi sẽ đến muộn một chút.', answers: ['Ich kann erst um 16 Uhr kommen, deshalb komme ich etwas später.'] },
            { pointTag: 'Punkt 1 · Geschenk', hint: 'Perfekt + mitbringen', keywords: ['kleines Geschenk', 'für Sie', 'kaufen', 'ins Büro mitbringen'], vi: 'Tôi đã mua một món quà nhỏ cho ông và sẽ mang đến văn phòng.', answers: ['Ich habe ein kleines Geschenk für Sie gekauft und bringe es ins Büro mit.'] },
            { pointTag: 'Punkt 3 · Hilfe', hint: 'Kann ich Ihnen … helfen?', keywords: ['helfen', 'Tisch decken', 'Getränke kaufen'], vi: 'Tôi có thể giúp ông chuẩn bị bàn hoặc mua nước uống không?', answers: ['Kann ich Ihnen beim Vorbereiten helfen? Ich kann den Tisch decken oder Getränke kaufen.', 'Kann ich Ihnen helfen und den Tisch decken oder Getränke kaufen?'] },
            { pointTag: 'Schluss', hint: 'wünschen + Dat.', keywords: ['schöner Geburtstag', 'sich freuen auf', 'Feier'], vi: 'Tôi chúc ông sinh nhật vui vẻ và mong được gặp ông tại văn phòng vào thứ Hai.', answers: ['Ich wünsche Ihnen einen schönen Geburtstag und freue mich auf die Feier am Montag im Büro.'] }
          ],
          muster: 'Sehr geehrter Herr Wagner,\n\nvielen Dank für Ihre Einladung zur Geburtstagsfeier am Montag im Büro. Ich möchte gern kommen, aber um 15 Uhr habe ich noch einen Termin. Deshalb komme ich erst um 16 Uhr.\n\nKann ich Ihnen helfen und Getränke kaufen? Ich wünsche Ihnen einen schönen Geburtstag!\n\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Krank bei der Arbeit', theme: 'Kurs & Arbeit', register: 'halbformell (Sie)',
          scenario: 'Du arbeitest in einem Büro. Heute bist du krank und kannst morgen nicht zur Arbeit kommen. Deine Kollegin Frau Maier kann dir helfen. Schreibe ihr eine E-Mail.',
          points: ['Erkläre, warum du nicht zur Arbeit kommen kannst.', 'Sage, wann du wahrscheinlich wiederkommst.', 'Bitte Frau Maier, eine Aufgabe für dich zu übernehmen.'],
          analysis: ['Welche Anrede passt für Kollegin Frau Maier (Sie)?', 'Wann bist du voraussichtlich wieder gesund?', 'Worum bittest du Frau Maier konkret?'],
          anrede: 'Sehr geehrte Frau Maier,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Absage', hint: 'denn + Modalverb', keywords: ['schreiben', 'Ihnen', 'morgen', 'nicht zur Arbeit kommen'], vi: 'Tôi viết thư vì ngày mai tôi không thể đi làm.', answers: ['Ich schreibe Ihnen, denn ich kann morgen nicht zur Arbeit kommen.'] },
            { pointTag: 'Punkt 1 · Grund', hint: 'hatte + Perfekt + deshalb', keywords: ['gestern', 'starke Kopfschmerzen', 'Fieber bekommen', 'deshalb'], vi: 'Hôm qua tôi đã bị đau đầu rất nhiều, và sáng nay tôi còn bị sốt nên không thể đi làm.', answers: ['Gestern hatte ich starke Kopfschmerzen und heute Morgen habe ich auch Fieber bekommen. Deshalb kann ich nicht arbeiten.'] },
            { pointTag: 'Punkt 1 · Arzt', hint: 'war beim Arzt', keywords: ['heute Morgen', 'Arzt', 'zwei Tage', 'zu Hause bleiben'], vi: 'Sáng nay tôi đã đi khám bác sĩ và tôi phải ở nhà hai ngày.', answers: ['Heute Morgen war ich beim Arzt und muss zwei Tage zu Hause bleiben.'] },
            { pointTag: 'Punkt 1 · Extra', hint: 'Perfekt + sich ausruhen', keywords: ['letzte Woche', 'viel arbeiten', 'spät nach Hause', 'sich ausruhen'], vi: 'Tuần trước tôi đã làm việc rất nhiều và thường về nhà muộn, nhưng bây giờ tôi phải nghỉ ngơi vài ngày.', answers: ['Letzte Woche habe ich sehr viel gearbeitet und bin oft spät nach Hause gekommen, aber jetzt muss ich mich ein paar Tage ausruhen.'] },
            { pointTag: 'Punkt 2 · Rückkehr', hint: 'Am Donnerstag …', keywords: ['Donnerstag', 'hoffentlich', 'wieder gesund', 'arbeiten'], vi: 'Hy vọng thứ Năm tôi khỏe lại. Khi đó tôi có thể trở lại làm việc.', answers: ['Am Donnerstag bin ich hoffentlich wieder gesund. Dann kann ich wieder arbeiten.'] },
            { pointTag: 'Punkt 3 · Bitte', hint: 'Können Sie bitte …?', keywords: ['Unterlagen', 'Besprechung', 'für mich', 'vorbereiten'], vi: 'Bà có thể vui lòng chuẩn bị giúp tôi các tài liệu cho cuộc họp không?', answers: ['Können Sie bitte die Unterlagen für die Besprechung für mich vorbereiten?'] },
            { pointTag: 'Punkt 3 · Info', hint: 'Perfekt: vorbereitet / gelegt', keywords: ['gestern', 'Teil', 'Unterlagen', 'auf den Tisch legen'], vi: 'Hôm qua tôi đã chuẩn bị một phần tài liệu và đã để chúng trên bàn.', answers: ['Gestern habe ich schon einen Teil der Unterlagen vorbereitet und auf den Tisch gelegt.'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank …', keywords: ['Hilfe', 'wünschen', 'schöner Arbeitstag'], vi: 'Cảm ơn bà đã giúp đỡ và chúc bà một ngày làm việc tốt lành.', answers: ['Vielen Dank für Ihre Hilfe. Ich wünsche Ihnen einen schönen Arbeitstag.'] }
          ],
          muster: 'Sehr geehrte Frau Maier,\n\nich schreibe Ihnen, denn ich kann morgen nicht zur Arbeit kommen. Ich habe Fieber und muss zwei Tage zu Hause bleiben. Am Donnerstag bin ich hoffentlich wieder gesund.\n\nKönnen Sie bitte die Unterlagen für die Besprechung für mich vorbereiten? Vielen Dank für Ihre Hilfe!\n\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Wohnung besichtigen', theme: 'Wohnen', register: 'formell (Sie)',
          scenario: 'Du hast im Internet eine Anzeige für eine Zwei-Zimmer-Wohnung in Leipzig gefunden. Du suchst eine neue Wohnung und möchtest sie ansehen. Schreibe an den Vermieter Herrn Krüger.',
          points: ['Erkläre, warum du schreibst.', 'Frage nach der Größe und der Miete.', 'Bitte um einen Termin zur Besichtigung.'],
          analysis: ['Wie sprichst du den Vermieter Herrn Krüger an?', 'Welche 2 Zahlen erfragst du (Größe & Miete)?', 'Wann möchtest du die Wohnung besichtigen?'],
          anrede: 'Sehr geehrter Herr Krüger,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Anlass', hint: 'Perfekt: gelesen', keywords: ['Anzeige', 'Zwei-Zimmer-Wohnung', 'Internet', 'lesen'], vi: 'Tôi viết thư vì tôi đã đọc quảng cáo căn hộ hai phòng của ông trên mạng.', answers: ['Ich schreibe Ihnen, denn ich habe Ihre Anzeige für die Zwei-Zimmer-Wohnung im Internet gelesen.'] },
            { pointTag: 'Punkt 1 · Situation', hint: 'deshalb + Inversion', keywords: ['jetzt', 'kleines Zimmer', 'deshalb', 'neue Wohnung suchen'], vi: 'Hiện tại tôi sống trong một phòng nhỏ nên tôi đang tìm một căn hộ mới.', answers: ['Ich wohne jetzt in einem kleinen Zimmer, deshalb suche ich eine neue Wohnung.'] },
            { pointTag: 'Punkt 1 · Grund', hint: 'nah bei …', keywords: ['Wohnung', 'nah bei', 'Arbeit', 'gut passen'], vi: 'Căn hộ này ở gần nơi tôi làm việc nên rất phù hợp với tôi.', answers: ['Die Wohnung ist nah bei meiner Arbeit, deshalb passt sie gut für mich.'] },
            { pointTag: 'Punkt 2 · Fragen', hint: 'Wie groß … wie viel …?', keywords: ['wie groß', 'Wohnung', 'wie viel kosten', 'Miete pro Monat'], vi: 'Căn hộ rộng bao nhiêu mét vuông và tiền thuê mỗi tháng là bao nhiêu?', answers: ['Wie groß ist die Wohnung und wie viel kostet die Miete pro Monat?'] },
            { pointTag: 'Punkt 2 · Nebenkosten', hint: 'Ja/Nein-Frage', keywords: ['Strom', 'Wasser', 'schon', 'in der Miete'], vi: 'Tiền thuê đã bao gồm điện và nước chưa?', answers: ['Sind Strom und Wasser schon in der Miete?', 'Sind Strom und Wasser in der Miete?'] },
            { pointTag: 'Punkt 1 · Extra', hint: 'Perfekt + waren', keywords: ['letzte Woche', 'zwei Wohnungen', 'sehen', 'beide', 'zu teuer'], vi: 'Tuần trước tôi đã xem hai căn hộ khác, nhưng cả hai đều quá đắt.', answers: ['Letzte Woche habe ich zwei andere Wohnungen gesehen, aber beide waren zu teuer.'] },
            { pointTag: 'Punkt 3 · Termin', hint: 'Kann ich … besichtigen?', keywords: ['Samstag', 'Sonntag', 'Wohnung', 'besichtigen / ansehen'], vi: 'Tôi có thể đến xem căn hộ vào thứ Bảy hoặc Chủ nhật được không?', answers: ['Kann ich die Wohnung am Samstag oder am Sonntag besichtigen?', 'Kann ich die Wohnung am Samstag oder am Sonntag ansehen?'] },
            { pointTag: 'Schluss', hint: 'sich freuen auf', keywords: ['Vielen Dank', 'sich freuen auf', 'Ihre Antwort'], vi: 'Xin cảm ơn ông và tôi mong sớm nhận được thư trả lời.', answers: ['Vielen Dank und ich freue mich auf Ihre Antwort.'] }
          ],
          muster: 'Sehr geehrter Herr Krüger,\n\nich habe Ihre Anzeige für die Zwei-Zimmer-Wohnung im Internet gelesen und suche eine neue Wohnung. Wie groß ist die Wohnung und wie viel kostet die Miete pro Monat?\n\nKann ich die Wohnung am Samstag oder Sonntag besichtigen? Vielen Dank!\n\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Hilfe beim Umzug', theme: 'Freunde & Wohnen', register: 'informell (du)',
          scenario: 'Dein Freund Max zieht am Samstag um und hat dich um Hilfe gebeten. Du möchtest helfen, aber du musst am Vormittag arbeiten. Schreibe Max eine E-Mail.',
          points: ['Sage, dass du helfen möchtest.', 'Erkläre, warum du erst später kommen kannst.', 'Frage, was du mitbringen sollst.'],
          analysis: ['Du schreibst deinem Freund Max (du).', 'Ab wie viel Uhr kannst du helfen?', 'Welche Frage stellst du am Schluss?'],
          anrede: 'Lieber Max,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Zusage', hint: 'helfen + Dat. (dir)', keywords: ['Nachricht', 'gern helfen', 'Umzug', 'Samstag'], vi: 'Cảm ơn tin nhắn của bạn. Mình rất sẵn lòng giúp bạn chuyển nhà vào thứ Bảy.', answers: ['Vielen Dank für deine Nachricht. Ich helfe dir gern beim Umzug am Samstag.'] },
            { pointTag: 'Punkt 1 · Freude', hint: 'Perfekt: gelesen / gefreut', keywords: ['gestern', 'Nachricht lesen', 'sich freuen'], vi: 'Hôm qua mình đã đọc tin nhắn của bạn và mình rất vui.', answers: ['Gestern habe ich deine Nachricht gelesen und ich habe mich sehr gefreut.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'deshalb + Inversion', keywords: ['Samstagvormittag', 'arbeiten müssen', 'deshalb', 'nicht früh kommen'], vi: 'Sáng thứ Bảy mình phải đi làm, vì vậy mình không thể đến sớm.', answers: ['Am Samstagvormittag muss ich arbeiten, deshalb kann ich nicht früh kommen.'] },
            { pointTag: 'Punkt 2 · Uhrzeit', hint: 'bis 12 Uhr + dann', keywords: ['arbeiten', 'bis 12 Uhr', 'dann', 'zu dir kommen'], vi: 'Mình làm việc đến 12 giờ, rồi mình sẽ đến chỗ bạn.', answers: ['Ich arbeite bis 12 Uhr und komme dann zu dir.'] },
            { pointTag: 'Punkt 1 · Extra', hint: 'Perfekt: geholfen', keywords: ['letzte Woche', 'Kollege', 'Umzug', 'helfen', 'Erfahrung'], vi: 'Tuần trước mình đã giúp một đồng nghiệp chuyển nhà, nên mình có kinh nghiệm.', answers: ['Letzte Woche habe ich schon einem Kollegen beim Umzug geholfen, deshalb habe ich Erfahrung.'] },
            { pointTag: 'Punkt 3 · Angebot', hint: 'kann + mitbringen', keywords: ['Auto', 'Vater', 'nehmen', 'Kisten', 'mitbringen'], vi: 'Mình có thể mượn xe của bố và mang theo vài cái thùng.', answers: ['Ich kann das Auto von meinem Vater nehmen und ein paar Kisten mitbringen.'] },
            { pointTag: 'Punkt 3 · Frage', hint: 'Soll ich …?', keywords: ['sollen', 'etwas mitbringen', 'zum Beispiel', 'Getränke', 'Essen'], vi: 'Bạn cần mình mang theo gì không, ví dụ đồ uống hoặc đồ ăn?', answers: ['Soll ich etwas mitbringen, zum Beispiel Getränke oder Essen?'] },
            { pointTag: 'Schluss', hint: 'Bis Samstag!', keywords: ['Samstag', 'Alles Gute', 'Umzug'], vi: 'Hẹn gặp bạn vào thứ Bảy, chúc bạn chuyển nhà thuận lợi!', answers: ['Bis Samstag! Alles Gute für den Umzug.', 'Bis Samstag! Ich wünsche dir einen guten Umzug.'] }
          ],
          muster: 'Lieber Max,\n\nvielen Dank für deine Nachricht. Ich helfe dir gern beim Umzug am Samstag! Am Samstagvormittag muss ich leider arbeiten, deshalb komme ich erst um 12 Uhr zu dir.\n\nSoll ich etwas mitbringen, zum Beispiel Getränke oder Kisten?\n\nBis Samstag!\nViele Grüße\n[Dein Name]'
        },
        {
          title: 'Jacke umtauschen', theme: 'Einkaufen', register: 'formell (Sie)',
          scenario: 'Du hast letzte Woche im Internet eine Jacke bestellt. Die Jacke ist angekommen, aber sie ist zu klein. Schreibe an den Kundenservice des Online-Shops.',
          points: ['Schreibe, was du bestellt hast und wann.', 'Erkläre das Problem.', 'Bitte um eine größere Jacke.'],
          analysis: ['Du schreibst an den Kundenservice (Sehr geehrte Damen und Herren).', 'Welche Infos zur Bestellung nennst du?', 'Welche Größe brauchst du?'],
          anrede: 'Sehr geehrte Damen und Herren,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Anlass', hint: 'denn + Problem mit …', keywords: ['schreiben', 'Problem', 'Bestellung'], vi: 'Tôi viết thư vì tôi có một vấn đề với đơn hàng của mình.', answers: ['Ich schreibe Ihnen, denn ich habe ein Problem mit meiner Bestellung.'] },
            { pointTag: 'Punkt 1 · Bestellung', hint: 'Perfekt: bestellt', keywords: ['letzte Woche', 'Montag', 'Webseite', 'blaue Jacke', 'bestellen'], vi: 'Tuần trước, vào thứ Hai, tôi đã đặt một chiếc áo khoác màu xanh trên trang web của quý vị.', answers: ['Letzte Woche habe ich am Montag auf Ihrer Webseite eine blaue Jacke bestellt.'] },
            { pointTag: 'Punkt 1 · Nummer', hint: 'Perfekt: bezahlt', keywords: ['Bestellnummer', '4711', 'am selben Tag', 'bezahlen'], vi: 'Số đơn hàng của tôi là 4711 và tôi đã thanh toán ngay hôm đó.', answers: ['Meine Bestellnummer ist 4711 und ich habe am selben Tag bezahlt.'] },
            { pointTag: 'Punkt 2 · Lieferung', hint: 'Perfekt mit sein: angekommen', keywords: ['gestern', 'Jacke', 'bei mir', 'ankommen'], vi: 'Hôm qua áo khoác đã được giao đến nhà tôi.', answers: ['Gestern ist die Jacke bei mir angekommen.'] },
            { pointTag: 'Punkt 2 · Problem', hint: 'zu klein + deshalb', keywords: ['aber', 'Jacke', 'zu klein', 'deshalb', 'nicht tragen'], vi: 'Nhưng áo khoác quá nhỏ, vì vậy tôi không thể mặc nó.', answers: ['Aber die Jacke ist zu klein, deshalb kann ich sie nicht tragen.'] },
            { pointTag: 'Punkt 2 · Größe', hint: 'Perfekt + steht', keywords: ['Größe M', 'bestellen', 'aber', 'Größe S'], vi: 'Tôi đã đặt cỡ M, nhưng trên áo có ghi cỡ S.', answers: ['Ich habe Größe M bestellt, aber auf der Jacke steht Größe S.'] },
            { pointTag: 'Punkt 3 · Bitte', hint: 'Können Sie mir bitte …?', keywords: ['Jacke', 'in Größe M', 'schicken'], vi: 'Quý vị có thể vui lòng gửi cho tôi một chiếc áo khoác cỡ M không?', answers: ['Können Sie mir bitte eine Jacke in Größe M schicken?'] },
            { pointTag: 'Schluss', hint: 'zurückschicken (trennbar)', keywords: ['alte Jacke', 'diese Woche', 'zurückschicken', 'Vielen Dank'], vi: 'Tôi sẽ gửi trả chiếc áo cũ trong tuần này. Xin cảm ơn quý vị.', answers: ['Ich schicke die alte Jacke diese Woche zurück. Vielen Dank für Ihre Hilfe.'] }
          ],
          muster: 'Sehr geehrte Damen und Herren,\n\nletzte Woche habe ich auf Ihrer Webseite eine blaue Jacke in Größe M bestellt (Bestellnummer 4711). Gestern ist die Jacke angekommen, aber sie ist zu klein (Größe S).\n\nKönnen Sie mir bitte eine Jacke in Größe M schicken? Ich schicke die alte Jacke diese Woche zurück.\n\nVielen Dank für Ihre Hilfe.\nMit freundlichen Grüßen\n[Ihr Name]'
        }
      ]
    }
  ]
};
