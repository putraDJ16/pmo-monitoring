
# User Management

## 1. Tujuan Menu
Modul ini digunakan untuk mengelola user management di dalam aplikasi Aplikasi Pemakaian Pekerjaan Project.

## 2. Pengguna Utama
Pengguna operasional, supervisor, dan admin.

## 3. Urutan Eksekusi di Stitch
Modul ini memiliki 4 tahap karena mencakup berbagai interaksi kompleks.
1. Buat **List Page**
2. Lanjutkan ke **Detail Page (Side Panel)**
3. Lanjutkan ke **Create/Edit Form**
4. Tutup dengan **Dashboard / Report kontekstual**

> Saran: Fokus pada interaksi "inline editing" dan layout "side panel" saat menggarap modul ini agar terasa seperti SaaS sungguhan.

## 4. Detail Desain per Halaman

### A. List Page
**Tujuan layar**
- Menampilkan daftar User Management secara padat dan dapat difilter.

**Struktur layout**
- Header: breadcrumb, judul modul, View Switcher (List, Board, Timeline jika relevan)
- Area konten utama: Tabel grid padat dengan kolom-kolom utama User Management

**Kolom tabel / Atribut Utama**
- User – daftar, tambah, edit, nonaktifkan akun pengguna
- User Role – kelola role/grup akses
- User Menu – konfigurasi menu yang dapat diakses per role
- ID Unik
- Judul / Nama
- Status (Badge warna)

**Quick actions (di dekat row)**
- Lihat detail (buka side panel)
- Edit inline
- Menu titik tiga (hapus, duplikat, dll.)

**Output yang diharapkan dari Stitch**
- Tabel responsif high-density yang tetap scannable
- Status badge konsisten dengan design system

#### Prompt Stitch Tahap 1
```text
Design a desktop-first enterprise PMO Monitoring Infrastruktur Ketenagalistrikan web application in Indonesian language. Keep the existing product design system consistent: bright modern aesthetic, indigo/violet sidebar, white content area, high-density data, round-corner cards, and inline-editable metadata.

Create the List view page for the "User Management" module in Aplikasi Pemakaian Pekerjaan Project.
Goal: Manage User Management records in Aplikasi Pemakaian Pekerjaan Project.
Include:
- page header with breadcrumb, module title, and a View Switcher (List View, Board, Timeline if relevant)
- primary CTA "+ Tambah User Management"
- a high-density data table displaying User Management records
- table columns: User – daftar, tambah, edit, nonaktifkan akun pengguna, User Role – kelola role/grup akses, User Menu – konfigurasi menu yang dapat diakses per role, ID Unik, Judul / Nama, Status (Badge warna)
- visual indicators for status and priority using color badges
- inline quick actions on hover (edit, menu dots, open detail drawer)
Use clean padding, alternating row colors (or subtle borders), and ensure it feels highly interactive.
```

---

### B. Detail Page (Side Panel / Drawer)
**Tujuan layar**
- Melihat dan mengedit satu User Management spesifik tanpa meninggalkan list.

**Header & Layout Panel**
- Top bar panel: action utama, ID, Menu(dots), Close (X)
- Judul User Management (inline editable textarea)

**Atribut (Grid Inline Edit)**
- User – daftar, tambah, edit, nonaktifkan akun pengguna
- User Role – kelola role/grup akses
- User Menu – konfigurasi menu yang dapat diakses per role
- Status
- Prioritas
- Owner / Assignee

**Area Deskripsi & Sub-item**
- Rich text area untuk deskripsi lengkap
- Sub-item / checklist terkait
- Area komentar (activity thread ke bawah)

#### Prompt Stitch Tahap 2
```text
Design the Detail view for "User Management" using a Slide-out Side Panel (Drawer) pattern coming from the right side over the List.
The aesthetic should be clean, feeling fast and highly interactive (SaaS style).

Include inside the panel:
- A top action bar: primary action, ID, "..." menu, and a "Close" icon.
- A large, inline-editable Title.
- A metadata section arranged in a 2-column or wrapping grid (User – daftar, tambah, edit, nonaktifkan akun pengguna, User Role – kelola role/grup akses, User Menu – konfigurasi menu yang dapat diakses per role, Status, Prioritas, Owner / Assignee). Make these appear clickable/editable.
- A rich text Description area with formatting toolbar placeholders.
- A combined "Activity & Comments" section at the bottom, with a text input box fixed above or at the bottom of the feed for writing comments.
The design should fit comfortably within the right-third or half of a desktop screen.
```

---

### C. Create/Edit Form
**Tujuan layar**
- Form untuk membuat atau mengedit User Management dengan validasi inline.

**Field Utama**
- Judul / Nama
- Deskripsi
- User – daftar, tambah, edit, nonaktifkan akun pengguna
- User Role – kelola role/grup akses
- User Menu – konfigurasi menu yang dapat diakses per role
- Status
- Prioritas
- Owner / Assignee
- Tanggal Deadline

#### Prompt Stitch Tahap 3
```text
Design the Create/Edit modal for "User Management" in Aplikasi Pemakaian Pekerjaan Project, Indonesian language.

Create an interactive modal UI:
- Main column: Judul / Nama, Deskripsi, User – daftar, tambah, edit, nonaktifkan akun pengguna, User Role – kelola role/grup akses, User Menu – konfigurasi menu yang dapat diakses per role
- Side column: Status, Prioritas, Owner / Assignee, Tanggal Deadline
- Attachments / upload area (if relevant)
- Sticky footer with "Batal" and "Simpan" actions, plus "Simpan & Buat Baru" option
- Clear inline validation on blur and asterisks for mandatory fields

Keep the modal clean, using the established indigo/violet/white modern SaaS design system.
```

---

### D. Dashboard / Report
**Tujuan layar**
- Ringkasan operasional modul User Management untuk monitoring cepat.

**Komponen Utama**
- KPI cards khusus modul (jumlah, rata-rata, yang overdue, dsb.)
- Chart tren bulanan
- Tabel "Needs Attention" di bagian bawah

#### Prompt Stitch Tahap 4
```text
Design the Dashboard/Report view for the "User Management" module in Aplikasi Pemakaian Pekerjaan Project, Indonesian language.

Include:
- Date range filter and module context filter at the top
- 3-4 KPI cards summarizing User Management health (count, trend, overdue/critical count)
- 2 comparative charts (bar or line) showing trend over time
- A "Needs Attention" table at the bottom with clickable rows opening the detail drawer
- Export buttons (PDF/CSV) near the header
- Clean, bright, indigo/violet-accented interface consistent with the rest of Aplikasi Pemakaian Pekerjaan Project
```

## 5. Aturan Konsistensi
- Indikator Prioritas dan Status pada tabel harus sama persis logikanya dengan di detail panel dan di form.
- Gaya Dropdown dengan avatar + text harus seragam di semua modul.
- Usahakan detail muncul di side panel / modal — jangan buat halaman terpisah untuk operasi yang biasa.

## 6. Checklist Sebelum Lanjut ke Menu Berikutnya
- [ ] List View memuat semua kolom penting
- [ ] Detail UI berbentuk Side Panel
- [ ] Form punya validasi jelas
- [ ] Dashboard modul menampilkan data yang relevan
