# setup Environment - Software Developer
Project: Bank Customer Churn Prediction System

Bagian: Software Development (Backend, Frontend) & Integrasi ML Engine

Tujuan dokumen: Panduan agar siapa pun (termasuk anggota tim baru saat onboarding) bisa menjalankan seluruh environment — Backend, Frontend, dan ML Engine — dari nol, tanpa harus tanya langsung ke orang yang bikin.

---

## 1. Gambaran Umum Stack

| Layer | Teknologi |
|---|---|
| Backend | Laravel 12 + Laravel Breeze (stack Inertia + React) |
| Frontend | React JS (via Inertia.js, bukan SPA terpisah) |
| Otorisasi | Spatie Laravel-Permission (role & permission) |
| Visualisasi | D3.js |
| Database | PostgreSQL (UUID sebagai primary key) |
| ML Engine | Python + FastAPI (Uvicorn) |

Backend (Laravel) dan Frontend (React) berjalan dalam **satu aplikasi** lewat Inertia.js — tidak ada REST API terpisah antara Laravel dan React seperti pola SPA biasa. Laravel tetap menyediakan pemanggilan HTTP terpisah khusus untuk komunikasi ke **ML Engine (FastAPI)**.

---

## 2. Prasyarat

Pastikan tools berikut sudah terpasang sebelum mulai:

- PHP >= 8.2
- Composer >= 2.x
- Node.js >= 18 & npm
- Python >= 3.10
- PostgreSQL >= 14

---

## 3. Setup Backend (Laravel Breeze + Inertia + React)

### 3.1 Clone & Install Dependency

```bash
git clone <url-repository>
cd bank-churn-prediction/backend

composer install
npm install
```

### 3.2 Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

Atur koneksi database di `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=chrun-prediction-system
DB_USERNAME=postgres
DB_PASSWORD=secret

ML_ENGINE_BASE_URL=http://localhost:8001
```

> `ML_ENGINE_BASE_URL` adalah base URL service FastAPI (lihat bagian 5). Karena `php artisan serve` juga memakai port default `8000`, sarankan jalankan FastAPI di port berbeda (`8001`) agar tidak bentrok saat melakukan integrasi API ke ML.

### 3.3 Migrasi & Seeder

```bash
php artisan migrate --seed
```

Seeder akan otomatis membuat:
- Role default (misalnya `staff bank`) via Spatie Permission.

### 3.5 Setup Spatie Laravel-Permission

Package ini biasanya sudah ter-install lewat `composer install` (karena sudah ada di `composer.json`). Jika perlu setup manual dari awal:

```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

Definisikan role & permission di `database/seeders/RolePermissionSeeder.php`, lalu jalankan:

```bash
php artisan db:seed --class=RolePermissionSeeder
```

### 3.6 Build Asset Frontend (React via Inertia)

Development mode (dengan hot reload):

```bash
npm run dev
```

Production build:

```bash
npm run build
```

### 3.7 Jalankan Server Laravel

```bash
php artisan serve
```

Aplikasi bisa diakses di `http://localhost:8000`.

> Karena menggunakan Breeze + Inertia, **tidak perlu menjalankan server Laravel dan React secara terpisah**. Jalankan `npm run dev` di satu terminal dan `php artisan serve` di terminal lain — keduanya saling terhubung lewat Vite + Inertia.

---

## 4. Setup Frontend (React JS via Inertia.js)

Karena stack menggunakan Laravel Breeze (React + Inertia), source code React berada di dalam folder Laravel itu sendiri (`resources/js`), **bukan** repository terpisah.

### 4.1 Struktur Folder Frontend

```
Churn-Predictions-System/
├── resources/
│   ├── js/
│   │   ├── Pages/          # Halaman Inertia (setara "routes" di SPA)
│   │   ├── Components/     # Komponen React reusable
│   │   ├── Layouts/        # Layout dashboard, auth, dll
│   │   └── app.jsx         # Entry point Inertia
│   └── css/
├── vite.config.js
└── package.json
```

### 4.2 Menjalankan Dev Server

```bash
cd backend
npm run dev
```

Vite akan memantau perubahan di `resources/js` dan `resources/css` secara real-time.

### 4.3 Menambahkan Halaman Baru (Inertia Page)

1. Buat file baru di `resources/js/Pages/`, misalnya `Customers/Index.jsx`.
2. Buat route dan controller di Laravel yang me-render halaman tersebut:

```php
use Inertia\Inertia;

Route::get('/customers', function () {
    return Inertia::render('Customers/Index', [
        'customers' => Customer::all(),
    ]);
})->middleware(['auth']);
```

### 4.4 Integrasi D3.js untuk Visualisasi

Install D3.js jika belum ada di `package.json`:

```bash
npm install d3
```

D3.js dipakai untuk visualisasi statistik churn (misalnya distribusi risiko, tren prediksi per periode) yang tidak tercover oleh chart library standar.

---

## 5. Setup ML Engine (FastAPI)

ML Engine berada di folder terpisah (`ml-engine/`) dan dijalankan sebagai service independen yang dipanggil oleh Laravel.

### 5.1 Setup Environment Python

```bash
python3 -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 5.2 Menjalankan Service FastAPI

```bash
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

Penjelasan flag:
- `api.main:app` — mengacu ke objek `app` di file `api/main.py`.
- `--host 0.0.0.0` — service bisa diakses dari luar localhost (berguna saat testing dari container/VM lain).
- `--port 8000` — sesuaikan dengan `ML_ENGINE_BASE_URL` di `.env` Laravel. **Karena Laravel juga default memakai port 8000 (`php artisan serve`), ubah salah satu port** agar tidak bentrok. Disarankan jalankan FastAPI di port `8001`:

