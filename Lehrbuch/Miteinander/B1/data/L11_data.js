const L11_WORDS = [
  // ── Abschnitt 1 ──
  { de:"doppelt", art:"", vi:"gấp đôi / hai lần", vi_alts:["gấp đôi","hai lần"], ex:"Unsere Mitarbeiter:innen haben schon jetzt die doppelte Anzahl Überstunden.", section:"1" },
  { de:"bedienen", art:"", vi:"phục vụ / vận hành", vi_alts:["sử dụng","vận hành"], ex:"Kannst du etwa keinen Computer bedienen?", section:"1" },
  { de:"der Kuli", art:"der", vi:"bút bi", vi_alts:["cây bút bi","bút"], ex:"Du hast einfach meinen Kuli genommen!", section:"1" },
  { de:"der Lautsprecher", art:"der", vi:"loa", vi_alts:["loa âm thanh"], ex:"János, kannst du mal den Lautsprecher einstellen?", section:"1" },

  // ── A1 ──
  { de:"der PC", art:"der", vi:"máy tính cá nhân", vi_alts:["PC","máy vi tính"], ex:"Ich zeige dir mal unser PC-System.", section:"A1" },
  { de:"nochmals", art:"", vi:"một lần nữa / lần nữa", vi_alts:["một lần nữa","thêm một lần"], ex:"Und dann erkläre ich dir nochmals, wie hier die Übergabe abläuft.", section:"A1" },

  // ── A2 ──
  { de:"eintragen", art:"", vi:"ghi vào / nhập vào", vi_alts:["nhập liệu","điền vào"], ex:"Ich notiere die Medikamente in eine Liste, statt sie ins Computersystem einzutragen.", section:"A2" },
  { de:"statt", art:"", vi:"thay vì", vi_alts:["thay vì","thay cho"], ex:"Statt abends eine Serie zu schauen, lese ich lieber einen Roman.", section:"A2" },
  { de:"der Roman", art:"der", vi:"tiểu thuyết", vi_alts:["cuốn tiểu thuyết","sách tiểu thuyết"], ex:"Statt abends eine Serie zu schauen, lese ich lieber einen Roman.", section:"A2" },
  { de:"chatten", art:"", vi:"nhắn tin / chat", vi_alts:["chat","trò chuyện online"], ex:"Ich chatte lieber mit Freunden, statt abends eine Serie zu schauen.", section:"A2" },
  { de:"die Jahreskarte", art:"die", vi:"vé tháng cả năm / thẻ năm", vi_alts:["thẻ năm","vé năm"], ex:"Statt dass ich Einzeltickets für den Bus kaufe, kaufe ich lieber eine Jahreskarte.", section:"A2" },
  { de:"die Sehenswürdigkeit", art:"die", vi:"danh lam thắng cảnh", vi_alts:["điểm tham quan","thắng cảnh"], ex:"Statt Sehenswürdigkeiten zu besichtigen, kaufe ich lieber in der Innenstadt ein.", section:"A2" },
  { de:"besichtigen", art:"", vi:"tham quan / thăm quan", vi_alts:["đi thăm","tham quan"], ex:"Statt Sehenswürdigkeiten zu besichtigen, kaufe ich lieber in der Innenstadt ein.", section:"A2" },
  { de:"die Innenstadt", art:"die", vi:"trung tâm thành phố / nội thành", vi_alts:["nội thành","khu trung tâm"], ex:"Statt Sehenswürdigkeiten zu besichtigen, kaufe ich lieber in der Innenstadt ein.", section:"A2" },
  { de:"die Bücherei", art:"die", vi:"thư viện (nhỏ) / tiệm sách", vi_alts:["thư viện","hiệu sách"], ex:"Ich gehe lieber in die Bücherei.", section:"A2" },
  { de:"die Couch", art:"die", vi:"ghế sofa / trường kỷ", vi_alts:["sofa","ghế sofa"], ex:"Ich liege lieber auf der Couch, statt dass ich die Wohnung aufräume.", section:"A2" },
  { de:"der Tierpark", art:"der", vi:"vườn thú", vi_alts:["sở thú","vườn thú"], ex:"Oft gehe ich auch mit meinen Enkeln in den Tierpark.", section:"A2" },

  // ── A3 ──
  { de:"die Mauer", art:"die", vi:"bức tường", vi_alts:["tường","vách tường"], ex:"Ihre Nachbarin hat gestern erzählt, dass Ihre Kinder im Hof die Mauer beschädigt haben.", section:"A3" },
  { de:"erziehen", art:"", vi:"nuôi dạy / giáo dục", vi_alts:["dạy dỗ","nuôi dạy"], ex:"Sie sagt, dass Ihre Kinder schlecht erzogen sind.", section:"A3" },

  // ── B1 ──
  { de:"erstellen", art:"", vi:"tạo ra / lập ra", vi_alts:["lập","soạn thảo"], ex:"Luna erklärt, dass sie bis jetzt immer eine Liste erstellt hat.", section:"B1" },

  // ── B2 ──
  { de:"der Abfall", art:"der", vi:"rác thải", vi_alts:["rác","chất thải"], ex:"Der Vater stellt die Abfalltonnen raus.", section:"B2" },
  { de:"der Internetanschluss", art:"der", vi:"kết nối internet", vi_alts:["đường truyền internet","kết nối mạng"], ex:"Lina kontaktiert Telkomms, um den Internetanschluss prüfen zu lassen.", section:"B2" },

  // ── B3 ──
  { de:"die Soße", art:"die", vi:"nước sốt / sốt", vi_alts:["sốt","nước chấm"], ex:"Gibt es denn keine Soße zu dem Gericht?", section:"B3" },
  { de:"rühren", art:"", vi:"khuấy / khuấy đảo", vi_alts:["khuấy","trộn"], ex:"Soll noch etwas Kakao in die Milch gerührt werden?", section:"B3" },
  { de:"ordnen", art:"", vi:"sắp xếp / xếp ngăn nắp", vi_alts:["xếp ngăn nắp","sắp xếp"], ex:"Wie sollten denn die Bücher am besten geordnet werden?", section:"B3" },
  { de:"das Schaufenster", art:"das", vi:"tủ kính trưng bày / cửa sổ trưng bày", vi_alts:["tủ kính","cửa kính trưng bày"], ex:"Werden denn die Sachen aus dem Schaufenster billiger verkauft?", section:"B3" },

  // ── C1 ──
  { de:"die Schicht", art:"die", vi:"ca làm việc / tầng lớp", vi_alts:["ca làm","ca trực"], ex:"Frank und Luna tauschen ihre Schichten.", section:"C1" },

  // ── C2 ──
  { de:"neulich", art:"", vi:"gần đây / hôm nào đó vừa rồi", vi_alts:["gần đây","mới đây"], ex:"Es tut mir leid, dass ich neulich so unfreundlich zu dir war.", section:"C2" },
  { de:"jederzeit", art:"", vi:"bất cứ lúc nào", vi_alts:["bất kỳ lúc nào","lúc nào cũng được"], ex:"Wenn ich mal was falsch mache, kannst du mir das jederzeit sagen.", section:"C2" },
  { de:"der Schreck", art:"der", vi:"cái giật mình / nỗi kinh hoàng", vi_alts:["sự giật mình","nỗi sợ hãi"], ex:"Du brauchst keinen Schreck zu bekommen.", section:"C2" },
  { de:"sich verabreden", art:"", vi:"hẹn gặp / đặt lịch", vi_alts:["hẹn nhau","đặt hẹn"], ex:"Am Anfang war Frank sauer auf Luna, aber jetzt verabreden sie sich.", section:"C2" },
  { de:"die Mahlzeit", art:"die", vi:"bữa ăn", vi_alts:["bữa ăn","bữa cơm"], ex:"Du brauchst dir keine Mahlzeiten zu machen.", section:"C2" },
  { de:"gründlich", art:"", vi:"kỹ lưỡng / tỉ mỉ", vi_alts:["tỉ mỉ","cẩn thận"], ex:"Ich putze alles gründlich.", section:"C2" },
  { de:"der Gedanke", art:"der", vi:"suy nghĩ / ý nghĩ", vi_alts:["ý nghĩ","tư tưởng"], ex:"Wir müssen uns bald Gedanken machen, wann wir die Wohnung renovieren wollen.", section:"C2" },
];

