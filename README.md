# SIRA Frontend

SIRA (Sistem Informasi Rekomendasi Akademik) adalah aplikasi frontend berbasis React yang dirancang untuk membantu mahasiswa memperoleh rekomendasi mata kuliah berdasarkan minat akademik menggunakan sistem rekomendasi berbasis Artificial Intelligence.

Frontend ini menyediakan antarmuka interaktif untuk mahasiswa dan admin dalam mengakses fitur rekomendasi, roadmap akademik, riwayat rekomendasi, serta pengelolaan sinkronisasi data silabus.

---

## Fitur Utama

### Mahasiswa
- Dashboard mahasiswa
- Rekomendasi mata kuliah berbasis minat
- Roadmap mata kuliah per semester
- Riwayat rekomendasi
- Detail mata kuliah melalui modal interaktif

### Admin
- Dashboard monitoring sistem
- Upload silabus
- Sinkronisasi embedding
- Monitoring status sinkronisasi
- Statistik sistem rekomendasi

### Autentikasi
- Login
- Register
- Role-based access (Admin & Mahasiswa)

---

## Teknologi yang Digunakan

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- SweetAlert2
- Lucide React

---

## Struktur Folder

```bash
src/
│
├── components/
│   ├── layout/
│   ├── common/
│
├── pages/
│   ├── auth/
│   ├── mahasiswa/
│   ├── admin/
│
├── services/
├── contexts/
├── utils/
├── routes/
└── assets/
```

---

## Instalasi

Clone repository:

```bash
git clone <repository-url>
cd sira-frontend
```

Install dependencies:

```bash
npm install
```

---

## Menjalankan Project

Mode development:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## Konfigurasi Environment

Buat file `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Integrasi Backend

Frontend ini terhubung dengan backend SIRA melalui REST API.

Endpoint utama yang digunakan:

### Auth
- POST `/login`
- POST `/register`

### Rekomendasi
- POST `/recommendation`

### Riwayat
- GET `/history`

### Mata Kuliah
- GET `/mata-kuliah`

### Sinkronisasi
- POST `/sync-embedding`
- GET `/sync-status`

---

## Tampilan Sistem

SIRA memiliki beberapa modul utama:

- Landing Page
- Login & Register
- Dashboard Mahasiswa
- Dashboard Admin
- Rekomendasi AI
- Roadmap Mata Kuliah
- Riwayat Rekomendasi
- Upload Silabus

---

## Tujuan Pengembangan

SIRA dikembangkan sebagai implementasi skripsi dengan tujuan:

- Membantu mahasiswa menentukan peminatan
- Memberikan rekomendasi mata kuliah yang relevan
- Menyediakan visualisasi roadmap akademik
- Mengoptimalkan eksplorasi mata kuliah berbasis minat

---

## Pengembang

**Muhammad Zaidan Ramdhan**  
Teknik Informatika  
STT Terpadu Nurul Fikri

---

## Lisensi

Digunakan untuk kebutuhan akademik dan penelitian.
