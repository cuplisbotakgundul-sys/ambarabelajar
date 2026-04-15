# RuangGuru — Platform Belajar Online

Platform belajar online untuk SD, SMP, SMA, dan UTBK dengan navigasi jenjang & mata pelajaran, autentikasi Firebase, dan tampilan bersih.

---

## 📁 Struktur Project

```
raungguru/
├── public/                    ← Root deploy (Cloudflare Pages & Firebase Hosting)
│   ├── index.html             ← Halaman utama
│   ├── favicon.svg
│   ├── _redirects             ← Cloudflare Pages SPA redirect
│   ├── _headers               ← Cloudflare Pages security headers
│   ├── styles/
│   │   └── main.css
│   ├── scripts/
│   │   └── app.js             ← Logika utama + UI
│   └── firebase/
│       └── init.js            ← Inisialisasi Firebase SDK
├── firebase.json              ← Config Firebase Hosting
├── firestore.rules            ← Security rules Firestore
├── firestore.indexes.json
├── .firebaserc                ← Project ID Firebase
└── wrangler.toml              ← Config Cloudflare Pages (opsional)
```

---

## ⚙️ Setup Firebase

### 1. Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik **Add project** → beri nama (misal: `raungguru`)
3. Nonaktifkan Google Analytics (opsional) → **Create project**

### 2. Aktifkan Authentication
1. Sidebar → **Authentication** → **Get started**
2. Tab **Sign-in method** → aktifkan:
   - ✅ **Email/Password**
   - ✅ **Google**

### 3. Aktifkan Firestore
1. Sidebar → **Firestore Database** → **Create database**
2. Pilih **Start in production mode** → pilih region (`asia-southeast2` / Jakarta)
3. Klik **Enable**

### 4. Dapatkan Firebase Config
1. Sidebar → **Project Settings** (⚙️) → tab **General**
2. Scroll ke **Your apps** → klik ikon **Web** (`</>`)
3. Registrasi app → salin `firebaseConfig`

### 5. Update `public/firebase/init.js`
```js
const firebaseConfig = {
  apiKey:            "AIza...",
  authDomain:        "raungguru.firebaseapp.com",
  projectId:         "raungguru",
  storageBucket:     "raungguru.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc"
};
```

### 6. Update `.firebaserc`
```json
{
  "projects": {
    "default": "raungguru"
  }
}
```

---

## 🚀 Deploy ke Firebase Hosting

```bash
# Install Firebase CLI (sekali saja)
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy --only hosting

# Deploy + Firestore rules
firebase deploy
```

URL hasil deploy: `https://raungguru.web.app`

---

## ☁️ Deploy ke Cloudflare Pages

### Cara 1 — Via GitHub (Direkomendasikan)
1. Push project ke GitHub
2. Buka [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
3. **Create a project** → **Connect to Git** → pilih repo
4. Build settings:
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `public`
5. Klik **Save and Deploy**

### Cara 2 — Via Wrangler CLI
```bash
# Install Wrangler
npm install -g wrangler

# Login ke Cloudflare
wrangler login

# Deploy langsung
wrangler pages deploy public --project-name=raungguru
```

URL hasil deploy: `https://raungguru.pages.dev`

---

## 🔒 Tambahkan Domain di Firebase Auth

Jika memakai domain custom atau Cloudflare Pages, tambahkan domain ke **authorized domains**:

1. Firebase Console → **Authentication** → **Settings**
2. Tab **Authorized domains** → **Add domain**
3. Tambahkan:
   - `raungguru.pages.dev`
   - `raungguru.web.app`
   - Domain custom kamu (misal: `raungguru.id`)

---

## 🔧 Fitur

| Fitur | Status |
|---|---|
| Navigasi jenjang (SD/SMP/SMA/UTBK) | ✅ |
| Pilih kelas & mata pelajaran | ✅ |
| Login Email/Password | ✅ |
| Login Google | ✅ |
| Register akun baru | ✅ |
| Simpan profil ke Firestore | ✅ |
| Progress belajar di sidebar | ✅ |
| Tips belajar rotasi otomatis | ✅ |
| Responsive mobile | ✅ |
| Dark mode | 🔜 |
| Halaman materi detail | 🔜 |
| Soal latihan & quiz | 🔜 |

---

## 📞 Kontak Admin

Email: `admin@raungguru.id`
