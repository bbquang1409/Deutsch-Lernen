const L07_WORDS = [
  // ── Abschnitt 1 ──
  { de:"zurücklaufen", art:"", vi:"chạy quay lại", vi_alts:["chạy trở lại"], ex:"Timur musste nach Hause zurücklaufen, weil er etwas Wichtiges vergessen hatte.", section:"1" },
  { de:"losfahren", art:"", vi:"khởi hành / xuất phát", vi_alts:["xuất phát","bắt đầu đi"], ex:"Der Zug sollte eigentlich um zehn Minuten vor zwölf losfahren.", section:"1" },

  // ── Abschnitt 2 ──
  { de:"fallen", art:"", vi:"ngã / rơi", vi_alts:["bị ngã","rơi xuống"], ex:"Mario fällt hin. Zum Glück ist er nicht verletzt.", section:"2" },
  { de:"sich hinsetzen", art:"", vi:"ngồi xuống", vi_alts:["ngồi xuống","ngồi vào"], ex:"Bitte sucht euch Plätze und setzt euch hin.", section:"2" },
  { de:"mitgehen", art:"", vi:"đi cùng", vi_alts:["đi theo","cùng đi"], ex:"Eric will am Sonntag ins Schwimmbad. Möchtest du mitgehen?", section:"2" },
  { de:"schießen", art:"", vi:"bắn / sút (bóng)", vi_alts:["sút bóng","ném bóng"], ex:"Timur schießt, aber der Ball fliegt am Tor vorbei!", section:"2" },
  { de:"weglaufen", art:"", vi:"chạy trốn / bỏ chạy", vi_alts:["bỏ chạy","tẩu thoát"], ex:"Mein Hund läuft manchmal weg.", section:"2" },
  { de:"wegfahren", art:"", vi:"lái đi / rời đi bằng xe", vi_alts:["lái đi","chạy đi"], ex:"Würden Sie bitte wegfahren?", section:"2" },
  { de:"wegbringen", art:"", vi:"mang đi / đem đi", vi_alts:["đem đi","mang ra ngoài"], ex:"Banna, bitte bring den Müll weg!", section:"2" },
  { de:"zurückfahren", art:"", vi:"lái quay lại / quay về", vi_alts:["quay về","lái trở lại"], ex:"Sollen wir zurückfahren?", section:"2" },

  // ── A1 ──
  { de:"die Entwicklung", art:"die", vi:"sự phát triển", vi_alts:["phát triển","sự tiến triển"], ex:"Sie sprechen über die Entwicklung des Teams.", section:"A1" },
  { de:"aussprechen", art:"", vi:"phát âm / nói ra", vi_alts:["phát âm","nói lên"], ex:"David konnte am Anfang kein ü und kein ch aussprechen.", section:"A1" },
  { de:"national-", art:"", vi:"quốc gia / dân tộc (tiền tố)", vi_alts:["quốc gia","toàn quốc"], ex:"Amadou findet das Wort Fußballnationalmannschaft gut.", section:"A1" },
  { de:"die Aussprache", art:"die", vi:"cách phát âm", vi_alts:["phát âm","cách đọc"], ex:"Er hat jeden Tag seine Aussprache trainiert.", section:"A1" },
  { de:"daher", art:"", vi:"vì thế / do đó", vi_alts:["do đó","vì vậy"], ex:"Daher ist es ganz normal, dass dir das englische Wort manchmal nicht sofort einfällt.", section:"A1" },
  { de:"deswegen", art:"", vi:"vì thế / vì lẽ đó", vi_alts:["vì vậy","do đó"], ex:"Deswegen ist das Sprechen jetzt auch viel einfacher.", section:"A1" },
  { de:"darum", art:"", vi:"vì vậy / vì lý do đó", vi_alts:["vì vậy","vì điều đó"], ex:"Darum habe ich jeden Tag meine Aussprache trainiert.", section:"A1" },

  // ── A2 ──
  { de:"das Alphabet", art:"das", vi:"bảng chữ cái", vi_alts:["chữ cái","abc"], ex:"Musstest du im Deutschkurs das deutsche Alphabet lernen?", section:"A2" },
  { de:"interkulturell", art:"", vi:"liên văn hóa / đa văn hóa", vi_alts:["đa văn hóa","giữa các nền văn hóa"], ex:"Im Unterricht gibt es immer wieder interkulturelle Probleme.", section:"A2" },
  { de:"nachschlagen", art:"", vi:"tra (từ điển) / tìm kiếm", vi_alts:["tra từ điển","tra cứu"], ex:"Schwierigen Wortschatz kannst du im Wörterbuch nachschlagen.", section:"A2" },
  { de:"der Intensivkurs", art:"der", vi:"khóa học cấp tốc", vi_alts:["lớp học tăng cường","khóa học chuyên sâu"], ex:"In einem Intensivkurs lernt man in kurzer Zeit sehr viel.", section:"A2" },
  { de:"vorlesen", art:"", vi:"đọc to lên / đọc cho nghe", vi_alts:["đọc to","đọc lên"], ex:"Im Internet kann man sich Texte vorlesen lassen.", section:"A2" },
  { de:"die Nachhilfe", art:"die", vi:"học thêm / dạy kèm", vi_alts:["dạy kèm","học thêm"], ex:"Mein Sohn nimmt jetzt einmal pro Woche Nachhilfe.", section:"A2" },
  { de:"die Schwierigkeit", art:"die", vi:"khó khăn", vi_alts:["sự khó khăn","điều khó"], ex:"Ich hatte früher große Schwierigkeiten mit der Aussprache.", section:"A2" },
  { de:"anfangs", art:"", vi:"lúc đầu / ban đầu", vi_alts:["ban đầu","lúc mới đầu"], ex:"Daher habe ich anfangs jeden Tag vor dem Spiegel trainiert.", section:"A2" },
  { de:"der Buchstabe", art:"der", vi:"chữ cái", vi_alts:["chữ cái","ký tự"], ex:"In unserer Schrift gibt es keine Großbuchstaben.", section:"A2" },
  { de:"abschreiben", art:"", vi:"chép lại / sao chép", vi_alts:["chép lại","viết lại"], ex:"Deswegen schreibe ich oft schöne Sätze aus Magazinen und Büchern ab.", section:"A2" },
  { de:"das Magazin", art:"das", vi:"tạp chí", vi_alts:["tạp chí","báo tạp chí"], ex:"Ich schreibe Sätze aus Magazinen und Büchern ab.", section:"A2" },
  { de:"folgend", art:"", vi:"tiếp theo / sau đây", vi_alts:["như sau","tiếp theo"], ex:"Ich habe leider folgendes Problem.", section:"A2" },
  { de:"der Dialekt", art:"der", vi:"tiếng địa phương / thổ ngữ", vi_alts:["tiếng vùng","thổ ngữ"], ex:"Meine Nachbarin spricht im Dialekt.", section:"A2" },
  { de:"schwer", art:"", vi:"khó / nặng", vi_alts:["khó khăn","khó hiểu"], ex:"Sie spricht im Dialekt, darum kann ich sie manchmal schwer verstehen.", section:"A2" },

  // ── A3 ──
  { de:"die Geschwindigkeitsbeschränkung", art:"die", vi:"giới hạn tốc độ", vi_alts:["hạn chế tốc độ","tốc độ giới hạn"], ex:"Das längste Wort, das ich kenne, ist Geschwindigkeitsbeschränkung.", section:"A3" },
  { de:"die Unterhose", art:"die", vi:"quần lót", vi_alts:["quần lót","đồ lót dưới"], ex:"Das Wort Unterhose gefällt mir auch, weil man das so leicht merken kann.", section:"A3" },
  { de:"sich merken", art:"", vi:"ghi nhớ / nhớ thuộc", vi_alts:["nhớ","ghi nhớ"], ex:"Deswegen ist das seitdem mein Lieblingswort.", section:"A3" },
  { de:"seitdem", art:"", vi:"từ đó / kể từ đó", vi_alts:["từ đó đến nay","kể từ khi"], ex:"Deswegen ist das seitdem mein Lieblingswort.", section:"A3" },

  // ── B1 ──
  { de:"der Sieg", art:"der", vi:"chiến thắng / thắng lợi", vi_alts:["thắng lợi","chiến thắng"], ex:"Glückwunsch zu eurem Sieg: 4:3!", section:"B1" },
  { de:"die Saison", art:"die", vi:"mùa giải / mùa", vi_alts:["mùa giải bóng đá","mùa"], ex:"Amadous Mannschaft muss in dieser Saison noch einmal spielen.", section:"B1" },

  // ── B2 ──
  { de:"je … desto …", art:"", vi:"càng … càng …", vi_alts:["càng ... thì càng ..."], ex:"Je länger man in einem Land lebt, desto besser klappt das Sprechen.", section:"B2" },
  { de:"je … umso …", art:"", vi:"càng … càng … (biến thể)", vi_alts:["càng nhiều thì càng"], ex:"Je schneller man Deutsch lernt, umso leichter wird es.", section:"B2" },
  { de:"die Arbeitsstelle", art:"die", vi:"chỗ làm / vị trí công việc", vi_alts:["nơi làm việc","vị trí làm việc"], ex:"Je schneller man Deutsch lernt, umso leichter wird es, eine Arbeitsstelle zu finden.", section:"B2" },
  { de:"der Ausbildungsplatz", art:"der", vi:"chỗ học nghề / suất học nghề", vi_alts:["suất học nghề","chỗ học việc"], ex:"Je schneller man Deutsch lernt, umso leichter wird es, einen Ausbildungsplatz zu finden.", section:"B2" },

  // ── B3 ──
  { de:"der Lerner", art:"der", vi:"người học (nam)", vi_alts:["người học","học viên"], ex:"Die Lernerinnen und Lerner arbeiten in einer Gruppe zusammen.", section:"B3" },
  { de:"die Lernerin", art:"die", vi:"người học (nữ)", vi_alts:["học viên nữ"], ex:"", section:"B3" },
  { de:"diskutieren", art:"", vi:"tranh luận / thảo luận", vi_alts:["thảo luận","bàn luận"], ex:"In meinem Kurs diskutieren wir sogar mit der Lehrerin.", section:"B3" },
  { de:"der Schüler", art:"der", vi:"học sinh (nam)", vi_alts:["học sinh","học trò"], ex:"Die Lehrerin hat immer geschimpft, wenn die Schülerinnen und Schüler etwas falsch gemacht haben.", section:"B3" },
  { de:"die Schülerin", art:"die", vi:"học sinh (nữ)", vi_alts:["nữ học sinh"], ex:"", section:"B3" },
  { de:"damals", art:"", vi:"hồi đó / ngày xưa", vi_alts:["trước đây","hồi đó"], ex:"Das war bei mir damals anders.", section:"B3" },

  // ── C1 ──
  { de:"unentschieden", art:"", vi:"hòa / không phân thắng bại", vi_alts:["hòa nhau","kết quả hòa"], ex:"Ich hoffe, ihr seid nicht enttäuscht, dass wir gegen Isselheim nur unentschieden gespielt haben.", section:"C1" },
  { de:"sich erholen", art:"", vi:"nghỉ ngơi / phục hồi", vi_alts:["phục hồi","nghỉ dưỡng"], ex:"Ich lerne Gitarre. Das Üben macht Spaß und ich erhole mich dabei.", section:"C1" },
  { de:"integrieren", art:"", vi:"hội nhập / tích hợp", vi_alts:["hòa nhập","tích hợp"], ex:"Du hast es geschafft, auch die neuen Spieler schnell ins Team zu integrieren.", section:"C1" },
  { de:"stark", art:"", vi:"mạnh mẽ / khỏe mạnh", vi_alts:["mạnh","khỏe"], ex:"Mit dir als Trainer ist die Mannschaft stärker und besser geworden.", section:"C1" },
  { de:"die Geduld", art:"die", vi:"sự kiên nhẫn", vi_alts:["kiên nhẫn","sự nhẫn nại"], ex:"Vielen Dank für deine Hilfe, deine Zeit und deine Geduld.", section:"C1" },
];

