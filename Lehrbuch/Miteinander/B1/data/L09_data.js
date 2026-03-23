const L09_WORDS = [
  // ── Abschnitt 1 ──
  { de:"husten", art:"", vi:"ho", vi_alts:["bị ho"], ex:"Ludmilla geht es nicht gut. Vielleicht hustet sie.", section:"1" },
  { de:"das Chaos", art:"das", vi:"hỗn loạn / lộn xộn", vi_alts:["sự hỗn loạn","lộn xộn"], ex:"Die beste Bezahlung hilft kaum, wenn es im Unternehmen ständig Chaos gibt.", section:"1" },
  { de:"die Baustelle", art:"die", vi:"công trường xây dựng", vi_alts:["công trường","nơi xây dựng"], ex:"Auf dem Foto sind Männer, die auf einer Baustelle arbeiten.", section:"1" },
  { de:"kaum", art:"", vi:"hầu như không / rất ít", vi_alts:["gần như không","ít khi"], ex:"Samir und Ludmilla bekommen kaum Schlaf in den Nächten.", section:"1" },
  { de:"berufstätig", art:"", vi:"đang đi làm / có việc làm", vi_alts:["có việc làm","đang làm việc"], ex:"Samir ist ganztags berufstätig.", section:"1" },
  { de:"knapp", art:"", vi:"vừa đủ / sát nút", vi_alts:["gần như","vừa vặn"], ex:"Er braucht im Moment eine knappe Stunde.", section:"1" },
  { de:"die Rente", art:"die", vi:"lương hưu / tiền trợ cấp hưu trí", vi_alts:["hưu trí","tiền hưu"], ex:"Bruno möchte endlich in Rente gehen.", section:"1" },
  { de:"der Tarif", art:"der", vi:"mức lương theo thỏa ước / biểu phí", vi_alts:["thang lương","biểu giá"], ex:"Samir ist mit seinem Einkommen zufrieden, weil sein Chef nach Tarif zahlt.", section:"1" },
  { de:"das Inserat", art:"das", vi:"mẩu quảng cáo tìm việc", vi_alts:["tin rao vặt","quảng cáo"], ex:"Samir hat ein Inserat aufgegeben, um einen neuen Job zu finden.", section:"1" },
  { de:"aufgeben", art:"", vi:"đăng (quảng cáo) / từ bỏ", vi_alts:["bỏ cuộc","đăng tin"], ex:"Samir hat ein Inserat aufgegeben.", section:"1" },
  { de:"ausgebildet", art:"", vi:"đã qua đào tạo / có bằng nghề", vi_alts:["được đào tạo","có chuyên môn"], ex:"Bruno meint, dass Samir sehr gut ausgebildet ist.", section:"1" },

  // ── Abschnitt 2 ──
  { de:"die Atmosphäre", art:"die", vi:"bầu không khí / môi trường", vi_alts:["không khí","bầu không khí"], ex:"Eine angenehme Atmosphäre finde ich im Job sehr wichtig.", section:"2" },

  // ── A1 ──
  { de:"elektrisch", art:"", vi:"điện / chạy bằng điện", vi_alts:["bằng điện","điện"], ex:"Ihre Aufgabe ist die Installation und Überprüfung von elektrischen Anlagen.", section:"A1" },
  { de:"die Gelegenheit", art:"die", vi:"cơ hội / dịp", vi_alts:["dịp","thời cơ"], ex:"Dies ist auch die passende Gelegenheit, um mit der Chefin über ein höheres Gehalt zu sprechen.", section:"A1" },

  // ── A3 ──
  { de:"die Frist", art:"die", vi:"thời hạn / hạn chót", vi_alts:["hạn chót","thời hạn"], ex:"Meine Kündigungsfrist beträgt vier Wochen.", section:"A3" },
  { de:"mailen", art:"", vi:"gửi email", vi_alts:["gửi thư điện tử","email"], ex:"Wie soll man die Unterlagen mailen?", section:"A3" },
  { de:"einzeln", art:"", vi:"từng cái / lẻ lẻ", vi_alts:["riêng lẻ","từng cái một"], ex:"Alle zusammen oder einzelne Dateien?", section:"A3" },

  // ── A4 ──
  { de:"die Annonce", art:"die", vi:"mẩu quảng cáo / thông báo tuyển dụng", vi_alts:["thông báo tuyển dụng","mẩu tin"], ex:"Ihre Annonce auf dem Jobportal hat mein Interesse geweckt.", section:"A4" },
  { de:"tätig", art:"", vi:"hoạt động / đang làm", vi_alts:["đang làm việc","hoạt động"], ex:"Ich war bei der Firma LichtWert tätig.", section:"A4" },

  // ── B1 ──
  { de:"der Stau", art:"der", vi:"ùn tắc giao thông", vi_alts:["kẹt xe","tắc đường"], ex:"Samir hat im Stau gestanden.", section:"B1" },
  { de:"überholen", art:"", vi:"vượt qua / vượt xe", vi_alts:["vượt mặt","vượt xe"], ex:"Samir hat alle überholt.", section:"B1" },
  { de:"die Viertelstunde", art:"die", vi:"một phần tư tiếng / 15 phút", vi_alts:["15 phút","một quý tiếng"], ex:"Mit dem E-Bike müsste Frau Köhn eine Viertelstunde früher losfahren.", section:"B1" },
  { de:"besitzen", art:"", vi:"sở hữu / có", vi_alts:["có","sở hữu"], ex:"Herr Wendel besitzt kein Fahrrad.", section:"B1" },
  { de:"die Strecke", art:"die", vi:"quãng đường / tuyến đường", vi_alts:["quãng đường","đoạn đường"], ex:"Kurze Strecken läuft er.", section:"B1" },
  { de:"die Gegend", art:"die", vi:"khu vực / vùng", vi_alts:["vùng","khu vực"], ex:"Obwohl er in einer Gegend ohne Bus und Bahn wohnt, braucht und will er kein Auto.", section:"B1" },
  { de:"die Jahreszeit", art:"die", vi:"mùa trong năm", vi_alts:["mùa","các mùa"], ex:"Samir kann sich nicht zu jeder Jahreszeit zum Radfahren motivieren.", section:"B1" },
  { de:"sich motivieren", art:"", vi:"tự thúc đẩy bản thân / tạo động lực", vi_alts:["tạo động lực","thúc đẩy"], ex:"Samir kann sich nicht zu jeder Jahreszeit zum Radfahren motivieren.", section:"B1" },
  { de:"die Lehrstelle", art:"die", vi:"chỗ học nghề / vị trí thực tập nghề", vi_alts:["vị trí học nghề","chỗ thực tập"], ex:"Als Auszubildender hatte er für den Weg zur Lehrstelle eine Fahrgemeinschaft.", section:"B1" },

  // ── B3 ──
  { de:"anwenden", art:"", vi:"áp dụng / ứng dụng", vi_alts:["ứng dụng","thực hành"], ex:"Sie können Geräte ausprobieren und Gelerntes aus dem Schulunterricht praktisch anwenden.", section:"B3" },
  { de:"die Lehre", art:"die", vi:"quá trình học nghề", vi_alts:["học nghề","thời gian học việc"], ex:"Ich habe eine Lehre als Zahntechniker gemacht.", section:"B3" },
  { de:"sich aussuchen", art:"", vi:"tự chọn / tự lựa", vi_alts:["tự lựa chọn","chọn lấy"], ex:"Nur junge Arbeitnehmer:innen können sich ihren Arbeitsplatz aussuchen.", section:"B3" },

  // ── B4 ──
  { de:"das Sprichwort", art:"das", vi:"tục ngữ / câu châm ngôn", vi_alts:["châm ngôn","tục ngữ"], ex:"Was bedeutet das Sprichwort 'Reisende soll man nicht aufhalten'?", section:"B4" },
  { de:"sich aufhalten", art:"", vi:"ở lại / dừng lại", vi_alts:["dừng lại","lưu lại"], ex:"Was bedeutet das Sprichwort 'Reisende soll man nicht aufhalten'?", section:"B4" },
  { de:"die Bedeutung", art:"die", vi:"ý nghĩa / nghĩa", vi_alts:["nghĩa","ý nghĩa"], ex:"'Der frühe Vogel fängt den Wurm.' Das bedeutet ... – Ah ja, jetzt habe ich die Bedeutung verstanden.", section:"B4" },

  // ── C1 ──
  { de:"die Zusage", art:"die", vi:"sự đồng ý / cam kết nhận", vi_alts:["câu trả lời đồng ý","chấp nhận"], ex:"Ist das schon die Zusage für den neuen Job?", section:"C1" },
  { de:"sich verpflichten", art:"", vi:"cam kết / có nghĩa vụ", vi_alts:["có trách nhiệm","cam kết"], ex:"Er verpflichtet sich, auch andere Arbeiten auszuführen.", section:"C1" },
  { de:"der Zeitrahmen", art:"der", vi:"khung thời gian", vi_alts:["thời gian quy định","khung giờ"], ex:"In diesem Zeitrahmen darf er seine Arbeitszeit frei einteilen.", section:"C1" },
  { de:"das Erfordernis", art:"das", vi:"yêu cầu / điều kiện cần thiết", vi_alts:["yêu cầu","điều cần thiết"], ex:"Unter Berücksichtigung der betrieblichen Erfordernisse.", section:"C1" },
  { de:"das Ermessen", art:"das", vi:"sự phán xét / quyền tự quyết", vi_alts:["quyết định tự do","quyền tự quyết"], ex:"Seine Arbeitszeit nach eigenem Ermessen frei einteilen.", section:"C1" },

  // ── C2 ──
  { de:"der Beweis", art:"der", vi:"bằng chứng / chứng cứ", vi_alts:["chứng cứ","bằng chứng"], ex:"Man muss ein Zeugnis oder ein anderes Dokument als Beweis zeigen.", section:"C2" },

  // ── C3 ──
  { de:"ausstellen", art:"", vi:"cấp (giấy tờ) / trưng bày", vi_alts:["cấp giấy","phát hành"], ex:"Ich bitte Sie, mir ein qualifiziertes Arbeitszeugnis auszustellen.", section:"C3" },
  { de:"das Verhältnis", art:"das", vi:"mối quan hệ / tỷ lệ", vi_alts:["quan hệ","mối quan hệ lao động"], ex:"Hiermit kündige ich das mit Ihnen bestehende Arbeitsverhältnis.", section:"C3" },
  { de:"fristgerecht", art:"", vi:"đúng hạn / trong thời hạn", vi_alts:["đúng hạn","trong hạn"], ex:"Ordentlich und fristgerecht zum nächstmöglichen Zeitpunkt.", section:"C3" },
  { de:"der Zeitpunkt", art:"der", vi:"thời điểm", vi_alts:["thời điểm","lúc đó"], ex:"Zum nächstmöglichen Zeitpunkt.", section:"C3" },
];