const L11_DIALOGS = [
  { de:"Statt eine Serie zu schauen, lese ich lieber.", vi:"Thay vì xem phim, tôi thích đọc sách hơn." },
  { de:"Du hast einfach meinen Kuli genommen!", vi:"Bạn cứ lấy bút bi của tôi thế!" },
  { de:"Es tut mir leid, dass ich neulich unfreundlich war.", vi:"Tôi xin lỗi vì hôm nọ tôi đã thô lỗ." },
  { de:"Kannst du mir das jederzeit sagen?", vi:"Bạn có thể nói với tôi bất cứ lúc nào không?" },
  { de:"Ich gehe lieber in die Bücherei.", vi:"Tôi thích đến thư viện hơn." },
  { de:"Wir müssen uns Gedanken machen.", vi:"Chúng ta cần phải suy nghĩ về việc đó." },
  { de:"Unsere Mitarbeiter haben die doppelte Anzahl Überstunden.", vi:"Nhân viên của chúng tôi đang làm gấp đôi số giờ làm thêm." },
  { de:"Frank und Luna tauschen ihre Schichten.", vi:"Frank và Luna đổi ca làm việc cho nhau." },
  { de:"Ich putze alles gründlich.", vi:"Tôi lau dọn mọi thứ thật kỹ lưỡng." },
  { de:"Du brauchst keinen Schreck zu bekommen.", vi:"Bạn không cần phải giật mình đâu." },
];

// ============================================================
// LEKTION 12 – Zofia – Zeit aufzuräumen!
// ============================================================
