/* ============================================================
   c1-data-core.js
   Registry dùng chung cho mọi module Wortschatz/Grammatik/Kỹ năng.
   Mỗi file data (vd: data/wortschatz-leiter.js) tự gọi
   registerDataSource(...) khi được load — không cần app biết
   trước có bao nhiêu nguồn.

   Cách dùng trong 1 trang luyện tập riêng (vd Wortschatz-Leiter):
     <script src="js/c1-data-core.js"></script>
     <script src="data/wortschatz-leiter.js"></script>
     <script> const items = C1Data.get('wortschatz-leiter').items; </script>

   Cách dùng trong Schnell-Training (gộp TẤT CẢ nguồn đã load):
     <script src="js/c1-data-core.js"></script>
     <script src="data/wortschatz-leiter.js"></script>
     <script src="data/redemittel.js"></script>   <!-- sau này -->
     <script> const pool = C1Data.pool(); </script>
   ============================================================ */
(function (global) {
  const sources = {};
  const renderers = {};

  /**
   * Mỗi loại dữ liệu (type) tự đăng ký cách hiển thị mặt trước/sau của thẻ,
   * để Schnell-Training không cần biết trước hình dạng dữ liệu của từng module.
   * @param {string} type
   * @param {{front:Function, back:Function}} fns - nhận 1 item, trả về HTML string
   */
  function registerRenderer(type, fns) {
    renderers[type] = fns;
  }

  function render(item) {
    const r = renderers[item.__type];
    if (!r) return { front: '(kein Renderer für „' + item.__type + '“)', back: '' };
    return { front: r.front(item), back: r.back(item) };
  }

  /**
   * Đăng ký 1 nguồn dữ liệu.
   * @param {Object} cfg
   * @param {string} cfg.id      - khoá duy nhất, vd "wortschatz-leiter"
   * @param {string} cfg.label   - tên hiển thị, vd "Wortschatz-Leiter"
   * @param {string} cfg.type    - "b1-b2-c1" | "redemittel" | "themen" | ...
   * @param {Array}  cfg.items   - mảng thẻ, mỗi thẻ do module tự định nghĩa hình dạng,
   *                               nhưng nên có ít nhất { front, back, vn }
   */
  function registerDataSource(cfg) {
    if (!cfg || !cfg.id || !Array.isArray(cfg.items)) {
      console.warn('[C1Data] registerDataSource: thiếu id hoặc items', cfg);
      return;
    }
    sources[cfg.id] = cfg;
  }

  function get(id) {
    return sources[id] || null;
  }

  function list() {
    return Object.values(sources);
  }

  /**
   * Gộp toàn bộ item của tất cả nguồn ĐÃ ĐƯỢC LOAD trên trang hiện tại
   * thành 1 pool phẳng, mỗi item được gắn thêm __source (id) và __sourceLabel.
   */
  function pool() {
    const out = [];
    Object.values(sources).forEach(src => {
      src.items.forEach(item => {
        out.push(Object.assign({}, item, {
          __source: src.id,
          __sourceLabel: src.label,
          __type: src.type
        }));
      });
    });
    return out;
  }

  global.C1Data = { registerDataSource, get, list, pool, registerRenderer, render };
})(window);
