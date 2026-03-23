const L08_WORDS = [
  // ── Abschnitt 1 ──
  { de:"tauschen", art:"", vi:"đổi / trao đổi", vi_alts:["hoán đổi","trao đổi"], ex:"Sie tauschen heute die Rollen.", section:"1" },
  { de:"der Versuch", art:"der", vi:"lần thử / thử nghiệm", vi_alts:["thử nghiệm","lần thử"], ex:"Hoa braucht mehrere Versuche.", section:"1" },
  { de:"der Metzger", art:"der", vi:"người bán thịt (nam)", vi_alts:["người bán thịt","tiểu thương thịt"], ex:"Er ist nicht Metzger und auch nicht Erzieher.", section:"1" },
  { de:"die Metzgerin", art:"die", vi:"người bán thịt (nữ)", vi_alts:["nữ người bán thịt"], ex:"", section:"1" },
  { de:"das Tier", art:"das", vi:"con vật / thú", vi_alts:["con thú","động vật"], ex:"Sag mal, mag Tessa eigentlich Tiere?", section:"1" },
  { de:"das Kraftfahrzeug", art:"das", vi:"xe cơ giới / phương tiện cơ giới", vi_alts:["xe có động cơ","phương tiện cơ giới"], ex:"Kostja ist Kfz-Mechatroniker.", section:"1" },
  { de:"das Kfz", art:"das", vi:"xe (viết tắt Kraftfahrzeug)", vi_alts:["ô tô","xe cơ giới"], ex:"Kostja ist Kfz-Mechatroniker.", section:"1" },

  // ── Abschnitt 2 ──
  { de:"der Spezialist", art:"der", vi:"chuyên gia / chuyên viên (nam)", vi_alts:["chuyên gia","chuyên viên"], ex:"Ich wollte immer schon Spezialist für Elektromotoren werden.", section:"2" },
  { de:"die Spezialistin", art:"die", vi:"chuyên gia / chuyên viên (nữ)", vi_alts:["nữ chuyên gia"], ex:"", section:"2" },

  // ── A1 ──
  { de:"der Bereich", art:"der", vi:"lĩnh vực / khu vực", vi_alts:["khu vực","lĩnh vực"], ex:"In vielen Bereichen fehlen Fachkräfte.", section:"A1" },
  { de:"die Fachkraft", art:"die", vi:"nhân lực có chuyên môn", vi_alts:["lao động có tay nghề","chuyên viên"], ex:"In vielen Bereichen fehlen Fachkräfte.", section:"A1" },
  { de:"die Gaststätte", art:"die", vi:"nhà hàng / quán ăn", vi_alts:["nhà hàng","quán ăn"], ex:"Es werden Fachkräfte in der Gastronomie gesucht, also z. B. in Gaststätten.", section:"A1" },
  { de:"leiden", art:"", vi:"chịu đựng / khổ sở", vi_alts:["khổ sở","đau khổ"], ex:"Auch das Handwerk leidet sehr unter dem Fachkräftemangel.", section:"A1" },
  { de:"klassisch", art:"", vi:"cổ điển / truyền thống", vi_alts:["truyền thống","kiểu cổ điển"], ex:"Nicht nur die klassischen Lehrlinge werden gesucht.", section:"A1" },
  { de:"der Lehrling", art:"der", vi:"học nghề / người học việc", vi_alts:["người học việc","học viên nghề"], ex:"Nicht nur die klassischen Lehrlinge werden gesucht.", section:"A1" },
  { de:"die Aussicht", art:"die", vi:"triển vọng / cơ hội", vi_alts:["triển vọng","khả năng"], ex:"Auch ältere Bewerber*innen mit Berufserfahrung haben sehr gute Aussichten.", section:"A1" },
  { de:"usw. (und so weiter)", art:"", vi:"vân vân / v.v.", vi_alts:["v.v.","và những thứ khác"], ex:"Wie kann man Miete, Essen usw. bezahlen?", section:"A1" },
  { de:"staatlich", art:"", vi:"nhà nước / của nhà nước", vi_alts:["của nhà nước","công lập"], ex:"Die meisten wissen nicht, dass es staatliche Unterstützung gibt.", section:"A1" },
  { de:"die Tätigkeit", art:"die", vi:"hoạt động / công việc", vi_alts:["công việc","nhiệm vụ"], ex:"Wenn Sie eine neue Tätigkeit haben wollen, dann informieren Sie sich gleich.", section:"A1" },
  { de:"das Bundesland", art:"das", vi:"bang / tiểu bang", vi_alts:["tiểu bang","bang của Đức"], ex:"Auch die Industrie- und Handelskammern in jedem Bundesland bieten Beratungsgespräche an.", section:"A1" },
  { de:"die Grafik", art:"die", vi:"biểu đồ / đồ thị", vi_alts:["biểu đồ","sơ đồ"], ex:"Die Grafik zeigt eine ziemlich geringe Zahl von Personen.", section:"A1" },
  { de:"das Einkommen", art:"das", vi:"thu nhập", vi_alts:["thu nhập","tiền lương"], ex:"Jeder Dritte freut sich nach einer Weiterbildung über ein höheres Einkommen!", section:"A1" },
  { de:"die Stelle", art:"die", vi:"vị trí / chỗ làm", vi_alts:["chỗ làm","vị trí công việc"], ex:"Fast die Hälfte bekommt sofort eine bessere Stelle.", section:"A1" },
  { de:"der Wissenschaftler", art:"der", vi:"nhà khoa học (nam)", vi_alts:["nhà khoa học"], ex:"Ich finde, Wissenschaftler ist ein interessanterer Beruf als Architekt.", section:"A1" },
  { de:"die Wissenschaftlerin", art:"die", vi:"nhà khoa học (nữ)", vi_alts:["nữ nhà khoa học"], ex:"", section:"A1" },
  { de:"der Architekt", art:"der", vi:"kiến trúc sư (nam)", vi_alts:["kiến trúc sư"], ex:"Ich finde, Wissenschaftler ist ein interessanterer Beruf als Architekt.", section:"A1" },
  { de:"die Architektin", art:"die", vi:"kiến trúc sư (nữ)", vi_alts:["nữ kiến trúc sư"], ex:"", section:"A1" },

  // ── A3 ──
  { de:"das Wissen", art:"das", vi:"kiến thức / tri thức", vi_alts:["tri thức","kiến thức"], ex:"80 Prozent geben an, dass sie mehr Wissen und bessere Kenntnisse im Beruf haben.", section:"A3" },
  { de:"betragen", art:"", vi:"chiếm / bằng / lên đến", vi_alts:["là","bằng"], ex:"Der Anteil der Leute, die mehr Gehalt bekommen, beträgt 34 Prozent.", section:"A3" },
  { de:"die Verbesserung", art:"die", vi:"sự cải thiện / sự tiến bộ", vi_alts:["cải tiến","tiến bộ"], ex:"Die Grafik zeigt, welche Verbesserungen eine Weiterbildung bringt.", section:"A3" },
  { de:"der Wert", art:"der", vi:"giá trị / chỉ số", vi_alts:["giá trị","chỉ số"], ex:"Die Werte für mehr Selbstbewusstsein und Zufriedenheit liegen bei 62 Prozent.", section:"A3" },

  // ── B1 ──
  { de:"der Link", art:"der", vi:"đường link / liên kết", vi_alts:["liên kết","đường dẫn"], ex:"Danke für den Link!", section:"B1" },
  { de:"die Seite", art:"die", vi:"trang (web/sách) / bên", vi_alts:["trang web","trang"], ex:"Sieh mal, was ich auf der Seite gefunden habe!", section:"B1" },
  { de:"garantieren", art:"", vi:"đảm bảo / bảo đảm", vi_alts:["bảo đảm","đảm bảo"], ex:"Als Handwerker bekommt man nach erfolgreicher Ausbildung garantiert einen Job.", section:"B1" },
  { de:"der Zweifel", art:"der", vi:"sự nghi ngờ / hoài nghi", vi_alts:["nghi ngờ","sự băn khoăn"], ex:"Jetzt gibt es keine Zweifel mehr, denn es passt genau!", section:"B1" },
  { de:"das Semester", art:"das", vi:"học kỳ (đại học)", vi_alts:["học kỳ"], ex:"Er studiert im 3. Semester Elektrotechnik an einer Hochschule.", section:"B1" },
  { de:"die Hochschule", art:"die", vi:"trường đại học / cao đẳng", vi_alts:["đại học","trường ĐH"], ex:"Er studiert im 3. Semester Elektrotechnik an einer Hochschule.", section:"B1" },
  { de:"das Labor", art:"das", vi:"phòng thí nghiệm", vi_alts:["phòng lab","lab"], ex:"Sie arbeitet jetzt als Zahntechnikerin in einem Labor.", section:"B1" },

  // ── B2 ──
  { de:"die Nachfrage", art:"die", vi:"nhu cầu / sự hỏi han", vi_alts:["nhu cầu","sự cầu"], ex:"Große Nachfrage nach Nachhilfe.", section:"B2" },
  { de:"erscheinen", art:"", vi:"xuất hiện / ra mắt", vi_alts:["ra mắt","xuất hiện"], ex:"Katalog mit aktuellen Angeboten erschienen.", section:"B2" },
  { de:"die Krippe", art:"die", vi:"nhà trẻ", vi_alts:["nhà trẻ","cơ sở giữ trẻ"], ex:"Pünktlicher Umzug der Krippe in neues Gebäude.", section:"B2" },
  { de:"der Reiseführer", art:"der", vi:"hướng dẫn viên du lịch / sách hướng dẫn", vi_alts:["hướng dẫn viên","sách du lịch"], ex:"Junger Reiseführer sucht interessanten Job.", section:"B2" },
  { de:"die Reiseführerin", art:"die", vi:"hướng dẫn viên (nữ)", vi_alts:["nữ hướng dẫn viên"], ex:"", section:"B2" },

  // ── B3 ──
  { de:"schließlich", art:"", vi:"cuối cùng / rốt cuộc", vi_alts:["rốt cuộc","cuối cùng thì"], ex:"Schließlich habe ich mich für eine Umschulung entschieden.", section:"B3" },
  { de:"der Kaufmann", art:"der", vi:"thương nhân / người buôn bán (nam)", vi_alts:["người buôn bán","thương nhân"], ex:"In meinem Heimatland war ich Kaufmann.", section:"B3" },
  { de:"die Kauffrau", art:"die", vi:"thương nhân / người buôn bán (nữ)", vi_alts:["nữ thương nhân"], ex:"", section:"B3" },

  // ── C1 ──
  { de:"das Institut", art:"das", vi:"viện / học viện", vi_alts:["học viện","viện nghiên cứu"], ex:"Ein Institut ist eine Bildungs- oder Forschungseinrichtung.", section:"C1" },
  { de:"die/der Studierende", art:"", vi:"sinh viên", vi_alts:["sinh viên đại học"], ex:"Studierende sind Personen aller Geschlechter, die an einer Uni oder Hochschule lernen.", section:"C1" },
  { de:"die Technologie", art:"die", vi:"công nghệ", vi_alts:["kỹ thuật","công nghệ"], ex:"Technologien sind technische Geräte und Methoden.", section:"C1" },
  { de:"die Kompetenz", art:"die", vi:"năng lực / kỹ năng", vi_alts:["kỹ năng","khả năng"], ex:"Kompetenzen sind das Wissen und die Fähigkeiten, die man als Fachfrau/Fachmann im Beruf braucht.", section:"C1" },
  { de:"die Softskills", art:"die", vi:"kỹ năng mềm", vi_alts:["soft skills","kỹ năng xã hội"], ex:"Softskills: Fähigkeit, gut mit Kolleg:innen im Team zusammenzuarbeiten.", section:"C1" },
  { de:"technisch", art:"", vi:"kỹ thuật / mang tính kỹ thuật", vi_alts:["về mặt kỹ thuật","kỹ thuật"], ex:"Eine Fortbildung bringt neue Kenntnisse, z. B. zu technischen Geräten.", section:"C1" },

  // ── C3 ──
  { de:"sich beschäftigen", art:"", vi:"bận tâm với / làm việc với", vi_alts:["bận rộn với","nghiên cứu"], ex:"Es gibt ein paar Fragen, mit denen Sie sich beschäftigen müssen.", section:"C3" },
  { de:"die Terrasse", art:"die", vi:"sân thượng / hiên nhà", vi_alts:["hiên nhà","ban công rộng"], ex:"Das Café hat eine Terrasse, auf der es angenehm ruhig ist.", section:"C3" },
  { de:"sich eignen", art:"", vi:"phù hợp với / thích hợp cho", vi_alts:["thích hợp","phù hợp"], ex:"Zu den Kursen sind nur die Mitarbeiter:innen eingeladen, für die sich die teure Fortbildung wirklich eignet.", section:"C3" },
];

