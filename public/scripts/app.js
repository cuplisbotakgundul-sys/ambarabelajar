// scripts/app.js
// RuangGuru — Main Application Logic

// ── Data Kurikulum ──────────────────────────────────────────────
const KURIKULUM = {
  SD: {
    kelas: ['Kelas 1','Kelas 2','Kelas 3','Kelas 4','Kelas 5','Kelas 6'],
    mapel: [
      {n:'Matematika',     ico:'📐', bg:'#EEF2F9', ac:'#3D5A8A', t:'24 topik'},
      {n:'Bahasa Indonesia',ico:'📖', bg:'#FFF3E0', ac:'#854F0B', t:'20 topik'},
      {n:'IPA',            ico:'🔬', bg:'#EAF3DE', ac:'#3B6D11', t:'18 topik'},
      {n:'IPS',            ico:'🌍', bg:'#F3E8FD', ac:'#534AB7', t:'16 topik'},
      {n:'PKn',            ico:'🏛️', bg:'#FDEAEA', ac:'#A32D2D', t:'10 topik'},
      {n:'Agama',          ico:'📿', bg:'#F7F1E3', ac:'#B8973A', t:'10 topik'},
      {n:'PJOK',           ico:'⚽', bg:'#E1F5EE', ac:'#0F6E56', t:'8 topik'},
      {n:'Seni Budaya',    ico:'🎨', bg:'#FCE4EC', ac:'#993556', t:'8 topik'},
    ]
  },
  SMP: {
    kelas: ['Kelas 7','Kelas 8','Kelas 9'],
    mapel: [
      {n:'Matematika',     ico:'📐', bg:'#EEF2F9', ac:'#3D5A8A', t:'28 topik'},
      {n:'IPA',            ico:'🔬', bg:'#EAF3DE', ac:'#3B6D11', t:'32 topik'},
      {n:'IPS',            ico:'🌍', bg:'#F3E8FD', ac:'#534AB7', t:'20 topik'},
      {n:'Bahasa Indonesia',ico:'📖', bg:'#FFF3E0', ac:'#854F0B', t:'22 topik'},
      {n:'Bahasa Inggris', ico:'🗣️', bg:'#F7F1E3', ac:'#B8973A', t:'18 topik'},
      {n:'PKn',            ico:'🏛️', bg:'#FDEAEA', ac:'#A32D2D', t:'12 topik'},
      {n:'Agama',          ico:'📿', bg:'#EEF2F9', ac:'#3D5A8A', t:'10 topik'},
      {n:'Seni Budaya',    ico:'🎨', bg:'#FCE4EC', ac:'#993556', t:'8 topik'},
    ]
  },
  SMA: {
    kelas: ['Kelas 10','Kelas 11','Kelas 12'],
    mapel: [
      {n:'Matematika',     ico:'📐', bg:'#EEF2F9', ac:'#3D5A8A', t:'35 topik'},
      {n:'Fisika',         ico:'⚡', bg:'#EAF3DE', ac:'#3B6D11', t:'28 topik'},
      {n:'Kimia',          ico:'🧪', bg:'#F3E8FD', ac:'#534AB7', t:'30 topik'},
      {n:'Biologi',        ico:'🧬', bg:'#E1F5EE', ac:'#0F6E56', t:'32 topik'},
      {n:'Bahasa Indonesia',ico:'📖', bg:'#FFF3E0', ac:'#854F0B', t:'20 topik'},
      {n:'Bahasa Inggris', ico:'🗣️', bg:'#F7F1E3', ac:'#B8973A', t:'18 topik'},
      {n:'Ekonomi',        ico:'📊', bg:'#FAEEDA', ac:'#BA7517', t:'22 topik'},
      {n:'Sejarah',        ico:'🏺', bg:'#FDEAEA', ac:'#A32D2D', t:'16 topik'},
      {n:'Geografi',       ico:'🗺️', bg:'#EEF2F9', ac:'#185FA5', t:'14 topik'},
      {n:'Sosiologi',      ico:'👥', bg:'#FCE4EC', ac:'#993556', t:'12 topik'},
    ]
  },
  UTBK: {
    kelas: ['TPS','TKA Saintek','TKA Soshum'],
    mapel: [
      {n:'Penalaran Umum',    ico:'🧠', bg:'#EEF2F9', ac:'#3D5A8A', t:'20 topik'},
      {n:'Pemahaman Bacaan',  ico:'📖', bg:'#FFF3E0', ac:'#854F0B', t:'15 topik'},
      {n:'Penget. Kuantitatif',ico:'📊', bg:'#EAF3DE', ac:'#3B6D11', t:'18 topik'},
      {n:'Penalaran Matematika',ico:'📐',bg:'#F3E8FD', ac:'#534AB7', t:'22 topik'},
      {n:'Fisika UTBK',       ico:'⚡', bg:'#E1F5EE', ac:'#0F6E56', t:'16 topik'},
      {n:'Kimia UTBK',        ico:'🧪', bg:'#FAEEDA', ac:'#BA7517', t:'14 topik'},
      {n:'Biologi UTBK',      ico:'🧬', bg:'#EEF2F9', ac:'#3D5A8A', t:'12 topik'},
      {n:'Sejarah UTBK',      ico:'🏺', bg:'#FDEAEA', ac:'#A32D2D', t:'10 topik'},
    ]
  }
};