const L07_DIALOGS = [
  { de:"Möchtest du mitgehen?", vi:"Bạn có muốn đi cùng không?" },
  { de:"Sollen wir zurückfahren?", vi:"Chúng ta có nên quay lại không?" },
  { de:"Würden Sie bitte wegfahren?", vi:"Làm ơn lái xe đi chỗ khác được không?" },
  { de:"Je länger man lebt, desto besser klappt das.", vi:"Càng sống lâu thì càng làm tốt hơn." },
  { de:"Ich hatte anfangs große Schwierigkeiten.", vi:"Lúc đầu tôi gặp rất nhiều khó khăn." },
  { de:"Du kannst es im Wörterbuch nachschlagen.", vi:"Bạn có thể tra trong từ điển." },
  { de:"In einem Intensivkurs lernt man sehr viel.", vi:"Trong khóa học cấp tốc người ta học được rất nhiều." },
  { de:"Glückwunsch zu eurem Sieg!", vi:"Chúc mừng chiến thắng của các bạn!" },
  { de:"Vielen Dank für deine Geduld.", vi:"Cảm ơn rất nhiều vì sự kiên nhẫn của bạn." },
  { de:"Das war bei mir damals anders.", vi:"Hồi đó điều đó khác với tôi." },
];

// ============================================================
// LEKTION 08 – Hoa – Der Glückspilz
// ============================================================
