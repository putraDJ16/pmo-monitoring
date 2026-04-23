import { projectsData } from '../../data/projects.js';

// ---- Status helpers ---- 
function getProgressClass(status) {
  switch (status) {
    case 'Masih Berjalan': return 'progress-info';
    case 'Terlambat': return 'progress-danger';
    case 'Terminasi': return 'progress-neutral';
    case 'Belum Dimulai': return 'progress-warning';
    default: return 'progress-success';
  }
}

function getBadgeClass(status) {
  switch (status) {
    case 'Masih Berjalan': return 'badge badge-info';
    case 'Terlambat': return 'badge badge-danger';
    case 'Terminasi': return 'badge badge-neutral';
    case 'Belum Dimulai': return 'badge badge-warning';
    default: return 'badge badge-success';
  }
}

function getMarkerColor(assetType) {
  switch (assetType) {
    case 'Transmisi': return '#3B82F6';
    case 'Gardu Induk': return '#10B981';
    case 'Pembangkit': return '#F59E0B';
    default: return '#4F46E5';
  }
}

// ---- KPI Calculation ----
function computeKPI(data) {
  const total = data.length;
  const berjalan = data.filter(p => p.status === 'Masih Berjalan').length;
  const terlambat = data.filter(p => p.status === 'Terlambat').length;
  const terminasi = data.filter(p => p.status === 'Terminasi').length;
  const avgProgress = Math.round(data.reduce((s, p) => s + p.progress, 0) / total);
  return { total, berjalan, terlambat, terminasi, avgProgress };
}