const TIPS = [
  'Konsistensi 30 menit setiap hari lebih efektif daripada belajar 3 jam sekaligus.',
  'Gunakan metode Pomodoro: 25 menit belajar, 5 menit istirahat.',
  'Ulangi materi yang sudah dipelajari setelah 24 jam untuk meningkatkan retensi memori.',
  'Buat catatan dengan kata-kata sendiri, jangan menyalin langsung dari buku.',
  'Belajar dalam kelompok kecil bisa meningkatkan pemahaman hingga 2x lipat.',
  'Tidur cukup sangat penting — otak mengkonsolidasi memori saat tidur.',
  'Mulai dari topik yang paling sulit ketika pikiran masih segar di pagi hari.',
];

// ── State ─────────────────────────────────────────────────────
let curJ = 'SMA';
let curK = 'Kelas 10';
let currentUser = null;

// ── Auth State Listener ───────────────────────────────────────
function initAuthListener() {
  // Tunggu Firebase siap
  const check = setInterval(() => {
    if (window.fbAuth && window.fbFns) {
      clearInterval(check);
      window.fbFns.onAuthStateChanged(window.fbAuth, async (user) => {
        currentUser = user;
        if (user) {
          await loadUserProfile(user);
          showLoggedInUI(user);
        } else {
          showLoggedOutUI();
        }
      });
    }
  }, 100);
}

async function loadUserProfile(user) {
  try {
    const { doc, getDoc } = window.fbFns;
    const ref = doc(window.fbDb, 'users', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      updateProgressUI(data.progress || {});
      showDashboard(data);
    }
  } catch (e) {
    console.warn('[RuangGuru] Gagal load profil:', e.message);
  }
}

function showLoggedInUI(user) {
  const name  = user.displayName || user.email.split('@')[0];
  const email = user.email;
  const initial = name.charAt(0).toUpperCase();

  document.getElementById('authButtons').style.display = 'none';
  document.getElementById('userMenu').style.display = 'flex';
  document.getElementById('userAvatar').textContent = initial;
  document.getElementById('dropdownName').textContent = name;
  document.getElementById('dropdownEmail').textContent = email;

  document.getElementById('loginPromptCard').style.display = 'none';
  document.getElementById('progressCard').style.display = 'block';
  renderProgressBars(PROG_DATA['minggu']);
  renderStreak();
}

function showDashboardFromProfile(userData) {
  showDashboard(userData);
}

function showLoggedOutUI() {
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display = 'none';
  document.getElementById('loginPromptCard').style.display = 'block';
  document.getElementById('progressCard').style.display = 'none';
  const dashRow = document.getElementById('dashRow');
  if (dashRow) dashRow.style.display = 'none';
}

function updateProgressUI(progress) {
  const defaults = { Matematika: 68, Fisika: 45, 'Bahasa Inggris': 82 };
  const data = { ...defaults, ...progress };
  const html = Object.entries(data).slice(0, 4).map(([label, val]) => `
    <div class="prog-item">
      <div class="prog-label">
        <span>${label}</span>
        <span>${val}%</span>
      </div>
      <div class="prog-wrap"><div class="prog-fill" style="width:${val}%"></div></div>
    </div>
  `).join('');
  document.getElementById('progressBars').innerHTML = html;
}

