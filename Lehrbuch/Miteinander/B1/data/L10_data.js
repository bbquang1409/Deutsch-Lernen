const L10_WORDS = [
  // ── Abschnitt 1 ──
  { de:"erschrecken", art:"", vi:"giật mình / hốt hoảng", vi_alts:["bị giật mình","hoảng sợ"], ex:"Alev ist erschrocken, weil Autos gehupt haben.", section:"1" },
  { de:"hupen", art:"", vi:"bóp còi / bấm còi", vi_alts:["bấm còi","kèn xe"], ex:"Alev ist erschrocken, weil Autos gehupt haben.", section:"1" },

  // ── Abschnitt 2 ──
  { de:"abbiegen", art:"", vi:"rẽ / quẹo", vi_alts:["rẽ vào","quẹo"], ex:"Mein Bruder ist mal beim Abbiegen mit dem Fahrrad gestürzt.", section:"2" },
  { de:"ärgerlich", art:"", vi:"bực bội / khó chịu", vi_alts:["khó chịu","bực mình"], ex:"Das war echt ärgerlich.", section:"2" },

  // ── A1 ──
  { de:"durcheinander", art:"", vi:"lộn xộn / bối rối", vi_alts:["lộn tùng phèo","bối rối"], ex:"Ahmet ist durcheinander.", section:"A1" },
  { de:"bremsen", art:"", vi:"phanh / đạp phanh", vi_alts:["đạp phanh","hãm phanh"], ex:"Plötzlich haben Autos gebremst.", section:"A1" },
  { de:"der Lastkraftwagen", art:"der", vi:"xe tải", vi_alts:["xe tải lớn","xe vận tải"], ex:"Auf der Kreuzung ist ein Lkw stehen geblieben.", section:"A1" },
  { de:"der Lkw", art:"der", vi:"xe tải (viết tắt)", vi_alts:["xe tải","xe vận tải"], ex:"Auf der Kreuzung ist ein Lkw stehen geblieben.", section:"A1" },
  { de:"stehen bleiben", art:"", vi:"đứng yên / bị dừng lại", vi_alts:["dừng lại","đỗ lại"], ex:"Weil auf der Kreuzung ein Lkw stehen geblieben war.", section:"A1" },
  { de:"stoßen", art:"", vi:"va vào / đụng", vi_alts:["đụng vào","va chạm"], ex:"Ahmet ist mit dem Fahrrad gegen die Tür eines parkenden Autos gestoßen.", section:"A1" },
  { de:"der Zeuge", art:"der", vi:"nhân chứng (nam)", vi_alts:["nhân chứng"], ex:"Es gibt keine Zeugen, die gesehen haben, was passiert ist.", section:"A1" },
  { de:"die Zeugin", art:"die", vi:"nhân chứng (nữ)", vi_alts:["nữ nhân chứng"], ex:"", section:"A1" },
  { de:"der Schaden", art:"der", vi:"thiệt hại / hư hỏng", vi_alts:["sự hư hỏng","thiệt hại"], ex:"Ahmets Versicherung kümmert sich darum, dass der Schaden bezahlt wird.", section:"A1" },

  // ── A2 ──
  { de:"anhalten", art:"", vi:"dừng lại / giữ lại", vi_alts:["dừng xe","giữ dừng"], ex:"Ahmet hat zu spät gesehen, dass Alev angehalten hatte.", section:"A2" },
  { de:"hungrig", art:"", vi:"đói bụng", vi_alts:["bị đói","đói"], ex:"Ich war nicht mehr hungrig, weil ich gerade gefrühstückt hatte.", section:"A2" },
  { de:"die Verabredung", art:"die", vi:"cuộc hẹn", vi_alts:["hẹn gặp","buổi hẹn"], ex:"Ich war sauer, weil meine Freundin unsere Verabredung abgesagt hatte.", section:"A2" },
  { de:"bereits", art:"", vi:"đã rồi / sẵn rồi", vi_alts:["đã sẵn","trước đó"], ex:"Ich musste zu Fuß nach Hause gehen, weil der Zug bereits abgefahren war.", section:"A2" },
  { de:"beschädigen", art:"", vi:"làm hư hỏng / gây hư hại", vi_alts:["gây hư hại","làm hỏng"], ex:"Ich bin zur Polizei gegangen, weil jemand mein Auto beschädigt hatte.", section:"A2" },

  // ── A3 ──
  { de:"bevor", art:"", vi:"trước khi", vi_alts:["trước khi","trước lúc"], ex:"Bevor ich nach Wien umgezogen bin, habe ich viele Jahre in Paris gelebt.", section:"A3" },
  { de:"nachdem", art:"", vi:"sau khi", vi_alts:["sau khi","sau lúc"], ex:"Nachdem ich die Schule dort beendet hatte, habe ich eine Ausbildung zum Bäcker gemacht.", section:"A3" },
  { de:"der Bäcker", art:"der", vi:"thợ làm bánh / tiệm bánh (nam)", vi_alts:["thợ bánh mì","người làm bánh"], ex:"Nachdem ich die Schule beendet hatte, habe ich eine Ausbildung zum Bäcker gemacht.", section:"A3" },
  { de:"die Bäckerin", art:"die", vi:"thợ làm bánh (nữ)", vi_alts:["nữ thợ làm bánh"], ex:"", section:"A3" },
  { de:"ebenfalls", art:"", vi:"cũng vậy / đồng thời", vi_alts:["cũng","ngoài ra"], ex:"Ebenfalls superwichtig: Bevor man sich selbstständig macht, muss man sich gut informieren.", section:"A3" },
  { de:"das Seminar", art:"das", vi:"hội thảo / buổi học chuyên đề", vi_alts:["buổi hội thảo","seminar"], ex:"Ich habe die Bäckerei erst eröffnet, nachdem ich mehrere Gründerseminare besucht hatte.", section:"A3" },
  { de:"aufregend", art:"", vi:"hào hứng / thú vị", vi_alts:["kích thích","thú vị"], ex:"Gestern hatte ich ein aufregendes Erlebnis.", section:"A3" },
  { de:"das Erlebnis", art:"das", vi:"trải nghiệm / sự kiện đáng nhớ", vi_alts:["trải nghiệm","kỷ niệm"], ex:"Gestern hatte ich ein aufregendes Erlebnis.", section:"A3" },

  // ── B1 ──
  { de:"versichern", art:"", vi:"bảo hiểm / đảm bảo", vi_alts:["tham gia bảo hiểm","bảo hiểm"], ex:"Haus, Hund, Smartphone oder Auto: Man kann fast alles versichern.", section:"B1" },
  { de:"die Pflicht", art:"die", vi:"nghĩa vụ / bắt buộc", vi_alts:["bắt buộc","trách nhiệm"], ex:"Fast alle haben eine Kranken- und Pflegeversicherung, denn diese Versicherungen sind Pflicht.", section:"B1" },
  { de:"die Pflegeversicherung", art:"die", vi:"bảo hiểm chăm sóc dài hạn", vi_alts:["bảo hiểm điều dưỡng","bảo hiểm chăm sóc"], ex:"So braucht zum Beispiel jeder eine Kranken- und Pflegeversicherung.", section:"B1" },
  { de:"zulassen", art:"", vi:"cho phép / cấp đăng ký", vi_alts:["cấp phép","cho phép"], ex:"Ohne diese Versicherung wird das Fahrzeug nicht zugelassen.", section:"B1" },
  { de:"eventuell", art:"", vi:"có thể / có lẽ", vi_alts:["có thể","tùy từng trường hợp"], ex:"Welche Versicherungen eventuell wichtig sind, hängt von der persönlichen Situation ab.", section:"B1" },
  { de:"abhängen", art:"", vi:"phụ thuộc vào", vi_alts:["tùy thuộc","phụ thuộc"], ex:"Welche Versicherungen sinnvoll sind, hängt von der persönlichen Situation ab.", section:"B1" },
  { de:"der Rentner", art:"der", vi:"người về hưu (nam)", vi_alts:["người về hưu"], ex:"Studierende brauchen andere Versicherungen als Rentner.", section:"B1" },
  { de:"die Rentnerin", art:"die", vi:"người về hưu (nữ)", vi_alts:["bà về hưu"], ex:"", section:"B1" },
  { de:"die Scheibe", art:"die", vi:"kính xe / tấm kính", vi_alts:["kính cửa sổ","tấm kính"], ex:"Die Scheibe geht kaputt.", section:"B1" },

  // ── B2 ──
  { de:"überprüfen", art:"", vi:"kiểm tra / xác minh", vi_alts:["kiểm tra lại","xác nhận"], ex:"Bevor Sie das Formular abschicken, überprüfen Sie bitte noch mal alle Angaben.", section:"B2" },

  // ── B3 ──
  { de:"die Bedienungsanleitung", art:"die", vi:"hướng dẫn sử dụng", vi_alts:["sách hướng dẫn","hướng dẫn"], ex:"Liest du immer die Bedienungsanleitung, bevor du ein Gerät benutzt?", section:"B3" },
  { de:"die Anleitung", art:"die", vi:"hướng dẫn", vi_alts:["chỉ dẫn","hướng dẫn sử dụng"], ex:"Liest du immer die Bedienungsanleitung?", section:"B3" },
  { de:"vorgestern", art:"", vi:"hôm kia / ngày kia trước", vi_alts:["hôm kia","hai hôm trước"], ex:"Während ich vorgestern zur Arbeit gefahren bin, habe ich mit einem Freund telefoniert.", section:"B3" },
  { de:"vorhin", art:"", vi:"lúc nãy / vừa rồi", vi_alts:["lúc nãy","vừa mới"], ex:"Während ich vorhin Sport gemacht habe, habe ich laut Musik gehört.", section:"B3" },

  // ── B4 ──
  { de:"der/die Verwandte", art:"", vi:"người thân / họ hàng", vi_alts:["họ hàng","người thân"], ex:"Während Ihre Nachbarn bei Verwandten sind, sollen Sie die Blumen gießen.", section:"B4" },

  // ── C1 ──
  { de:"die Vorwahl", art:"die", vi:"mã vùng / mã quay số", vi_alts:["mã vùng điện thoại","số vùng"], ex:"Ahmets Vorwahl ist 0120.", section:"C1" },
  { de:"die Art", art:"die", vi:"loại / cách / kiểu", vi_alts:["loại","cách"], ex:"Machen Sie Fotos oder Videos, um einen Nachweis über die Art des Schadens zu haben.", section:"C1" },
  { de:"das Zeichen", art:"das", vi:"dấu hiệu / ký hiệu", vi_alts:["ký hiệu","biểu tượng"], ex:"Hat die Polizei den Schaden aufgenommen? Wenn ja, bitte Aktenzeichen angeben.", section:"C1" },
  { de:"verwandt", art:"", vi:"có họ hàng / liên quan", vi_alts:["có quan hệ họ hàng","liên quan"], ex:"Sind Sie mit der geschädigten Person verwandt?", section:"C1" },

  // ── C3 ──
  { de:"die Leiter", art:"die", vi:"cái thang / thang", vi_alts:["cái thang","thang leo"], ex:"Ich habe eine Leiter getragen.", section:"C3" },
];

