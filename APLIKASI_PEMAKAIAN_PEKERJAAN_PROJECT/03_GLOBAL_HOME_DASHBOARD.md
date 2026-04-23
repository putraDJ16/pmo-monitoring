
# Global Home Dashboard — Aplikasi Pemakaian Pekerjaan Project

## Tujuan
Dashboard utama dipakai sebagai landing page atau tampilan perdana bagi pengguna saat membuka aplikasi **Aplikasi Pemakaian Pekerjaan Project**. Area ini berfokus menampilkan metriks krusial kesehatan proses dan prioritas personal.

## KPI yang Disarankan
- Jumlah item aktif hari ini
- Jumlah item overdue / perlu perhatian
- Aktivitas baru 7 hari terakhir
- Ringkasan status (% selesai vs sedang berjalan)
- Ringkasan User Management

## Komponen Utama
- salam personal dan filter scope global (semua data vs subset tertentu)
- deretan KPI cards ringkas di atas
- **Chart 1:** Grafik tren User Management dalam 30 hari terakhir
- **Chart 2:** Distribusi status Dashboard (donut/pie chart)
- **Panel Utama:** Daftar 'User Management' milik user yang butuh tindak lanjut (urutan deadline terdekat)
- **Panel Sekunder:** Activity Feed (log aktivitas terbaru secara real-time)
- quick links / universal add floating button

## Layout
- header dengan sapaan, tanggal, & global scope selector
- baris 1: KPI cards (4-6 kotak, menggunakan indikator tren naik/turun)
- baris 2 (split kolom): Chart utama (kiri) & Chart sekunder (kanan)
- baris 3 (split kolom): Tabel prioritas / needs attention (kiri - porsi lebih lebar) & Activity Feed/Reminders (kanan). Klik pada baris tabel akan membuka **Side Panel (Drawer)** untuk Quick View item.

## State Utama
- Jika user adalah **Manajer/Admin**: tampilkan agregat health, peringatan kapasitas, summary report.
- Jika user adalah **Anggota/Individu**: tampilkan daftar "Milik Saya Hari Ini", notifikasi personal, reminder deadline.
*(Pada prompt, asumsikan view manager/admin untuk menunjukkan kompleksitas, dengan panel "Milik Saya" untuk personal.)*

## Prompt Stitch
```text
Design the multi-role home dashboard for a desktop-first enterprise PMO Monitoring Infrastruktur Ketenagalistrikan platform (SaaS) in Indonesian language.
The page is the landing area right after login, delivering a global snapshot of key metrics, team health, and individual priorities for Aplikasi Pemakaian Pekerjaan Project.

Include:
- a greeting header with today's date and a global scope selector dropdown
- top KPI cards relevant to PMO Monitoring Infrastruktur Ketenagalistrikan with trend arrows
- two main visual charts that reflect PMO Monitoring Infrastruktur Ketenagalistrikan operational health
- a wide priorities / "Tindak Lanjut Mendesak" table section listing urgent items assigned to the user
- a responsive right or side panel containing a real-time "Activity Feed" and automated "Reminders"
- clean, modern, bright interface with indigo/violet accents against white backgrounds, keeping data dense but actionable
- floating Universal Add button visible in the layout context

Ensure the visual weight guides the eye towards red flags (overdue, critical issues, over-limit) immediately.
```

## Checklist
- [ ] View terasa seperti 'Command Center' untuk PMO Monitoring Infrastruktur Ketenagalistrikan
- [ ] Pembedaan jelas antara data personal dan data agregat
- [ ] Area peringatan (red flags) sangat mudah dipindai
- [ ] Ruang dimanfaatkan secara efisien (high density) tanpa terlihat kacau