// ── Render ────────────────────────────────────────────────────
function renderKelas() {
  document.getElementById('kelasPills').innerHTML =
    KURIKULUM[curJ].kelas.map(k =>
      `<div class="k-pill${k === curK ? ' active' : ''}" onclick="setKelas(this,'${k}')">${k}</div>`
    ).join('');
}

function renderMapel() {
  document.getElementById('mapelTitle').textContent = `Mata Pelajaran · ${curK}`;
  const grid = document.getElementById('mapelGrid');
  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = KURIKULUM[curJ].mapel.map((m, i) => `
      <div class="mapel-card" style="--card-accent:${m.ac};animation-delay:${i * 30}ms"
           onclick="handleMapelClick('${m.n}')">
        <div class="mapel-icon-wrap" style="background:${m.bg}">${m.ico}</div>
        <div class="mapel-name">${m.n}</div>
        <div class="mapel-meta"><div class="meta-dot"></div>${m.t}</div>
      </div>
    `).join('');
    grid.style.opacity = '1';
  }, 80);
}

window.setJenjang = function(el, j) {
  document.querySelectorAll('.j-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  curJ = j;
  curK = KURIKULUM[j].kelas[0];
  renderKelas();
  renderMapel();
};

window.setKelas = function(el, k) {
  document.querySelectorAll('.k-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  curK = k;
  renderMapel();
};

window.handleMapelClick = function(nama) {
  if (!currentUser) {
    showModal('login');
    showToast('Masuk dulu untuk mengakses materi', 'error');
    return;
  }
  showToast(`Membuka materi: ${nama}…`);
};

// ── Search ────────────────────────────────────────────────────
window.handleSearch = function() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  showToast(`Mencari: "${q}"…`);
};

document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// ── Modal ─────────────────────────────────────────────────────
window.showModal = function(type) {
  const ov = document.getElementById('modalOverlay');
  const mc = document.getElementById('modalContent');

  if (type === 'login') {
    mc.innerHTML = `
      <div class="modal-logo">
        <div class="nav-logo-badge">RG</div>
        <span class="brand-name" style="color:var(--txt)">Ruang<span class="brand-dot">Guru</span></span>
      </div>
      <div class="modal-title">Selamat datang kembali</div>
      <div class="modal-sub">Masuk untuk melanjutkan belajarmu</div>
      <button class="modal-btn-google" onclick="loginGoogle()">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Masuk dengan Google
      </button>
      <div class="modal-divider">atau</div>
      <label class="modal-label">Email</label>
      <input class="modal-input" id="loginEmail" type="email" placeholder="kamu@email.com" autocomplete="email"/>
      <label class="modal-label">Kata Sandi</label>
      <input class="modal-input" id="loginPass" type="password" placeholder="Minimal 6 karakter" autocomplete="current-password"/>
      <div class="modal-error" id="loginError"></div>
      <button class="modal-btn-primary" id="loginBtn" onclick="doLogin()">
        <span class="spinner" id="loginSpinner"></span>
        Masuk
      </button>
      <div class="modal-contact">
        Belum punya akun?
        <a href="#" onclick="closeModalDirect();showModal('daftar');return false">Daftar sekarang</a>
      </div>
    `;
  } else {
    mc.innerHTML = `
      <div class="modal-logo">
        <div class="nav-logo-badge">RG</div>
        <span class="brand-name" style="color:var(--txt)">Ruang<span class="brand-dot">Guru</span></span>
      </div>
      <div class="modal-title">Daftar Akun RuangGuru</div>
      <div class="modal-sub">Untuk mendaftar, hubungi administrator kami</div>
      <div class="modal-contact-info">
        <div class="modal-contact-info-label">Email Admin</div>
        <div class="modal-contact-info-value">admin@raungguru.id</div>
      </div>
      <button class="modal-btn-primary" onclick="window.open('mailto:admin@raungguru.id?subject=Daftar%20Akun%20RuangGuru')">
        ✉️ &nbsp;Kirim Email ke Admin
      </button>
      <div class="modal-divider">atau</div>
      <label class="modal-label">Nama Lengkap</label>
      <input class="modal-input" id="regNama" type="text" placeholder="Nama kamu"/>
      <label class="modal-label">Email</label>
      <input class="modal-input" id="regEmail" type="email" placeholder="kamu@email.com"/>
      <label class="modal-label">Kata Sandi</label>
      <input class="modal-input" id="regPass" type="password" placeholder="Minimal 6 karakter"/>
      <div class="modal-error" id="regError"></div>
      <button class="modal-btn-primary" id="regBtn" onclick="doRegister()">
        <span class="spinner" id="regSpinner"></span>
        Buat Akun
      </button>
      <div class="modal-contact">
        Sudah punya akun?
        <a href="#" onclick="closeModalDirect();showModal('login');return false">Masuk di sini</a>
      </div>
    `;
  }

  ov.classList.add('show');

  // Enter key on inputs
  setTimeout(() => {
    document.querySelectorAll('.modal-input').forEach(inp => {
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { if (type==='login') doLogin(); else doRegister(); } });
    });
  }, 50);
};