// ---- Render ----
export function renderMonitoringMap(container) {
  const kpi = computeKPI(projectsData);

  container.innerHTML = `
    <!-- Page Header -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
      <div>
        <div class="breadcrumb">
          <a href="#/">Beranda</a>
          <span class="separator">/</span>
          <span style="color: var(--text-secondary); font-weight: 500;">Monitoring</span>
        </div>
        <h1 class="page-title">Monitoring – Peta & List Project</h1>
        <p class="page-subtitle">Pantau progress project infrastruktur ketenagalistrikan secara real-time</p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <div class="view-switcher">
          <button class="view-switcher-btn active"><i class="ph ph-map-trifold"></i> Peta</button>
          <button class="view-switcher-btn"><i class="ph ph-list-bullets"></i> List</button>
          <button class="view-switcher-btn"><i class="ph ph-squares-four"></i> Board</button>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px;">
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Total Project</span>
          <div class="kpi-icon-box"><i class="ph ph-folder-open" style="color: var(--indigo-500); font-size: 18px;"></i></div>
        </div>
        <div class="kpi-value">${kpi.total}</div>
        <div class="kpi-trend up"><i class="ph ph-arrow-up-right" style="font-size: 12px;"></i> +3 bulan ini</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Progress Rata-rata</span>
          <div class="kpi-icon-box"><i class="ph ph-chart-line-up" style="color: var(--success); font-size: 18px;"></i></div>
        </div>
        <div class="kpi-value">${kpi.avgProgress}%</div>
        <div class="kpi-trend up"><i class="ph ph-arrow-up-right" style="font-size: 12px;"></i> +5% dari bulan lalu</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Terlambat</span>
          <div class="kpi-icon-box"><i class="ph ph-warning-circle" style="color: var(--danger); font-size: 18px;"></i></div>
        </div>
        <div class="kpi-value">${kpi.terlambat}</div>
        <div class="kpi-trend down"><i class="ph ph-arrow-down-right" style="font-size: 12px;"></i> +1 minggu ini</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Terminasi</span>
          <div class="kpi-icon-box"><i class="ph ph-prohibit" style="color: var(--slate-500); font-size: 18px;"></i></div>
        </div>
        <div class="kpi-value">${kpi.terminasi}</div>
        <div class="kpi-trend up"><i class="ph ph-minus" style="font-size: 12px;"></i> Tidak berubah</div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar" style="margin-bottom: 16px;">
      <div class="filter-label"><i class="ph ph-funnel"></i> Filter:</div>
      <select class="filter-select">
        <option>Semua Asset Type</option>
        <option>Transmisi</option>
        <option>Gardu Induk</option>
        <option>Pembangkit</option>
      </select>
      <select class="filter-select">
        <option>Semua Status</option>
        <option>Belum Dimulai</option>
        <option>Masih Berjalan</option>
        <option>Terlambat</option>
        <option>Terminasi</option>
      </select>
      <select class="filter-select">
        <option>Semua Unit PLN</option>
        <option>UIP JBB</option>
        <option>UIP JBTB</option>
        <option>UIP Sulawesi</option>
      </select>
      <div style="flex: 1;"></div>
      <div class="filter-search">
        <i class="ph ph-magnifying-glass search-icon"></i>
        <input type="text" placeholder="Cari project..." />
      </div>
      <div class="filter-counter">${kpi.total} project | ${kpi.terlambat} terlambat</div>
    </div>

    <!-- Map + Table Layout -->
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- Map -->
      <div id="map" style="width: 100%; height: 340px; border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border); box-shadow: var(--shadow-sm); z-index: 1;"></div>

      <!-- Table -->
      <div class="data-table-wrapper" style="max-height: 380px; display: flex; flex-direction: column;">
        <div style="overflow-y: auto; flex: 1;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 40px;"><input type="checkbox" /></th>
                <th>Project Code</th>
                <th>Project Name</th>
                <th>No. Kontrak</th>
                <th>Asset Type</th>
                <th>Unit PLN</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="table-body"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Drawer Placeholder -->
    <div id="project-drawer"></div>
  `;

  // ---- Initialize Map ----
  setTimeout(() => {
    const map = L.map('map', { zoomControl: true }).setView([-2.5, 118.0], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19
    }).addTo(map);

    // Render markers & table
    const tbody = document.getElementById('table-body');
    let rowsHtml = '';

    projectsData.forEach(p => {
      // Custom circle marker per asset type
      const marker = L.circleMarker([p.lat, p.lng], {
        radius: 7,
        fillColor: getMarkerColor(p.assetType),
        color: '#FFFFFF',
        weight: 2.5,
        fillOpacity: 0.9,
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 12px; min-width: 260px; font-family: var(--font-sans);">
          <div style="font-size: 11px; font-weight: 600; color: var(--indigo-600); margin-bottom: 4px;">${p.code}</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3;">${p.name}</div>
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px;">
            <span class="${getBadgeClass(p.status)}">${p.status}</span>
            <span style="font-size: 11px; font-weight: 600; color: var(--text-secondary);">${p.progress}%</span>
          </div>
          
          <!-- Informasi Lokasi -->
          <div style="background: var(--slate-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 8px; margin-bottom: 8px;">
            <div style="font-size: 10px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">INFORMASI LOKASI</div>
            <table style="width: 100%; font-size: 11px; color: var(--text-primary); border-collapse: collapse;">
              <tr><td style="color: var(--text-muted); padding: 2px 0; width: 35%;">Alamat</td><td style="padding: 2px 0;">: ${p.alamat || '-'}</td></tr>
              <tr><td style="color: var(--text-muted); padding: 2px 0;">Desa</td><td style="padding: 2px 0;">: ${p.desa || '-'}</td></tr>
              <tr><td style="color: var(--text-muted); padding: 2px 0;">Kelurahan</td><td style="padding: 2px 0;">: ${p.kelurahan || '-'}</td></tr>
              <tr><td style="color: var(--text-muted); padding: 2px 0;">Kecamatan</td><td style="padding: 2px 0;">: ${p.kecamatan || '-'}</td></tr>
              <tr><td style="color: var(--text-muted); padding: 2px 0;">Kabupaten</td><td style="padding: 2px 0;">: ${p.kabupaten || '-'}</td></tr>
              <tr><td style="color: var(--text-muted); padding: 2px 0;">Koordinat</td><td style="padding: 2px 0;">: <span style="font-family: var(--font-mono, monospace);">${p.lat}, ${p.lng}</span></td></tr>
            </table>
          </div>

          <div style="font-size: 11px; color: var(--text-muted);">RUPTL: ${p.ruptlCode} · ${p.assetType}</div>
        </div>
      `, { className: 'custom-popup' });

      // Table row
      rowsHtml += `
        <tr data-id="${p.id}">
          <td><input type="checkbox" /></td>
          <td><span style="font-family: var(--font-mono, monospace); font-size: 12px; color: var(--indigo-600); font-weight: 500;">${p.code}</span></td>
          <td class="cell-title" style="max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${p.name}">${p.name}</td>
          <td><span style="font-family: var(--font-mono, monospace); font-size: 12px; font-weight: 500; color: var(--text-secondary);">${p.contractRef}</span></td>
          <td>
            <span style="display: inline-flex; align-items: center; gap: 6px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${getMarkerColor(p.assetType)}; flex-shrink: 0;"></span>
              ${p.assetType}
            </span>
          </td>
          <td>${p.unitPln}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="progress-bar-track" style="width: 80px;">
                <div class="progress-bar-fill ${getProgressClass(p.status)}" style="width: ${p.progress}%;"></div>
              </div>
              <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary); min-width: 32px;">${p.progress}%</span>
            </div>
          </td>
          <td><span class="${getBadgeClass(p.status)}">${p.status}</span></td>
          <td>
            <div class="row-action" style="display: flex; gap: 4px;">
              <a href="#/monitoring/${p.id}" class="btn btn-ghost btn-sm" style="color: var(--primary); font-weight: 500;">
                <i class="ph ph-eye" style="font-size: 14px;"></i> Detail
              </a>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;

    // Row click → show drawer preview
    tbody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('input') || e.target.closest('a')) return;
        const id = parseInt(row.dataset.id);
        const project = projectsData.find(p => p.id === id);
        if (project) showDrawer(project);
      });
    });
  }, 50);
}

