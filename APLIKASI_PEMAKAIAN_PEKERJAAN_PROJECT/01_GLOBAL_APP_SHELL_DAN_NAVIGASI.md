
# Global App Shell dan Navigasi — Aplikasi Pemakaian Pekerjaan Project

## Tujuan
File ini dipakai paling awal untuk membentuk fondasi layout aplikasi **Aplikasi Pemakaian Pekerjaan Project** sebelum membuat masing-masing modul. Pastikan shell ini selesai dan direvisi dulu sebelum lanjut ke file berikutnya.

## Sasaran Desain
- desktop-first enterprise SaaS web app (PMO Monitoring Infrastruktur Ketenagalistrikan)
- tampilan modern, bersih, dan produktif
- cocok untuk tim enterprise / operasional
- sidebar intuitif, topbar kaya fitur, content area fleksibel, fokus pada alur kerja utama

## Struktur Navigasi

### Sidebar Level 1
- Beranda (Home)
- User Management
- Dashboard
- Monitoring – Peta & List Project
- Detail Monitoring
- Pengaturan

### Sidebar Level 2
**User Management**
- User – daftar, tambah, edit, nonaktifkan akun pengguna
- User Role – kelola role/grup akses
- User Menu – konfigurasi menu yang dapat diakses per role

**Dashboard**
- Ringkasan KPI project (total project, progress rata-rata, jumlah terlambat, jumlah terminasi)
- Chart status project (Belum Dimulai, Masih Berjalan, Terlambat, Terminasi)
- Distribusi per asset tipe (Transmisi, Gardu Induk, Pembangkit)
- Quick filter unit PLN

**Monitoring – Peta & List Project**
- Filter asset tipe: Transmisi, Gardu Induk, Pembangkit
- Peta Indonesia interaktif – titik lokasi project, hover menampilkan Project Code, Project Name, Ruptl Code, Alamat, Kabupaten, Kecamatan, Kelurahan, Desa, Longitude, Latitude
- List Project (grid): Project Code, Project Name, Contract Number, Asset Type, Status, Progress (%), Unit PLN, Aksi
- Status badge: Belum Dimulai, Masih Berjalan, Terlambat, Terminasi
- Quick View (Klik Baris): menampilkan Panel Samping (Drawer) yang berisi ringkasan progress, meta informasi, deskripsi, dan aktivitas terbaru secara sekilas tanpa pindah halaman.
- Aksi: tombol Action "Detail" membuka Full Page Detail Monitoring.

**Detail Monitoring (Full Page)**
- Header Informasi Umum (Breadcrumb & Meta Section): Project Name, Project Type (Asset Type), Project Progress (%), Unit PLN, Contract ID, RUPTL Code, Region.
- Tabulasi Tanah: Survey Tanah (status + chart kriteria), Inventarisasi (map hover: Ruptl Code, Lokasi lengkap), Musyawarah, Pembebasan, Erection, Sertifikasi
- Tabulasi Pekerjaan Project: progress per pekerjaan fisik
- Tabulasi S-Curve: grafik rencana vs realisasi waktu dan biaya
- Tabulasi Bill of Quantity (BoQ): rincian item pekerjaan, volume, satuan, harga satuan, total

## Elemen Shell yang Wajib Ada
- left sidebar dengan warna indigo/violet gelap, 2 level navigasi, collapsible
- top bar berisi:
  - global search bar
  - tombol **+ Tambah Cepat** (Universal Add — FAB style)
  - notification bell dengan badge counter
  - profile menu
- breadcrumb di bawah top bar
- page title area dengan deskripsi singkat
- content canvas lebar dan fleksibel
- panel kanan opsional untuk quick insights / reminders
- desain nyaman untuk tabel high-density, chart, tabs, dan forms

## State Global
- sidebar collapse / expand
- active menu dan submenu state
- loading skeleton state
- empty state global
- unauthorized / access restricted state
- toast notifications (success, error, warning, info)
- global notification drawer (slide dari kanan)

## Fitur Tambahan Shell
- **Universal Add Button (+)**: dropdown quick create untuk entitas utama aplikasi
- **View Switcher Component**: tabs atau dropdown untuk berpindah antar mode tampilan tanpa reload penuh
- **Quick Insight Panel** (right panel opsional): ringkasan data penting user hari ini

## Prompt Stitch
```text
Design a desktop-first enterprise PMO Monitoring Infrastruktur Ketenagalistrikan web application (SaaS) in Indonesian language. Keep the existing product design system consistent: dark indigo/violet left sidebar, clean white or very light gray content area, compact feature-rich top bar, clear breadcrumbs, high-density but scannable data tables, modern friendly-enterprise visual style, rounded cards, accessible status badges, and professional SaaS layout.

Create the global app shell for this desktop-first enterprise PMO Monitoring Infrastruktur Ketenagalistrikan platform in Indonesian language.
Build:
- a dark indigo/violet collapsible left sidebar with 6 main categories and second-level submenu navigation
- a top bar with global search, a prominent "+ Tambah Cepat" universal add button, notification bell with badge, and user profile menu
- a breadcrumb area and dynamic page title + short description section
- a wide white content area optimized for tables, charts, tabs, and forms
- a professional modern SaaS visual style with a friendly and productive feel (not cybersecurity-dark, more like Linear, Height, or Asana)
- responsive behavior for desktop and tablet
- active, hover, selected, and collapsed navigation states for sidebar
- empty state, loading skeleton, toast notifications, and permission-restricted patterns
- an optional right panel for quick insights relevant to PMO Monitoring Infrastruktur Ketenagalistrikan
Keep the layout modular and reusable across all pages and modules.
```

## Checklist
- [ ] Sidebar nyaman untuk ≥17 submenu
- [ ] Topbar tidak terlalu tinggi, namun kaya fitur
- [ ] Universal Add button menonjol dan mudah ditemukan
- [ ] Content area lebar dan responsif
- [ ] Breadcrumb konsisten
- [ ] Visual hierarchy siap untuk modul data-heavy
