/* ============================================================
   DEUTSCH-LERNEN · Schreibwerkstatt A2 — Aufgabendaten
   Goethe-Zertifikat A2: Teil 1 (6 SMS, 36 Sätze) + Teil 2 (6 E-Mails, 48 Sätze)
   Gesamt: 12 Aufgaben · 84 Ideen-Sätze (Việt → Đức) + 12 Mustertexte
   ============================================================ */
window.SCHREIBEN_CONFIG = {
  level: 'A2',
  storageKey: 'dl_schreiben_a2_v1',
  guideHeading: 'Von A1 zu A2: Sätze verbinden und flüssig schreiben',
  guides: [
    ['1 · Was ist neu auf A2?', 'Auf A1 hast du einfache Hauptsätze gebaut. Auf <strong>A2</strong> verbindest du deine Ideen mit <strong>weil, dass, wenn</strong> und <strong>deshalb</strong> und erzählst ausführlicher über Erfahrungen und Pläne.'],
    ['2 · Nebensätze mit weil, dass, wenn', 'Nach <strong>weil, dass, wenn</strong> steht das konjugierte Verb immer am <strong>Ende</strong>:<br><em>Ich komme später, <strong>weil</strong> der Zug Verspätung <strong>hat</strong>.</em><br><em>Ich hoffe, <strong>dass</strong> du Zeit <strong>hast</strong>.</em>'],
    ['3 · Grund und Folge mit deshalb', 'Mit <strong>deshalb</strong> folgt sofort das Verb (Inversion):<br><em>Mein Bus ist ausgefallen, <strong>deshalb komme</strong> ich 20 Minuten später.</em>'],
    ['4 · Vergangenheit sicher erzählen', 'Auf A2 nutzt du <strong>Perfekt</strong> (<em>habe gefunden, bin gefahren</em>) kombiniert mit Präteritum bei <strong>sein, haben</strong> und Modalverben (<em>war, hatte, konnte, musste</em>).'],
    ['5 · Höfliche Bitten & Vorschläge', 'Für Bitten an Kolleginnen, Nachbarn oder Firmen klingt <strong>Könnten Sie …?</strong> höflicher als <em>Können Sie …?</em>. Unter Freunden passt: <em>Wir könnten … / Wollen wir …?</em>'],
    ['6 · Teil 1 · Kurze Nachricht / SMS (ca. 20–30 Wörter)', 'Eine schnelle Nachricht im Alltag (Verspätung, Termin, Bitte). Kurz, direkt und alle <strong>3 Leitpunkte</strong> klar beantworten – keine langen Einleitungen nötig!'],
    ['7 · Teil 2 · E-Mail (ca. 35–50 Wörter)', 'Ausführlicher als die SMS: passende Anrede (<em>Liebe/r …</em> oder <em>Sehr geehrte(r) …</em>), alle 3–4 Punkte mit Gründen/Details, freundlicher Gruß am Ende.'],
    ['8 · Erst üben, dann im Prüfungsmodus testen', 'Übersetze in Schritt 02 zuerst die Ideen mit <strong>🔑 Wort-Hilfe</strong>. Wenn du sicher bist, aktiviere oben <strong>⏱ Prüfungsmodus</strong> und schreibe den Text frei mit Timer!']
  ],
  redemittel: {
    sms: {
      'Einstieg': ['Hallo …,', 'Tut mir leid, …', 'Guten Tag Frau/Herr …,', 'Ich schreibe dir kurz, weil …'],
      'Grund & Bitte': ['Leider …, weil …', 'Deshalb komme ich …', 'Könntest du bitte …?', 'Könnten Sie bitte …?'],
      'Schluss': ['Bis gleich!', 'Vielen Dank!', 'Viele Grüße', 'Mit freundlichen Grüßen']
    },
    email: {
      'Anrede': ['Liebe(r) …,', 'Hallo …,', 'Sehr geehrte Frau … / Sehr geehrter Herr …,', 'Sehr geehrte Damen und Herren,'],
      'Satzbausteine A2': ['Ich freue mich sehr, dass …', 'Ich schreibe dir/Ihnen, weil …', 'Besonders gut gefällt mir, dass …', 'Wenn du Zeit hast, können wir …', 'Könnten Sie mir bitte mitteilen, …?'],
      'Schluss': ['Ich freue mich auf deine/Ihre Antwort.', 'Bis bald!', 'Liebe Grüße', 'Mit freundlichen Grüßen']
    }
  },
  parts: [
    {
      id: 'sms',
      label: 'Teil 1 · Kurze Nachricht (SMS)',
      shortLabel: 'Teil 1 · SMS',
      icon: '📱',
      type: 'writing',
      examMinutes: 15,
      minWords: 20,
      wordTarget: 'ca. 20–30 Wörter',
      items: [
        {
          title: 'Verspätung beim Treffen', theme: 'Freizeit & Verabredung', register: 'informell (du)',
          scenario: 'Du bist um 17 Uhr mit deiner Freundin Anna im Café verabredet. Dein Bus steht im Stau und du kommst etwa 20 Minuten später. Schreibe Anna eine kurze SMS.',
          points: ['Entschuldige dich.', 'Erkläre den Grund mit „weil“.', 'Sage, wann du genau da bist und was Anna machen kann.'],
          analysis: ['Wen schreibst du an (du/Sie)?', 'Welcher Nebensatz erklärt den Grund?', 'Wie viele Minuten kommst du später?'],
          anrede: 'Hallo Anna,', gruss: 'Bis gleich!',
          sentences: [
            { pointTag: 'Punkt 1 · Entschuldigung', hint: 'Es tut mir leid, aber …', keywords: ['leidtun', 'aber', 'später kommen'], vi: 'Mình rất xin lỗi, nhưng mình sẽ đến muộn một chút.', answers: ['Es tut mir sehr leid, aber ich komme etwas später.', 'Tut mir leid, aber ich komme später.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'weil + Verb am Ende', keywords: ['Bus', 'im Stau stehen', 'weil'], vi: 'Mình đến muộn vì xe buýt của mình đang bị tắc đường.', answers: ['Ich komme später, weil mein Bus im Stau steht.', 'Ich habe Verspätung, weil mein Bus im Stau steht.'] },
            { pointTag: 'Punkt 2 · Folge', hint: 'deshalb + Inversion', keywords: ['deshalb', '20 Minuten', 'später ankommen'], vi: 'Vì vậy mình sẽ đến chậm khoảng 20 phút.', answers: ['Deshalb komme ich ungefähr 20 Minuten später an.', 'Deshalb bin ich erst 20 Minuten später da.'] },
            { pointTag: 'Punkt 3 · Uhrzeit', hint: 'um 17:20 Uhr', keywords: ['17:20 Uhr', 'im Café sein'], vi: 'Mình nghĩ 17 giờ 20 mình sẽ có mặt ở quán cà phê.', answers: ['Ich bin um 17:20 Uhr im Café.', 'Ich denke, dass ich um 17:20 Uhr im Café bin.'] },
            { pointTag: 'Punkt 3 · Vorschlag', hint: 'schon + bestellen', keywords: ['können', 'schon', 'Kaffee bestellen', 'warten'], vi: 'Bạn có thể gọi cà phê trước và đợi mình nhé?', answers: ['Kannst du bitte schon einen Kaffee bestellen und auf mich warten?', 'Du kannst schon einen Kaffee bestellen und auf mich warten.'] },
            { pointTag: 'Schluss', hint: 'Bis gleich!', keywords: ['Vielen Dank', 'bis gleich'], vi: 'Cảm ơn bạn nhé, gặp bạn ngay bây giờ!', answers: ['Vielen Dank und bis gleich!', 'Danke dir, bis gleich!'] }
          ],
          muster: 'Hallo Anna,\n\nes tut mir sehr leid, aber ich komme 20 Minuten später, weil mein Bus im Stau steht. Ich bin um 17:20 Uhr im Café. Du kannst schon einen Kaffee bestellen!\n\nBis gleich!\n[Dein Name]'
        },
        {
          title: 'Zahnarzttermin verschieben', theme: 'Gesundheit & Termine', register: 'formell (Sie)',
          scenario: 'Sie haben morgen um 10 Uhr einen Termin bei Dr. Klein. Leider müssen Sie überraschend länger arbeiten. Schreiben Sie eine kurze Nachricht an die Praxis.',
          points: ['Nennen Sie Ihren Termin und entschuldigen Sie sich.', 'Erklären Sie den Grund.', 'Bitten Sie um einen neuen Termin am Nachmittag.'],
          analysis: ['Welches Register gilt bei einer Arztpraxis (Sie)?', 'Wann war der ursprüngliche Termin?', 'Wann wünschen Sie den neuen Termin?'],
          anrede: 'Guten Tag,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Termin', hint: 'morgen um 10 Uhr', keywords: ['morgen', '10 Uhr', 'Termin haben', 'Dr. Klein'], vi: 'Ngày mai lúc 10 giờ tôi có lịch hẹn khám với bác sĩ Klein.', answers: ['Morgen um 10 Uhr habe ich einen Termin bei Dr. Klein.', 'Ich habe morgen um 10 Uhr einen Termin bei Dr. Klein.'] },
            { pointTag: 'Punkt 1 · Absage', hint: 'leider + nicht kommen können', keywords: ['leidtun', 'leider', 'nicht kommen können'], vi: 'Tôi rất tiếc, nhưng tôi không thể đến đúng giờ hẹn được.', answers: ['Es tut mir leid, aber ich kann leider nicht zu dem Termin kommen.', 'Leider muss ich den Termin absagen.'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'weil + Modalverb am Ende', keywords: ['weil', 'morgen früh', 'arbeiten müssen'], vi: 'Tôi không thể đến vì sáng mai tôi đột xuất phải đi làm.', answers: ['Ich kann nicht kommen, weil ich morgen früh arbeiten muss.', 'Ich muss absagen, weil ich morgen Vormittag arbeiten muss.'] },
            { pointTag: 'Punkt 3 · Bitte', hint: 'Könnten Sie … verschieben?', keywords: ['Termin', 'Nachmittag', 'verschieben'], vi: 'Quý phòng khám có thể dời lịch hẹn sang buổi chiều được không?', answers: ['Könnten Sie den Termin bitte auf den Nachmittag verschieben?', 'Können wir den Termin auf den Nachmittag verschieben?'] },
            { pointTag: 'Punkt 3 · Zeit', hint: 'ab 15 Uhr Zeit haben', keywords: ['Donnerstag', 'ab 15 Uhr', 'Zeit haben'], vi: 'Thứ Năm từ 15 giờ trở đi tôi có thời gian.', answers: ['Am Donnerstag habe ich ab 15 Uhr Zeit.', 'Am Donnerstag ab 15 Uhr habe ich frei.'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank + Rückmeldung', keywords: ['Vielen Dank', 'kurze Antwort'], vi: 'Xin cảm ơn và tôi mong nhận được phản hồi ngắn.', answers: ['Vielen Dank für Ihre kurze Antwort.', 'Vielen Dank im Voraus für Ihre Rückmeldung.'] }
          ],
          muster: 'Guten Tag,\n\nmorgen um 10 Uhr habe ich einen Termin bei Dr. Klein. Es tut mir leid, aber ich kann nicht kommen, weil ich morgen früh arbeiten muss. Könnten Sie den Termin auf Donnerstagnachmittag ab 15 Uhr verschieben?\n\nVielen Dank!\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Einkauf vor dem Abendessen', theme: 'Essen & Freunde', register: 'informell (du)',
          scenario: 'Heute Abend kocht ihr zusammen bei dir zu Hause. Du bist noch unterwegs und brauchst Hilfe beim Einkaufen. Schreibe deinem Freund Ben eine SMS.',
          points: ['Sage, wo du gerade bist.', 'Bitte Ben, zwei Dinge einzukaufen.', 'Sage, wann du wieder zu Hause bist.'],
          analysis: ['Du schreibst deinem Freund Ben (du).', 'Welche zwei Zutaten soll Ben mitbringen?', 'Um wie viel Uhr bist du zurück?'],
          anrede: 'Hey Ben,', gruss: 'Bis später!',
          sentences: [
            { pointTag: 'Punkt 1 · Situation', hint: 'noch + bei der Arbeit', keywords: ['noch', 'bei der Arbeit sein', 'erst', '18 Uhr', 'zu Hause'], vi: 'Mình vẫn đang ở chỗ làm và 18 giờ mới về tới nhà.', answers: ['Ich bin noch bei der Arbeit und erst um 18 Uhr zu Hause.', 'Ich bin noch im Büro und komme erst um 18 Uhr nach Hause.'] },
            { pointTag: 'Punkt 2 · Bitte', hint: 'Könntest du bitte …?', keywords: ['Supermarkt', 'gehen', 'Tomaten', 'Käse', 'kaufen'], vi: 'Bạn có thể ghé siêu thị mua giúp mình cà chua và phô mai không?', answers: ['Könntest du bitte in den Supermarkt gehen und Tomaten und Käse kaufen?', 'Kannst du bitte Tomaten und Käse im Supermarkt kaufen?'] },
            { pointTag: 'Punkt 2 · Grund', hint: 'weil + vergessen (Perfekt)', keywords: ['weil', 'gestern', 'vergessen haben'], vi: 'Mình nhờ bạn vì hôm qua mình đã quên mua chúng.', answers: ['Ich bitte dich darum, weil ich sie gestern vergessen habe.', 'Ich habe sie gestern leider vergessen.'] },
            { pointTag: 'Punkt 2 · Geld', hint: 'zurückgeben', keywords: ['Geld', 'heute Abend', 'zurückgeben'], vi: 'Tối nay mình sẽ trả lại tiền cho bạn ngay nhé.', answers: ['Ich gebe dir das Geld heute Abend sofort zurück.', 'Heute Abend gebe ich dir das Geld natürlich zurück.'] },
            { pointTag: 'Punkt 3 · Treffen', hint: 'Wenn du … kommst', keywords: ['wenn', '18:30 Uhr', 'kommen', 'zusammen kochen'], vi: 'Nếu 18 giờ 30 bạn sang thì chúng ta có thể cùng nhau nấu ăn.', answers: ['Wenn du um 18:30 Uhr kommst, können wir zusammen kochen.', 'Komm gern um 18:30 Uhr, dann kochen wir zusammen.'] },
            { pointTag: 'Schluss', hint: 'Danke dir!', keywords: ['danke', 'Hilfe', 'bis später'], vi: 'Cảm ơn bạn nhiều lắm, hẹn lát nữa gặp nhé!', answers: ['Danke dir für deine Hilfe und bis später!', 'Vielen Dank und bis heute Abend!'] }
          ],
          muster: 'Hey Ben,\n\nich bin noch bei der Arbeit und erst um 18 Uhr zu Hause. Könntest du bitte Tomaten und Käse kaufen, weil ich sie gestern vergessen habe? Das Geld gebe ich dir heute Abend zurück. Komm gern um 18:30 Uhr!\n\nBis später!\n[Dein Name]'
        },
        {
          title: 'Jacke im Café vergessen', theme: 'Alltag & Fundbüro', register: 'formell (Sie)',
          scenario: 'Sie waren gestern Nachmittag im Café „Sonnenschein“ und haben dort Ihre schwarze Jacke vergessen. Schreiben Sie eine kurze Nachricht an das Café.',
          points: ['Sagen Sie, wann Sie im Café waren.', 'Beschreiben Sie Ihre Jacke genau.', 'Fragen Sie, ob die Jacke gefunden wurde und wann Sie sie abholen können.'],
          analysis: ['Wie sprechen Sie das Café an (Sie)?', 'Welche Vergangenheitsform passt für „gestern“?', 'Welche zwei Fragen stellen Sie?'],
          anrede: 'Guten Tag,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Besuch', hint: 'gestern Nachmittag + war', keywords: ['gestern Nachmittag', 'Café', 'sein'], vi: 'Chiều hôm qua tôi đã đến quán cà phê của quý vị.', answers: ['Gestern Nachmittag war ich in Ihrem Café.', 'Ich war gestern Nachmittag in Ihrem Café.'] },
            { pointTag: 'Punkt 2 · Problem', hint: 'Perfekt: vergessen', keywords: ['leider', 'schwarze Jacke', 'Stuhl', 'vergessen'], vi: 'Rất tiếc tôi đã để quên chiếc áo khoác màu đen của mình trên ghế.', answers: ['Leider habe ich meine schwarze Jacke auf dem Stuhl vergessen.', 'Ich habe dort leider meine schwarze Jacke vergessen.'] },
            { pointTag: 'Punkt 2 · Detail', hint: 'in der Tasche sein', keywords: ['Jacke', 'Größe M', 'kleiner Schlüssel', 'Tasche'], vi: 'Áo khoác cỡ M và có một chiếc chìa khóa nhỏ trong túi.', answers: ['Die Jacke hat Größe M und in der Tasche ist ein kleiner Schlüssel.', 'Es ist eine schwarze Jacke in Größe M mit einem Schlüssel in der Tasche.'] },
            { pointTag: 'Punkt 3 · Frage', hint: 'ob + Verb am Ende', keywords: ['wissen', 'ob', 'Jacke finden'], vi: 'Quý vị có thể cho tôi biết liệu quán có tìm thấy chiếc áo không?', answers: ['Könnten Sie mir bitte sagen, ob Sie meine Jacke gefunden haben?', 'Haben Sie vielleicht meine Jacke gefunden?'] },
            { pointTag: 'Punkt 3 · Abholung', hint: 'wann + abholen', keywords: ['wann', 'morgen', 'abholen können'], vi: 'Ngày mai tôi có thể đến lấy lại áo vào lúc mấy giờ?', answers: ['Wann kann ich die Jacke morgen abholen?', 'Um wie viel Uhr kann ich sie morgen abholen?'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank', keywords: ['Vielen Dank', 'Antwort'], vi: 'Xin cảm ơn quý vị rất nhiều.', answers: ['Vielen Dank im Voraus für Ihre Antwort.', 'Vielen Dank für Ihre Hilfe.'] }
          ],
          muster: 'Guten Tag,\n\ngestern Nachmittag war ich in Ihrem Café und habe leider meine schwarze Jacke (Größe M) vergessen. Haben Sie die Jacke vielleicht gefunden? Wann könnte ich sie morgen abholen?\n\nVielen Dank!\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Krank – Kollegin kurz informieren', theme: 'Arbeit & Gesundheit', register: 'halbformell (Sie)',
          scenario: 'Sie sind heute Morgen mit starken Halsschmerzen aufgewacht und können nicht ins Büro kommen. Schreiben Sie Ihrer Kollegin Frau Becker eine kurze Nachricht.',
          points: ['Informieren Sie Frau Becker über Ihre Krankheit.', 'Sagen Sie, wann Sie zum Arzt gehen.', 'Bitten Sie sie, den Kundentermin abzusagen.'],
          analysis: ['Spiralthema A1 → A2: Jetzt mit „weil“ und „könnten Sie“!', 'Worum bitten Sie Frau Becker direkt?'],
          anrede: 'Liebe Frau Becker,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Meldung', hint: 'weil + Verb am Ende', keywords: ['heute', 'nicht ins Büro kommen', 'weil', 'krank sein'], vi: 'Hôm nay tôi không thể đến văn phòng vì tôi bị ốm.', answers: ['Ich kann heute leider nicht ins Büro kommen, weil ich krank bin.', 'Leider kann ich heute nicht kommen, weil ich krank bin.'] },
            { pointTag: 'Punkt 1 · Symptome', hint: 'starke Halsschmerzen + Fieber', keywords: ['Halsschmerzen', 'leichtes Fieber', 'haben'], vi: 'Tôi bị đau họng nặng và hơi sốt.', answers: ['Ich habe starke Halsschmerzen und leichtes Fieber.', 'Seit heute Morgen habe ich Halsschmerzen und Fieber.'] },
            { pointTag: 'Punkt 2 · Arzt', hint: 'Um 10 Uhr …', keywords: ['10 Uhr', 'zum Arzt gehen', 'danach', 'Bescheid geben'], vi: 'Lúc 10 giờ tôi đi khám bác sĩ rồi sau đó sẽ báo lại cho bà.', answers: ['Um 10 Uhr gehe ich zum Arzt und gebe Ihnen danach Bescheid.', 'Um 10 Uhr bin ich beim Arzt, danach schreibe ich Ihnen.'] },
            { pointTag: 'Punkt 3 · Bitte', hint: 'Könnten Sie bitte …?', keywords: ['Kundentermin', '14 Uhr', 'absagen'], vi: 'Bà có thể vui lòng hủy giúp tôi lịch hẹn khách hàng lúc 14 giờ không?', answers: ['Könnten Sie bitte den Kundentermin um 14 Uhr absagen?', 'Können Sie bitte meinen Termin um 14 Uhr absagen?'] },
            { pointTag: 'Punkt 3 · Info', hint: 'Nummer + auf meinem Schreibtisch', keywords: ['Telefonnummer', 'liegen', 'Schreibtisch'], vi: 'Số điện thoại của khách hàng nằm ở trên bàn làm việc của tôi.', answers: ['Die Telefonnummer liegt auf meinem Schreibtisch.', 'Die Nummer vom Kunden finden Sie auf meinem Schreibtisch.'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank für Ihre Hilfe', keywords: ['Vielen Dank', 'Hilfe'], vi: 'Cảm ơn bà đã hỗ trợ tôi nhé!', answers: ['Vielen Dank für Ihre Hilfe!', 'Herzlichen Dank für Ihre Unterstützung!'] }
          ],
          muster: 'Liebe Frau Becker,\n\nich kann heute leider nicht ins Büro kommen, weil ich krank bin und starke Halsschmerzen habe. Um 10 Uhr gehe ich zum Arzt und gebe Ihnen danach Bescheid. Könnten Sie bitte den Kundentermin um 14 Uhr absagen? Die Nummer liegt auf meinem Schreibtisch.\n\nVielen Dank für Ihre Hilfe!\nViele Grüße\n[Ihr Name]'
        },
        {
          title: 'Nachbarn um Paketannahme bitten', theme: 'Wohnen & Nachbarschaft', register: 'halbformell (Sie)',
          scenario: 'Heute Nachmittag kommt ein wichtiges Paket für Sie, aber Sie sind bis 19 Uhr bei der Arbeit. Schreiben Sie Ihrem Nachbarn Herrn Sommer eine kurze Nachricht.',
          points: ['Erklären Sie das Problem.', 'Bitten Sie Herrn Sommer, das Paket anzunehmen.', 'Sagen Sie, wann Sie es abholen.'],
          analysis: ['Höfliche Anrede an Herrn Sommer (Sie).', 'Wann genau holen Sie das Paket ab?'],
          anrede: 'Lieber Herr Sommer,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Situation', hint: 'heute Nachmittag + weil', keywords: ['heute Nachmittag', 'wichtiges Paket', 'kommen', 'bei der Arbeit'], vi: 'Chiều nay có một bưu kiện quan trọng gửi cho tôi, nhưng tôi phải đi làm.', answers: ['Heute Nachmittag kommt ein wichtiges Paket für mich, aber ich bin bei der Arbeit.', 'Heute kommt ein wichtiges Paket, aber ich bin leider nicht zu Hause.'] },
            { pointTag: 'Punkt 1 · Zeit', hint: 'erst um 19 Uhr', keywords: ['erst', '19 Uhr', 'nach Hause kommen'], vi: 'Tận 19 giờ tối tôi mới về đến nhà.', answers: ['Ich komme erst um 19 Uhr nach Hause.', 'Ich bin erst ab 19 Uhr wieder zu Hause.'] },
            { pointTag: 'Punkt 2 · Bitte', hint: 'Könnten Sie … annehmen?', keywords: ['Paket', 'für mich', 'annehmen'], vi: 'Ông có thể vui lòng nhận giúp tôi bưu kiện đó không?', answers: ['Könnten Sie das Paket bitte für mich annehmen?', 'Können Sie bitte mein Paket annehmen?'] },
            { pointTag: 'Punkt 2 · Detail', hint: 'nicht schwer', keywords: ['Paket', 'klein', 'nicht schwer'], vi: 'Bưu kiện nhỏ thôi và không nặng đâu ạ.', answers: ['Das Paket ist klein und nicht schwer.', 'Es ist nur ein kleines Paket.'] },
            { pointTag: 'Punkt 3 · Abholung', hint: 'um 19:15 Uhr abholen', keywords: ['19:15 Uhr', 'bei Ihnen', 'klingeln', 'abholen'], vi: 'Tôi sẽ bấm chuông và qua nhà ông lấy vào lúc 19 giờ 15.', answers: ['Ich klingele um 19:15 Uhr bei Ihnen und hole es ab.', 'Ich hole das Paket um 19:15 Uhr bei Ihnen ab.'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank im Voraus', keywords: ['Vielen Dank', 'nett'], vi: 'Xin cảm ơn ông trước, ông thật tốt bụng!', answers: ['Vielen Dank im Voraus! Das ist sehr nett von Ihnen.', 'Vielen Dank für Ihre Hilfe!'] }
          ],
          muster: 'Lieber Herr Sommer,\n\nheute Nachmittag kommt ein wichtiges Paket für mich, aber ich bin erst um 19 Uhr wieder zu Hause. Könnten Sie das Paket bitte für mich annehmen? Ich hole es dann um 19:15 Uhr bei Ihnen ab.\n\nVielen Dank im Voraus!\nViele Grüße\n[Ihr Name]'
        }
      ]
    },
    {
      id: 'email',
      label: 'Teil 2 · E-Mail (A2)',
      shortLabel: 'Teil 2 · E-Mail',
      icon: '✉️',
      type: 'writing',
      examMinutes: 20,
      minWords: 35,
      wordTarget: 'ca. 35–50 Wörter',
      items: [
        {
          title: 'Einladung zum Grillfest annehmen', theme: 'Fest & Freunde', register: 'informell (du)',
          scenario: 'Dein Freund Tim feiert am Samstag im Garten ein Grillfest und hat dich eingeladen. Du freust dich und kommst gern. Schreibe Tim eine E-Mail.',
          points: ['Bedanke dich und sage zu.', 'Frage, was du mitbringen sollst.', 'Erkläre, dass du etwas später kommst, weil du vorher noch Sport hast.'],
          analysis: ['Spiralthema A1 → A2: Verbinde Zusage + Grund mit „weil“ und „dass“!', 'Wann kommst du ungefähr an?'],
          anrede: 'Lieber Tim,', gruss: 'Liebe Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Dank', hint: 'dass-Satz', keywords: ['Vielen Dank', 'Grillfest', 'sich freuen', 'dass'], vi: 'Cảm ơn bạn vì lời mời tiệc nướng! Mình rất vui vì bạn đã mời mình.', answers: ['Vielen Dank für die Einladung zum Grillfest! Ich freue mich sehr, dass du mich eingeladen hast.', 'Danke für deine Einladung zum Grillfest! Ich freue mich sehr.'] },
            { pointTag: 'Punkt 1 · Zusage', hint: 'natürlich + gern', keywords: ['natürlich', 'Samstag', 'gern kommen'], vi: 'Tất nhiên là thứ Bảy mình sẽ rất vui lòng đến dự.', answers: ['Natürlich komme ich am Samstag sehr gern.', 'Ich komme am Samstag natürlich sehr gern.'] },
            { pointTag: 'Punkt 2 · Frage', hint: 'Soll ich … mitbringen?', keywords: ['sollen', 'Salat', 'Getränke', 'mitbringen'], vi: 'Mình nên mang theo salad hay đồ uống gì không?', answers: ['Soll ich einen Salat oder Getränke mitbringen?', 'Was soll ich mitbringen? Vielleicht einen Salat oder Getränke?'] },
            { pointTag: 'Punkt 2 · Vorschlag', hint: 'wenn du willst', keywords: ['wenn', 'wollen', 'Nudelsalat machen'], vi: 'Nếu bạn muốn, mình có thể làm một bát salad mì Ý.', answers: ['Wenn du möchtest, kann ich gern einen Nudelsalat machen.', 'Wenn du willst, mache ich einen Nudelsalat.'] },
            { pointTag: 'Punkt 3 · Später', hint: 'weil + Verb am Ende', keywords: ['etwas später kommen', 'weil', 'bis 16 Uhr', 'Fußballtraining'], vi: 'Tuy nhiên mình sẽ đến muộn một chút vì mình có buổi tập bóng đá đến 16 giờ.', answers: ['Ich komme aber etwas später, weil ich bis 16 Uhr Fußballtraining habe.', 'Leider komme ich ein bisschen später, weil ich bis 16 Uhr Sport habe.'] },
            { pointTag: 'Punkt 3 · Ankunft', hint: 'deshalb + Inversion', keywords: ['deshalb', 'erst', '17 Uhr', 'da sein'], vi: 'Vì vậy tầm 17 giờ mình mới có mặt ở vườn nhà bạn.', answers: ['Deshalb bin ich erst gegen 17 Uhr bei dir.', 'Deshalb komme ich erst um 17 Uhr.'] },
            { pointTag: 'Schluss', hint: 'Ich hoffe, dass …', keywords: ['hoffen', 'dass', 'Wetter', 'schön bleiben'], vi: 'Mình hy vọng rằng thời tiết thứ Bảy sẽ vẫn đẹp.', answers: ['Ich hoffe, dass das Wetter am Samstag schön bleibt.', 'Hoffentlich ist das Wetter am Samstag gut.'] },
            { pointTag: 'Schluss', hint: 'Bis Samstag!', keywords: ['schreib mir', 'bis Samstag'], vi: 'Nhắn cho mình biết mình cần mang gì nhé. Hẹn gặp thứ Bảy!', answers: ['Schreib mir bitte, was ich mitbringen soll. Bis Samstag!', 'Sag mir kurz Bescheid. Bis Samstag!'] }
          ],
          muster: 'Lieber Tim,\n\nvielen Dank für die Einladung zum Grillfest! Ich freue mich sehr, dass du mich eingeladen hast, und komme am Samstag natürlich gern. Leider komme ich erst gegen 17 Uhr, weil ich bis 16 Uhr Fußballtraining habe.\n\nSoll ich einen Nudelsalat oder Getränke mitbringen? Ich hoffe, dass das Wetter schön bleibt!\n\nBis Samstag!\nLiebe Grüße\n[Dein Name]'
        },
        {
          title: 'Vom neuen Job erzählen', theme: 'Arbeit & Alltag', register: 'informell (du)',
          scenario: 'Du arbeitest seit zwei Wochen in einer neuen Firma. Deine Freundin Hanna möchte wissen, wie es dir dort gefällt. Schreibe ihr eine E-Mail.',
          points: ['Erzähle, wo du arbeitest und was deine Aufgaben sind.', 'Beschreibe deine Kollegen und Arbeitszeiten.', 'Schlage ein Treffen am Wochenende vor.'],
          analysis: ['Welche Zeitform nutzt du für „seit zwei Wochen“ (Präsens!) vs. „letzten Monat“ (Perfekt)?', 'Wie drückst du aus, was dir gefällt?'],
          anrede: 'Liebe Hanna,', gruss: 'Liebe Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Job', hint: 'seit zwei Wochen + Präsens', keywords: ['seit zwei Wochen', 'Bäckerei / Firma', 'arbeiten'], vi: 'Hai tuần nay mình đang làm việc tại một công ty mới ở trung tâm thành phố.', answers: ['Seit zwei Wochen arbeite ich in einer neuen Firma im Stadtzentrum.', 'Ich arbeite seit zwei Wochen in einer neuen Firma im Zentrum.'] },
            { pointTag: 'Punkt 1 · Aufgaben', hint: 'Kunden beraten / E-Mails schreiben', keywords: ['Aufgabe', 'Kunden helfen', 'E-Mails schreiben'], vi: 'Ở đó mình tư vấn cho khách hàng và viết email.', answers: ['Dort berate ich Kunden und schreibe E-Mails.', 'Meine Aufgaben sind Kunden beraten und E-Mails schreiben.'] },
            { pointTag: 'Punkt 2 · Kollegen', hint: 'gefällt mir, weil …', keywords: ['Job', 'gefallen', 'weil', 'Kollegen', 'nett'], vi: 'Mình rất thích công việc mới vì các đồng nghiệp cực kỳ thân thiện.', answers: ['Der neue Job gefällt mir sehr gut, weil meine Kollegen sehr nett sind.', 'Mir gefällt die Arbeit gut, weil alle Kollegen freundlich sind.'] },
            { pointTag: 'Punkt 2 · Anfang', hint: 'Am Anfang war …', keywords: ['am Anfang', 'etwas schwer', 'jetzt', 'besser'], vi: 'Lúc đầu hơi khó một chút, nhưng bây giờ mọi thứ đã tốt hơn nhiều.', answers: ['Am Anfang war es etwas schwer, aber jetzt klappt alles viel besser.', 'Am Anfang war die Arbeit schwer, aber jetzt ist es viel leichter.'] },
            { pointTag: 'Punkt 2 · Zeiten', hint: 'von … bis …', keywords: ['Montag bis Freitag', '8 bis 16 Uhr', 'arbeiten'], vi: 'Mình làm từ thứ Hai đến thứ Sáu, từ 8 giờ đến 16 giờ.', answers: ['Ich arbeite von Montag bis Freitag von 8 bis 16 Uhr.', 'Meine Arbeitszeiten sind von 8 bis 16 Uhr.'] },
            { pointTag: 'Punkt 2 · Vorteil', hint: 'deshalb + am Wochenende frei', keywords: ['deshalb', 'Wochenende', 'immer frei haben'], vi: 'Vì vậy cuối tuần nào mình cũng được nghỉ.', answers: ['Deshalb habe ich am Wochenende immer frei.', 'Deshalb kann ich mich am Wochenende ausruhen.'] },
            { pointTag: 'Punkt 3 · Treffen', hint: 'Wenn du … Zeit hast', keywords: ['wenn', 'Samstag', 'Zeit haben', 'zusammen essen'], vi: 'Nếu thứ Bảy bạn rảnh, chúng ta đi ăn tối cùng nhau nhé?', answers: ['Wenn du am Samstag Zeit hast, können wir zusammen essen gehen.', 'Hast du am Samstag Zeit? Wir könnten zusammen essen gehen.'] },
            { pointTag: 'Schluss', hint: 'erzählen', keywords: ['viel erzählen', 'sich freuen auf', 'Antwort'], vi: 'Mình có nhiều chuyện muốn kể cho bạn lắm. Mong sớm nhận được hồi âm của bạn!', answers: ['Ich habe dir viel zu erzählen und freue mich auf deine Antwort.', 'Ich freue mich schon auf dich. Meld dich bald!'] }
          ],
          muster: 'Liebe Hanna,\n\nseit zwei Wochen arbeite ich in einer neuen Firma im Stadtzentrum. Dort berate ich Kunden und schreibe E-Mails. Der Job gefällt mir sehr gut, weil meine Kollegen total nett sind. Ich arbeite von Montag bis Freitag von 8 bis 16 Uhr, deshalb habe ich am Wochenende immer frei.\n\nWenn du am Samstag Zeit hast, können wir zusammen essen gehen! Ich habe dir viel zu erzählen.\n\nLiebe Grüße\n[Dein Name]'
        },
        {
          title: 'Neue Wohnung beschreiben & einladen', theme: 'Wohnen', register: 'informell (du)',
          scenario: 'Du bist vor einer Woche in eine neue Wohnung umgezogen. Schreibe deinem Freund Lukas eine E-Mail und lade ihn ein.',
          points: ['Erzähle, wann du umgezogen bist.', 'Beschreibe die neue Wohnung (Zimmer, Balkon, Lage).', 'Lade Lukas ein und schlage einen Tag vor.'],
          analysis: ['Spiralthema A1 → A2: Beschreibe die Wohnung mit „weil / deshalb / besonders“!', 'Wann kann Lukas vorbeikommen?'],
          anrede: 'Lieber Lukas,', gruss: 'Viele Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Umzug', hint: 'vor einer Woche + bin umgezogen', keywords: ['vor einer Woche', 'neue Wohnung', 'umziehen'], vi: 'Một tuần trước mình đã chuyển sang căn hộ mới rồi.', answers: ['Vor einer Woche bin ich in meine neue Wohnung umgezogen.', 'Ich bin vor einer Woche in eine neue Wohnung gezogen.'] },
            { pointTag: 'Punkt 2 · Größe', hint: 'hat + ist hell', keywords: ['zwei Zimmer', 'große Küche', 'sehr hell'], vi: 'Căn hộ có hai phòng, một gian bếp rộng và rất sáng sủa.', answers: ['Die Wohnung hat zwei Zimmer, eine große Küche und ist sehr hell.', 'Sie hat zwei Zimmer und eine große, helle Küche.'] },
            { pointTag: 'Punkt 2 · Highlight', hint: 'Besonders gut gefällt mir, dass …', keywords: ['besonders gut gefallen', 'dass', 'Balkon haben'], vi: 'Mình đặc biệt thích vì căn hộ có một ban công nhỏ.', answers: ['Besonders gut gefällt mir, dass die Wohnung einen kleinen Balkon hat.', 'Mir gefällt besonders gut, dass es einen Balkon gibt.'] },
            { pointTag: 'Punkt 2 · Lage', hint: 'deshalb + schnell', keywords: ['U-Bahn', 'in der Nähe', 'deshalb', 'schnell im Zentrum'], vi: 'Ga tàu điện ngầm ở ngay gần nên mình đi vào trung tâm rất nhanh.', answers: ['Die U-Bahn ist ganz in der Nähe, deshalb bin ich schnell im Zentrum.', 'Die Haltestelle ist nah, deshalb brauche ich nur 10 Minuten ins Zentrum.'] },
            { pointTag: 'Punkt 1 · Möbel', hint: 'Perfekt: schon gekauft', keywords: ['neues Sofa', 'Tisch', 'schon kaufen'], vi: 'Mình đã mua một bộ ghế sofa mới và một chiếc bàn ăn rồi.', answers: ['Ich habe schon ein neues Sofa und einen Esstisch gekauft.', 'Ich habe bereits ein neues Sofa und einen Tisch gekauft.'] },
            { pointTag: 'Punkt 3 · Einladung', hint: 'möchte … zeigen', keywords: ['neue Wohnung', 'zeigen', 'dich einladen'], vi: 'Mình rất muốn cho bạn xem căn hộ mới và mời bạn sang chơi.', answers: ['Ich möchte dir gern meine neue Wohnung zeigen und dich einladen.', 'Ich lade dich herzlich ein, meine neue Wohnung anzusehen.'] },
            { pointTag: 'Punkt 3 · Termin', hint: 'Wie wäre es am …?', keywords: ['Sonntag', '15 Uhr', 'Kaffee und Kuchen'], vi: 'Chủ nhật lúc 15 giờ sang uống cà phê ăn bánh thì sao?', answers: ['Wie wäre es am Sonntag um 15 Uhr bei Kaffee und Kuchen?', 'Hast du am Sonntag um 15 Uhr Zeit für Kaffee und Kuchen?'] },
            { pointTag: 'Schluss', hint: 'Gib mir Bescheid', keywords: ['kurz schreiben', 'ob', 'Zeit haben'], vi: 'Nhắn ngắn cho mình biết bạn có rảnh không nhé!', answers: ['Schreib mir kurz, ob du Zeit hast!', 'Sag mir bitte Bescheid, ob es klappt!'] }
          ],
          muster: 'Lieber Lukas,\n\nvor einer Woche bin ich endlich in meine neue Wohnung umgezogen! Sie hat zwei Zimmer, eine große Küche und ist sehr hell. Besonders gut gefällt mir, dass sie einen kleinen Balkon hat. Die U-Bahn ist gleich um die Ecke, deshalb bin ich schnell im Zentrum.\n\nIch möchte dir die Wohnung gern zeigen. Hast du am Sonntag um 15 Uhr Zeit für Kaffee und Kuchen? Schreib mir kurz, ob es klappt!\n\nViele Grüße\n[Dein Name]'
        },
        {
          title: 'Kurzurlaub am Meer berichten', theme: 'Urlaub & Reisen', register: 'informell (du)',
          scenario: 'Du warst am letzten Wochenende mit Freunden an der Ostsee. Deine Freundin Julia war neugierig und fragt, wie es war. Schreibe ihr eine E-Mail.',
          points: ['Sage, wo du warst und wie ihr hingefahren seid.', 'Erzähle, was ihr dort gemacht habt und wie das Wetter war.', 'Schreibe, ob du noch einmal dorthin fahren möchtest.'],
          analysis: ['Spiralthema A1 → A2: Perfekt + war/hatte + „obwohl“ oder „deshalb“!', 'Alle 3 Leitpunkte abdecken.'],
          anrede: 'Liebe Julia,', gruss: 'Liebe Grüße',
          sentences: [
            { pointTag: 'Punkt 1 · Reise', hint: 'Perfekt mit sein: gefahren', keywords: ['letztes Wochenende', 'Freunde', 'mit dem Zug', 'Ostsee'], vi: 'Cuối tuần trước mình đã đi tàu hỏa ra biển Baltic cùng hai người bạn.', answers: ['Letztes Wochenende bin ich mit zwei Freunden mit dem Zug an die Ostsee gefahren.', 'Am letzten Wochenende sind wir mit dem Zug an die Ostsee gefahren.'] },
            { pointTag: 'Punkt 1 · Unterkunft', hint: 'kleines Hotel am Strand', keywords: ['kleines Hotel', 'direkt am Strand', 'übernachten'], vi: 'Chúng mình đã ở trong một khách sạn nhỏ ngay sát bãi biển.', answers: ['Wir haben in einem kleinen Hotel direkt am Strand übernachtet.', 'Unser kleines Hotel war direkt am Strand.'] },
            { pointTag: 'Punkt 2 · Wetter', hint: 'war sonnig, aber windig', keywords: ['Samstag', 'Wetter', 'sonnig', 'aber', 'windig'], vi: 'Thứ Bảy trời có nắng nhưng hơi nhiều gió.', answers: ['Am Samstag war das Wetter sonnig, aber etwas windig.', 'Am Samstag hat die Sonne geschienen, aber es war windig.'] },
            { pointTag: 'Punkt 2 · Aktivität', hint: 'Perfekt: spazieren gegangen / gegessen', keywords: ['am Strand', 'spazieren gehen', 'frischer Fisch', 'essen'], vi: 'Chúng mình đã đi dạo dọc bãi biển và ăn cá tươi rất ngon.', answers: ['Wir sind am Strand spazieren gegangen und haben sehr leckeren frischen Fisch gegessen.', 'Wir haben einen Spaziergang am Strand gemacht und Fisch gegessen.'] },
            { pointTag: 'Punkt 2 · Sonntag', hint: 'weil + regnen', keywords: ['Sonntag', 'Café bleiben', 'weil', 'regnen'], vi: 'Chủ nhật chúng mình ngồi ở quán cà phê vì ngoài trời có mưa.', answers: ['Am Sonntag sind wir im Café geblieben, weil es geregnet hat.', 'Am Sonntag waren wir im Café, weil es geregnet hat.'] },
            { pointTag: 'Punkt 2 · Gefühl', hint: 'hatte viel Spaß', keywords: ['trotzdem', 'tolles Wochenende', 'viel Spaß haben'], vi: 'Dù vậy chúng mình vẫn có một cuối tuần tuyệt vời và rất vui.', answers: ['Trotzdem hatten wir ein tolles Wochenende und viel Spaß.', 'Es war trotzdem ein wunderschönes Wochenende.'] },
            { pointTag: 'Punkt 3 · Wunsch', hint: 'möchte im Sommer noch einmal …', keywords: ['im Sommer', 'noch einmal', 'dorthin fahren', 'schwimmen'], vi: 'Mùa hè này mình chắc chắn muốn quay lại đó một lần nữa để bơi.', answers: ['Im Sommer möchte ich unbedingt noch einmal dorthin fahren und im Meer schwimmen.', 'Im Sommer will ich noch einmal ans Meer fahren.'] },
            { pointTag: 'Schluss', hint: 'Kommst du … mit?', keywords: ['Lust haben', 'nächstes Mal', 'mitkommen'], vi: 'Lần tới bạn có muốn đi cùng chúng mình không?', answers: ['Hast du Lust, nächstes Mal mitzukommen?', 'Willst du im Sommer vielleicht mitkommen?'] }
          ],
          muster: 'Liebe Julia,\n\nletztes Wochenende bin ich mit zwei Freunden mit dem Zug an die Ostsee gefahren. Am Samstag war das Wetter sonnig, deshalb sind wir lange am Strand spazieren gegangen und haben frischen Fisch gegessen. Am Sonntag waren wir im Café, weil es geregnet hat.\n\nTrotzdem hatten wir viel Spaß! Im Sommer möchte ich unbedingt noch einmal dorthin fahren. Hast du Lust, dann mitzukommen?\n\nLiebe Grüße\n[Dein Name]'
        },
        {
          title: 'Kursanfrage an die Volkshochschule', theme: 'Kurse & Bildung', register: 'formell (Sie)',
          scenario: 'Sie möchten ab nächstem Monat einen neuen Deutschkurs (A2/B1) an der Volkshochschule besuchen. Schreiben Sie eine E-Mail an die Sprachschule.',
          points: ['Erklären Sie, welchen Kurs Sie suchen.', 'Fragen Sie nach den Kurszeiten und Kosten.', 'Fragen Sie, wie Sie sich anmelden können.'],
          analysis: ['Spiralthema A1 → A2: Indirekte Fragen mit „wann“ und „wie“ + „Könnten Sie“!', 'Formelle Anrede und Gruß nicht vergessen.'],
          anrede: 'Sehr geehrte Damen und Herren,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Ziel', hint: 'sich interessieren für', keywords: ['interessieren', 'Deutschkurs', 'Volkshochschule'], vi: 'Tôi quan tâm đến một khóa học tiếng Đức tại trung tâm giáo dục thường xuyên của quý vị.', answers: ['Ich interessiere mich für einen Deutschkurs an Ihrer Volkshochschule.', 'Ich möchte gern einen Deutschkurs an Ihrer Volkshochschule besuchen.'] },
            { pointTag: 'Punkt 1 · Niveau', hint: 'weil + verbessern möchte', keywords: ['A2-Kurs', 'suchen', 'weil', 'Deutsch verbessern'], vi: 'Tôi đang tìm một khóa A2 hoặc B1 vì tôi muốn cải thiện tiếng Đức cho công việc.', answers: ['Ich suche einen A2- oder B1-Kurs, weil ich mein Deutsch für den Beruf verbessern möchte.', 'Ich möchte einen B1-Kurs besuchen, weil ich mein Deutsch verbessern will.'] },
            { pointTag: 'Punkt 2 · Zeiten', hint: 'da / weil + tagsüber arbeiten', keywords: ['tagsüber arbeiten', 'deshalb', 'Abendkurs brauchen'], vi: 'Ban ngày tôi đi làm nên tôi cần một lớp học buổi tối.', answers: ['Ich arbeite tagsüber, deshalb brauche ich einen Abendkurs.', 'Weil ich tagsüber arbeite, kann ich nur am Abend lernen.'] },
            { pointTag: 'Punkt 2 · Frage', hint: 'Könnten Sie mir sagen, wann …?', keywords: ['sagen', 'wann', 'nächster Kurs', 'beginnen'], vi: 'Quý vị có thể cho tôi biết khóa học tiếp theo bắt đầu khi nào không?', answers: ['Könnten Sie mir bitte sagen, wann der nächste Kurs beginnt?', 'Wann beginnt der nächste Kurs am Abend?'] },
            { pointTag: 'Punkt 2 · Preis', hint: 'Wie viel kostet …?', keywords: ['wie viel kosten', 'Kurs', 'wie lange dauern'], vi: 'Khóa học có học phí bao nhiêu và kéo dài mấy tuần?', answers: ['Wie viel kostet der Kurs und wie viele Wochen dauert er?', 'Wie hoch ist der Preis und wie lange dauert der Kurs?'] },
            { pointTag: 'Punkt 3 · Anmeldung', hint: 'ob + online anmelden', keywords: ['fragen', 'ob', 'online anmelden können'], vi: 'Tôi cũng muốn hỏi xem mình có thể đăng ký trực tuyến được không.', answers: ['Ich möchte auch fragen, ob ich mich online anmelden kann.', 'Kann ich mich online anmelden oder muss ich persönlich kommen?'] },
            { pointTag: 'Punkt 3 · Test', hint: 'Einstufungstest', keywords: ['brauchen', 'Einstufungstest'], vi: 'Tôi có cần làm bài kiểm tra xếp lớp trước không?', answers: ['Muss ich vorher einen Einstufungstest machen?', 'Brauche ich einen Einstufungstest?'] },
            { pointTag: 'Schluss', hint: 'Vielen Dank im Voraus', keywords: ['Vielen Dank', 'im Voraus', 'Antwort'], vi: 'Xin cảm ơn quý vị trước và tôi mong nhận được thư trả lời.', answers: ['Vielen Dank im Voraus. Ich freue mich auf Ihre Antwort.', 'Vielen Dank für Ihre Informationen!'] }
          ],
          muster: 'Sehr geehrte Damen und Herren,\n\nich interessiere mich für einen Deutschkurs an Ihrer Volkshochschule, weil ich mein Deutsch für den Beruf verbessern möchte. Ich arbeite tagsüber, deshalb suche ich einen Abendkurs.\n\nKönnten Sie mir bitte sagen, wann der nächste Kurs beginnt und wie viel er kostet? Kann ich mich online anmelden?\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\n[Ihr Name]'
        },
        {
          title: 'Problem mit einer Online-Bestellung', theme: 'Einkaufen', register: 'formell (Sie)',
          scenario: 'Sie haben online Kopfhörer bestellt. Das Paket ist heute angekommen, aber die Kopfhörer funktionieren nicht. Schreiben Sie an den Kundenservice.',
          points: ['Sagen Sie, was und wann Sie bestellt haben.', 'Beschreiben Sie das Problem genau.', 'Sagen Sie, was der Shop tun soll (Umtausch oder Geld zurück).'],
          analysis: ['Spiralthema A1 → A2: Perfekt + „aber“ + „deshalb bitte ich Sie“!', 'Sachlich und höflich mit „Sie“ bleiben.'],
          anrede: 'Sehr geehrte Damen und Herren,', gruss: 'Mit freundlichen Grüßen',
          sentences: [
            { pointTag: 'Punkt 1 · Bestellung', hint: 'Perfekt: bestellt', keywords: ['vor fünf Tagen', 'Online-Shop', 'Kopfhörer', 'bestellen'], vi: 'Cách đây năm ngày tôi đã đặt mua một chiếc tai nghe tại cửa hàng trực tuyến của quý vị.', answers: ['Vor fünf Tagen habe ich in Ihrem Online-Shop Kopfhörer bestellt.', 'Ich habe vor fünf Tagen bei Ihnen Kopfhörer bestellt.'] },
            { pointTag: 'Punkt 1 · Nummer', hint: 'Bestellnummer', keywords: ['Bestellnummer', '88210'], vi: 'Số đơn hàng của tôi là 88210.', answers: ['Meine Bestellnummer ist 88210.', 'Die Bestellnummer lautet 88210.'] },
            { pointTag: 'Punkt 2 · Lieferung', hint: 'heute angekommen + aber', keywords: ['heute', 'Paket ankommen', 'aber', 'nicht funktionieren'], vi: 'Hôm nay gói hàng đã giao tới, nhưng tai nghe lại không hoạt động.', answers: ['Heute ist das Paket angekommen, aber die Kopfhörer funktionieren leider nicht.', 'Das Paket kam heute an, aber das Gerät funktioniert nicht.'] },
            { pointTag: 'Punkt 2 · Detail', hint: 'kein Ton / kaputt', keywords: ['rechte Seite', 'kein Ton', 'kaputt sein'], vi: 'Bên tai phải không có âm thanh nào cả; có lẽ nó đã bị hỏng.', answers: ['Auf der rechten Seite gibt es keinen Ton; sie sind wahrscheinlich kaputt.', 'Man hört rechts nichts, weil die Kopfhörer defekt sind.'] },
            { pointTag: 'Punkt 2 · Gefühl', hint: 'sehr schade, weil …', keywords: ['schade', 'weil', 'Geschenk sein'], vi: 'Điều này thật đáng tiếc vì tôi mua nó để làm quà sinh nhật.', answers: ['Das ist sehr schade, weil sie ein Geburtstagsgeschenk sind.', 'Ich bin enttäuscht, weil ich sie dringend brauche.'] },
            { pointTag: 'Punkt 3 · Lösung', hint: 'Deshalb möchte ich … umtauschen', keywords: ['deshalb', 'Kopfhörer', 'umtauschen', 'neue bekommen'], vi: 'Vì vậy tôi muốn đổi chiếc tai nghe này lấy một chiếc mới.', answers: ['Deshalb möchte ich die Kopfhörer umtauschen und ein neues Paar bekommen.', 'Deshalb bitte ich Sie um einen Umtausch oder mein Geld zurück.'] },
            { pointTag: 'Punkt 3 · Rücksendung', hint: 'Wie kann ich … zurückschicken?', keywords: ['wie', 'kaputte Kopfhörer', 'zurückschicken'], vi: 'Tôi có thể gửi trả chiếc tai nghe bị hỏng bằng cách nào?', answers: ['Wie kann ich die kaputten Kopfhörer zurückschicken?', 'Könnten Sie mir bitte sagen, wie ich das Paket zurückschicken kann?'] },
            { pointTag: 'Schluss', hint: 'schnelle Antwort', keywords: ['hoffen', 'schnelle Antwort', 'Vielen Dank'], vi: 'Tôi mong nhận được phản hồi nhanh chóng. Xin cảm ơn quý vị.', answers: ['Ich hoffe auf eine schnelle Antwort. Vielen Dank!', 'Vielen Dank für Ihre schnelle Hilfe.'] }
          ],
          muster: 'Sehr geehrte Damen und Herren,\n\nvor fünf Tagen habe ich in Ihrem Online-Shop Kopfhörer bestellt (Bestellnummer 88210). Heute ist das Paket angekommen, aber die Kopfhörer funktionieren leider nicht, weil man rechts keinen Ton hört.\n\nDeshalb möchte ich die Kopfhörer umtauschen oder mein Geld zurückbekommen. Wie kann ich das Paket zurückschicken?\n\nVielen Dank für Ihre schnelle Antwort.\nMit freundlichen Grüßen\n[Ihr Name]'
        }
      ]
    }
  ]
};