const L10_DIALOGS = [
  { de:"Das war echt ärgerlich.", vi:"Điều đó thực sự rất bực bội." },
  { de:"Es gibt keine Zeugen.", vi:"Không có nhân chứng nào." },
  { de:"Bevor ich nach Wien umgezogen bin, lebte ich in Paris.", vi:"Trước khi chuyển đến Wien, tôi sống ở Paris." },
  { de:"Nachdem ich die Schule beendet hatte, machte ich eine Ausbildung.", vi:"Sau khi tốt nghiệp trường, tôi học một nghề." },
  { de:"Diese Versicherungen sind Pflicht.", vi:"Những bảo hiểm này là bắt buộc." },
  { de:"Das hängt von der persönlichen Situation ab.", vi:"Điều đó phụ thuộc vào hoàn cảnh cá nhân." },
  { de:"Bitte überprüfen Sie noch mal alle Angaben.", vi:"Vui lòng kiểm tra lại tất cả các thông tin một lần nữa." },
  { de:"Ahmets Versicherung kümmert sich darum.", vi:"Bảo hiểm của Ahmet sẽ lo việc đó." },
  { de:"Ich war nicht mehr hungrig.", vi:"Tôi không còn đói nữa." },
  { de:"Ich war sauer, weil sie die Verabredung abgesagt hatte.", vi:"Tôi tức vì cô ấy đã hủy buổi hẹn." },
];

// ============================================================
// LEKTION 11 – Luna – Ein super Team!
// ============================================================
