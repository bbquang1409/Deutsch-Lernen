const L06_WORDS = [
  // ── Abschnitt 1 ──
  { de:"die Abteilung", art:"die", vi:"bộ phận / phòng ban", vi_alts:["phòng ban","bộ phận công ty"], ex:"Mir ist aufgefallen, dass ich mich als Einzige in der Abteilung um den Automaten kümmere.", section:"1" },
  { de:"aktuell", art:"", vi:"hiện tại / hiện thời", vi_alts:["hiện nay","hiện tại"], ex:"Aktueller Projektstand.", section:"1" },
  { de:"realistisch", art:"", vi:"thực tế / thực tiễn", vi_alts:["thực tế","khả thi"], ex:"Zeitplan realistisch?", section:"1" },
  { de:"nass", art:"", vi:"ướt", vi_alts:["bị ướt","ẩm ướt"], ex:"Warum sind Ninas Haare nass?", section:"1" },
  { de:"der Pfleger", art:"der", vi:"người chăm sóc (nam)", vi_alts:["y tá nam","điều dưỡng viên"], ex:"Ein Pfleger hat angerufen und gesagt, dass es ihm gar nicht gut geht.", section:"1" },
  { de:"die Pflegerin", art:"die", vi:"người chăm sóc (nữ)", vi_alts:["y tá nữ"], ex:"", section:"1" },
  { de:"der Flug", art:"der", vi:"chuyến bay", vi_alts:["chuyến bay"], ex:"So kann aus dem Sitznachbarn, den man auf der Flugreise kennengelernt hat, auch ein Freund werden.", section:"1" },
  { de:"merkwürdig", art:"", vi:"kỳ lạ / lạ lùng", vi_alts:["lạ lùng","kỳ quặc"], ex:"Für Nina ist es merkwürdig, dass Olaf noch nicht da ist.", section:"1" },
  { de:"genießen", art:"", vi:"tận hưởng / thưởng thức", vi_alts:["thưởng thức","tận hưởng"], ex:"Amadou hat es genossen, dass er am Wochenende keine Termine hatte.", section:"1" },
  { de:"der Gegensatz", art:"der", vi:"sự tương phản / mặt đối lập", vi_alts:["mặt đối lập","trái ngược"], ex:"Nina findet es schade, dass sie im Gegensatz zu Amadou zurzeit nicht viel reist.", section:"1" },
  { de:"das Altersheim", art:"das", vi:"viện dưỡng lão", vi_alts:["nhà dưỡng lão"], ex:"Nina findet es nett, dass Amadou nach ihrem Vater im Altersheim fragt.", section:"1" },
  { de:"die Arbeitslosigkeit", art:"die", vi:"nạn thất nghiệp", vi_alts:["tình trạng thất nghiệp","thất nghiệp"], ex:"Arbeitslosigkeit bedeutet, keinen Job zu haben.", section:"1" },
  { de:"die Katastrophe", art:"die", vi:"thảm họa", vi_alts:["tai họa","thảm kịch"], ex:"Wenn etwas sehr Schlimmes passiert, spricht man von einer Katastrophe.", section:"1" },
  { de:"der Konsum", art:"der", vi:"sự tiêu thụ / tiêu dùng", vi_alts:["tiêu dùng","tiêu thụ"], ex:"Konsum ist das Verbrauchen von Lebensmitteln, Kleidung, Medikamenten und anderen Produkten.", section:"1" },
  { de:"die Religion", art:"die", vi:"tôn giáo", vi_alts:["đạo","tín ngưỡng"], ex:"Über Religion sollte man beim Small Talk nicht sprechen.", section:"1" },
  { de:"der Skandal", art:"der", vi:"vụ bê bối / scandal", vi_alts:["bê bối","scandal"], ex:"Findest du, Skandale sind ein gutes Thema für Small Talk?", section:"1" },
  { de:"der Star", art:"der", vi:"ngôi sao / sao nổi tiếng", vi_alts:["ngôi sao","người nổi tiếng"], ex:"Bekannte Musiker und Schauspieler nennt man Stars.", section:"1" },
  { de:"die Umweltverschmutzung", art:"die", vi:"ô nhiễm môi trường", vi_alts:["ô nhiễm","ô nhiễm môi trường"], ex:"Umweltverschmutzung ist alles, was die Natur und die Luft schmutzig macht.", section:"1" },
  { de:"der Kiosk", art:"der", vi:"quầy báo / ki-ốt", vi_alts:["ki-ốt","quầy hàng nhỏ"], ex:"Könntest du mir ein Brötchen vom Kiosk mitbringen?", section:"1" },
  { de:"die Münze", art:"die", vi:"đồng xu", vi_alts:["đồng tiền xu","xu"], ex:"Könntest du fünf Euro in Münzen wechseln?", section:"1" },

  // ── A1 ──
  { de:"fassen", art:"", vi:"nắm / túm; không thể tin được", vi_alts:["túm lấy","không thể tin"], ex:"Ich fasse es nicht!", section:"A1" },
  { de:"sich beruhigen", art:"", vi:"bình tĩnh lại / nguôi xuống", vi_alts:["bình tĩnh","dịu lại"], ex:"Jetzt beruhigen wir uns erst mal.", section:"A1" },
  { de:"zusammenfassen", art:"", vi:"tóm tắt", vi_alts:["tóm tắt lại","tổng hợp"], ex:"Olaf sollte den Stand des Projekts zusammenfassen.", section:"A1" },

  // ── A2 ──
  { de:"herunterfahren", art:"", vi:"tắt máy / tắt nguồn máy tính", vi_alts:["tắt máy tính","shutdown"], ex:"Du solltest eigentlich den Computer runterfahren.", section:"A2" },
  { de:"sich festlegen", art:"", vi:"quyết định / cam kết rõ ràng", vi_alts:["cam kết","quyết định"], ex:"Das haben wir doch zusammen festgelegt.", section:"A2" },

  // ── A3 ──
  { de:"die Sitzung", art:"die", vi:"cuộc họp / phiên họp", vi_alts:["phiên họp","buổi họp"], ex:"Olaf hat für die Sitzung keine Präsentation mit Folien vorbereitet.", section:"A3" },
  { de:"die Folie", art:"die", vi:"tờ trình chiếu / slide", vi_alts:["slide","trang trình chiếu"], ex:"Olaf hat für die Sitzung keine Präsentation mit Folien vorbereitet.", section:"A3" },
  { de:"mündlich", art:"", vi:"bằng miệng / bằng lời nói", vi_alts:["bằng lời","miệng"], ex:"In Amadous alter Firma hat man den Projektstand mündlich mitgeteilt.", section:"A3" },
  { de:"mitteilen", art:"", vi:"thông báo / truyền đạt", vi_alts:["thông báo","báo cáo"], ex:"In Amadous alter Firma hat man den Projektstand mündlich mitgeteilt.", section:"A3" },
  { de:"aufschreiben", art:"", vi:"viết xuống / ghi lại", vi_alts:["ghi lại","viết ra"], ex:"Wenn man die wichtigsten Infos aufschreibt, ist das Protokoll schneller fertig.", section:"A3" },
  { de:"entstehen", art:"", vi:"phát sinh / hình thành", vi_alts:["nảy sinh","xuất hiện"], ex:"Lasst uns klären, wie das Problem entstanden ist.", section:"A3" },
  { de:"grundsätzlich", art:"", vi:"về nguyên tắc / cơ bản là", vi_alts:["về nguyên tắc","cơ bản"], ex:"Habt ihr einen Vorschlag, wie wir grundsätzlich mit Konflikten umgehen wollen?", section:"A3" },
  { de:"der Konflikt", art:"der", vi:"xung đột / mâu thuẫn", vi_alts:["mâu thuẫn","xung đột"], ex:"Wie wir grundsätzlich mit Konflikten umgehen wollen?", section:"A3" },

  // ── A4 ──
  { de:"sich verlassen auf", art:"", vi:"tin tưởng vào / trông cậy vào", vi_alts:["tin cậy","dựa vào"], ex:"Irgendwie habe ich das Gefühl, dass ich mich auf Olaf nicht verlassen kann.", section:"A4" },
  { de:"vertrauen", art:"", vi:"tin tưởng / tin tưởng ai đó", vi_alts:["tin vào","tin tưởng"], ex:"Du vertraust mir nicht, oder was?", section:"A4" },
  { de:"Bescheid sagen", art:"", vi:"thông báo / báo cho biết", vi_alts:["báo cho biết","thông báo"], ex:"Du gibst nie Bescheid, dass du eine Mail bekommen hast.", section:"A4" },

  // ── A5 ──
  { de:"ansprechen", art:"", vi:"đề cập / nêu ra vấn đề", vi_alts:["nêu ra","đề cập đến"], ex:"Danke Amadou, dass du das Problem offen angesprochen hast.", section:"A5" },
  { de:"vernünftig", art:"", vi:"hợp lý / lý trí", vi_alts:["có lý","lý trí"], ex:"Und eine vernünftige Lösung finden willst.", section:"A5" },
  { de:"interessiert", art:"", vi:"quan tâm / thích thú", vi_alts:["có hứng thú","quan tâm"], ex:"Als Konfliktmanager sollte man an Menschen interessiert sein.", section:"A5" },
  { de:"sich aufregen", art:"", vi:"bực mình / nổi giận", vi_alts:["tức giận","bực bội"], ex:"Reg dich nicht auf.", section:"A5" },
  { de:"ernst", art:"", vi:"nghiêm túc / nghiêm trọng", vi_alts:["nghiêm túc","nghiêm nghị"], ex:"Amadou ist ernst geblieben.", section:"A5" },
  { de:"die Fortbildung", art:"die", vi:"khóa đào tạo nâng cao / bồi dưỡng", vi_alts:["đào tạo thêm","bồi dưỡng"], ex:"Ich finde es wichtig, dass man Fortbildungen macht.", section:"A5" },

  // ── B1 ──
  { de:"begegnen", art:"", vi:"gặp gỡ / đối mặt với", vi_alts:["gặp phải","đối mặt"], ex:"Konflikte sind ein Problem, dem man in fast jedem Projekt begegnet.", section:"B1" },
  { de:"besprechen", art:"", vi:"thảo luận / bàn bạc", vi_alts:["bàn bạc","trao đổi"], ex:"Besprechen Sie Konflikte im Team immer lösungsorientiert.", section:"B1" },
  { de:"achten", art:"", vi:"chú ý / lưu ý", vi_alts:["lưu ý","chú trọng"], ex:"Konfliktgespräche führen – achten Sie auf die folgenden Punkte.", section:"B1" },
  { de:"die Kritik", art:"die", vi:"sự phê bình / chỉ trích", vi_alts:["phê phán","chỉ trích"], ex:"Äußern Sie Ihre Kritik ruhig und ohne Bewertungen.", section:"B1" },
  { de:"der Vorwurf", art:"der", vi:"lời trách móc / cáo buộc", vi_alts:["sự trách móc","cáo buộc"], ex:"Machen Sie keine Vorwürfe.", section:"B1" },
  { de:"der Standpunkt", art:"der", vi:"quan điểm / lập trường", vi_alts:["lập trường","quan điểm"], ex:"Zeigen Sie Interesse am Standpunkt der anderen Seite.", section:"B1" },
  { de:"unterbrechen", art:"", vi:"ngắt lời / cắt ngang", vi_alts:["cắt ngang","ngắt lời"], ex:"Unterbrechen Sie nicht.", section:"B1" },
  { de:"anschauen", art:"", vi:"nhìn / nhìn vào", vi_alts:["nhìn vào","quan sát"], ex:"Hören Sie aufmerksam zu und schauen Sie die Person dabei an.", section:"B1" },
  { de:"die Ansicht", art:"die", vi:"quan điểm / ý kiến", vi_alts:["ý kiến","quan niệm"], ex:"Die anderen haben sicher nicht nur Ansichten, denen Sie widersprechen!", section:"B1" },
  { de:"bereit", art:"", vi:"sẵn sàng", vi_alts:["sẵn lòng","sẵn sàng"], ex:"Seien Sie bereit zu einem Kompromiss.", section:"B1" },
  { de:"dabei sein", art:"", vi:"có mặt / tham gia", vi_alts:["có mặt","tham gia"], ex:"Oft hilft es, wenn eine dritte Person bei dem Gespräch dabei ist.", section:"B1" },

  // ── B3 ──
  { de:"dauernd", art:"", vi:"liên tục / cứ mãi", vi_alts:["liên tục","không ngừng"], ex:"Ihre Kollegin macht dauernd Pausen.", section:"B3" },
  { de:"die Konsequenz", art:"die", vi:"hậu quả / kết quả tất yếu", vi_alts:["hậu quả","kết quả"], ex:"Die Konsequenz ist, dass andere mehr Aufgaben übernehmen müssen.", section:"B3" },
  { de:"die Rücksicht", art:"die", vi:"sự quan tâm / sự chiếu cố", vi_alts:["sự thông cảm","sự tôn trọng"], ex:"Typisch, dass du keine Rücksicht auf andere nimmst.", section:"B3" },

  // ── C1 ──
  { de:"merken", art:"", vi:"nhận ra / nhận thấy", vi_alts:["nhận ra","cảm nhận"], ex:"Tobias merkte, wie sehr er sich ärgerte.", section:"C1" },
  { de:"der Ärger", art:"der", vi:"sự bực bội / tức giận", vi_alts:["tức giận","bực tức"], ex:"Da er seinen Ärger spürte, antwortete er kaum.", section:"C1" },
  { de:"spüren", art:"", vi:"cảm nhận / cảm thấy", vi_alts:["cảm thấy","nhận ra"], ex:"Da er seinen Ärger spürte, antwortete er kaum.", section:"C1" },
  { de:"verschwinden", art:"", vi:"biến mất", vi_alts:["mất tích","biến đi"], ex:"Aber sie lächelte nur und verschwand mit ihrer großen Tasse im Besprechungsraum.", section:"C1" },
  { de:"heim", art:"", vi:"về nhà / về nhà đi", vi_alts:["về nhà"], ex:"Den ganzen Heimweg schimpfte er vor sich hin.", section:"C1" },
];

