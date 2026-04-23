
# Shared Page Pattern — Aplikasi Pemakaian Pekerjaan Project

## Tujuan
File ini menjadi referensi pola halaman yang harus konsisten di semua menu modul dalam aplikasi **Aplikasi Pemakaian Pekerjaan Project**. Pola ini mengadaptasi alur "List → Detail → Form → Dashboard" yang dioptimalkan untuk PMO Monitoring Infrastruktur Ketenagalistrikan.

## 1. List Page Pattern (Board/Tabel)
### Komposisi
- breadcrumb (opsional di level top navigasi)
- page title + deskripsi singkat
- View Switcher (List | Kanban | Timeline) di sebelah judul (kalau relevan)
- CTA primer (misal: "Tambah Data Baru")
- KPI summary row (opsional)
- filter bar and search (sticky)
- area konten utama (Tabel High-Density atau Board)
- panel sekunder (off-canvas/drawer dari kanan) untuk detail item

### Rule
- pencarian selalu di sisi kiri/kanan filter bar
- action massal (bulk action checkbox) memunculkan floating action bar di bawah layar (opsional)
- pagination/infinite scroll di bawah tabel
- default behavior mengklik row adalah memunculkan "Side Panel" (Drawer) sebagai Quick View untuk interaksi/overview cepat
- navigasi pindah halaman URL (Full Page Detail) dipicu dari spesifik klik tombol "Detail" pada kolom aksi untuk fitur yang padat informasi (mis. Tabulasi).

## 2. Detail Page Pattern (Side Panel / Drawer vs Full Page)
Karena produktivitas sangat penting di aplikasi PMO Monitoring Infrastruktur Ketenagalistrikan, aplikasi mengusung pendekatan ganda:
- **Quick View (Side Drawer)**: untuk review cepat, melihat status meta, deskripsi singkat, dan recent activity feed tanpa memutus alur list utama.
- **Full Page Detail**: untuk manipulasi dan analisa ekstensif pada sub-item kompleks (e.g. Tabulasi Tanah, S-Curve chart lebar).

### Komposisi (Untuk Panel/Full Detail)
- top action bar (Copy link, Delete, Close)
- judul item (inline editable)
- meta properties dalam bentuk grid atau list dengan inline dropdown
- area deskripsi lengkap (Rich text editor)
- sub-item section (checklist / child items)
- relasi (Lampiran, Item terkait, referensi eksternal)
- area komentar dan activity history di paling bawah

### Rule
- properti harus gampang diedit langsung tanpa tombol "Edit" form penuh
- tab tidak terlalu dalam; gunakan vertical scrolling
- komentar adalah interaksi prioritas

## 3. Form Page Pattern (Create/Edit Modal atau Full Page)
### Komposisi
- header judul form
- two-column layout untuk menghemat ruang vertikal
- informasi utama (Nama, Deskripsi) menggunakan lebih banyak ruang
- properti metadata di kolom samping (jika modal besar)
- upload area untuk attachments (kalau relevan)
- checklist sub-item awal (opsional)
- sticky footer untuk action (Simpan, Batal, Simpan & Buat Baru)

### Rule
- error validation muncul langsung saat field ditinggalkan (on blur)
- mandatory fields (*asterisk*) harus jelas
- dukung "Simpan & Buat Baru" untuk entry berulang

## 4. Dashboard / Report Pattern
### Komposisi
- date range picker dan context filter (global filter)
- deretan KPI cards angka besar
- 2 atau 3 chart utama berdampingan
- tabel "Needs Attention" atau "Recent Exceptions" di bagian bawah
- tombol export (PDF/CSV) di atas atau dekat chart spesifik

### Rule
- chart harus punya legend dan tooltip yang informatif
- tabel di panel bawah dibuat *actionable* (bisa klik untuk pergi ke item bermasalah)
- layout modular mengizinkan widget bisa ditata ulang (opsional)

## Prompt Stitch
```text
Create reusable page patterns for a desktop-first enterprise PMO Monitoring Infrastruktur Ketenagalistrikan platform (SaaS) in Indonesian language.

Show 4 layout templates, utilizing a modern, bright, productivity-focused design:
1) List/Board Page: containing a View Switcher, sticky filter bar, high-density table or board area, and a global "+" CTA.
2) Detail View (Side Panel/Drawer format): featuring inline-editable title, grid-based inline-editable metadata, rich text description, sub-item checklist, attachments, and combined comment/activity feed section at the bottom.
3) Create/Edit Form (Large Modal): organized into a main column for descriptive content and a side column for status/metadata, with sticky footer actions ("Simpan" and "Simpan & Buat Baru").
4) Contextual Dashboard/Report: containing date filters, top KPI metric cards, comparative charts (e.g., bar or line graphs with tooltips), and an actionable exception-list table below.

Each template must be modular, highly interactive, and visually consistent with a light/white background and indigo/violet accents, optimized for fast data entry and scanning.
```

## Checklist
- [ ] Pola Side Panel Drawer mempermudah buka-tutup detail tanpa hilang konteks daftar
- [ ] Inline editing difasilitasi di halaman detail
- [ ] List page mengakomodasi berbagai jenis "View"
- [ ] Template reusable untuk semua modul
