## Lesson Learned - Software Developer

Project: Bank Customer Churn Prediction System

Bagian: Lesson Learned — Software Development & Integrasi ML Engine

Tujuan dokumen: Mencatat kendala yang dialami selama development beserta solusinya, sebagai basis Knowledge Management System (KMS) agar tim di masa depan tidak mengulang kesalahan yang sama dan bisa onboarding lebih cepat.

---

## 1. Log Kendala & Solusi

Catat semua kendala teknis di sini secara kronologis, tidak dibatasi hanya integrasi ML — termasuk kendala Laravel, React/Inertia, database, deployment, dsb.

| No | Tanggal | Kendala | Penyebab | Solusi | Waktu yang Terbuang | PIC |
|---|---|---|---|---|---|---|
| 1 | 2026-08-21 | Halaman React (Inertia) tidak ter-update walau sudah edit kode | Vite dev server (`npm run dev`) tidak dijalankan bersamaan dengan `php artisan serve`, atau proses lama masih jalan di background | Pastikan hanya ada satu instance `npm run dev` aktif, restart terminal jika perlu | ~30 menit | Rafi'ul Huda |
| 2 | 2026-08-25 | `php artisan customers:import` gagal parsing sebagian baris CSV | Ada nilai kosong/`NULL` di kolom numerik dataset yang tidak dihandle command | Tambahkan validasi & default value saat mapping kolom CSV ke model, skip baris yang benar-benar korup dengan log warning | ~1.5 jam | Rafi'ul Huda |

---

## 2. Kendala Spesifik Integrasi API ke ML Engine

Bagian ini fokus khusus pada masalah yang muncul saat Laravel berkomunikasi dengan ML Engine (FastAPI), karena ini adalah titik integrasi paling rawan di project ini (dua tim, dua bahasa, dua siklus deploy berbeda).

### 2.1 Mismatch Format Payload

**Kendala:** Request dari Laravel ke FastAPI mengembalikan error 422 (Unprocessable Entity).

**Penyebab:** Skema Pydantic di FastAPI mengharapkan field numerik (misalnya `balance`, `tenure`) dalam tipe `float`/`int`, sementara Laravel mengirim beberapa field sebagai string hasil `casting` default Eloquent.

**Solusi:** Eksplisit melakukan casting tipe data di Service/DTO Laravel sebelum membentuk payload JSON, jangan mengandalkan hasil `toArray()` mentah dari model Eloquent. Sepakati kontrak API (nama field, tipe data, nilai enum) di awal sprint lewat dokumen bersama (misalnya OpenAPI schema dari FastAPI), bukan hanya lewat chat.

### 2.2 Timeout Saat Prediksi Batch

**Kendala:** `php artisan customers:predict-pending` timeout ketika dijalankan untuk ratusan data sekaligus.

**Penyebab:** Command mengirim request satu-per-satu (looping HTTP call) ke FastAPI tanpa batching, dan default timeout HTTP client Laravel terlalu pendek untuk volume data besar.

**Solusi:** 
- Tambahkan endpoint batch di FastAPI yang menerima array of payload dan mengembalikan array of hasil sekaligus, alih-alih satu request per nasabah.
- Naikkan timeout HTTP client di Laravel (`Http::timeout(...)`) sesuai estimasi waktu proses model.
- Untuk volume sangat besar, pertimbangkan jalankan command via queue job, bukan langsung synchronous di terminal.

### 2.3 Ketidaksesuaian Versi Model dengan Ekspektasi Backend

**Kendala:** Hasil `risk_level` tiba-tiba berubah drastis untuk data yang sama setelah tim DS update model.

**Penyebab:** Tim DS mengganti model (retraining) tanpa mengubah versi endpoint atau memberi tahu tim Software Dev, sehingga ambang batas (threshold) risk_level di Laravel tidak lagi sesuai dengan output probabilitas model baru.

**Solusi:** 
- Sertakan `model_version` di setiap response FastAPI dan simpan di tabel `predictions` (sudah ada di skema, wajib benar-benar dipakai dan divalidasi).
- Sepakati proses komunikasi wajib (misalnya update di channel khusus/changelog) setiap kali tim DS mengganti/retrain model ke production.
- Pertimbangkan agar threshold risk_level dikonfigurasi (bukan hardcode di Laravel), sehingga bisa disesuaikan tanpa deploy ulang saat model berubah.

### 2.4 Perbedaan Environment Lokal vs Staging untuk ML Engine

**Kendala:** Integrasi berjalan normal di lokal tapi gagal koneksi saat di-deploy ke staging.

