
# Global Design System — Aplikasi Pemakaian Pekerjaan Project

## Tujuan
File ini dipakai setelah app shell jadi, untuk menyeragamkan tampilan semua layar di Stitch untuk aplikasi **Aplikasi Pemakaian Pekerjaan Project** (PMO Monitoring Infrastruktur Ketenagalistrikan).

## Karakter Visual
- modern, produktif, dan bersih (seperti Linear, Asana, Notion)
- fokus pada interaktivitas (drag-and-drop, inline editing)
- estetika cerah dengan kontras yang baik untuk teks
- kepadatan data tinggi (high density) namun tetap memiliki hierarchy ruang (spacing) yang baik
- tidak menggunakan tema gelap/cybersecurity (hindari latar belakang terlalu gelap selain sidebar)

## Rekomendasi Gaya
### Warna
- Primary / Sidebar: indigo/violet pekat
- Surface utama: Putih (#FFFFFF)
- Surface sekunder: Abu-abu sangat terang (#F9FAFB) untuk header tabel, sidebar mini, panel sekunder
- Accent / Brand: biru (untuk CTA, hover states, indikator aktif)
- Success: Hijau (untuk status positif/selesai)
- Warning: Kuning/Amber (untuk peringatan/risiko)
- Danger / Critical: Merah (untuk overdue, error kritis, over-limit)
- Info: Biru muda (untuk draft, sedang berjalan, planned)

### Typography
- Font sans-serif yang clean dan geometris (seperti Inter, Roboto, Outfit, Poppins)
- Heading tegas dan tebal untuk judul halaman
- Body text ringkas dan mudah dibaca dalam satu lirik mata
- Metadata, tanggal, atau atribut sistem menggunakan teks sekunder (abu-abu sedang) dengan ukuran lebih kecil
- Font monospace (Opsional) untuk ID unik, code snippet, atau teknikal data

### Spacing dan Grid
- Gunakan 8px / 4px spacing system
- Cards menggunakan medium radius (8px atau 12px) dengan border sangat halus/tipis, tanpa drop-shadow yang berat
- Content menggunakan fluid/12-column grid
- Gap tabel rapat agar memuat banyak data (high density)
- Section margin cukup untuk membedakan kelompok informasi di detail/form view

### Komponen Global Inti
- Data table dengan Classic View (mirip spreadsheet: resize kolom, bulk checkbox, sort)
- Kanban / Board card (compact, drag-friendly indikator, avatar member, counter sub-item)
- Progress ring/bar (Donut chart kecil untuk roll-up summaries)
- Side panel / Drawer untuk item detail tanpa meninggalkan list view
- Tabs navigasi (untuk detail view yang kompleks)
- Status badges (berbagai variasi bentuk dan warna sesuai severity / status / priority)
- Date picker / Range picker
- Select dropdown dengan avatar + text (untuk assignee / owner)
- Toast notifications dan inline validation

## Badge Status yang Disarankan
**Prioritas**
- Rendah (Abu-abu / Biru muda)
- Sedang (Kuning / Oranye)
- Tinggi (Merah muda)
- Kritis (Merah pekat)

**Status Pengerjaan**
- To-do / Open (Abu-abu / Outline)
- In Progress (Biru)
- Review (Ungu)
- Selesai / Resolved (Hijau)
- Blocked / Overdue (Merah)

**Indikator Tambahan**
- Flag / Pinned (ikon bendera)
- Escalated (ikon peringatan)

## Aturan Konsistensi
- Urutan warna dan makna warna untuk severity, prioritas, status harus persis sama di semua modul
- Visual badge harus selalu konsisten (contoh: semua badge prioritas menggunakan solid background + text putih, atau pale background + text berwarna)
- Area klik (hit box) untuk drag-and-drop harus jelas (misalnya: kursor berubah jadi grabber hand atau ada icon dots 6 untuk handle)
- Pola interaksi inline edit: klik langsung pada atribut di list view harus membuka input yang relevan (dropdown, kalender, dsb.)

## Prompt Stitch
```text
Design a comprehensive, reusable design system for a desktop-first enterprise PMO Monitoring Infrastruktur Ketenagalistrikan platform (SaaS) in Indonesian language.
Use:
- dark indigo/violet for the sidebar and white/light gray background surfaces for content
- modern, bright, productive aesthetics (similar to modern work tools like Linear or Asana, avoid dark-mode cybersecurity feel)
- crisp, geometric sans-serif typography (e.g., Inter, Roboto)
- compact, high-density enterprise 8px spacing system
- flat but slightly rounded cards with very light shadows and minimal borders

Design the key UI components specifically needed for PMO Monitoring Infrastruktur Ketenagalistrikan:
- Data tables with resizable columns, bulk checkboxes, inline-editable cells
- Kanban / Board cards (compact: title, status badge, assignee avatar, sub-counter)
- Side panel / Drawer for item details (slide-in from right)
- Tabs, filter bars, date range pickers
- Modal forms with two-column layout and sticky footer
- Dropdowns with avatar + text for assignees
- Accessible, color-coded status badges
- Spreadsheet-like data tables (with resizable columns, bulk checkboxes)
- Modals, drawers (side panels), tabs, filter bars, date range pickers, and interactive dropdowns
- Toast notifications and inline validation

Show how these components combine to maintain consistency across lists, detail views, forms, and dashboards. Make the UI feel highly interactive, deeply data-rich, yet readable.
```

## Checklist
- [ ] Aesthetic cerah dan produktif (bukan dark theme)
- [ ] Komponen spesifik PMO Monitoring Infrastruktur Ketenagalistrikan terdefinisi
- [ ] Warna untuk status, prioritas, severity memiliki kontras yang baik dan logis
- [ ] Hierarchy typography terstruktur untuk membedakan judul, text utama, dan metadata
