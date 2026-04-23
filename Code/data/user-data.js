export const usersData = [
  { id: 1, name: 'Andi Budianto', email: 'andi.b@pln.co.id', initials: 'AB', role: 'Super Admin', status: 'Aktif', lastLogin: '2026-04-23 09:15', division: 'STI MTI' },
  { id: 2, name: 'Budi Santoso', email: 'budi.s@pln.co.id', initials: 'BS', role: 'PMO Manager', status: 'Aktif', lastLogin: '2026-04-23 08:30', division: 'PMO Pusat' },
  { id: 3, name: 'Citra Wulandari', email: 'citra.w@pln.co.id', initials: 'CW', role: 'Project Admin', status: 'Aktif', lastLogin: '2026-04-22 16:45', division: 'UIP JBB' },
  { id: 4, name: 'Deni Setiawan', email: 'deni.s@pln.co.id', initials: 'DS', role: 'Viewer', status: 'Inaktif', lastLogin: '2026-04-10 10:20', division: 'Direktorat Mega Proyek' },
  { id: 5, name: 'Eka Pramudita', email: 'eka.p@pln.co.id', initials: 'EP', role: 'Project Manager', status: 'Aktif', lastLogin: '2026-04-23 10:05', division: 'UIP Sulawesi' },
];

export const rolesData = [
  { id: 1, name: 'Super Admin', description: 'Akses penuh ke semua modul dan sistem.', userCount: 2, permissions: ['read:all', 'write:all', 'delete:all', 'manage:users', 'manage:roles', 'manage:system'] },
  { id: 2, name: 'PMO Manager', description: 'Akses penuh ke semua project dan laporan, tanpa akses ke pengaturan sistem.', userCount: 5, permissions: ['read:all', 'write:project', 'write:task', 'read:users'] },
  { id: 3, name: 'Project Manager', description: 'Akses edit hanya ke project yang ditugaskan.', userCount: 15, permissions: ['read:project', 'write:own_project', 'write:own_task'] },
  { id: 4, name: 'Project Admin', description: 'Akses entry data operasional project.', userCount: 20, permissions: ['read:project', 'write:task', 'manage:documents'] },
  { id: 5, name: 'Viewer', description: 'Hanya bisa melihat dashboard dan overview.', userCount: 45, permissions: ['read:dashboard', 'read:reports'] }
];

export const menusData = [
  { id: 10, title: 'Modul Utama', type: 'section', expanded: true, children: [
    { id: 11, title: 'Beranda', icon: 'ph-house', path: '/', isVisible: true },
    { id: 12, title: 'Dashboard', icon: 'ph-chart-bar', path: '/dashboard', isVisible: true },
    { id: 13, title: 'Monitoring', icon: 'ph-map-trifold', path: '/monitoring', isVisible: true, children: [
      { id: 131, title: 'Peta & List', path: '/monitoring', isVisible: true },
      { id: 132, title: 'Gantt Chart', path: '/monitoring/gantt', isVisible: false }
    ]}
  ]},
  { id: 20, title: 'User Management', type: 'section', expanded: true, children: [
    { id: 21, title: 'User & Role', icon: 'ph-users', path: '/users', isVisible: true },
  ]},
  { id: 30, title: 'Lainnya', type: 'section', expanded: false, children: [
    { id: 31, title: 'Pengaturan Sistem', icon: 'ph-gear', path: '/settings', isVisible: true }
  ]}
];
