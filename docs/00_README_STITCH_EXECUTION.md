
# Paket Markdown untuk Stitch — Aplikasi Pemakaian Pekerjaan Project

Paket ini disusun untuk aplikasi **Aplikasi Pemakaian Pekerjaan Project** (PMO Monitoring Infrastruktur Ketenagalistrikan) dan dipecah menjadi file yang lebih mudah dipakai bertahap di Stitch.

## Kenapa dipecah seperti ini?
Stitch mendukung pembuatan desain UI dari prompt natural language, bisa diiterasi lewat chat, dan hasilnya bisa diekspor ke Figma atau frontend code. Karena itu, pendekatan paling aman adalah **satu file = satu cluster desain** agar revisi lebih terkontrol.

## Urutan Eksekusi yang Disarankan
1. `01_GLOBAL_APP_SHELL_DAN_NAVIGASI.md`
2. `02_GLOBAL_DESIGN_SYSTEM.md`
3. `03_GLOBAL_HOME_DASHBOARD.md` (sangat disarankan)
4. `04_SHARED_PAGE_PATTERN.md`
5. File per modul mulai dari `05_...` sampai `08_...`

## Cara Pakai di Stitch
1. Mulai dari prompt di file global untuk membentuk shell aplikasi.
2. Setelah layout global stabil, pindah ke file modul yang ingin dibuat.
3. Di setiap file modul, jalankan prompt tahap 1 sampai 4 secara berurutan:
   - List Page
   - Detail Page
   - Create/Edit Form
   - Dashboard / Report Kontekstual
4. Setelah satu modul selesai, baru pindah ke modul berikutnya.

## Prinsip Umum
- Fokus ke **desktop web enterprise PMO Monitoring Infrastruktur Ketenagalistrikan**.
- Gunakan **bahasa UI Indonesia**.
- Pertahankan pola konsisten: **Daftar → Quick View (Side Panel) / Full Detail Page → Form → Dashboard**.
- Semua layar wajib punya state: **loading, empty, error, success**.
- Fitur interaktif padat (seperti Tabulasi Tanah) masuk dalam **tab di halaman Full Detail**, sementara preview ringkas dilakukan via **Side Panel**.
- Fitur interaktif (drag-and-drop, inline editing) harus punya panduan micro-interaction yang jelas.

## Konteks Sistem
Sistem ini adalah platform **PMO Monitoring Infrastruktur Ketenagalistrikan** dengan fitur utama:
- User Management
- Dashboard
- Monitoring – Peta & List Project
- Detail Monitoring

## Daftar File
- `01_GLOBAL_APP_SHELL_DAN_NAVIGASI.md`
- `02_GLOBAL_DESIGN_SYSTEM.md`
- `03_GLOBAL_HOME_DASHBOARD.md`
- `04_SHARED_PAGE_PATTERN.md`
- `05_USER_MANAGEMENT.md`
- `06_DASHBOARD.md`
- `07_MONITORING_PETA_LIST_PROJECT.md`
- `08_DETAIL_MONITORING.md`