const L09_DIALOGS = [
  { de:"Samir ist mit seinem Einkommen zufrieden.", vi:"Samir hài lòng với thu nhập của mình." },
  { de:"Eine angenehme Atmosphäre finde ich sehr wichtig.", vi:"Tôi thấy bầu không khí thoải mái rất quan trọng." },
  { de:"Meine Kündigungsfrist beträgt vier Wochen.", vi:"Thời hạn thông báo nghỉ việc của tôi là bốn tuần." },
  { de:"Ich bitte Sie, mir ein Zeugnis auszustellen.", vi:"Tôi đề nghị quý vị cấp cho tôi một giấy chứng nhận." },
  { de:"Ihre Annonce hat mein Interesse geweckt.", vi:"Thông báo tuyển dụng của quý vị đã thu hút sự chú ý của tôi." },
  { de:"In vielen Bereichen fehlen Fachkräfte.", vi:"Nhiều lĩnh vực đang thiếu nhân lực có chuyên môn." },
  { de:"Nur junge Arbeitnehmer können sich ihren Platz aussuchen.", vi:"Chỉ lao động trẻ mới có thể tự chọn chỗ làm." },
  { de:"Er verpflichtet sich, auch andere Arbeiten auszuführen.", vi:"Anh ấy cam kết thực hiện cả các công việc khác." },
  { de:"Was bedeutet dieses Sprichwort?", vi:"Câu tục ngữ này có nghĩa gì?" },
  { de:"Ist das schon die Zusage?", vi:"Đây đã là sự chấp nhận rồi chứ?" },
];

// ============================================================
// LEKTION 10 – Ahmet – Gut versichert
// ============================================================
