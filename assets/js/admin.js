/* ==========================================================================
   ADMIN VISUAL EDITOR
   Loaded lazily by main.js (only after clicking "Admin" in the footer, or when a
   token is already stored in this browser).

   How it works (GitHub Pages is static, so there is no server-side login):
   - "Login" = a GitHub fine-grained token with Contents: read & write on this
     repo only. GitHub itself is the permission check; the token is sent only to
     api.github.com.
   - Edit mode makes the visible text inside <main> editable in place.
   - Save fetches the page's source from GitHub, patches ONLY the edited
     elements' inner HTML (character offsets from a small HTML scanner) and
     commits it to main. GitHub Pages then rebuilds the site.
   Header, sidebar and footer are shared across pages and are not editable here.
   ========================================================================== */
(function () {
  'use strict';
  if (window.SiteAdmin) return;

  var OWNER = 'vinhdo281';
  var REPO = 'vinhdo281.github.io';
  var BRANCH = 'main';
  var API = 'https://api.github.com';
  var KEY = 'site_admin_token';

  // Elements whose text the editor may change (innermost match wins).
  var SEL = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'dt', 'dd', 'td', 'th', 'figcaption', 'blockquote',
    '.lang-en', '.lang-de', '.tag-badge', '.card-type', '.card-date', '.hero-subtitle',
    '.card-specs span:not(.sep)', '.btn-tech > span:not(.lang-en):not(.lang-de)',
    '.sw-line > span', '.sw-meta > span', '.author-handle', '.footer-quote'
  ].join(',');
  // Never editable: rendered math, code, JS-managed widgets.
  var EXCLUDE = '.katex, #project-count-hud, .code-box, .code-terminal, pre, script, style, ' +
                '.project-modal-backdrop, .search-modal-backdrop, .adm-ui';

  /* ---------- storage ---------- */
  function getToken() {
    try { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || ''; } catch (e) { return ''; }
  }
  function setToken(t, remember) {
    try {
      sessionStorage.removeItem(KEY); localStorage.removeItem(KEY);
      (remember ? localStorage : sessionStorage).setItem(KEY, t);
    } catch (e) { /* storage blocked: session only in memory */ memToken = t; }
  }
  var memToken = '';
  function clearToken() {
    memToken = '';
    try { sessionStorage.removeItem(KEY); localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }
  function token() { return getToken() || memToken; }

  /* ---------- helpers ---------- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else el.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }
  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function utf8ToB64(str) {
    var bytes = new TextEncoder().encode(str), bin = '', CH = 0x8000;
    for (var i = 0; i < bytes.length; i += CH) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    return btoa(bin);
  }
  function b64ToUtf8(b64) {
    var bin = atob(b64.replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  function pageRepoPath() {
    var p = decodeURIComponent(location.pathname).replace(/^\/+/, '');
    if (!p || p.slice(-1) === '/') p += 'index.html';
    return p;
  }

  /* ---------- GitHub API ---------- */
  function gh(path, opts) {
    opts = opts || {};
    return fetch(API + path, {
      method: opts.method || 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + (opts.token || token()),
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      cache: 'no-store'
    });
  }
  function explain(status, fallback) {
    if (status === 401) return 'Token không hợp lệ hoặc đã hết hạn.';
    if (status === 403) return 'Token không đủ quyền (cần Contents: Read and write) hoặc bị giới hạn tốc độ.';
    if (status === 404) return 'Token không truy cập được repo ' + OWNER + '/' + REPO + '.';
    if (status === 409 || status === 422) return 'File đã thay đổi trên GitHub. Hãy tải lại trang rồi sửa lại.';
    return fallback || ('Lỗi GitHub (' + status + ').');
  }
  function verifyToken(t) {
    return gh('/repos/' + OWNER + '/' + REPO, { token: t }).then(function (r) {
      if (!r.ok) return { ok: false, msg: explain(r.status) };
      return r.json().then(function (j) {
        if (j.permissions && !j.permissions.push) return { ok: false, msg: 'Token chỉ có quyền đọc, cần quyền ghi (Contents: Read and write).' };
        return { ok: true };
      });
    }).catch(function () { return { ok: false, msg: 'Không kết nối được tới GitHub.' }; });
  }

  /* ---------- HTML scanner: element offsets in raw source ---------- */
  var VOID = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 };
  var RAW = { script: 1, style: 1, textarea: 1, title: 1 };

  function scan(src) {
    var els = [], stack = [], i = 0, n = src.length;
    function closeTag(name, at, end) {
      for (var k = stack.length - 1; k >= 0; k--) {
        if (stack[k].tag === name) {
          stack[k].innerEnd = at; stack[k].closeEnd = end;
          stack.length = k; return;
        }
      }
    }
    while (i < n) {
      var lt = src.indexOf('<', i);
      if (lt < 0) break;
      i = lt;
      if (src.substr(i, 4) === '<!--') { var ce = src.indexOf('-->', i + 4); i = ce < 0 ? n : ce + 3; continue; }
      var c1 = src.charAt(i + 1);
      if (c1 === '!' || c1 === '?') { var de = src.indexOf('>', i); i = de < 0 ? n : de + 1; continue; }
      if (c1 === '/') {
        var cm = /^<\/([a-zA-Z][\w:.-]*)\s*>/.exec(src.substr(i, 80));
        if (!cm) { i++; continue; }
        closeTag(cm[1].toLowerCase(), i, i + cm[0].length);
        i += cm[0].length; continue;
      }
      var om = /^<([a-zA-Z][\w:.-]*)/.exec(src.substr(i, 80));
      if (!om) { i++; continue; }
      var j = i + om[0].length, q = null;
      for (; j < n; j++) {
        var ch = src.charAt(j);
        if (q) { if (ch === q) q = null; }
        else if (ch === '"' || ch === "'") q = ch;
        else if (ch === '>') break;
      }
      var tag = om[1].toLowerCase();
      var rec = { tag: tag, openStart: i, openEnd: j + 1, innerStart: j + 1, innerEnd: null, closeEnd: null };
      els.push(rec);
      var selfClose = src.charAt(j - 1) === '/';
      if (VOID[tag] || selfClose) { rec.innerEnd = rec.innerStart; rec.closeEnd = rec.openEnd; i = rec.openEnd; continue; }
      if (RAW[tag]) {
        var re = new RegExp('</' + tag + '\\s*>', 'ig'); re.lastIndex = rec.openEnd;
        var rm = re.exec(src);
        if (rm) { rec.innerEnd = rm.index; rec.closeEnd = rm.index + rm[0].length; i = rec.closeEnd; }
        else { i = n; }
        continue;
      }
      stack.push(rec);
      i = rec.openEnd;
    }
    return els;
  }

  var IMPLICIT = { html: 1, head: 1, body: 1, tbody: 1 };
  // Pair every parsed element with its scanner record. Throws if the two disagree.
  function align(raw) {
    var doc = new DOMParser().parseFromString(raw, 'text/html');
    var S = scan(raw), all = doc.getElementsByTagName('*'), map = new Map(), p = 0;
    for (var d = 0; d < all.length; d++) {
      var el = all[d], name = el.localName.toLowerCase();
      if (p < S.length && S[p].tag === name) { map.set(el, S[p]); p++; }
      else if (IMPLICIT[name]) continue;
      else throw new Error('Cấu trúc trang không khớp (<' + name + '> #' + d + ').');
    }
    if (p !== S.length) throw new Error('Cấu trúc trang không khớp (thừa phần tử trong mã nguồn).');
    return { doc: doc, map: map };
  }

  function candidates(doc) {
    var root = doc.querySelector('main');
    if (!root) return [];
    var all = [].filter.call(root.querySelectorAll(SEL), function (el) { return !el.closest(EXCLUDE); });
    var set = new Set(all);
    return all.filter(function (el) {
      var inner = el.querySelectorAll(SEL);
      for (var k = 0; k < inner.length; k++) if (set.has(inner[k])) return false;
      return true;
    });
  }

  function cleanInner(el) {
    var c = el.cloneNode(true);
    [].forEach.call(c.querySelectorAll('[contenteditable]'), function (n) { n.removeAttribute('contenteditable'); });
    // Fallback editors (no plaintext-only) may insert <div>/<font>: unwrap them.
    [].forEach.call(c.querySelectorAll('font, div'), function (n) {
      while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
      n.parentNode.removeChild(n);
    });
    return c.innerHTML;
  }

  function applyEdits(raw, edits) {
    var out = raw;
    edits.slice().sort(function (a, b) { return b.rec.innerStart - a.rec.innerStart; }).forEach(function (e) {
      out = out.slice(0, e.rec.innerStart) + e.html + out.slice(e.rec.innerEnd);
    });
    return out;
  }

  /* ---------- edit state ---------- */
  var editing = false, items = [], ui = {}, busy = false;

  function setEditable(el) {
    try { el.contentEditable = 'plaintext-only'; } catch (e) { /* ignore */ }
    if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
  }
  function isDirty(it) { return !it.locked && cleanInner(it.el) !== it.base; }
  function dirtyItems() { return items.filter(isDirty); }

  function onInput(e) {
    var it = items.find(function (x) { return x.el === e.currentTarget; });
    if (it) it.el.classList.toggle('adm-dirty', isDirty(it));
    refresh();
  }
  function onKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) document.execCommand('insertLineBreak');
    } else if (e.key === ' ' && e.currentTarget.closest('button')) {
      e.preventDefault(); document.execCommand('insertText', false, ' ');
    }
  }
  function onPaste(e) {
    e.preventDefault();
    var t = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, t.replace(/\s*\n\s*/g, ' '));
  }
  function blockNav(e) {
    if (!editing) return;
    if (e.target.closest && e.target.closest('main a, main button, main [onclick]') && !e.target.closest('.adm-ui')) {
      e.preventDefault(); e.stopPropagation();
    }
  }

  function enterEdit() {
    if (editing) return;
    items = candidates(document).map(function (el) {
      return { el: el, base: cleanInner(el), text: el.textContent, locked: !!el.querySelector('.katex') };
    });
    items.forEach(function (it) {
      if (it.locked) { it.el.classList.add('adm-locked'); return; }
      setEditable(it.el);
      it.el.classList.add('adm-editable');
      it.el.addEventListener('input', onInput);
      it.el.addEventListener('keydown', onKey);
      it.el.addEventListener('paste', onPaste);
    });
    document.documentElement.classList.add('adm-on');
    document.addEventListener('click', blockNav, true);
    editing = true; refresh();
  }
  function leaveEdit(keepMarks) {
    if (!editing) return;
    items.forEach(function (it) {
      it.el.removeAttribute('contenteditable');
      it.el.classList.remove('adm-editable', 'adm-locked');
      if (!keepMarks) it.el.classList.remove('adm-dirty');
      it.el.removeEventListener('input', onInput);
      it.el.removeEventListener('keydown', onKey);
      it.el.removeEventListener('paste', onPaste);
    });
    document.documentElement.classList.remove('adm-on');
    document.removeEventListener('click', blockNav, true);
    editing = false; refresh();
  }
  function discard() {
    var d = dirtyItems();
    if (d.length && !window.confirm('Hủy ' + d.length + ' chỗ đã sửa chưa lưu?')) return;
    window.location.reload();
  }

  /* ---------- save ---------- */
  function save() {
    if (busy) return;
    var dirty = dirtyItems();
    if (!dirty.length) { say('Chưa có thay đổi nào để lưu.'); return; }
    setBusy(true); say('Đang lấy mã nguồn trang từ GitHub…');
    var path = pageRepoPath(), meta;
    gh('/repos/' + OWNER + '/' + REPO + '/contents/' + encodeURI(path) + '?ref=' + BRANCH)
      .then(function (r) {
        if (!r.ok) throw Object.assign(new Error(explain(r.status)), { status: r.status });
        return r.json();
      })
      .then(function (m) {
        meta = m;
        if (!m.content) throw new Error('GitHub không trả nội dung file (file quá lớn).');
        var raw = b64ToUtf8(m.content);
        var a = align(raw), srcC = candidates(a.doc);
        if (srcC.length !== items.length) throw new Error('Mã nguồn trên GitHub khác trang đang xem. Hãy tải lại trang.');
        var edits = [];
        dirty.forEach(function (it) {
          var i = items.indexOf(it), s = srcC[i], rec = a.map.get(s);
          if (norm(s.textContent) !== norm(it.text)) throw new Error('Mã nguồn trên GitHub khác trang đang xem. Hãy tải lại trang.');
          if (!rec || rec.innerEnd == null) throw new Error('Không xác định được vị trí cần sửa trong mã nguồn.');
          edits.push({ rec: rec, html: cleanInner(it.el), index: i, text: it.el.textContent });
        });
        var out = applyEdits(raw, edits);
        // Verify: the patched source must parse to the same structure, with exactly our text.
        var b = align(out), outC = candidates(b.doc);
        if (outC.length !== srcC.length) throw new Error('Kiểm tra sau khi sửa thất bại (số phần tử đổi). Không lưu.');
        edits.forEach(function (e) {
          if (norm(outC[e.index].textContent) !== norm(e.text)) throw new Error('Kiểm tra sau khi sửa thất bại. Không lưu.');
        });
        say('Đang lưu (commit) lên GitHub…');
        return gh('/repos/' + OWNER + '/' + REPO + '/contents/' + encodeURI(path), {
          method: 'PUT',
          body: {
            message: 'content: edit ' + path + ' via admin editor (' + edits.length + ' change' + (edits.length > 1 ? 's' : '') + ')',
            content: utf8ToB64(out), sha: meta.sha, branch: BRANCH
          }
        });
      })
      .then(function (r) {
        if (!r.ok) throw Object.assign(new Error(explain(r.status)), { status: r.status });
        items.forEach(function (it) { it.base = cleanInner(it.el); it.text = it.el.textContent; it.el.classList.remove('adm-dirty'); });
        say('Đã lưu. Site sẽ cập nhật sau khoảng 1 phút (Ctrl+Shift+R để xem bản mới).');
      })
      .catch(function (err) {
        if (err && err.status === 401) { clearToken(); say(err.message); }
        else say('Không lưu được: ' + (err && err.message ? err.message : err));
      })
      .then(function () { setBusy(false); refresh(); });
  }

  /* ---------- UI ---------- */
  function say(msg) { if (ui.status) ui.status.textContent = msg; }
  function setBusy(b) { busy = b; refresh(); }
  function langName() { return (document.body.getAttribute('data-lang') === 'de') ? 'tiếng Đức' : 'tiếng Anh'; }
  function refresh() {
    if (!ui.bar) return;
    var n = editing ? dirtyItems().length : items.filter(isDirty).length;
    ui.toggle.textContent = editing ? 'Tắt chế độ sửa' : 'Bật chế độ sửa';
    ui.toggle.setAttribute('aria-pressed', editing ? 'true' : 'false');
    ui.save.textContent = 'Lưu lên GitHub' + (n ? ' (' + n + ')' : '');
    ui.save.disabled = busy || n === 0;
    ui.discard.disabled = busy || n === 0;
    if (editing && !busy && !ui.status.dataset.sticky) {
      ui.hint.textContent = 'Đang sửa bản ' + langName() + '. Đổi ngôn ngữ ở menu để sửa bản còn lại. Header/sidebar/footer và công thức toán không sửa ở đây.';
    } else if (!editing) {
      ui.hint.textContent = 'Bật chế độ sửa rồi bấm thẳng vào chữ trên trang. Chỉ sửa trang này.';
    }
  }

  function buildBar() {
    if (ui.bar) return;
    ui.hint = h('div', { 'class': 'adm-hint' });
    ui.status = h('div', { 'class': 'adm-status', role: 'status', 'aria-live': 'polite' });
    ui.toggle = h('button', { type: 'button', 'class': 'adm-btn', onclick: function () { editing ? leaveEdit(true) : enterEdit(); } });
    ui.save = h('button', { type: 'button', 'class': 'adm-btn adm-primary', onclick: save });
    ui.discard = h('button', { type: 'button', 'class': 'adm-btn', text: 'Hủy thay đổi', onclick: discard });
    var logout = h('button', { type: 'button', 'class': 'adm-btn', text: 'Đăng xuất', onclick: logoutNow });
    ui.bar = h('div', { 'class': 'adm-ui adm-bar', role: 'region', 'aria-label': 'Admin' }, [
      h('div', { 'class': 'adm-text' }, [h('strong', { text: 'ADMIN' }), ui.hint, ui.status]),
      h('div', { 'class': 'adm-actions' }, [ui.toggle, ui.save, ui.discard, logout])
    ]);
    document.body.appendChild(ui.bar);
    document.documentElement.classList.add('adm-has-bar');
    window.addEventListener('siteLanguageChange', refresh);
    window.addEventListener('beforeunload', function (e) {
      if (dirtyItems().length) { e.preventDefault(); e.returnValue = ''; }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && editing) { e.preventDefault(); save(); }
    });
    refresh();
  }
  function logoutNow() {
    if (dirtyItems().length && !window.confirm('Còn thay đổi chưa lưu. Vẫn đăng xuất?')) return;
    clearToken(); window.location.reload();
  }

  // Fine-grained token page on GitHub, pre-filled where GitHub supports it.
  var TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new' +
    '?name=' + encodeURIComponent(REPO + ' admin editor') +
    '&description=' + encodeURIComponent('Visual editor for ' + REPO) +
    '&target_name=' + encodeURIComponent(OWNER) + '&expires_in=90&contents=write';

  function openLogin(message) {
    if (ui.modal) { ui.modal.remove(); ui.modal = null; }
    var input = h('input', { type: 'password', id: 'adm-token', autocomplete: 'off', spellcheck: 'false', placeholder: 'github_pat_…', 'aria-label': 'GitHub token' });
    var remember = h('input', { type: 'checkbox', id: 'adm-remember' });
    var err = h('div', { 'class': 'adm-error', role: 'alert', text: message || '' });
    var go = h('button', { type: 'submit', 'class': 'adm-btn adm-primary', text: 'Vào' });
    var gh_ = h('a', { 'class': 'adm-btn adm-primary adm-ghlink', href: TOKEN_URL, target: '_blank', rel: 'noopener', text: 'Đăng nhập với GitHub' });
    var form = h('form', { 'class': 'adm-form' }, [
      gh_,
      input,
      h('label', { 'class': 'adm-check', 'for': 'adm-remember' }, [remember, h('span', { text: 'Nhớ thiết bị này' })]),
      err,
      h('div', { 'class': 'adm-actions' }, [
        go,
        h('button', { type: 'button', 'class': 'adm-btn', text: 'Đóng', onclick: closeLogin })
      ])
    ]);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = input.value.trim();
      if (!t) { err.textContent = 'Dán token vào ô trên.'; return; }
      go.disabled = true; err.textContent = 'Đang kiểm tra…';
      verifyToken(t).then(function (r) {
        if (!r.ok) { err.textContent = r.msg; go.disabled = false; return; }
        setToken(t, remember.checked); closeLogin(); start();
      });
    });
    ui.modal = h('div', { 'class': 'adm-ui adm-modal-backdrop' }, [
      h('div', { 'class': 'adm-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Đăng nhập admin' }, [
        h('h2', { text: 'Đăng nhập admin' }),
        form
      ])
    ]);
    ui.modal.addEventListener('click', function (e) { if (e.target === ui.modal) closeLogin(); });
    document.addEventListener('keydown', escClose);
    document.body.appendChild(ui.modal);
    gh_.focus();
  }
  function escClose(e) { if (e.key === 'Escape') closeLogin(); }
  function closeLogin() {
    if (ui.modal) { ui.modal.remove(); ui.modal = null; }
    document.removeEventListener('keydown', escClose);
  }

  function start() { buildBar(); say('Đã đăng nhập. Bật chế độ sửa để bắt đầu.'); }

  window.SiteAdmin = {
    open: function () { if (token()) { start(); } else { openLogin(); } },
    resume: function () {
      verifyToken(token()).then(function (r) {
        if (r.ok) start(); else { clearToken(); openLogin(r.msg); }
      });
    },
    // exposed for the offline test harness only
    _t: { scan: scan, align: align, candidates: candidates, cleanInner: cleanInner, applyEdits: applyEdits, utf8ToB64: utf8ToB64, b64ToUtf8: b64ToUtf8 }
  };
})();
