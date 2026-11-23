# Hören & Diktat – module

## Dùng hằng ngày – KHÔNG cần AI, KHÔNG gõ lệnh
**Chạy:** double-click `start.bat` (Windows) hoặc `start.command` (Mac) → trình duyệt tự mở. (Cần Python 3 đã cài; không cần cài thêm gì.)
Giữ cửa sổ đen mở trong lúc dạy; đóng cửa sổ là tắt.

**Thêm bài mới (không đụng code):**
1. Trang chủ → kéo xuống **➕ Neue Lektion hinzufügen**.
2. Chọn file mp3, gõ tiêu đề, dán văn bản (mỗi dòng = 1 đoạn audio). Bấm **🔍 Analysieren** (trang tự dò mốc thời gian).
3. Bấm **💾 Direkt speichern** → mp3 + json tự nằm đúng chỗ trong `assets/`, trang tự tải lại. Xong.
4. Câu hỏi (tuỳ chọn): bấm **🤖 KI-Prompt** dán vào Claude/Gemini/ChatGPT bất kỳ (chat thường, ko cần Claude Code), dán JSON trả về vào ô "Fragen" trước khi lưu.
   Bài không có câu hỏi vẫn dùng được (bỏ qua bước Fragen).

**Chỉnh giao diện không cần AI:**
- Nút **⚙️ Aussehen** (góc phải trên): đổi font, cỡ chữ (80–150 %), màu chính, sáng/tối. Lưu trong trình duyệt.
- Muốn đổi cố định cho mọi máy: sửa `assets/theme.css` (có sẵn ví dụ, chỉ cần bỏ dấu `/* */`).

**Sửa/xoá bài:** mở `assets/lessons/<id>.json` bằng Notepad (sửa chữ trong "text", đáp án trong "questions"), lưu, F5. Xoá bài = xoá file .json đó. Không cần chạy gì thêm (start.py đọc lại thư mục mỗi lần tải trang).

**Không có Python?** Mở index.html trực tiếp vẫn chạy, nhưng khi đó: lưu .json thủ công vào `assets/lessons/` rồi chạy `tools/sync.py` (hoặc nhờ AI 1 lần).

## Cấu trúc
```
hoeren-diktat/
├─ start.bat / start.command / start.py   ← khởi động (server mini)
├─ index.html          ← giao diện + logic (không cần đụng)
└─ assets/
   ├─ audio/           ← *.mp3
   ├─ lessons/         ← mỗi bài 1 file .json
   ├─ theme.css        ← chỉnh màu/font cố định
   └─ lessons.js       ← bản gom sẵn (chỉ dùng khi KHÔNG chạy start.py)
```

## Luồng học
1. **Hören** – nghe cả bài 1 lần (chỉ các lần đọc thường, tự bỏ qua lần đọc chậm).
2. **Fragen** – 3–5 câu hỏi nội dung chính, 4 đáp án A–D.
3. **Diktat** – từng câu: ▶ Normal / 🐢 Langsam ×2 (2 lần đọc chậm), tự gõ (kể cả dấu câu), bấm Prüfen → tô màu từ đúng/sai + % điểm. Có nút "Text zum Lesen" để đọc theo.
4. **Ergebnis** – điểm hiểu + điểm Diktat từng câu. Tiến độ lưu trong localStorage.

## Mỗi bài = 1 file assets/lessons/<id>.json
```json
{ "id":"im-wald", "title":"Im Wald", "level":"A1-A2", "tag":"Geschichte", "order":16,
  "audio":"assets/audio/16-im-wald_diktat_sach.mp3", "duration":321,
  "units":[ { "text":"Câu/đoạn chuẩn (có dấu câu)", "cue":[bắt_đầu, hết_lần_đọc_thường, hết_2_lần_chậm] } ],
  "questions":[ { "q":"Câu hỏi?", "o":["A","B","C","D"], "a":0 } ] }
```
`cue` tính bằng giây: Normal = cue[0]→cue[1], Langsam = cue[1]→cue[2]. `a` = chỉ số đáp án đúng (0–3).

## Nhúng vào module khác (lesen, schreiben, wortschatz, grammatik…)
```html
<div id="slot"></div>
<script src="hoeren-diktat/assets/lessons.js"></script>
<script>
  const m = HoerenDiktat.mount(document.getElementById('slot'), {
    lessons: window.HD_LESSONS,
    startLessonId: 'im-wald',                // tuỳ chọn
    onEvent: (name, data) => console.log(name, data)   // quiz:done | diktat:done | lesson:done
  });
</script>
```
Cũng có sự kiện DOM `hd:quiz:done`, `hd:diktat:done`, `hd:lesson:done` (bubbles) trên phần tử gắn. Toàn bộ CSS nằm dưới class `.hd`, màu là biến `--hd-*` nên đổi theme dễ.
(Nếu nhúng, copy khối `<style>` và `<script>` trong index.html sang file riêng hoặc dán thẳng.)

## Ghi chú
- Văn bản của các bài tạo từ PDF (21 bài) là chính xác; các bài lingua (20 bài) được dựng lại từ nhận dạng giọng nói – nên đọc lướt lại.
- Chấm Diktat: so từng từ + từng dấu câu, phân biệt hoa/thường (đúng chuẩn chính tả Đức), không bắt lỗi dấu ngoặc kép kiểu „ “ " khác nhau.
- Font Baloo 2/Nunito tải từ Google Fonts (offline sẽ dùng font hệ thống).