window.closeModal = function(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
};

window.closeModalDirect = function() {
  document.getElementById('modalOverlay').classList.remove('show');
};

// ── Auth Actions ──────────────────────────────────────────────
window.doLogin = async function() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');
  const btn   = document.getElementById('loginBtn');
  const spin  = document.getElementById('loginSpinner');

  errEl.classList.remove('show');
  if (!email || !pass) { showError(errEl, 'Email dan kata sandi wajib diisi.'); return; }

  btn.disabled = true; spin.classList.add('show');

  try {
    await window.fbFns.signInWithEmailAndPassword(window.fbAuth, email, pass);
    closeModalDirect();
    showToast('Selamat datang kembali! 👋', 'success');
  } catch (e) {
    const msg = parseFirebaseError(e.code);
    showError(errEl, msg);
  } finally {
    btn.disabled = false; spin.classList.remove('show');
  }
};

window.doRegister = async function() {
  const nama  = document.getElementById('regNama').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;
  const errEl = document.getElementById('regError');
  const btn   = document.getElementById('regBtn');
  const spin  = document.getElementById('regSpinner');

  errEl.classList.remove('show');
  if (!nama || !email || !pass) { showError(errEl, 'Semua kolom wajib diisi.'); return; }
  if (pass.length < 6) { showError(errEl, 'Kata sandi minimal 6 karakter.'); return; }

  btn.disabled = true; spin.classList.add('show');

  try {
    const cred = await window.fbFns.createUserWithEmailAndPassword(window.fbAuth, email, pass);
    await window.fbFns.updateProfile(cred.user, { displayName: nama });

    // Simpan data user ke Firestore
    const { doc, setDoc, serverTimestamp } = window.fbFns;
    await setDoc(doc(window.fbDb, 'users', cred.user.uid), {
      nama, email,
      jenjang: 'SMA',
      kelas: 'Kelas 10',
      progress: { Matematika: 0, Fisika: 0, 'Bahasa Inggris': 0 },
      createdAt: serverTimestamp()
    });

    closeModalDirect();
    showToast(`Selamat bergabung, ${nama}! 🎉`, 'success');
  } catch (e) {
    showError(errEl, parseFirebaseError(e.code));
  } finally {
    btn.disabled = false; spin.classList.remove('show');
  }
};

window.loginGoogle = async function() {
  try {
    const result = await window.fbFns.signInWithPopup(window.fbAuth, window.fbGoogle);
    const user = result.user;

    // Cek/buat dokumen user di Firestore
    const { doc, getDoc, setDoc, serverTimestamp } = window.fbFns;
    const ref = doc(window.fbDb, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        nama: user.displayName,
        email: user.email,
        jenjang: 'SMA', kelas: 'Kelas 10',
        progress: {}, createdAt: serverTimestamp()
      });
    }

    closeModalDirect();
    showToast(`Halo, ${user.displayName}! 👋`, 'success');
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user') {
      showToast('Gagal masuk dengan Google', 'error');
    }
  }
};

window.logout = async function() {
  await window.fbFns.signOut(window.fbAuth);
  toggleUserDropdown(true);
  showToast('Berhasil keluar');
};

window.toggleUserDropdown = function(forceClose) {
  const dd = document.getElementById('userDropdown');
  if (forceClose) { dd.classList.remove('show'); return; }
  dd.classList.toggle('show');
};

