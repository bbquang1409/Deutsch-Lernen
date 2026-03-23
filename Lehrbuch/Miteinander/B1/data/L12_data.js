const L12_WORDS = [
  // ── Abschnitt 1 ──
  { de:"die DVD", art:"die", vi:"đĩa DVD", vi_alts:["đĩa DVD","đĩa phim"], ex:"Hast du eigentlich einen DVD-Player zu Hause?", section:"1" },
  { de:"die Festplatte", art:"die", vi:"ổ cứng (máy tính)", vi_alts:["ổ đĩa cứng","hard drive"], ex:"Zum Glück war aber die Festplatte noch in Ordnung.", section:"1" },
  { de:"die Zahnbürste", art:"die", vi:"bàn chải đánh răng", vi_alts:["bàn chải răng","bàn chải"], ex:"Mein Zahnarzt empfiehlt elektrische Zahnbürsten.", section:"1" },

  // ── Abschnitt 2 ──
  { de:"da sein", art:"", vi:"có mặt / ở đây", vi_alts:["có ở đó","có mặt"], ex:"Warum ist Ilias da?", section:"2" },
  { de:"zuschauen", art:"", vi:"quan sát / xem", vi_alts:["nhìn xem","quan sát"], ex:"Ilias schaut zu, wie Zofia aufräumt.", section:"2" },
  { de:"der Apparat", art:"der", vi:"thiết bị / máy móc", vi_alts:["máy móc","thiết bị"], ex:"Eine Menge zu tun: anschauen, ordnen, kaputte Apparate entsorgen!", section:"2" },
  { de:"entsorgen", art:"", vi:"thải bỏ / vứt bỏ (đúng cách)", vi_alts:["vứt bỏ","xử lý rác"], ex:"Eine Menge zu tun: anschauen, ordnen, kaputte Apparate entsorgen!", section:"2" },
  { de:"sich vornehmen", art:"", vi:"tự quyết tâm / đặt ra cho mình", vi_alts:["quyết tâm","tự đặt mục tiêu"], ex:"Das habe ich mir schon lange vorgenommen!", section:"2" },
  { de:"das Zeug", art:"das", vi:"đồ đạc / đồ linh tinh", vi_alts:["đồ đạc","thứ linh tinh"], ex:"So viel altes Zeug!", section:"2" },
  { de:"jemals", art:"", vi:"bao giờ / từng", vi_alts:["bao giờ","từng bao giờ"], ex:"Ich weiß nicht, ob ich jemals wieder etwas Neues brauche!", section:"2" },
  { de:"unheimlich", art:"", vi:"vô cùng / kinh khủng / lạ lùng", vi_alts:["vô cùng","rất nhiều"], ex:"Mir fällt es unheimlich schwer, mich von Sachen zu trennen.", section:"2" },
  { de:"sich zwingen", art:"", vi:"tự ép buộc bản thân", vi_alts:["ép buộc mình","cưỡng ép"], ex:"Heute zwinge ich mich, mein ganzes altes Zeug mal anzuschauen.", section:"2" },

  // ── Abschnitt 3 ──
  { de:"braten", art:"", vi:"rán / chiên", vi_alts:["chiên","rán"], ex:"Wofür benutzt du dieses Öl? – Zum Braten von Fleisch und Gemüse.", section:"3" },
  { de:"reiten", art:"", vi:"cưỡi ngựa", vi_alts:["cưỡi ngựa","đi ngựa"], ex:"Wozu brauchst du diese Decke? – Die brauche ich für mein Hobby, fürs Reiten.", section:"3" },
  { de:"trocknen", art:"", vi:"sấy khô / làm khô", vi_alts:["làm khô","phơi khô"], ex:"Das braucht man zum Trocknen.", section:"3" },

  // ── A1 ──
  { de:"nirgendwo", art:"", vi:"không ở đâu / chẳng đâu", vi_alts:["không ở đâu","chẳng ở đâu"], ex:"Nirgendwo so günstig wie hier!", section:"A1" },
  { de:"die Mühe", art:"die", vi:"sự cố gắng / công sức", vi_alts:["công sức","nỗ lực"], ex:"Ich werde mir Mühe geben!", section:"A1" },
  { de:"verpacken", art:"", vi:"đóng gói / bọc lại", vi_alts:["bọc","đóng gói"], ex:"Man kann's klein verpacken – Transport also auch kein Problem!", section:"A1" },
  { de:"der Transport", art:"der", vi:"vận chuyển", vi_alts:["sự vận chuyển","vận tải"], ex:"Transport also auch kein Problem!", section:"A1" },
  { de:"gespannt", art:"", vi:"hồi hộp / nóng lòng chờ", vi_alts:["háo hức","hồi hộp"], ex:"Bin gespannt!", section:"A1" },
  { de:"allerdings", art:"", vi:"tuy nhiên / dù thế", vi_alts:["tuy nhiên","mặc dù vậy"], ex:"Der Shop sieht allerdings nicht so professionell aus.", section:"A1" },
  { de:"vermuten", art:"", vi:"đoán / phỏng đoán", vi_alts:["đoán","suy đoán"], ex:"Ilias vermutet: 'Damit wirst du bestimmt die allerbesten Tutorials machen.'", section:"A1" },

  // ── A2 ──
  { de:"das Reisebüro", art:"das", vi:"đại lý du lịch", vi_alts:["văn phòng du lịch","công ty du lịch"], ex:"Hast du schon bemerkt, dass es fast keine Reisebüros mehr gibt?", section:"A2" },
  { de:"die SMS", art:"die", vi:"tin nhắn SMS", vi_alts:["tin nhắn","SMS"], ex:"Wir denken, in zehn Jahren wird es keine SMS mehr geben.", section:"A2" },
  { de:"der Schein", art:"der", vi:"tờ tiền / giấy chứng nhận", vi_alts:["tờ tiền","giấy tờ"], ex:"Hast du eine Idee, wie ich einen Geldschein als Geschenk verpacken kann?", section:"A2" },
  { de:"die Abgase", art:"die", vi:"khí thải", vi_alts:["khí thải xe","ô nhiễm khói"], ex:"Umweltfreundliche E-Autos belasten die Städte nicht mit Abgasen.", section:"A2" },
  { de:"der Sender", art:"der", vi:"đài phát thanh / kênh truyền hình", vi_alts:["đài","kênh TV"], ex:"Beim Radiosender Antenne Ostsee gibt es jeden Samstag die Talk-Sendung Jetzt.", section:"A2" },
  { de:"digital", art:"", vi:"kỹ thuật số / điện tử", vi_alts:["điện tử","kỹ thuật số"], ex:"Wir denken, in zehn Jahren wird es keine Tickets auf Papier mehr geben, sondern nur noch digitale Tickets.", section:"A2" },

  // ── A3 ──
  { de:"falls", art:"", vi:"trong trường hợp / nếu như", vi_alts:["nếu","trong trường hợp"], ex:"Zofia hat Sorge, dass es Probleme gibt, falls das Gerät nicht funktioniert.", section:"A3" },
  { de:"der Händler", art:"der", vi:"người bán hàng / thương gia (nam)", vi_alts:["người bán","thương gia"], ex:"Sie fürchtet, dass der Händler sich weigert, das Gerät umzutauschen.", section:"A3" },
  { de:"die Händlerin", art:"die", vi:"người bán hàng (nữ)", vi_alts:["nữ thương nhân"], ex:"", section:"A3" },
  { de:"sich weigern", art:"", vi:"từ chối / không chịu", vi_alts:["từ chối","không chịu làm"], ex:"Sie fürchtet, dass der Händler sich weigert, das Gerät umzutauschen.", section:"A3" },
  { de:"umtauschen", art:"", vi:"đổi hàng / đổi lại", vi_alts:["đổi lại","hoàn đổi"], ex:"Sie fürchtet, dass der Händler sich weigert, das Gerät umzutauschen.", section:"A3" },
  { de:"die Garantie", art:"die", vi:"bảo hành", vi_alts:["bảo hành","chế độ bảo hành"], ex:"Sie weiß nicht, ob Garantie auf dem Gerät ist.", section:"A3" },

  // ── A4 ──
  { de:"ausschließlich", art:"", vi:"chỉ duy nhất / độc quyền", vi_alts:["chỉ","hoàn toàn chỉ"], ex:"Zahlungsmöglichkeiten: Ausschließlich Vorkasse.", section:"A4" },
  { de:"die Lieferung", art:"die", vi:"giao hàng / sự giao hàng", vi_alts:["giao hàng","sự vận chuyển hàng"], ex:"Lieferung: In der Regel liefern wir innerhalb von 5 Tagen.", section:"A4" },
  { de:"voraussichtlich", art:"", vi:"dự kiến / có lẽ", vi_alts:["dự kiến","được dự báo"], ex:"Wir nennen bei der Bestellung den voraussichtlichen Liefertermin.", section:"A4" },
  { de:"pauschal", art:"", vi:"trọn gói / bao gồm tất cả", vi_alts:["trọn gói","theo giá cố định"], ex:"Bis 100 Euro: pauschal 6,95 Euro.", section:"A4" },
  { de:"der Umtausch", art:"der", vi:"sự đổi hàng", vi_alts:["đổi hàng","hoàn đổi"], ex:"Umtausch/Rückgabe der Ware: Innerhalb von 14 Tagen nach Kauf.", section:"A4" },

  // ── A5 ──
  { de:"im Voraus", art:"", vi:"trước / thanh toán trước", vi_alts:["trước","trả trước"], ex:"Sie müssen die Ware im Voraus bezahlen.", section:"A5" },
  { de:"die Ausnahme", art:"die", vi:"ngoại lệ", vi_alts:["trường hợp ngoại lệ","ngoại lệ"], ex:"Da können wir leider keine Ausnahme machen.", section:"A5" },

  // ── B1 ──
  { de:"das Kabel", art:"das", vi:"dây cáp / dây điện", vi_alts:["dây điện","cáp"], ex:"Außerdem fehlt ein Kabel.", section:"B1" },
  { de:"verursachen", art:"", vi:"gây ra / gây nên", vi_alts:["gây ra","tạo ra"], ex:"Da ich den Schaden nicht verursacht habe, werde ich die Kosten nicht bezahlen.", section:"B1" },
  { de:"entdecken", art:"", vi:"phát hiện / tìm ra", vi_alts:["tìm thấy","phát hiện ra"], ex:"Zofia hat am Gerät einen Schaden entdeckt.", section:"B1" },
  { de:"schuld sein", art:"", vi:"có lỗi / là lỗi của", vi_alts:["có lỗi","là lỗi"], ex:"Sie sagt, sie ist nicht schuld, dass das Gerät nicht in Ordnung ist.", section:"B1" },

  // ── B2 ──
  { de:"verwechseln", art:"", vi:"nhầm lẫn / lộn lẫn", vi_alts:["lộn","nhầm"], ex:"Sie haben etwas bestellt, aber die Bestellung wurde verwechselt.", section:"B2" },
  { de:"die Marke", art:"die", vi:"nhãn hiệu / thương hiệu", vi_alts:["thương hiệu","brand"], ex:"Sie haben einen falschen Artikel bekommen (falsche Marke, falsches Modell).", section:"B2" },
  { de:"das Modell", art:"das", vi:"mẫu / kiểu dáng", vi_alts:["kiểu","mẫu sản phẩm"], ex:"Sie haben einen falschen Artikel bekommen (falsche Marke, falsches Modell).", section:"B2" },
  { de:"der Essig", art:"der", vi:"giấm", vi_alts:["dấm","giấm ăn"], ex:"Ich habe im Online-Shop Essig und Öl gekauft.", section:"B2" },
  { de:"der Grill", art:"der", vi:"vỉ nướng / lò nướng", vi_alts:["lò nướng BBQ","nướng BBQ"], ex:"Ich möchte den Grill umtauschen.", section:"B2" },

  // ── B3 ──
  { de:"der Handel", art:"der", vi:"thương mại / mua bán", vi_alts:["kinh doanh","thương mại"], ex:"Im Online-Handel kann man Ware zurückgeben.", section:"B3" },
  { de:"das Ersatzteil", art:"das", vi:"linh kiện thay thế / phụ tùng", vi_alts:["phụ tùng","linh kiện"], ex:"Ich wollte mal ein kaputtes Ersatzteil umtauschen.", section:"B3" },

  // ── C1 ──
  { de:"der Staub", art:"der", vi:"bụi bặm / bụi", vi_alts:["bụi","bụi bẩn"], ex:"Entfernen Sie Staub und Schmutz.", section:"C1" },
  { de:"notwendig", art:"", vi:"cần thiết / cần phải", vi_alts:["cần thiết","bắt buộc"], ex:"Erledigen Sie notwendige Reparaturen.", section:"C1" },
  { de:"sich konzentrieren", art:"", vi:"tập trung vào", vi_alts:["tập trung","chú tâm"], ex:"Konzentrieren Sie sich auf lokale Plattformen!", section:"C1" },
  { de:"der Zustand", art:"der", vi:"tình trạng / trạng thái", vi_alts:["tình trạng","trạng thái"], ex:"Beschreiben Sie den Artikel genau: Marke, Größe, Farbe, Zustand.", section:"C1" },
  { de:"hinweisen", art:"", vi:"chỉ ra / lưu ý", vi_alts:["nhắc nhở","chỉ ra"], ex:"Auf Schäden hinweisen!", section:"C1" },
  { de:"reichen", art:"", vi:"đủ / đưa ra", vi_alts:["đủ rồi","đủ"], ex:"Schreiben Sie keine Romane: Stichwörter reichen!", section:"C1" },
  { de:"verlangen", art:"", vi:"yêu cầu / đòi hỏi", vi_alts:["yêu cầu","đòi"], ex:"Dann wissen Sie, was Sie verlangen können.", section:"C1" },

  // ── C2 ──
  { de:"trotz", art:"", vi:"mặc dù / bất chấp", vi_alts:["dù","bất chấp"], ex:"Funktioniert die Kamera denn trotz der Kratzer?", section:"C2" },
  { de:"sich einigen", art:"", vi:"đồng ý / thống nhất", vi_alts:["thỏa thuận","đồng ý"], ex:"Einigen wir uns auf 40 Euro?", section:"C2" },
];