// ---- Project Detail Drawer ----
function showDrawer(project) {
  let drawerContainer = document.getElementById('project-drawer');
  if (!drawerContainer) return;

  drawerContainer.innerHTML = `
    <div class="drawer-backdrop" id="drawer-backdrop"></div>
    <div class="drawer-panel">
      <div class="drawer-header">
        <div>
          <span style="font-size: 11px; font-weight: 600; color: var(--indigo-600); font-family: var(--font-mono, monospace);">${project.code}</span>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${project.name}</h2>
        </div>
        <button class="btn btn-ghost btn-icon" id="close-drawer" style="color: var(--text-muted);">
          <i class="ph ph-x" style="font-size: 18px;"></i>
        </button>
      </div>
      <div class="drawer-body">
        <!-- Meta Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Status</div>
            <span class="${getBadgeClass(project.status)}">${project.status}</span>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Progress</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="progress-bar-track" style="width: 100px;">
                <div class="progress-bar-fill ${getProgressClass(project.status)}" style="width: ${project.progress}%;"></div>
              </div>
              <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">${project.progress}%</span>
            </div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Asset Type</div>
            <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 500;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${getMarkerColor(project.assetType)};"></span>
              ${project.assetType}
            </span>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Unit PLN</div>
            <span style="font-weight: 500;">${project.unitPln}</span>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Contract</div>
            <span style="font-weight: 500;">${project.contractRef}</span>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">RUPTL Code</div>
            <span style="font-family: var(--font-mono, monospace); font-weight: 500;">${project.ruptlCode}</span>
          </div>
          <div style="grid-column: span 2;">
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Region</div>
            <span style="font-weight: 500;">${project.region}</span>
          </div>
        </div>

        <!-- Description -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Deskripsi</div>
          <div style="padding: 12px; background: var(--slate-50); border-radius: var(--radius-lg); border: 1px solid var(--border-light); font-size: 13px; color: var(--text-secondary); line-height: 1.6; min-height: 80px;">
            Project ${project.name} merupakan bagian dari RUPTL ${project.ruptlCode} yang dikelola oleh ${project.unitPln}. Klik untuk mengedit deskripsi...
          </div>
        </div>

        <!-- Activity -->
        <div>
          <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px;">Aktivitas Terbaru</div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 12px;">
              <div class="avatar avatar-primary" style="width: 28px; height: 28px; font-size: 10px; flex-shrink: 0;">AD</div>
              <div>
                <div style="font-size: 13px; color: var(--text-primary);"><span style="font-weight: 600;">Admin</span> mengubah status menjadi <span style="font-weight: 600;">${project.status}</span></div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">2 jam yang lalu</div>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <div class="avatar" style="width: 28px; height: 28px; font-size: 10px; flex-shrink: 0; background: var(--success-light); color: var(--success-text); border: 1px solid #A7F3D0;">SY</div>
              <div>
                <div style="font-size: 13px; color: var(--text-primary);"><span style="font-weight: 600;">System</span> memperbarui progress ke ${project.progress}%</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">5 jam yang lalu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close handlers
  document.getElementById('close-drawer').addEventListener('click', closeDrawer);
  document.getElementById('drawer-backdrop').addEventListener('click', closeDrawer);
}

function closeDrawer() {
  const drawerContainer = document.getElementById('project-drawer');
  if (drawerContainer) drawerContainer.innerHTML = '';
}
