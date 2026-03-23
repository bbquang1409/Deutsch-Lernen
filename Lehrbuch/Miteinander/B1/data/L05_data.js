const L05_WORDS = [
  // ── Abschnitt 1 ──
  { de:"der Bürgermeister", art:"der", vi:"thị trưởng (nam)", vi_alts:["thị trưởng"], ex:"Wenn man Fragen hat, kann man der Bürgermeisterin eine E-Mail schicken.", section:"1" },
  { de:"die Bürgermeisterin", art:"die", vi:"thị trưởng (nữ)", vi_alts:["nữ thị trưởng"], ex:"Die Bürgermeisterin hält eine Rede.", section:"1" },
  { de:"die Rede", art:"die", vi:"bài diễn văn / bài phát biểu", vi_alts:["bài phát biểu","diễn văn"], ex:"Die Bürgermeisterin hält eine Rede.", section:"1" },
  { de:"das Plakat", art:"das", vi:"tờ áp phích / poster", vi_alts:["poster","áp phích"], ex:"Die Bürger:innen haben ein Plakat gestaltet.", section:"1" },
  { de:"ankündigen", art:"", vi:"thông báo trước / báo trước", vi_alts:["thông báo","báo trước"], ex:"Sie kündigt eine Veranstaltung an.", section:"1" },
  { de:"die Staatsangehörigkeit", art:"die", vi:"quốc tịch", vi_alts:["quốc tịch"], ex:"Der Briefträger hat die türkische Staatsangehörigkeit.", section:"1" },
  { de:"die Fähigkeit", art:"die", vi:"khả năng / năng lực", vi_alts:["năng lực","năng khiếu"], ex:"Da sind alle die Menschen, die unterschiedliche Fähigkeiten haben.", section:"1" },
  { de:"blind", art:"", vi:"mù / khiếm thị", vi_alts:["mù lòa","khiếm thị"], ex:"Bei uns im Haus wohnt ein blinder Mann.", section:"1" },
  { de:"türkisch", art:"", vi:"thuộc Thổ Nhĩ Kỳ / tiếng Thổ", vi_alts:["Thổ Nhĩ Kỳ","tiếng Thổ Nhĩ Kỳ"], ex:"In meinem Viertel gibt es verschiedene Restaurants, zum Beispiel türkische.", section:"1" },
  { de:"die Bibliothek", art:"die", vi:"thư viện", vi_alts:["thư viện"], ex:"Die Gesprächsrunde findet in der Stadtbibliothek statt.", section:"1" },
  { de:"betreuen", art:"", vi:"chăm sóc / phụ trách", vi_alts:["phụ trách","trông nom"], ex:"Zofia betreut die Themenwoche mit zwei Kollegen.", section:"1" },

  // ── A1 ──
  { de:"die Präsentation", art:"die", vi:"bài thuyết trình", vi_alts:["thuyết trình","bài trình bày"], ex:"Wir möchten gern bei der Posterpräsentation mitmachen.", section:"A1" },
  { de:"der Gegenstand", art:"der", vi:"đồ vật / vật thể", vi_alts:["vật dụng","đồ dùng"], ex:"Zu uns kommen Menschen, die kaputte Gegenstände nicht wegwerfen wollen.", section:"A1" },
  { de:"wegwerfen", art:"", vi:"vứt bỏ", vi_alts:["ném đi","bỏ đi"], ex:"Zu uns kommen Menschen, die kaputte Gegenstände nicht wegwerfen wollen.", section:"A1" },
  { de:"der Stecker", art:"der", vi:"phích cắm điện", vi_alts:["cái phích","đầu cắm điện"], ex:"Ich denke, sie reparieren zum Beispiel Stecker.", section:"A1" },
  { de:"die Handtasche", art:"die", vi:"túi xách tay", vi_alts:["túi xách","ví tay"], ex:"Ja, und vielleicht auch Handtaschen?", section:"A1" },
  { de:"das Mobiltelefon", art:"das", vi:"điện thoại di động", vi_alts:["điện thoại","điện thoại di động"], ex:"Ich habe ein kaputtes Mobiltelefon.", section:"A1" },
  { de:"die Bremse", art:"die", vi:"phanh (xe)", vi_alts:["phanh xe","thắng xe"], ex:"Könnt ihr die Fahrradbremse reparieren?", section:"A1" },
  { de:"der Monitor", art:"der", vi:"màn hình máy tính", vi_alts:["màn hình","monitor"], ex:"Ich bringe einen Monitor und eine Tastatur ins Reparaturcafé.", section:"A1" },
  { de:"die Tastatur", art:"die", vi:"bàn phím", vi_alts:["bàn phím máy tính"], ex:"Ich bringe einen Monitor und eine Tastatur ins Reparaturcafé.", section:"A1" },

  // ── A2 ──
  { de:"die Fernbedienung", art:"die", vi:"điều khiển từ xa", vi_alts:["remote","điều khiển"], ex:"Das ist die Fernbedienung, die nicht mehr funktioniert.", section:"A2" },
  { de:"das Festnetz", art:"das", vi:"điện thoại cố định", vi_alts:["điện thoại bàn","điện thoại cố định"], ex:"Das Reparaturcafé repariert auch Festnetztelefone.", section:"A2" },
  { de:"das Mountainbike", art:"das", vi:"xe đạp leo núi", vi_alts:["xe đạp địa hình","mountain bike"], ex:"Das Reparaturcafé repariert auch Mountainbikes.", section:"A2" },
  { de:"die Klingel", art:"die", vi:"chuông (xe đạp/cửa)", vi_alts:["chuông","chuông xe đạp"], ex:"Das Reparaturcafé repariert auch Fahrradklingeln.", section:"A2" },
  { de:"der Motorroller", art:"der", vi:"xe tay ga", vi_alts:["xe scooter","tay ga"], ex:"Das Reparaturcafé repariert auch Motorroller.", section:"A2" },
  { de:"der Rechner", art:"der", vi:"máy tính (PC)", vi_alts:["máy vi tính","PC"], ex:"Das Reparaturcafé repariert aber keine Rechner.", section:"A2" },

  // ── A3 ──
  { de:"kleben", art:"", vi:"dán / dính", vi_alts:["dán","dán keo"], ex:"Nazan schneidet Bilder aus Zeitschriften aus und klebt sie auf das Poster.", section:"A3" },
  { de:"die Überschrift", art:"die", vi:"tiêu đề / đầu đề", vi_alts:["tiêu đề","đầu đề"], ex:"Heinz gestaltet die Überschrift für das Poster.", section:"A3" },

  // ── A4 ──
  { de:"der Experte", art:"der", vi:"chuyên gia (nam)", vi_alts:["chuyên gia"], ex:"Außerdem ist er unser Experte für Elektrogeräte.", section:"A4" },
  { de:"die Expertin", art:"die", vi:"chuyên gia (nữ)", vi_alts:["nữ chuyên gia"], ex:"Sie ist unsere Expertin.", section:"A4" },
  { de:"die Zeichnung", art:"die", vi:"bản vẽ / hình vẽ", vi_alts:["hình vẽ","bức vẽ"], ex:"Dieses Poster gefällt mir gut – die Zeichnungen sind echt lustig!", section:"A4" },

  // ── B1 ──
  { de:"schütteln", art:"", vi:"lắc / bắt tay (lắc)", vi_alts:["lắc","vẫy"], ex:"Ein Punkt, der häufig ein Problem für sie ist, ist die Sache mit dem Händeschütteln.", section:"B1" },
  { de:"der Blick", art:"der", vi:"cái nhìn / ánh mắt", vi_alts:["ánh mắt","cái liếc nhìn"], ex:"Aber deine Blicke mag ich am meisten!", section:"B1" },
  { de:"der Humor", art:"der", vi:"khiếu hài hước", vi_alts:["tính hài hước","sự hài hước"], ex:"Ich mag den Humor an dir.", section:"B1" },
  { de:"die Schrift", art:"die", vi:"chữ viết / kiểu chữ", vi_alts:["chữ viết","chữ"], ex:"Die Schrift ist schön.", section:"B1" },

  // ── B3 ──
  { de:"sich gewöhnen", art:"", vi:"quen với / làm quen", vi_alts:["làm quen","quen dần"], ex:"Ich musste mich zuerst daran gewöhnen, dass Pünktlichkeit hier so wichtig ist.", section:"B3" },
  { de:"die Uniform", art:"die", vi:"đồng phục", vi_alts:["đồng phục học sinh"], ex:"Die Kinder haben keine Schuluniform.", section:"B3" },
  { de:"gewohnt", art:"", vi:"quen thuộc / đã quen", vi_alts:["quen rồi","thường ngày"], ex:"Das war auch ungewohnt für mich.", section:"B3" },

  // ── C1 ──
  { de:"individuell", art:"", vi:"cá nhân / riêng lẻ", vi_alts:["riêng lẻ","của mỗi người"], ex:"Jede/Jeder hat eine individuelle Geschichte.", section:"C1" },
  { de:"der Faktor", art:"der", vi:"yếu tố / nhân tố", vi_alts:["nhân tố","yếu tố"], ex:"Das wird von verschiedenen Faktoren bestimmt.", section:"C1" },
  { de:"bestimmen", art:"", vi:"quyết định / xác định", vi_alts:["xác định","quy định"], ex:"Das wird von verschiedenen Faktoren bestimmt.", section:"C1" },
  { de:"zusammenleben", art:"", vi:"sống cùng nhau / chung sống", vi_alts:["sống chung","cùng sống"], ex:"Die anderen Menschen, die mit uns zusammenleben, spielen eine wichtige Rolle.", section:"C1" },
  { de:"ebenso", art:"", vi:"cũng vậy / tương tự", vi_alts:["tương tự như vậy","cũng như"], ex:"Ebenso wie die Bücher, die wir lesen.", section:"C1" },
  { de:"nachholen", art:"", vi:"bù lại / làm bù", vi_alts:["làm bù","bù lại"], ex:"Wir haben die Veranstaltung aber am Sonntag nachgeholt.", section:"C1" },
  { de:"völlig", art:"", vi:"hoàn toàn / tuyệt đối", vi_alts:["hoàn toàn","hoàn toàn đúng"], ex:"Tomas findet es völlig okay, als Hebamme zu arbeiten.", section:"C1" },

  // ── C2 ──
  { de:"sodass", art:"", vi:"do đó / vì vậy mà", vi_alts:["vì vậy","cho nên"], ex:"Aber es war sehr kalt, sodass wir nicht lange draußen bleiben konnten.", section:"C2" },
];

const L05_DIALOGS = [
  { de:"Wir möchten gern mitmachen.", vi:"Chúng tôi muốn tham gia." },
  { de:"Welche Fähigkeiten haben Sie?", vi:"Bạn có những kỹ năng gì?" },
  { de:"Ich habe ein kaputtes Mobiltelefon.", vi:"Tôi có một chiếc điện thoại bị hỏng." },
  { de:"Könnt ihr das reparieren?", vi:"Các bạn có thể sửa cái này không?" },
  { de:"Das ist ein Missverständnis.", vi:"Đó là một sự hiểu lầm." },
  { de:"Die Stimmung im Haus ist gut.", vi:"Không khí trong nhà rất tốt." },
  { de:"Ich musste mich daran gewöhnen.", vi:"Tôi phải quen với điều đó." },
  { de:"Das war auch ungewohnt für mich.", vi:"Điều đó cũng khác lạ với tôi." },
  { de:"Jeder hat eine individuelle Geschichte.", vi:"Mỗi người có một câu chuyện riêng." },
  { de:"Wir haben die Veranstaltung nachgeholt.", vi:"Chúng tôi đã tổ chức bù sự kiện đó." },
];

// ============================================================
// LEKTION 06 – Amadou – Miteinander reden
// ============================================================
