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

export function renderMonitoringDetail(container, projectId) {
  const project = projectsData.find(p => p.id === parseInt(projectId));
  if (!project) {
    container.innerHTML = '<div style="padding: 20px;">Project tidak ditemukan.</div>';
    return;
  }

  // --- State for selected "Tanah" (Tower) ---
  let selectedLandId = project.landSurvey ? project.landSurvey[0].id : null;

  function getLandContent() {
    const land = project.landSurvey ? project.landSurvey.find(l => l.id === selectedLandId) : null;
    
    // Default fallback if no landSurvey data exists
    const displayLand = land || {
      id: 'Umum', status: 'Masih Berjalan', progress: 45, inventarisasi: 100, musyawarah: 80, pembebasan: 45, erection: 15, sertifikasi: 0,
      alamat: project.alamat, desa: project.desa, lat: project.lat, lng: project.lng
    };

    return `
      <!-- 1. Survey Tanah Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--indigo-100); color: var(--indigo-600); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">1</div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Survey Tanah</h3>
        </div>
        ${project.assetType === 'Transmisi' ? `
          <button class="btn btn-sm btn-ghost" style="color: var(--indigo-600); font-weight: 600;">
            <i class="ph ph-plus-circle"></i> Tambah Data Tanah (Tower)
          </button>
        ` : ''}
      </div>

      ${project.assetType === 'Transmisi' && project.landSurvey ? `
        <!-- Multi-Entry for Transmisi -->
        <div style="margin-bottom: 20px; display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px;" id="tower-selector">
          ${project.landSurvey.map(l => `
            <div class="tower-opt ${l.id === selectedLandId ? 'active' : ''}" data-id="${l.id}">
              ${l.id} - ${l.status}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="padding: 24px; background: white; border: 1px solid var(--border-light); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
        
        <div style="margin-bottom: 36px;">
          <div style="font-size: 14px; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px;">Status Survey Tanah ${project.assetType === 'Transmisi' ? `(Tower ${displayLand.id})` : ''}</div>
          <div style="display: flex; gap: 12px;">
            <div class="status-survey-btn ${displayLand.status === 'Belum Dimulai' ? 'active belum-dimulai' : ''}">Belum dimulai</div>
            <div class="status-survey-btn ${displayLand.status === 'Masih Berjalan' ? 'active masih-berjalan' : ''}">Masih berjalan</div>
            <div class="status-survey-btn ${displayLand.status === 'Selesai' ? 'active selesai' : ''}">Selesai</div>
          </div>
        </div>

        <div>
          <div style="font-size: 14px; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px;">Kriteria Tanah (Progress: ${displayLand.progress}%)</div>
          <div class="kriteria-chart">
            <!-- 1. Inventarisasi -->
            <div class="chart-row">
              <div class="chart-label">Inventarisasi</div>
              <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${displayLand.inventarisasi}%; background: var(--indigo-500);">${displayLand.inventarisasi}%</div>
              </div>
              <div class="chart-tooltip">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">
                  <i class="ph ph-map-pin-line" style="font-size: 20px; color: var(--indigo-600);"></i>
                  <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Detail Inventarisasi ${project.assetType === 'Transmisi' ? `(${displayLand.id})` : ''}</div>
                </div>
                <table class="tooltip-table">
                  <tr><td>Ruptl Code</td><td style="font-family: var(--font-mono, monospace); font-weight: 600; color: var(--indigo-600);">: ${project.ruptlCode}</td></tr>
                  <tr><td colspan="2" style="font-weight: 700; color: var(--text-primary); padding-top: 12px; padding-bottom: 4px;">Informasi Lokasi:</td></tr>
                  <tr><td>Alamat</td><td>: ${displayLand.alamat || '-'}</td></tr>
                  <tr><td>Desa</td><td>: ${displayLand.desa || '-'}</td></tr>
                  <tr><td>Latitude</td><td style="font-family: var(--font-mono, monospace);">: ${displayLand.lat}</td></tr>
                  <tr><td>Longitude</td><td style="font-family: var(--font-mono, monospace);">: ${displayLand.lng}</td></tr>
                </table>
              </div>
            </div>

            <!-- 2. Musyawarah -->
            <div class="chart-row">
              <div class="chart-label">Musyawarah</div>
              <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${displayLand.musyawarah}%; background: var(--indigo-400);">${displayLand.musyawarah}%</div>
              </div>
            </div>

            <!-- 3. Pembebasan -->
            <div class="chart-row">
              <div class="chart-label">Pembebasan</div>
              <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${displayLand.pembebasan}%; background: var(--indigo-300);">${displayLand.pembebasan}%</div>
              </div>
            </div>

            <!-- 4. Erection -->
            <div class="chart-row">
              <div class="chart-label">Erection</div>
              <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${displayLand.erection}%; background: var(--indigo-200);">${displayLand.erection}%</div>
              </div>
            </div>

            <!-- 5. Sertifikasi -->
            <div class="chart-row">
              <div class="chart-label">Sertifikasi</div>
              <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${displayLand.sertifikasi}%; background: var(--indigo-100); color: var(--indigo-700);">${displayLand.sertifikasi}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function refresh() {
    container.innerHTML = `
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
        <div>
          <div class="breadcrumb" style="margin-bottom: 8px;">
            <a href="#/">Beranda</a>
            <span class="separator">/</span>
            <a href="#/monitoring">Monitoring</a>
            <span class="separator">/</span>
            <span style="color: var(--text-secondary); font-weight: 500;">Detail</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <a href="#/monitoring" class="btn btn-ghost btn-icon" style="color: var(--text-muted);">
              <i class="ph ph-arrow-left" style="font-size: 20px;"></i>
            </a>
            <div>
              <div style="font-size: 12px; font-weight: 600; color: var(--indigo-600); font-family: var(--font-mono, monospace);">${project.code}</div>
              <h1 class="page-title" style="margin-top: 2px;">${project.name}</h1>
            </div>
          </div>
        </div>
        <div>
          <button class="btn btn-primary" style="background: var(--indigo-600);">
            <i class="ph ph-pencil-simple" style="font-size: 14px;"></i> Edit Project
          </button>
        </div>
      </div>
      
      <style>
        .detail-card { background: white; border-radius: var(--radius-xl); border: 1px solid var(--border); box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: 24px; }
        .detail-card-body { padding: 24px; }
        .detail-tabs { display: flex; gap: 24px; border-bottom: 1px solid var(--border); padding: 0 24px; background: white; }
        .detail-tab { padding: 16px 0; font-size: 14px; font-weight: 600; color: var(--text-muted); background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: color 0.2s; }
        .detail-tab.active { color: var(--indigo-600); border-bottom-color: var(--indigo-600); }
        .tab-content { display: none; padding: 24px; }
        .tab-content.active { display: block; }
        
        .status-survey-btn { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; background: var(--slate-100); color: var(--text-secondary); border: 1px solid transparent; }
        .status-survey-btn.active.masih-berjalan { background: var(--info-light); color: var(--info-text); border-color: #BAE6FD; }
        .status-survey-btn.active.selesai { background: var(--success-light); color: var(--success-text); border-color: #A7F3D0; }
        .status-survey-btn.active.belum-dimulai { background: var(--warning-light); color: var(--warning-text); border-color: #FDE047; }
        
        .tower-opt { padding: 8px 16px; background: white; color: var(--text-secondary); border: 1px solid var(--border); border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .tower-opt.active { background: var(--indigo-50); color: var(--indigo-700); border-color: var(--indigo-200); }
        .tower-opt:hover:not(.active) { background: var(--slate-50); border-color: var(--slate-300); }

        .kriteria-chart { display: flex; flex-direction: column-reverse; gap: 16px; margin-top: 24px; max-width: 800px; }
        .chart-row { display: flex; align-items: center; gap: 16px; position: relative; }
        .chart-label { width: 120px; font-size: 13px; font-weight: 600; color: var(--text-secondary); text-align: right; }
        .chart-bar-bg { flex: 1; background: var(--slate-100); height: 36px; border-radius: 6px; position: relative; }
        .chart-bar-fill { background: var(--indigo-500); height: 100%; border-radius: 6px; display: flex; align-items: center; padding: 0 12px; color: white; font-size: 12px; font-weight: 600; }
        
        .chart-tooltip { display: none; position: absolute; left: 140px; bottom: 48px; background: white; border: 1px solid var(--border); box-shadow: var(--shadow-xl); padding: 16px; border-radius: var(--radius-lg); z-index: 100; width: 320px; pointer-events: none; }
        .chart-row:hover .chart-tooltip { display: block; }
        .tooltip-table { width: 100%; border-collapse: collapse; }
        .tooltip-table td { padding: 4px 0; font-size: 12px; color: var(--text-primary); }
        .tooltip-table td:first-child { color: var(--text-muted); width: 90px; }
      </style>

      <div class="detail-card">
        <div class="detail-card-body" style="background: var(--slate-50); border-bottom: 1px solid var(--border);">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
            <div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Status Project</div>
              <span class="${getBadgeClass(project.status)}">${project.status}</span>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Progress Keseluruhan</div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="progress-bar-track" style="width: 100px; height: 8px;">
                  <div class="progress-bar-fill ${getProgressClass(project.status)}" style="width: ${project.progress}%; height: 100%;"></div>
                </div>
                <span style="font-weight: 700; font-size: 15px;">${project.progress}%</span>
              </div>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Asset Type</div>
              <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 14px;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${getMarkerColor(project.assetType)}; box-shadow: 0 0 0 2px white, 0 0 0 3px var(--border);"></span>
                ${project.assetType}
              </span>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Unit PLN</div>
              <div style="font-weight: 600; font-size: 14px;">${project.unitPln}</div>
            </div>
          </div>
        </div>

        <div class="detail-tabs">
          <button class="detail-tab active">Tabulasi Tanah</button>
          <button class="detail-tab">Pekerjaan Project</button>
          <button class="detail-tab">S-Curve</button>
          <button class="detail-tab">BoQ</button>
        </div>

        <div class="tab-content active" id="tab-tanah-content">
          ${getLandContent()}
        </div>
      </div>
    `;

    // --- Events ---
    container.querySelectorAll('.tower-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        selectedLandId = opt.dataset.id;
        refresh();
      });
    });
  }

  refresh();
}