```bash
uvicorn api.main:app --host 0.0.0.0 --port 8001 --reload
```

lalu sesuaikan `.env` Laravel:

```env
ML_ENGINE_BASE_URL=http://localhost:8001
```

- `--reload` — auto-restart saat ada perubahan kode, dipakai untuk development saja (jangan dipakai di production).

### 5.3 Verifikasi Service Berjalan

```bash
curl http://localhost:8001/docs
```

FastAPI secara default menyediakan dokumentasi interaktif (Swagger UI) di endpoint `/docs`.

---

## 6. Import Dataset & Menjalankan Prediksi via Artisan Command

Setelah Backend dan ML Engine berjalan, gunakan custom Artisan command berikut untuk mengisi data nasabah dan menjalankan prediksi batch.

### 6.1 Import Dataset Nasabah

```bash
php artisan customers:import dataset/churn.csv
```

Command ini akan:
- Membaca file CSV dari path `dataset/churn.csv` (relatif terhadap root project Laravel, sesuaikan path bila file disimpan di lokasi lain).
- Melakukan mapping kolom CSV ke kolom tabel `customers`.
- Menyimpan setiap baris sebagai record baru dengan `id` berupa UUID.

> Pastikan file `dataset/churn.csv` sudah tersedia sebelum menjalankan command ini. Format kolom CSV harus sesuai dengan yang diharapkan command (cek isi command di `app/Console/Commands/ImportCustomers.php` bila ada perubahan skema dataset).

### 6.2 Menjalankan Prediksi untuk Data yang Belum Diprediksi

```bash
php artisan customers:predict-pending
```

Command ini akan:
- Mengambil seluruh data `customers` yang belum memiliki record di tabel `predictions` (atau prediksinya sudah kedaluwarsa, tergantung logika command).
- Mengirim masing-masing profil nasabah ke ML Engine (`ML_ENGINE_BASE_URL`) untuk memperoleh `churn_probability`.
- Menyimpan hasilnya ke tabel `predictions` beserta `risk_level` (Hijau/Kuning/Merah).

> Command ini **membutuhkan ML Engine (FastAPI) sudah berjalan**. Jika FastAPI belum aktif atau `ML_ENGINE_BASE_URL` salah, command akan gagal/timeout — cek log di `storage/logs/laravel.log`.

### 6.3 Urutan Eksekusi yang Disarankan (Setup dari Nol)

```bash
# 1. Jalankan ML Engine terlebih dahulu
source venv/bin/activate
uvicorn api.main:app --host 0.0.0.0 --port 8001 --reload

# 2. Di terminal baru, jalankan migrasi & seed Laravel
php artisan migrate --seed

# 3. Import dataset nasabah
php artisan customers:import dataset/churn.csv

# 4. Jalankan prediksi untuk seluruh data yang baru diimport
php artisan customers:predict-pending

# 5. Jalankan dev server frontend & backend
npm run dev
php artisan serve
```

---

## 7. Environment Variables Checklist

| Variable | Lokasi | Contoh Nilai | Keterangan |
|---|---|---|---|
| `DB_CONNECTION` | `backend/.env` | `pgsql` | Wajib PostgreSQL |
| `DB_DATABASE` | `backend/.env` | `bank_churn` | |
| `ML_ENGINE_BASE_URL` | `backend/.env` | `http://localhost:8001` | Harus sama dengan port Uvicorn |
| `APP_URL` | `backend/.env` | `http://localhost:8000` | Dipakai Inertia & asset Vite |
| `VITE_APP_NAME` | `backend/.env` | `Bank Churn Prediction` | Ditampilkan di title halaman React |

---

## 8. Troubleshooting Setup

| Masalah | Penyebab Umum | Solusi |
|---|---|---|
| `npm run dev` berhasil tapi halaman React tidak ter-update | Vite dev server belum jalan bersamaan dengan `php artisan serve` | Pastikan dua proses berjalan bersamaan di terminal berbeda |
| Error `Class "Spatie\Permission\..." not found` | Package belum di-publish/migrate | Jalankan ulang `php artisan vendor:publish` dan `php artisan migrate` |
| `customers:predict-pending` gagal / timeout | ML Engine belum jalan atau salah port | Cek `uvicorn` sudah aktif, cocokkan `ML_ENGINE_BASE_URL` |
| `customers:import` gagal parsing CSV | Format kolom CSV tidak sesuai mapping command | Bandingkan header CSV dengan mapping di source command |
| Role/permission tidak ke-apply di route | Middleware `role:` belum terdaftar di konfigurasi middleware aplikasi | Daftarkan alias middleware Spatie sesuai dokumentasi resminya |
| Chart D3.js tidak muncul | Elemen SVG belum ter-mount saat D3 dijalankan | Pastikan render D3 di dalam `useEffect` setelah komponen mount |

---

## 9. Referensi Lanjutan

- Dokumentasi Laravel Breeze: https://laravel.com/docs/starter-kits
- Dokumentasi Inertia.js: https://inertiajs.com/
- Dokumentasi Spatie Laravel-Permission: https://spatie.be/docs/laravel-permission
- Dokumentasi D3.js: https://d3js.org/
- Dokumentasi FastAPI: https://fastapi.tiangolo.com/
- Dokumentasi Uvicorn: https://www.uvicorn.org/