const L06_DIALOGS = [
  { de:"Ich fasse es nicht!", vi:"Tôi không thể tin được!" },
  { de:"Jetzt beruhigen wir uns erst mal.", vi:"Bây giờ chúng ta hãy bình tĩnh trước đã." },
  { de:"Unterbrechen Sie nicht.", vi:"Đừng ngắt lời." },
  { de:"Machen Sie keine Vorwürfe.", vi:"Đừng đổ lỗi." },
  { de:"Seien Sie bereit zu einem Kompromiss.", vi:"Hãy sẵn sàng thỏa hiệp." },
  { de:"Du vertraust mir nicht, oder was?", vi:"Bạn không tin tôi à?" },
  { de:"Reg dich nicht auf.", vi:"Đừng bực bội như vậy." },
  { de:"Das haben wir doch zusammen festgelegt.", vi:"Chúng ta đã cùng quyết định điều đó mà." },
  { de:"Danke, dass du das offen angesprochen hast.", vi:"Cảm ơn vì bạn đã nêu vấn đề thẳng thắn." },
  { de:"Könntest du fünf Euro in Münzen wechseln?", vi:"Bạn có thể đổi năm euro ra tiền xu không?" },
];

// ============================================================
// LEKTION 07 – Amadou – Alles Trainingssache
// ============================================================