const L12_DIALOGS = [
  { de:"Das habe ich mir schon lange vorgenommen.", vi:"Tôi đã tự quyết tâm làm điều này từ lâu." },
  { de:"Mir fällt es unheimlich schwer, mich zu trennen.", vi:"Tôi thấy rất khó để từ bỏ đồ đạc." },
  { de:"Nirgendwo so günstig wie hier!", vi:"Không ở đâu rẻ như ở đây!" },
  { de:"Sie müssen die Ware im Voraus bezahlen.", vi:"Bạn phải thanh toán trước." },
  { de:"Da können wir leider keine Ausnahme machen.", vi:"Thật tiếc, chúng tôi không thể tạo ngoại lệ." },
  { de:"Zofia hat am Gerät einen Schaden entdeckt.", vi:"Zofia phát hiện hư hỏng trên thiết bị." },
  { de:"Einigen wir uns auf 40 Euro?", vi:"Chúng ta thỏa thuận 40 euro nhé?" },
  { de:"Ich werde mir Mühe geben.", vi:"Tôi sẽ cố gắng hết sức." },
  { de:"Konzentrieren Sie sich auf lokale Plattformen!", vi:"Hãy tập trung vào các nền tảng địa phương!" },
  { de:"Beschreiben Sie den Artikel genau.", vi:"Hãy mô tả mặt hàng một cách chính xác." },
];