// Tutup dropdown kalau klik di luar
document.addEventListener('click', e => {
  const menu = document.getElementById('userMenu');
  if (menu && !menu.contains(e.target)) {
    document.getElementById('userDropdown')?.classList.remove('show');
  }
});

window.showProfile   = () => { toggleUserDropdown(true); showToast('Fitur profil segera hadir'); };
window.showProgress  = () => { toggleUserDropdown(true); showToast('Fitur progress segera hadir'); };

// ── Helpers ───────────────────────────────────────────────────
function showError(el, msg) {
  el.textContent = msg;
  el.classList.add('show');
}

function parseFirebaseError(code) {
  const map = {
    'auth/user-not-found':      'Akun tidak ditemukan.',
    'auth/wrong-password':      'Kata sandi salah.',
    'auth/email-already-in-use':'Email sudah digunakan.',
    'auth/invalid-email':       'Format email tidak valid.',
    'auth/too-many-requests':   'Terlalu banyak percobaan. Coba lagi nanti.',
    'auth/network-request-failed': 'Cek koneksi internet kamu.',
    'auth/invalid-credential':  'Email atau kata sandi salah.',
  };
  return map[code] || 'Terjadi kesalahan. Coba lagi.';
}

let toastTimer = null;
window.showToast = function(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show${type ? ' ' + type : ''}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 3000);
};

// ── Mobile Menu ───────────────────────────────────────────────
window.toggleMobileMenu = function() {
  document.getElementById('mobileMenu').classList.toggle('open');
};

// ── Dashboard ─────────────────────────────────────────────────
const PROG_DATA = {
  minggu: { Matematika: 68, Fisika: 45, 'Bahasa Inggris': 82 },
  bulan:  { Matematika: 72, Fisika: 58, 'Bahasa Inggris': 85, Kimia: 40 }
};

let curProgMode = 'minggu';

window.switchProg = function(el, mode) {
  document.querySelectorAll('.pts').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  curProgMode = mode;
  renderProgressBars(PROG_DATA[mode]);
};

function renderProgressBars(data) {
  const html = Object.entries(data).map(([label, val]) => `
    <div class="prog-item">
      <div class="prog-label">
        <span>${label}</span><span>${val}%</span>
      </div>
      <div class="prog-wrap"><div class="prog-fill" style="width:0%" data-w="${val}"></div></div>
    </div>
  `).join('');
  document.getElementById('progressBars').innerHTML = html;
  setTimeout(() => {
    document.querySelectorAll('.prog-fill[data-w]').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 50);
}

function renderStreak() {
  const days = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
  const doneIdx = [0, 1, 2, 3, 4]; // Senin–Jumat done
  const todayIdx = 5; // Sabtu = today
  document.getElementById('streakRow').innerHTML = days.map((d, i) => `
    <div class="sday ${i === todayIdx ? 'today' : doneIdx.includes(i) ? 'done' : 'miss'}">${d}</div>
  `).join('');
}

function showDashboard(userData) {
  const row = document.getElementById('dashRow');
  if (row) {
    row.style.display = 'block';
    const stats = userData?.stats || {};
    document.getElementById('dMateri').textContent = stats.materi || 24;
    document.getElementById('dStreak').innerHTML = (stats.streak || 7) + ' <span style="font-size:14px">hari</span>';
    document.getElementById('dSoal').textContent = stats.soal || 148;
    document.getElementById('dJam').innerHTML = (stats.jam || 12) + ' <span style="font-size:14px">jam</span>';
    const akurasi = stats.akurasi || 74;
    document.getElementById('dAkurasi').textContent = `Akurasi ${akurasi}%`;
  }
}

// ── END Dashboard ──────────────────────────────────────────────

function rotateTip() {
  const idx = Math.floor(Math.random() * TIPS.length);
  const el = document.getElementById('tipText');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = TIPS[idx]; el.style.opacity = '1'; }, 200);
  }
}
setInterval(rotateTip, 8000);

// ── Hero Dots ─────────────────────────────────────────────────
const dotsEl = document.getElementById('heroDots');
if (dotsEl) {
  for (let i = 0; i < 20; i++) dotsEl.innerHTML += `<div class="hero-dot"></div>`;
}

// ── Init ──────────────────────────────────────────────────────
renderKelas();
renderMapel();
initAuthListener();
