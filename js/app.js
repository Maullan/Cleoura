/* ==========================================================
   CleOura — aplikasi website (routing, katalog, booking, kalkulator)
   Harga, jadwal, dan nomor WhatsApp dibaca dari js/config.js
   ========================================================== */
(function () {
  'use strict';
  var C = window.CLEOURA_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- helpers ---------- */
  function rp(n) { return 'Rp ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseYmd(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  function longDate(s) { var d = parseYmd(s); return DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function shortDate(s) { var d = parseYmd(s); return DAYS[d.getDay()].slice(0, 3) + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3); }

  /* ---------- icons ---------- */
  var P = {
    sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    wardrobe: '<path d="M12 6.5a2 2 0 1 1 2 2c-1 .4-2 1-2 2V12"/><path d="M12 12 3.6 17.3a1 1 0 0 0 .5 1.9h15.8a1 1 0 0 0 .5-1.9z"/>',
    bathroom: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 12V6.5a2 2 0 0 1 4 0"/><path d="M7 21l1-2M17 21l-1-2"/>',
    dish: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
    leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-5 6-8 10-10"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    wa: '<path d="M3 21l1.6-4.6A9 9 0 1 1 8 19.6z"/><path d="M9 9.5c.5 2 2.5 4 5 5l1.5-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z"/>',
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 8"/>',
    zoom: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8v6M8 11h6"/>',
    chevs: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
    chevl: '<path d="M15 5l-7 7 7 7"/>',
    chevr: '<path d="M9 5l7 7-7 7"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    bed: '<path d="M3 19V7M3 14h18v5M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>'
  };
  function ico(n, cls) { return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || '') + '</svg>'; }

  /* simple floor-plan illustration per room size */
  function roomIllu(id) {
    var dims = { small: [70, 56], medium: [96, 70], large: [124, 84] }[id] || [96, 70];
    var w = dims[0], h = dims[1], x = (160 - w) / 2, y = (100 - h) / 2;
    var s = '<svg viewBox="0 0 160 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">';
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="#fff" stroke-width="2"/>';
    s += '<rect x="' + (x + 7) + '" y="' + (y + 7) + '" width="26" height="' + Math.min(34, h - 14) + '" rx="4" fill="#F1EEE5"/>';
    s += '<rect x="' + (x + 10) + '" y="' + (y + 10) + '" width="20" height="7" rx="2.5"/>';
    if (id !== 'small') s += '<rect x="' + (x + w - 32) + '" y="' + (y + 7) + '" width="25" height="11" rx="3" fill="#F1EEE5"/>';
    if (id === 'large') s += '<rect x="' + (x + w - 22) + '" y="' + (y + h - 30) + '" width="15" height="23" rx="3" fill="#F1EEE5"/>';
    s += '<path d="M' + (x + w - 18) + ' ' + (y + h) + 'h-12" stroke="#fff" stroke-width="3"/>';
    s += '<path d="M' + (x + w - 30) + ' ' + (y + h) + 'a12 12 0 0 1 12 -10" stroke-width="1.2" stroke-dasharray="2 2"/></svg>';
    return s;
  }

  /* ---------- state ---------- */
  var state = { room: null, addons: [], date: '', time: '', customer: { name: '', wa: '', address: '', kos: '', note: '' }, step: 1, done: null };
  var ROOM_NONE = 'none';

  function totals() {
    var room = C.roomSizes.filter(function (r) { return r.id === state.room; })[0] || null;
    var adds = C.addons.filter(function (a) { return state.addons.indexOf(a.id) > -1; });
    var roomPrice = room ? room.price : 0;
    var addTotal = adds.reduce(function (s, a) { return s + a.price; }, 0);
    return { room: room, roomPrice: roomPrice, adds: adds, addTotal: addTotal, total: roomPrice + addTotal };
  }
  function toggleAddon(id) {
    var i = state.addons.indexOf(id);
    if (i > -1) state.addons.splice(i, 1); else state.addons.push(id);
  }

  /* ---------- toast ---------- */
  function toast(msg, type) {
    var box = $('#toasts'); var t = document.createElement('div');
    t.className = 'toast ' + (type || 'info'); t.setAttribute('role', type === 'error' ? 'alert' : 'status');
    t.innerHTML = ico(type === 'error' ? 'alert' : type === 'success' ? 'check' : 'info') + '<span>' + esc(msg) + '</span>';
    box.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 320); }, 4200);
  }

  /* ---------- whatsapp ---------- */
  function waNumber() {
    var n = String(C.whatsapp.number || '').replace(/\D/g, '');
    if (!n) return '';
    if (n.charAt(0) === '0') n = '62' + n.slice(1);
    else if (n.charAt(0) === '8') n = '62' + n;
    return n;
  }
  function waLink(text) { return 'https://wa.me/' + waNumber() + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function buildMessage() {
    var t = totals(), c = state.customer, L = [];
    L.push('Halo CleOura, saya ingin memesan layanan berikut:', '');
    L.push('*DATA PEMESAN*');
    L.push('Nama: ' + c.name.trim());
    L.push('WhatsApp: ' + normalizeWa(c.wa));
    L.push('Alamat: ' + c.address.trim());
    if (c.kos.trim()) L.push('Kos / lokasi: ' + c.kos.trim());
    if (c.note.trim()) L.push('Catatan: ' + c.note.trim());
    L.push('', '*PESANAN*');
    if (t.room) L.push('Room Cleaning – ' + t.room.name + ': ' + rp(t.roomPrice));
    else L.push('Room Cleaning: tidak dipesan (hanya layanan tambahan)');
    if (t.adds.length) { L.push('Layanan tambahan:'); t.adds.forEach(function (a) { L.push('- ' + a.name + ': ' + rp(a.price)); }); }
    else L.push('Layanan tambahan: -');
    L.push('', '*JADWAL*', 'Tanggal: ' + longDate(state.date), 'Jam: ' + state.time + ' WIB');
    L.push('', '*RINCIAN HARGA*');
    if (t.room) L.push('Harga Room Cleaning: ' + rp(t.roomPrice));
    L.push('Total layanan tambahan: ' + rp(t.addTotal));
    L.push('*TOTAL PEMBAYARAN: ' + rp(t.total) + '*', '', 'Mohon konfirmasi ketersediaan jadwalnya. Terima kasih!');
    return L.join('\n');
  }

  /* ---------- schedule ---------- */
  function todayStr() { return ymd(new Date()); }
  function maxDateStr() { var d = new Date(); d.setDate(d.getDate() + C.schedule.maxAdvanceDays); return ymd(d); }
  function dayOpen(ds) {
    var d = parseYmd(ds);
    return C.schedule.openDays.indexOf(d.getDay()) > -1 && C.schedule.closedDates.indexOf(ds) === -1;
  }
  function slotStatus(ds, time) {
    if (!ds || !dayOpen(ds)) return 'closed';
    var full = C.schedule.fullSlots[ds];
    if (full && full.indexOf(time) > -1) return 'full';
    if (ds === todayStr()) {
      var p = time.split(':'), s = parseYmd(ds); s.setHours(+p[0], +p[1], 0, 0);
      var min = new Date(Date.now() + C.schedule.minLeadHours * 3600000);
      if (s < min) return 'past';
    }
    return 'ok';
  }
  function dateError(ds) {
    if (!ds) return 'Pilih tanggal pengerjaan terlebih dahulu.';
    if (ds < todayStr()) return 'Tanggal yang sudah berlalu tidak dapat dipilih.';
    if (ds > maxDateStr()) return 'Pemesanan hanya dapat dilakukan maksimal ' + C.schedule.maxAdvanceDays + ' hari ke depan.';
    if (!dayOpen(ds)) return 'CleOura tidak beroperasi pada tanggal tersebut. Silakan pilih tanggal lain.';
    return '';
  }

  /* ---------- validation ---------- */
  function normalizeWa(v) {
    var n = String(v || '').replace(/[\s\-().]/g, '').replace(/^\+/, '');
    if (n.indexOf('62') === 0) return '+' + n;
    if (n.charAt(0) === '0') return '+62' + n.slice(1);
    if (n.charAt(0) === '8') return '+62' + n;
    return n;
  }
  var VAL = {
    name: function (v) { v = v.trim(); if (!v) return 'Nama lengkap wajib diisi.'; if (v.length < 3) return 'Nama minimal 3 karakter.'; if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'\-]+$/.test(v)) return 'Nama hanya boleh berisi huruf.'; return ''; },
    wa: function (v) { v = v.trim(); if (!v) return 'Nomor WhatsApp wajib diisi.'; var n = normalizeWa(v).replace('+', ''); if (!/^628\d{8,11}$/.test(n)) return 'Gunakan nomor Indonesia yang valid, mis. 0812xxxxxxxx atau +62812xxxxxxxx.'; return ''; },
    address: function (v) { v = v.trim(); if (!v) return 'Alamat lengkap wajib diisi.'; if (v.length < 10) return 'Alamat terlalu singkat. Tuliskan jalan, nomor, dan area (mis. Sapen).'; return ''; },
    note: function (v) { return v.length > 300 ? 'Catatan maksimal 300 karakter.' : ''; }
  };
  function stepValid(n) {
    if (n === 1) return !!state.room;
    if (n === 2) return state.room !== ROOM_NONE || state.addons.length > 0;
    if (n === 3) return !dateError(state.date) && state.time && slotStatus(state.date, state.time) === 'ok';
    if (n === 4) { var c = state.customer; return !VAL.name(c.name) && !VAL.wa(c.wa) && !VAL.address(c.address) && !VAL.note(c.note); }
    return true;
  }

  /* ==========================================================
     PAGES
     ========================================================== */
  function ctaBand() {
    return '<section class="section tight"><div class="container"><div class="cta-band">' +
      '<h2>Ready for a Cleaner Room?</h2><p>Jadikan kamar kos lebih nyaman bersama CleOura.</p>' +
      '<a class="btn btn-light btn-lg" href="#pesan">Book Your Cleaning ' + ico('arrow') + '</a></div></div></section>';
  }

  /* ilustrasi kamar bergaya logo: siluet rumah + atap + kilau */
  function sparkle(x, y, s, cls) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path class="spark ' + (cls || '') + '" d="M0-10C1-3 3-1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10z" fill="#78816F"/></g>';
  }
  function heroIllu() {
    return '<svg class="hero-room" viewBox="0 0 440 540" role="img" aria-label="Ilustrasi kamar kos yang bersih dan rapi">' +
      '<defs><clipPath id="hc"><path d="M30 540V250L220 80L410 250V540Z"/></clipPath></defs>' +
      '<g clip-path="url(#hc)">' +
      '<rect width="440" height="540" fill="#EDE6D6"/>' +
      '<rect y="446" width="440" height="100" fill="#D8CDB4"/><rect y="440" width="440" height="10" fill="#C9BC9F"/>' +
      '<polygon points="170,300 270,300 340,540 200,540" fill="#FBF9F4" opacity=".55"/>' +
      '<rect x="168" y="188" width="104" height="104" rx="4" fill="#F9F7F1" stroke="#78816F" stroke-width="7"/>' +
      '<path d="M220 188V292M168 240H272" stroke="#78816F" stroke-width="6"/>' +
      '<rect x="160" y="292" width="120" height="9" rx="3" fill="#78816F"/>' +
      /* bed */
      '<rect x="44" y="330" width="14" height="124" rx="6" fill="#B7AB92"/>' +
      '<rect x="50" y="402" width="176" height="36" rx="6" fill="#B7AB92"/>' +
      '<rect x="56" y="374" width="168" height="40" rx="12" fill="#A4A99E"/>' +
      '<rect x="92" y="372" width="136" height="46" rx="12" fill="#78816F"/>' +
      '<rect x="62" y="358" width="42" height="24" rx="10" fill="#FBF9F4"/>' +
      '<rect x="64" y="436" width="10" height="18" rx="3" fill="#B7AB92"/><rect x="200" y="436" width="10" height="18" rx="3" fill="#B7AB92"/>' +
      /* plant */
      '<path d="M334 458h40l-6 44h-28z" fill="#B7AB92"/>' +
      '<path d="M354 458C340 430 336 410 346 388 360 408 362 432 354 458z" fill="#78816F"/>' +
      '<path d="M354 458C372 438 388 430 400 432 392 448 378 458 354 458z" fill="#A4A99E"/>' +
      '<path d="M354 458C336 444 322 440 312 442 320 456 336 462 354 458z" fill="#566050"/>' +
      '<ellipse cx="140" cy="500" rx="120" ry="10" fill="#C9BC9F" opacity=".55"/>' +
      '</g>' +
      '<path d="M14 258L220 64L426 258" fill="none" stroke="#78816F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      sparkle(396, 60, 1.5) + sparkle(428, 100, 1, 'b') +
      '</svg>';
  }
  var SWOOSH = '<svg class="swoosh" viewBox="0 0 1440 36" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V12C1160 36 940 4 720 14S260 38 0 12Z" fill="currentColor"/></svg>';

  function pageHome() {
    var why = [
      ['calendar', 'Flexible Cleaning Service', 'Pilih ukuran kamar dan jadwal yang sesuai dengan kesibukanmu.'],
      ['shield', 'Professional & Careful Service', 'Dikerjakan dengan teliti, rapi, dan menghargai barang pribadimu.'],
      ['heart', 'Additional Room Care', 'Tambahkan perawatan lemari, kamar mandi, hingga cuci piring.'],
      ['wa', 'Easy Online Booking', 'Pesan lewat website dan selesaikan konfirmasi langsung di WhatsApp.']
    ].map(function (w) { return '<div class="why-item">' + ico(w[0]) + '<h3>' + w[1] + '</h3><p>' + w[2] + '</p></div>'; }).join('');
    var svc = '<article class="svc-main"><div class="icon-bubble">' + ico('sparkles') + '</div><div><span class="tag">Layanan utama</span><h3>Room Cleaning</h3>' +
      '<p>' + esc(C.roomScope.join(', ')) + '. Tersedia untuk kamar kecil, sedang, dan besar mulai ' + rp(Math.min.apply(null, C.roomSizes.map(function (r) { return r.price; }))) + '.</p></div>' +
      '<a class="btn" href="#layanan">Lihat ukuran &amp; harga</a></article>' +
      [
        ['wardrobe', 'Wardrobe Care', 'Melipat, merapikan, dan menyetrika pakaian agar lemari kembali tertata.'],
        ['bathroom', 'Bathroom Cleaning', 'Toilet, wastafel, lantai, dan area shower dibersihkan hingga segar.'],
        ['dish', 'Dishwashing Service', 'Piring, gelas, serta peralatan makan dan masak dicuci bersih.']
      ].map(function (s) { return '<article class="card"><div class="icon-bubble">' + ico(s[0]) + '</div><span class="tag">Add-on</span><h3>' + s[1] + '</h3><p>' + s[2] + '</p><a class="link-arrow" href="#layanan">Lihat detail ' + ico('arrow') + '</a></article>'; }).join('');
    var steps = (C.howItWorks || []).map(function (s, i) { return '<li class="step"><div class="n">' + (i + 1) + '</div><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></li>'; }).join('');
    var quotes = (C.testimonials || []).map(function (q) {
      return '<figure class="quote">' + (q.sample ? '<span class="sample-tag">Contoh ulasan</span>' : '') + '<blockquote>“' + esc(q.text) + '”</blockquote>' +
        '<footer><span class="avatar" aria-hidden="true">' + esc(q.name.charAt(0)) + '</span><div><cite>' + esc(q.name) + '</cite><small>' + esc(q.role) + '</small></div></footer></figure>';
    }).join('');
    var faq = (C.faq || []).map(function (f) { return '<details><summary>' + esc(f[0]) + ico('plus') + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('');
    return '<div class="page">' +
      '<section class="hero"><div class="container hero-grid">' +
      '<div><div class="hero-tag">' + ico('leaf') + 'Your Space, Our Care.</div>' +
      '<h1>Your Room Deserves to Feel Fresh Again.</h1>' +
      '<p class="lead">Solusi praktis untuk kamar kos yang lebih bersih, rapi, dan nyaman. Nikmati waktu istirahat tanpa harus khawatir dengan pekerjaan membersihkan kamar.</p>' +
      '<div class="hero-actions" style="margin-bottom:0"><a class="btn btn-primary btn-lg" href="#pesan">Pesan Sekarang ' + ico('arrow') + '</a><a class="btn btn-outline btn-lg" href="#layanan">Lihat Layanan</a></div>' +
      '</div>' +
      '<div class="hero-visual">' + heroIllu() + '<div class="hero-badge">A Cleaner Room,<br>A Better Day.<small>Kost Cleaning &amp; Room Care</small></div></div>' +
      '</div></section>' + '<div style="color:var(--cream-alt);margin-bottom:-1px">' + SWOOSH + '</div>' +
      '<section class="section alt" style="padding-top:clamp(28px,4vw,48px)"><div class="container"><div class="section-head"><span class="eyebrow">Kenapa CleOura</span><h2>Layanan praktis untuk penghuni kos</h2><p class="lead">Dirancang agar kamu bisa fokus kuliah dan beristirahat, sementara kamar tetap terawat.</p></div><div class="why">' + why + '</div></div></section>' +
      '<section class="section"><div class="container"><div class="section-head"><span class="eyebrow">Layanan</span><h2>Apa yang bisa CleOura bantu</h2><p class="lead">Mulai dari Room Cleaning sebagai layanan utama, lengkapi dengan perawatan tambahan sesuai kebutuhan.</p></div><div class="svc-grid">' + svc + '</div></div></section>' +
      (steps ? '<section class="section alt"><div class="container"><div class="section-head center"><h2>Pesan dalam tiga langkah</h2><p class="lead">Tanpa telepon berulang kali. Semua dari satu halaman.</p></div><ol class="steps">' + steps + '</ol></div></section>' : '') +
      '<section class="section"><div class="container ba-wrap"><div>' + baSlider() + '</div><div><span class="eyebrow">Before &amp; After</span><h2>Dari berantakan menjadi lega</h2>' +
      '<p class="lead">Geser untuk membandingkan kondisi kamar sebelum dan sesudah dibersihkan.</p>' +
      '<ul class="check-list">' + ['Lantai dan permukaan bersih dari debu', 'Barang tertata rapi dan ruang terasa lebih lega', 'Kamar siap dipakai untuk istirahat dan belajar'].map(function (t) { return '<li><span class="tick">' + ico('check') + '</span>' + t + '</li>'; }).join('') + '</ul>' +
      '<p class="disclaimer">Kedua foto adalah contoh referensi visual, bukan dokumentasi pekerjaan CleOura, dan belum tentu berasal dari ruangan yang sama.</p>' +
      '<a class="btn btn-outline" href="#hasil">Lihat Hasil Pengerjaan ' + ico('arrow') + '</a></div></div></section>' +
      (quotes ? '<section class="section alt"><div class="container"><div class="section-head"><span class="eyebrow">Kata pelanggan</span><h2>Kamar rapi, hari lebih ringan</h2></div><div class="quotes">' + quotes + '</div></div></section>' : '') +
      (faq ? '<section class="section"><div class="container"><div class="section-head center"><h2>Pertanyaan yang sering diajukan</h2></div><div class="faq">' + faq + '</div></div></section>' : '') +
      ctaBand() + '</div>';
  }

  function baSlider() {
    return '<div class="ba" id="ba"><img class="ba-after" src="assets/after.jpg" alt="Contoh kamar setelah dibersihkan" loading="lazy" width="694" height="896">' +
      '<img class="ba-before" src="assets/before.jpg" alt="Contoh kamar sebelum dibersihkan" loading="lazy" width="694" height="896">' +
      '<span class="ba-label l">Before</span><span class="ba-label r">After</span>' +
      '<div class="ba-line"></div><div class="ba-knob">' + ico('chevs') + '</div>' +
      '<input type="range" min="0" max="100" value="50" aria-label="Geser untuk membandingkan sebelum dan sesudah dibersihkan"></div>';
  }
  function initSlider() {
    var el = $('#ba'); if (!el) return;
    var range = $('input', el), before = $('.ba-before', el), line = $('.ba-line', el), knob = $('.ba-knob', el);
    function set(v) { before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)'; line.style.left = v + '%'; knob.style.left = v + '%'; }
    range.addEventListener('input', function () { set(+range.value); });
    set(50);
  }

  function pageTentang() {
    return '<div class="page"><section class="page-head"><div class="container about-intro"><div>' +
      '<span class="eyebrow">Tentang Kami</span><h1>About CleOura</h1>' +
      '<p class="lead">CleOura merupakan layanan jasa kebersihan dan perawatan kamar kos yang membantu mahasiswa, penghuni kos, dan pemilik kos menjaga kebersihan serta kerapian ruangan melalui layanan yang praktis dan fleksibel.</p>' +
      '<a class="btn btn-primary" href="#pesan">Pesan Sekarang ' + ico('arrow') + '</a></div>' +
      '<div class="logo-panel"><img src="assets/logo-main.png" alt="Logo CleOura — A Cleaner Room, A Better Day." width="600" height="320"></div></div></section>' +
      '<section class="section"><div class="container grid grid-2">' +
      '<article class="card"><div class="icon-bubble">' + ico('target') + '</div><h3>Visi</h3><p>Menjadi penyedia jasa kebersihan dan perawatan kamar kos yang terpercaya, inovatif, dan berorientasi pada kebutuhan pelanggan dalam menciptakan tempat istirahat yang bersih, nyaman, dan tertata.</p></article>' +
      '<article class="card"><div class="icon-bubble">' + ico('sparkles') + '</div><h3>Misi</h3><ol class="numbered" style="list-style:none;margin-top:14px">' +
      ['Memberikan kemudahan bagi pelanggan dalam menjaga kebersihan dan kerapian ruang tinggal, khususnya bagi mereka yang memiliki keterbatasan waktu, tenaga, maupun kesibukan sehari-hari.', 'Menghadirkan layanan yang tidak hanya berfokus pada kebersihan fisik, tetapi juga menciptakan lingkungan yang nyaman untuk beristirahat, belajar, dan menjalani aktivitas.', 'Memberikan pelayanan yang penuh kepedulian dengan menghargai kondisi, kebutuhan, privasi, dan keputusan setiap pelanggan.', 'Menyediakan layanan yang praktis, fleksibel, dan berkualitas melalui sistem pemesanan yang mudah dijangkau.', 'Membangun hubungan jangka panjang dengan pelanggan melalui pelayanan yang konsisten, bertanggung jawab, dan mengutamakan kepuasan.'].map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ol></article>' +
      '</div></section>' +
      '<section class="section alt"><div class="container grid grid-2">' +
      '<div><span class="eyebrow">Tujuan Pelayanan</span><h2>Kamar yang nyaman, tanpa repot</h2><ul class="list-dots" style="margin-top:20px">' +
      ['Membantu penghuni kos menghemat waktu dan tenaga untuk urusan kebersihan kamar.', 'Membantu pemilik kos menjaga kamar tetap layak dan terawat.', 'Menghadirkan layanan yang mudah dipesan dan harganya jelas sejak awal.'].map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>' +
      '<div><span class="eyebrow">Komitmen Kualitas</span><h2>Bekerja dengan hormat dan teliti</h2><ul class="list-dots" style="margin-top:20px">' +
      ['Petugas meminta persetujuan pelanggan sebelum memindahkan atau memilah barang pribadi.', 'Tidak ada barang pelanggan yang dibuang tanpa izin.', 'Privasi pelanggan dijaga selama proses pengerjaan.', 'Rincian harga ditampilkan lengkap sebelum pesanan dikonfirmasi.'].map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>' +
      '</div></section>' +
      '<section class="section"><div class="container"><div class="section-head"><span class="eyebrow">Wilayah Operasional</span><h2>Melayani area sekitar kampus</h2><p class="lead">Untuk saat ini CleOura melayani kawasan berikut di Yogyakarta.</p></div>' +
      '<div class="area-grid">' + C.areas.map(function (a) { return '<div class="area-card">' + ico('pin') + esc(a) + '</div>'; }).join('') + '</div></div></section>' +
      ctaBand() + '</div>';
  }

  function pageLayanan() {
    var sizes = C.roomSizes.map(function (r) {
      return '<button type="button" class="size-card" data-room="' + r.id + '" aria-pressed="false"><div class="illu">' + roomIllu(r.id) + '</div>' +
        '<h4>' + esc(r.name) + '</h4><div class="sub">' + esc(r.label) + ' — ' + esc(r.desc) + '</div>' +
        '<div class="price">' + rp(r.price) + ' <small>/ pengerjaan</small></div><span class="sel-mark">' + ico('check') + '<span class="t">Pilih ukuran</span></span></button>';
    }).join('');
    var adds = C.addons.map(function (a) {
      return '<article class="addon-card" data-addon="' + a.id + '"><div class="icon-bubble">' + ico(a.icon) + '</div><h3>' + esc(a.name) + '</h3><p style="color:var(--muted);font-size:.93rem;margin-bottom:8px">' + esc(a.desc) + '</p>' +
        '<div class="price">' + rp(a.price) + '</div><ul class="list-dots">' + a.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
        '<button type="button" class="btn btn-outline btn-block add-btn" aria-pressed="false">' + ico('plus') + '<span class="t">Tambahkan ke pesanan</span></button></article>';
    }).join('');
    return '<div class="page"><section class="page-head"><div class="container"><span class="eyebrow">Layanan</span><h1>Layanan CleOura</h1>' +
      '<p class="lead">Mulai dari Room Cleaning sebagai layanan utama, lalu lengkapi dengan layanan tambahan. Harga tertera jelas sebelum kamu memesan.</p></div></section>' +
      '<section class="section tight" style="padding-top:24px"><div class="container"><div class="room-feature"><div class="room-feature-top"><div>' +
      '<span class="badge-main">Layanan Utama</span><h2>Room Cleaning</h2><p class="lead">Perawatan menyeluruh untuk kamar kosmu. Pilih ukuran kamar yang paling sesuai.</p></div>' +
      '<div class="scope-box"><h4>Cakupan pengerjaan</h4><ul class="list-dots">' + C.roomScope.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div></div>' +
      '<div class="grid grid-3">' + sizes + '</div></div></div></section>' +
      '<section class="section alt"><div class="container"><div class="section-head"><span class="eyebrow">Add-on Services</span><h2>Layanan tambahan</h2>' +
      '<p class="lead">Dapat dipesan bersamaan dengan Room Cleaning, atau dipesan secara terpisah.</p></div><div class="grid grid-3">' + adds + '</div></div></section>' +
      '<section class="section tight"><div class="container"><div class="privacy-note">' + ico('lock') +
      '<div><h4>Privasi dan izin Anda tetap utama</h4><p>Untuk kamar dengan banyak barang, petugas akan meminta persetujuanmu sebelum memindahkan atau memilah barang pribadi. Tidak ada barang yang dibuang tanpa izin, dan privasimu dijaga selama pengerjaan.</p></div></div></div></section>' +
      '' +
      '<div class="selbar" id="selbar" role="region" aria-label="Ringkasan pilihan"><div class="txt"><span id="selbar-t"></span><strong id="selbar-p"></strong></div><a class="btn btn-primary" href="#pesan">Lanjut Pesan ' + ico('arrow') + '</a></div></div>';
  }
  function initLayanan() {
    function sync() {
      $$('.size-card').forEach(function (b) {
        var on = b.getAttribute('data-room') === state.room;
        b.classList.toggle('selected', on); b.setAttribute('aria-pressed', on);
        $('.t', b).textContent = on ? 'Terpilih' : 'Pilih ukuran';
      });
      $$('.addon-card').forEach(function (c) {
        var on = state.addons.indexOf(c.getAttribute('data-addon')) > -1;
        c.classList.toggle('selected', on);
        var b = $('.add-btn', c); b.setAttribute('aria-pressed', on);
        $('.t', b).textContent = on ? 'Ditambahkan ✓ (klik untuk hapus)' : 'Tambahkan ke pesanan';
      });
      var t = totals(), bar = $('#selbar'), parts = [];
      if (t.room) parts.push(t.room.name); if (t.adds.length) parts.push(t.adds.length + ' layanan tambahan');
      if (parts.length) { $('#selbar-t').textContent = parts.join(' + '); $('#selbar-p').textContent = rp(t.total); }
      bar.classList.toggle('show', parts.length > 0);
    }
    $$('.size-card').forEach(function (b) { b.addEventListener('click', function () { var id = b.getAttribute('data-room'); state.room = state.room === id ? null : id; sync(); }); });
    $$('.add-btn').forEach(function (b) { b.addEventListener('click', function () { toggleAddon(b.closest('.addon-card').getAttribute('data-addon')); sync(); }); });
    sync();
  }

  /* ---------- gallery page ---------- */
  var CATS = [['all', 'Semua'], ['before', 'Before Cleaning'], ['after', 'After Cleaning'], ['organization', 'Room Organization'], ['process', 'Cleaning Process']];
  var CATNAME = { before: 'Before Cleaning', after: 'After Cleaning', organization: 'Room Organization', process: 'Cleaning Process' };
  var galleryItems = [];
  function pageHasil() {
    return '<div class="page"><section class="page-head"><div class="container"><span class="eyebrow">Hasil Pengerjaan</span><h1>See the Difference</h1>' +
      '<p class="lead">Lihat perbedaan antara kamar sebelum dan sesudah dibersihkan.</p></div></section>' +
      '<section class="section tight" style="padding-top:20px"><div class="container"><div class="ba-wrap" style="margin-bottom:64px"><div>' + baSlider() + '</div><div><h2>Bandingkan langsung</h2><p class="lead">Geser garis di tengah foto untuk melihat perubahan kondisi kamar.</p>' +
      '<p class="disclaimer">Foto Before &amp; After di halaman ini adalah contoh referensi visual, bukan dokumentasi pekerjaan CleOura, dan belum tentu berasal dari ruangan yang sama. Dokumentasi pengerjaan asli akan ditambahkan seiring pesanan berjalan.</p></div></div>' +
      '<div class="tabs" role="tablist" aria-label="Kategori galeri">' + CATS.map(function (c, i) { return '<button type="button" class="tab' + (i === 0 ? ' active' : '') + '" role="tab" data-cat="' + c[0] + '" aria-selected="' + (i === 0) + '">' + c[1] + '</button>'; }).join('') + '</div>' +
      '<div class="gallery" id="gallery"></div></div></section>' + ctaBand() + '</div>';
  }
  function initHasil() {
    initSlider();
    function render(cat) {
      var html = '';
      galleryItems = [];
      CATS.slice(1).forEach(function (c) {
        if (cat !== 'all' && cat !== c[0]) return;
        var items = C.gallery.filter(function (g) { return g.category === c[0] && g.src; });
        if (!items.length) {
          html += '<div class="g-item g-empty">' + ico('image') + '<b>' + c[1] + '</b><span>Dokumentasi pengerjaan akan segera ditambahkan.</span></div>';
        } else items.forEach(function (g) {
          var idx = galleryItems.push(g) - 1;
          html += '<button type="button" class="g-item" data-i="' + idx + '" aria-label="Perbesar foto: ' + esc(g.caption) + '"><img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy"><span class="g-zoom">' + ico('zoom') + '</span><span class="g-cap"><b>' + CATNAME[g.category] + '</b>' + esc(g.caption) + '</span></button>';
        });
      });
      $('#gallery').innerHTML = html;
      $$('#gallery button.g-item').forEach(function (b) { b.addEventListener('click', function () { openLb(+b.getAttribute('data-i')); }); });
    }
    $$('.tab').forEach(function (t) {
      t.addEventListener('click', function () {
        $$('.tab').forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
        t.classList.add('active'); t.setAttribute('aria-selected', 'true'); render(t.getAttribute('data-cat'));
      });
    });
    render('all');
  }
  var lbIndex = 0;
  function openLb(i) {
    lbIndex = i; var g = galleryItems[i], lb = $('#lightbox'); if (!g) return;
    $('img', lb).src = g.src; $('img', lb).alt = g.caption; $('figcaption', lb).textContent = CATNAME[g.category] + ' — ' + g.caption;
    lb.classList.add('open'); $('.lb-close', lb).focus();
    var multi = galleryItems.length > 1; $('.lb-prev', lb).style.display = $('.lb-next', lb).style.display = multi ? '' : 'none';
  }
  function closeLb() { $('#lightbox').classList.remove('open'); }
  function stepLb(d) { if (galleryItems.length) openLb((lbIndex + d + galleryItems.length) % galleryItems.length); }

  /* ==========================================================
     BOOKING
     ========================================================== */
  var STEPS = ['Room Cleaning', 'Layanan Tambahan', 'Jadwal', 'Data Pelanggan', 'Ringkasan'];

  function pagePesan() {
    return '<div class="page"><section class="page-head" style="padding-bottom:28px"><div class="container"><span class="eyebrow">Pesan Sekarang</span><h1>Book Your Cleaning Service</h1>' +
      '<p class="lead">Choose your service, schedule your cleaning, and let CleOura take care of your room.</p></div></section>' +
      '<section class="section tight" style="padding-top:8px"><div class="container"><div id="stepper" class="stepper" aria-label="Langkah pemesanan"></div>' +
      '<div class="bk-layout"><div id="panel-wrap" aria-live="polite"></div><aside class="bk-side"><div class="side-card" id="side"></div></aside></div></div></section>' +
      '<div class="mobilebar"><span>Total pembayaran</span><strong id="mb-total">Rp 0</strong></div></div>';
  }

  function renderStepper() {
    var s = state.done ? 5 : state.step;
    $('#stepper').innerHTML = '<div class="bar" style="width:' + ((s - 1) / 4 * 80) + '%"></div>' + STEPS.map(function (n, i) {
      var k = i + 1, cls = state.done || k < s ? 'done' : k === s ? 'active' : '';
      return '<button type="button" class="st ' + cls + '" data-go="' + k + '" ' + (k === s ? 'aria-current="step"' : '') + '><span class="dot">' + (cls === 'done' ? ico('check') : k) + '</span><span class="t">' + n + '</span></button>';
    }).join('');
    $$('.st', $('#stepper')).forEach(function (b) { b.addEventListener('click', function () { if (!state.done) goStep(+b.getAttribute('data-go'), true); }); });
  }

  function renderSide() {
    var t = totals(), h = '<h3>Ringkasan Pesanan</h3>';
    if (!t.room && !t.adds.length && state.room !== ROOM_NONE) h += '<p class="empty">Belum ada layanan dipilih. Pilih ukuran Room Cleaning untuk memulai.</p>';
    else {
      h += '<ul class="price-lines">';
      if (t.room) h += '<li><span>Room Cleaning<br><small style="color:var(--muted)">' + esc(t.room.name) + '</small></span><span>' + rp(t.roomPrice) + '</span></li>';
      else if (state.room === ROOM_NONE) h += '<li><span>Room Cleaning<br><small style="color:var(--muted)">Tidak dipesan</small></span><span>Rp 0</span></li>';
      t.adds.forEach(function (a) { h += '<li><span>' + esc(a.name) + '</span><span>' + rp(a.price) + '</span></li>'; });
      h += '</ul>';
    }
    if (state.date || state.time) h += '<div class="side-meta">' + (state.date ? '<div>' + ico('calendar') + longDate(state.date) + '</div>' : '') + (state.time ? '<div>' + ico('clock') + state.time + ' WIB</div>' : '') + '</div>';
    h += '<div class="side-total"><span>Total</span><strong>' + rp(t.total) + '</strong></div>';
    var el = $('#side'); if (el) el.innerHTML = h;
    var mb = $('#mb-total'); if (mb) mb.textContent = rp(t.total);
  }

  function goStep(n, fromStepper) {
    if (n > state.step || (fromStepper && n > 1)) {
      for (var i = 1; i < n; i++) {
        if (!stepValid(i)) { state.step = i; renderBooking(); showStepErrors(i); return; }
      }
    }
    state.step = n; renderBooking();
    var top = $('#stepper'); if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
  }
  function showStepErrors(i) {
    var msg = { 1: 'Pilih ukuran Room Cleaning terlebih dahulu.', 2: 'Pilih minimal satu layanan tambahan jika tidak memesan Room Cleaning.', 3: 'Lengkapi tanggal dan jam pengerjaan yang tersedia.', 4: 'Periksa kembali data pelanggan yang belum valid.' }[i];
    toast(msg, 'error');
    if (i === 3) showDateErr(); if (i === 4) validateAll(true);
  }

  function renderBooking() {
    renderStepper(); renderSide();
    var w = $('#panel-wrap'); if (!w) return;
    if (state.done) { w.innerHTML = doneHtml(); bindDone(); return; }
    var fn = [null, step1, step2, step3, step4, step5][state.step];
    w.innerHTML = '<div class="panel" id="panel"><div class="step-no">Langkah ' + state.step + ' dari 5</div>' + fn() + '</div>';
    [null, bind1, bind2, bind3, bind4, bind5][state.step]();
  }
  function navButtons(prev, nextLabel) {
    return '<div class="nav-btns">' + (prev ? '<button type="button" class="btn btn-outline" id="btn-prev">' + ico('back') + 'Kembali</button>' : '<span class="spacer"></span>') +
      '<button type="button" class="btn btn-primary" id="btn-next">' + (nextLabel || 'Lanjut') + ico('arrow') + '</button></div>';
  }
  function bindNav() {
    var p = $('#btn-prev'), n = $('#btn-next');
    if (p) p.addEventListener('click', function () { goStep(state.step - 1); });
    if (n) n.addEventListener('click', function () { goStep(state.step + 1); });
  }

  /* STEP 1 */
  function step1() {
    return '<h2 class="panel-title">Select Your Room Cleaning</h2><p class="panel-sub">Pilih ukuran kamar. Hanya satu ukuran yang dapat dipilih.</p>' +
      '<div class="opts three" role="radiogroup" aria-label="Ukuran kamar">' + C.roomSizes.map(function (r) {
        return '<button type="button" class="opt sizeopt' + (state.room === r.id ? ' selected' : '') + '" role="radio" aria-checked="' + (state.room === r.id) + '" data-room="' + r.id + '"><span class="check">' + ico('check') + '</span>' +
          '<div class="illu">' + roomIllu(r.id) + '</div><div class="content"><h4>' + esc(r.name) + '</h4><div class="sub">' + esc(r.desc) + '</div><div class="price">' + rp(r.price) + '</div><span class="sel-mark">' + ico('check') + '<span>' + (state.room === r.id ? 'Terpilih' : 'Pilih') + '</span></span></div></button>';
      }).join('') + '</div>' +
      '<div class="divider-label">atau</div>' +
      '<button type="button" class="opt only' + (state.room === ROOM_NONE ? ' selected' : '') + '" role="radio" aria-checked="' + (state.room === ROOM_NONE) + '" data-room="' + ROOM_NONE + '"><span class="check">' + ico('check') + '</span><div><h4>Hanya layanan tambahan</h4><div class="sub">Tanpa Room Cleaning — pilih minimal satu add-on di langkah berikutnya.</div></div></button>' +
      '<div class="err" id="err1" role="alert">Pilih ukuran Room Cleaning terlebih dahulu.</div>' + navButtons(false);
  }
  function bind1() {
    $$('.opt[data-room]').forEach(function (b) {
      b.addEventListener('click', function () { state.room = b.getAttribute('data-room'); renderBooking(); });
    });
    var n = $('#btn-next'); n.addEventListener('click', function () { if (!stepValid(1)) { $('#err1').classList.add('show'); toast('Pilih ukuran Room Cleaning terlebih dahulu.', 'error'); return; } goStep(2); });
  }

  /* STEP 2 */
  function step2() {
    var must = state.room === ROOM_NONE;
    return '<h2 class="panel-title">Additional Services</h2><p class="panel-sub">' + (must ? 'Pilih minimal satu layanan tambahan.' : 'Opsional — pilih satu atau lebih layanan tambahan.') + '</p>' +
      '<div class="opts" role="group" aria-label="Layanan tambahan">' + C.addons.map(function (a) {
        var on = state.addons.indexOf(a.id) > -1;
        return '<button type="button" class="opt row' + (on ? ' selected' : '') + '" role="checkbox" aria-checked="' + on + '" data-addon="' + a.id + '"><span class="check">' + ico('check') + '</span>' +
          '<div class="icon-bubble">' + ico(a.icon) + '</div><div class="body"><h4>' + esc(a.name) + '</h4><div class="sub" style="margin:0">' + esc(a.desc) + ' ' + esc(a.items.join(', ')) + '.</div></div><div class="price">' + rp(a.price) + '</div></button>';
      }).join('') + '</div><div class="err" id="err2" role="alert">Pilih minimal satu layanan tambahan jika tidak memesan Room Cleaning.</div>' + navButtons(true);
  }
  function bind2() {
    $$('.opt[data-addon]').forEach(function (b) { b.addEventListener('click', function () { toggleAddon(b.getAttribute('data-addon')); renderBooking(); }); });
    bindNav();
    $('#btn-next').addEventListener('click', function () { if (!stepValid(2)) { $('#err2').classList.add('show'); } }, true);
  }

  /* STEP 3 */
  function quickDates() {
    var out = [], d = new Date();
    for (var i = 0; i < 21 && out.length < 6; i++) { var s = ymd(d); if (dayOpen(s) && C.schedule.timeSlots.some(function (t) { return slotStatus(s, t) === 'ok'; })) out.push(s); d.setDate(d.getDate() + 1); }
    return out;
  }
  function slotsHtml() {
    if (!state.date) return '<div class="notice">' + ico('info') + '<span>Pilih tanggal terlebih dahulu untuk melihat jam yang tersedia.</span></div>';
    if (dateError(state.date)) return '';
    return '<div class="slots" role="radiogroup" aria-label="Jam pengerjaan">' + C.schedule.timeSlots.map(function (t) {
      var st = slotStatus(state.date, t), on = state.time === t;
      return '<button type="button" class="slot' + (on ? ' selected' : '') + '" role="radio" aria-checked="' + on + '" data-time="' + t + '"' + (st !== 'ok' ? ' disabled' : '') + '>' + t + '<small>' + (st === 'full' ? 'Penuh' : st === 'past' ? 'Terlewat' : st === 'closed' ? 'Tutup' : 'Tersedia') + '</small></button>';
    }).join('') + '</div><div class="slot-note"><span>Jam yang dicoret tidak tersedia (penuh atau terlewat).</span></div>';
  }
  function step3() {
    var qd = quickDates();
    return '<h2 class="panel-title">Select Date and Time</h2><p class="panel-sub">Pilih tanggal dan jam pengerjaan yang tersedia.</p>' +
      '<div class="field"><label for="date">Tanggal pengerjaan</label>' +
      '' +
      '<input class="input" type="date" id="date" min="' + todayStr() + '" max="' + maxDateStr() + '" value="' + esc(state.date) + '"><div class="err" id="err-date" role="alert"></div></div>' +
      '<div class="field"><span class="lbl">Jam pengerjaan (WIB)</span><div id="slots">' + slotsHtml() + '</div><div class="err" id="err-time" role="alert">Pilih jam pengerjaan.</div></div>' + navButtons(true);
  }
  function showDateErr() {
    var e = $('#err-date'), inp = $('#date'); if (!e) return;
    var m = dateError(state.date); e.textContent = m; e.classList.toggle('show', !!m); inp.classList.toggle('invalid', !!m);
    var te = $('#err-time'); if (te) te.classList.toggle('show', !m && !state.time && state._timeTried);
  }
  function setDate(v) {
    state.date = v; if (state.time && slotStatus(v, state.time) !== 'ok') state.time = '';
    $('#date').value = v; $('#slots').innerHTML = slotsHtml(); bindSlots(); showDateErr(); renderSide();

  }
  function bindSlots() {
    $$('#slots .slot').forEach(function (s) { s.addEventListener('click', function () { state.time = s.getAttribute('data-time'); $('#slots').innerHTML = slotsHtml(); bindSlots(); $('#err-time').classList.remove('show'); renderSide(); }); });
  }
  function bind3() {
    $('#date').addEventListener('change', function () { setDate(this.value); });
    bindNav();
    $('#btn-next').addEventListener('click', function () { state._timeTried = true; showDateErr(); }, true);
  }


  /* STEP 4 */
  function step4() {
    var c = state.customer;
    return '<h2 class="panel-title">Customer Information</h2><p class="panel-sub">Isi data agar petugas dapat menemukan lokasimu dan menghubungimu.</p>' +
      '<div class="field"><label for="f-name">Nama lengkap</label><input class="input" id="f-name" autocomplete="name" value="' + esc(c.name) + '" placeholder="Nama lengkap kamu"><div class="err" id="e-name" role="alert"></div></div>' +
      '<div class="field"><label for="f-wa">Nomor WhatsApp</label><input class="input" id="f-wa" type="tel" inputmode="tel" autocomplete="tel" value="' + esc(c.wa) + '" placeholder="0812xxxxxxxx"><div class="err" id="e-wa" role="alert"></div></div>' +
      '<div class="field"><label for="f-address">Alamat lengkap</label><textarea class="input" id="f-address" autocomplete="street-address" placeholder="Jalan, nomor, RT/RW, area (mis. Sapen / Timoho / Sorowajan)">' + esc(c.address) + '</textarea><div class="err" id="e-address" role="alert"></div></div>' +
      '<div class="field"><label for="f-kos">Nama kos / info lokasi tambahan <span class="opt-tag">(opsional)</span></label><input class="input" id="f-kos" value="' + esc(c.kos) + '" placeholder="Mis. Kos Melati, kamar no. 5, lantai 2"></div>' +
      '<div class="field"><label for="f-note">Catatan khusus untuk petugas <span class="opt-tag">(opsional)</span></label><textarea class="input" id="f-note" maxlength="300" placeholder="Mis. mohon ketuk pintu dulu, ada barang yang jangan dipindahkan">' + esc(c.note) + '</textarea><div class="err" id="e-note" role="alert"></div></div>' +
      '<div class="notice">' + ico('lock') + '<span>Untuk kamar dengan banyak barang, petugas akan meminta persetujuanmu sebelum memindahkan atau memilah barang pribadi. Tidak ada barang yang dibuang tanpa izin.</span></div>' + navButtons(true, 'Lihat Ringkasan');
  }
  function validateField(k, show) {
    var map = { name: 'f-name', wa: 'f-wa', address: 'f-address', note: 'f-note' };
    var m = VAL[k](state.customer[k]); var e = $('#e-' + k), inp = $('#' + map[k]);
    if (e) { e.textContent = show ? m : ''; e.classList.toggle('show', show && !!m); }
    if (inp) inp.classList.toggle('invalid', show && !!m);
    return !m;
  }
  function validateAll(show) { var ok = true; ['name', 'wa', 'address', 'note'].forEach(function (k) { if (!validateField(k, show)) ok = false; }); return ok; }
  function bind4() {
    var map = { name: 'f-name', wa: 'f-wa', address: 'f-address', kos: 'f-kos', note: 'f-note' };
    Object.keys(map).forEach(function (k) {
      var el = $('#' + map[k]);
      el.addEventListener('input', function () { state.customer[k] = el.value; if (VAL[k] && el.classList.contains('invalid')) validateField(k, true); });
      el.addEventListener('blur', function () { if (VAL[k] && el.value) validateField(k, true); });
    });
    bindNav();
    $('#btn-next').addEventListener('click', function () { validateAll(true); }, true);
  }

  /* STEP 5 */
  function step5() {
    var t = totals(), c = state.customer;
    return '<h2 class="panel-title">Order Summary</h2><p class="panel-sub">Periksa kembali pesananmu sebelum dikonfirmasi.</p>' +
      '<div class="summary-block"><div class="hd"><h4>Data pelanggan</h4><button type="button" class="edit-link" data-go="4">Ubah</button></div><dl class="kv">' +
      '<dt>Nama</dt><dd>' + esc(c.name.trim()) + '</dd><dt>WhatsApp</dt><dd>' + esc(normalizeWa(c.wa)) + '</dd><dt>Alamat</dt><dd>' + esc(c.address.trim()) + '</dd>' +
      (c.kos.trim() ? '<dt>Kos / lokasi</dt><dd>' + esc(c.kos.trim()) + '</dd>' : '') + (c.note.trim() ? '<dt>Catatan</dt><dd>' + esc(c.note.trim()) + '</dd>' : '') + '</dl></div>' +
      '<div class="summary-block"><div class="hd"><h4>Jadwal</h4><button type="button" class="edit-link" data-go="3">Ubah</button></div><dl class="kv"><dt>Tanggal</dt><dd>' + longDate(state.date) + '</dd><dt>Jam</dt><dd>' + state.time + ' WIB</dd></dl></div>' +
      '<div class="summary-block"><div class="hd"><h4>Layanan &amp; harga</h4><span><button type="button" class="edit-link" data-go="1">Ubah kamar</button> · <button type="button" class="edit-link" data-go="2">Ubah add-on</button></span></div><ul class="price-lines">' +
      (t.room ? '<li><span>Room Cleaning — ' + esc(t.room.name) + '</span><span>' + rp(t.roomPrice) + '</span></li>' : '<li><span>Room Cleaning</span><span>Tidak dipesan</span></li>') +
      (t.adds.length ? t.adds.map(function (a) { return '<li><span>' + esc(a.name) + '</span><span>' + rp(a.price) + '</span></li>'; }).join('') : '<li><span>Layanan tambahan</span><span>-</span></li>') + '</ul></div>' +
      '<div class="total-line"><span>Total Pembayaran</span><strong>' + rp(t.total) + '</strong></div>' +
      '<div class="notice" style="margin-top:18px">' + ico('info') + '<span>Setelah menekan “Konfirmasi Pesanan”, kamu akan diarahkan untuk mengirim rincian pesanan ke WhatsApp CleOura agar jadwal dan pembayaran bisa dikonfirmasi.</span></div>' +
      '<div class="nav-btns"><button type="button" class="btn btn-outline" id="btn-prev">' + ico('back') + 'Kembali</button><button type="button" class="btn btn-primary btn-lg" id="btn-confirm"><span class="lbl-t">Konfirmasi Pesanan</span>' + ico('check') + '</button></div>';
  }
  function bind5() {
    $('#btn-prev').addEventListener('click', function () { goStep(4); });
    $$('.edit-link').forEach(function (b) { b.addEventListener('click', function () { goStep(+b.getAttribute('data-go')); }); });
    $('#btn-confirm').addEventListener('click', confirmOrder);
  }
  function confirmOrder() {
    for (var i = 1; i <= 4; i++) if (!stepValid(i)) { toast('Data pesanan belum lengkap. Silakan periksa kembali.', 'error'); state.step = i; renderBooking(); showStepErrors(i); return; }
    var btn = $('#btn-confirm'); btn.classList.add('is-loading'); btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span><span>Memproses…</span>';
    setTimeout(function () {
      try {
        var t = totals(), c = state.customer;
        state.done = { msg: buildMessage(), name: c.name.trim(), wa: normalizeWa(c.wa), address: c.address.trim(), kos: c.kos.trim(), note: c.note.trim(), date: state.date, time: state.time, total: t.total, room: t.room, adds: t.adds };
        renderBooking();
        toast('Pesanan tersusun. Kirim ke WhatsApp untuk konfirmasi.', 'success');
        var top = $('#stepper'); if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
      } catch (err) {
        toast('Gagal memproses pesanan. Silakan coba lagi.', 'error');
        btn.classList.remove('is-loading'); btn.disabled = false; btn.innerHTML = '<span class="lbl-t">Konfirmasi Pesanan</span>' + ico('check');
      }
    }, 900);
  }



  function doneHtml() {
    var d = state.done;
    var svcList = '';
    if (d.room) svcList += '<li><span>Room Cleaning — ' + esc(d.room.name) + '</span><span>' + rp(d.room.price) + '</span></li>';
    if (d.adds && d.adds.length) d.adds.forEach(function(a){ svcList += '<li><span>' + esc(a.name) + '</span><span>' + rp(a.price) + '</span></li>'; });
    return '<div class="panel"><div class="done-box"><div class="big-check">' + ico('check') + '</div><h2 class="panel-title">Pesanan Tersusun!</h2>' +
      '<p>Terima kasih, <strong>' + esc(d.name) + '</strong>! Pesananmu sudah tersusun. Satu langkah lagi: kirim rincian ke WhatsApp CleOura supaya jadwal dan pembayaran bisa dikonfirmasi.</p>' +
      '<a class="btn btn-primary btn-lg done-wa" href="' + esc(waLink(d.msg)) + '" target="_blank" rel="noopener">' + ico('wa') + 'Kirim ke WhatsApp</a>' +
      '<p class="sub" style="margin-top:10px">' + (waNumber() ? 'Pesan otomatis sudah terisi, tinggal kirim.' : 'Pilih kontak CleOura di WhatsApp, pesan sudah terisi otomatis.') + '</p>' +
      '<div class="summary-block" style="margin-top:24px"><div class="hd"><h4>Rincian Pesanan</h4></div><ul class="price-lines">' + svcList + '<li class="total-row"><span><strong>Total Pembayaran</strong></span><span><strong>' + rp(d.total) + '</strong></span></li></ul></div>' +
      '<div class="summary-block"><div class="hd"><h4>Jadwal</h4></div><dl class="kv"><dt>Tanggal</dt><dd>' + longDate(d.date) + '</dd><dt>Jam</dt><dd>' + d.time + ' WIB</dd></dl></div>' +
      '<div class="done-actions" style="margin-top:24px"><button type="button" class="btn btn-ghost" id="btn-edit">' + ico('back') + 'Ubah pesanan</button><button type="button" class="btn btn-primary btn-lg" id="btn-new">' + ico('plus') + 'Pesanan baru</button></div></div></div>';
  }
  function bindDone() {
    $('#btn-edit').addEventListener('click', function () { state.done = null; state.step = 5; renderBooking(); });
    $('#btn-new').addEventListener('click', function () {
      state.room = null; state.addons = []; state.date = ''; state.time = ''; state.customer = { name: '', wa: '', address: '', kos: '', note: '' }; state.step = 1; state.done = null; renderBooking();
    });
  }
  function initPesan() { renderBooking(); }




  /* ==========================================================
     ROUTER & SHELL
     ========================================================== */
  var ROUTES = {
    home: { fn: pageHome, title: 'CleOura — Kost Cleaning & Room Care Service | A Cleaner Room, A Better Day.', desc: 'CleOura: jasa kebersihan dan perawatan kamar kos di sekitar UIN Sunan Kalijaga Yogyakarta (Sapen, Timoho, Sorowajan). Pesan online, harga jelas, konfirmasi lewat WhatsApp.', init: initSlider },
    tentang: { fn: pageTentang, title: 'Tentang Kami — CleOura', desc: 'Kenali CleOura, layanan kebersihan dan perawatan kamar kos untuk mahasiswa, penghuni kos, dan pemilik kos di Yogyakarta.' },
    layanan: { fn: pageLayanan, title: 'Layanan — Room Cleaning & Add-on | CleOura', desc: 'Katalog layanan CleOura: Room Cleaning (Small, Medium, Large) serta Wardrobe Care, Bathroom Cleaning, dan Dishwashing Service.', init: initLayanan },
    hasil: { fn: pageHasil, title: 'Hasil Pengerjaan — See the Difference | CleOura', desc: 'Lihat perbedaan kamar sebelum dan sesudah dibersihkan bersama CleOura.', init: initHasil },
    pesan: { fn: pagePesan, title: 'Pesan Sekarang — Book Your Cleaning Service | CleOura', desc: 'Pesan layanan kebersihan kamar kos CleOura secara online: pilih layanan, jadwal, dan konfirmasi lewat WhatsApp.', init: initPesan }
  };
  function currentRoute() { var h = (location.hash || '').replace('#', '').toLowerCase(); return ROUTES[h] ? h : 'home'; }
  function render() {
    var r = currentRoute(), R = ROUTES[r];
    $('#app').innerHTML = R.fn();
    document.title = R.title;
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', R.desc);
    $$('.nav-links a.link').forEach(function (a) { var on = a.getAttribute('data-r') === r; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.body.className = 'page-' + r;
    closeMenu(); closeLb();
    window.scrollTo(0, 0);
    if (R.init) R.init();
  }
  function closeMenu() { var n = $('#navlinks'), b = $('#burger'); if (n) n.classList.remove('open'); if (b) { b.setAttribute('aria-expanded', 'false'); b.innerHTML = ico('menu'); } }

  function shell() {
    var nav = [['home', 'Home'], ['tentang', 'Tentang Kami'], ['layanan', 'Layanan'], ['hasil', 'Hasil Pengerjaan']];
    $('#nav').innerHTML = '<div class="container"><a class="brand" href="#home" aria-label="CleOura — beranda"><img src="assets/logo.png" alt="CleOura" width="99" height="46"></a>' +
      '<nav class="nav-links" id="navlinks" aria-label="Navigasi utama">' + nav.map(function (n) { return '<a class="link" data-r="' + n[0] + '" href="#' + n[0] + '">' + n[1] + '</a>'; }).join('') +
      '<a class="btn btn-primary nav-cta" href="#pesan">Pesan Sekarang</a></nav>' +
      '<button class="burger" id="burger" aria-label="Buka menu" aria-expanded="false" aria-controls="navlinks">' + ico('menu') + '</button></div>';
    $('#burger').addEventListener('click', function () {
      var open = $('#navlinks').classList.toggle('open'); this.setAttribute('aria-expanded', open); this.innerHTML = ico(open ? 'close' : 'menu');
    });
    var contact = C.whatsapp.displayNumber || (waNumber() ? '+' + waNumber() : '');
    $('#footer').innerHTML = '<div class="container footer-cta"><h2>Let\'s Make Your Room Better.</h2><a class="btn btn-light btn-lg" href="#pesan">Pesan Sekarang ' + ico('arrow') + '</a></div>' +
      '<div class="container footer-main"><div><img class="footer-logo" src="assets/logo-light.png" alt="CleOura" width="117" height="54"><div class="tagline">A Cleaner Room, A Better Day.</div><p style="font-size:.9rem;max-width:300px">Kost Cleaning &amp; Room Care Service untuk mahasiswa, penghuni kos, dan pemilik kos.</p></div>' +
      '<div><h4>Navigasi</h4><ul>' + nav.concat([['pesan', 'Pesan Sekarang']]).map(function (n) { return '<li><a href="#' + n[0] + '">' + n[1] + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Layanan</h4><ul><li><a href="#layanan">Room Cleaning</a></li>' + C.addons.map(function (a) { return '<li><a href="#layanan">' + esc(a.name) + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Wilayah &amp; Kontak</h4><ul><li class="contact">' + ico('pin') + 'Gg. Kenari Indah I No.167a, Muja Muju, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55165</li>' +
      '<li class="contact" style="margin-top:14px">' + ico('wa') + (contact ? '<a href="' + waLink('Halo CleOura, saya ingin bertanya.') + '" target="_blank" rel="noopener">WhatsApp ' + esc(contact) + '</a>' : '<a href="#pesan">Hubungi via WhatsApp saat memesan</a>') + '</li></ul></div></div>' +
      '<div class="container footer-bottom"><span>© ' + new Date().getFullYear() + ' CleOura. All rights reserved.</span><span>Your Space, Our Care.</span></div>';
    var wa = $('#wa-float');
    wa.addEventListener('click', function (e) {
      if (!waNumber()) { e.preventDefault(); toast('Nomor WhatsApp CleOura belum diatur. Silakan pesan lewat halaman Pesan Sekarang.', 'info'); }
    });
    if (waNumber()) { wa.href = waLink('Halo CleOura, saya ingin bertanya tentang layanan kebersihan kamar kos.'); wa.target = '_blank'; wa.rel = 'noopener'; } else wa.href = '#pesan';
    window.addEventListener('scroll', function () { $('#nav').classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
    var lb = $('#lightbox');
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    $('.lb-close', lb).addEventListener('click', closeLb); $('.lb-prev', lb).addEventListener('click', function () { stepLb(-1); }); $('.lb-next', lb).addEventListener('click', function () { stepLb(1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') stepLb(-1); if (e.key === 'ArrowRight') stepLb(1);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    shell(); render();
    window.addEventListener('hashchange', render);
  });
})();