const L08_DIALOGS = [
  { de:"In vielen Bereichen fehlen Fachkräfte.", vi:"Nhiều lĩnh vực đang thiếu nhân lực có chuyên môn." },
  { de:"Danke für den Link!", vi:"Cảm ơn vì đường link!" },
  { de:"Jetzt gibt es keine Zweifel mehr.", vi:"Bây giờ không còn nghi ngờ nào nữa." },
  { de:"Schließlich habe ich mich entschieden.", vi:"Cuối cùng tôi đã quyết định." },
  { de:"Ich wollte immer Spezialist werden.", vi:"Tôi luôn muốn trở thành chuyên gia." },
  { de:"Das Übungsmachen Spaß und ich erhole mich dabei.", vi:"Việc luyện tập thật vui và tôi thư giãn qua đó." },
  { de:"Sie tauschen heute die Rollen.", vi:"Hôm nay họ đổi vai cho nhau." },
  { de:"Fast die Hälfte bekommt sofort eine bessere Stelle.", vi:"Gần một nửa ngay lập tức có được vị trí tốt hơn." },
  { de:"In meinem Heimatland war ich Kaufmann.", vi:"Ở quê hương tôi, tôi là thương nhân." },
  { de:"Ich habe große Schwierigkeiten gehabt.", vi:"Tôi đã gặp rất nhiều khó khăn." },
];

// ============================================================
// LEKTION 09 – Samir – Ein neuer Job?
// ============================================================