**Penyebab:** `ML_ENGINE_BASE_URL` di `.env` staging masih menunjuk ke `localhost`, padahal FastAPI berjalan di service/host terpisah di staging.

**Solusi:** Buat checklist environment variable per environment (lokal, staging, production) dan review sebelum setiap deployment — lihat juga bagian 4 (Rekomendasi Onboarding).

---

## 3. Apa yang Akan Dilakukan Berbeda Kalau Mengulang Project Ini

Refleksi jujur dari tim — bukan untuk menyalahkan, tapi untuk jadi bahan perbaikan proses di project berikutnya.

1. **Menyepakati kontrak API (schema) di awal sprint pertama**, bukan setelah development backend dan ML Engine berjalan paralel. Idealnya kontrak berupa OpenAPI/Swagger spec yang disetujui kedua tim sebelum coding, agar Laravel dan FastAPI tidak saling menunggu atau menebak-nebak format.
2. **Menyiapkan mock/stub ML Engine di awal**, sehingga tim Software Dev bisa mulai development dashboard tanpa harus menunggu model ML selesai dilatih. Ini akan mempercepat paralelisasi kerja antar tim.
3. **Menentukan strategi port & environment variable sejak awal**, agar tidak ada bentrok port antara Laravel dan FastAPI saat development lokal (baru disadari setelah beberapa developer mengalami masalah yang sama secara terpisah).
4. **Menambahkan endpoint batch prediksi sejak awal**, bukan setelah menyadari performa buruk saat data sudah banyak. Desain awal terlalu optimis mengasumsikan volume data kecil.
5. **Menetapkan proses komunikasi perubahan model** (versioning & changelog) sejak sprint pertama, agar perubahan di sisi ML tidak mengejutkan sisi aplikasi.
6. **Menulis dokumentasi (termasuk dokumen ini) secara berkala di setiap sprint**, bukan dikumpulkan di akhir project — banyak detail kendala yang terlupa karena baru dicatat belakangan.

---

## 4. Rekomendasi untuk Tim Berikutnya (Onboarding)

Checklist ini ditujukan untuk anggota tim baru (intern/developer) yang baru bergabung ke project ini, agar proses onboarding lebih cepat dan tidak mengulang kendala yang sudah pernah terjadi.

### Sebelum Mulai Coding

- [ ] Baca [`README.md`](./README.md) untuk memahami arsitektur & alur sistem secara keseluruhan.
- [ ] Ikuti [`docs/setup-environment.md`](./setup-environment.md) untuk setup Backend, Frontend, dan ML Engine di lokal.
- [ ] Pastikan bisa menjalankan alur end-to-end minimal sekali: import dataset → jalankan prediksi → lihat hasilnya di dashboard.
- [ ] Baca dokumen ini (**Lesson Learned**) secara menyeluruh sebelum mulai mengerjakan task integrasi ML.

### Saat Bekerja dengan Integrasi ML

- [ ] Jangan asumsikan format payload — selalu cek dokumentasi Swagger FastAPI (`/docs`) untuk skema request/response terbaru.
- [ ] Selalu cek `model_version` pada response prediksi bila hasil terasa tidak konsisten dengan ekspektasi.
- [ ] Jika menambah field baru di `customers`, informasikan ke tim DS karena kemungkinan perlu penyesuaian preprocessing di ML Engine.
- [ ] Jangan hardcode threshold risk_level di kode — cek apakah sudah dikonfigurasi lewat `.env`/config, dan gunakan itu.

### Kebiasaan yang Diharapkan

- [ ] Catat kendala baru ke bagian [Log Kendala & Solusi](#1-log-kendala--solusi) segera setelah menemukan solusinya — jangan menunggu sampai lupa detailnya.
- [ ] Update dokumen ini sebelum sprint review/retrospective, bukan sesudahnya.
- [ ] Jika menemukan kendala yang sama seperti yang sudah tercatat, tambahkan catatan tambahan (bukan duplikat entri) jika solusinya berbeda konteks.

---

## 5. Koordinator Dokumen

Dokumen ini dikelola oleh tim software developer, tapi tetap butuh penanggung jawab agar konsisten terupdate dan tidak menjadi dokumen mati.Kendala dari sisi integrasi ML dicatat dari sudut pandang Software Dev (sebagai konsumen API)

| Peran | Nama | Tanggung Jawab |
|---|---|---|
| Koordinator Dokumen (Software Dev) | Rafi'ul Huda | Memastikan setiap kendala integrasi dicatat, mereview entri baru sebelum sprint review, menjaga format tetap konsisten |

