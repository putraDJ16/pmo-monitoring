import { usersData, rolesData } from '../../data/user-data.js';

export function renderUsersTab(container) {
  const activeCount = usersData.filter(u => u.status === 'Aktif').length;

  container.innerHTML = `
    <!-- Top Actions -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
      <div class="filter-bar" style="padding: var(--space-2) var(--space-3); width: 100%; max-width: 600px;">
        <div class="filter-search" style="flex: 1;">
          <i class="ph ph-magnifying-glass search-icon"></i>
          <input type="text" placeholder="Cari nama, email, atau NIP..." style="width: 100%;" />
        </div>
        <div style="width: 1px; height: 24px; background: var(--border); margin: 0 var(--space-2);"></div>
        <select class="filter-select" style="border: none; box-shadow: none; background: transparent;">
          <option>Semua Status</option>
          <option>Aktif</option>
          <option>Inaktif</option>
        </select>
      </div>
      <div>
        <button class="btn btn-primary" id="btn-add-user">
          <i class="ph ph-user-plus"></i> Tambah Pegawai
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="data-table-wrapper" style="margin-bottom: var(--space-4);">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;"><input type="checkbox" /></th>
            <th>Nama Pegawai</th>
            <th>Role Akses</th>
            <th>Divisi/Unit</th>
            <th>Status</th>
            <th>Last Login</th>
            <th style="text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${usersData.map(u => `
            <tr>
              <td><input type="checkbox" /></td>
              <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div class="avatar" style="background: ${getAvatarColor(u.initials)}; color: white;">${u.initials}</div>
                  <div>
                    <div style="font-weight: 600; color: var(--text-primary); font-size: 14px;">${u.name}</div>
                    <div style="color: var(--text-muted); font-size: 12px;">${u.email}</div>
                  </div>
                </div>
              </td>
              <td><span style="font-weight: 500; color: var(--indigo-600);">${u.role}</span></td>
              <td>${u.division}</td>
              <td>
                <span class="badge ${u.status === 'Aktif' ? 'badge-success' : 'badge-neutral'}">${u.status}</span>
              </td>
              <td style="color: var(--text-muted); font-size: 12px;">${u.lastLogin}</td>
              <td style="text-align: right;">
                <div class="row-action" style="display: flex; gap: 4px; justify-content: flex-end;">
                  <button class="btn btn-ghost btn-sm" title="Edit Pegawai"><i class="ph ph-pencil-simple" style="font-size: 16px;"></i></button>
                  <button class="btn btn-ghost btn-sm" title="Reset Password" style="color: var(--warning);"><i class="ph ph-key" style="font-size: 16px;"></i></button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: var(--text-sm);">
      <div>Menampilkan ${usersData.length} pegawai (${activeCount} aktif)</div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary btn-sm" disabled>Prev</button>
        <button class="btn btn-primary btn-sm">1</button>
        <button class="btn btn-secondary btn-sm" disabled>Next</button>
      </div>
    </div>

    <!-- Add User Modal Anchor -->
    <div id="user-modal-container"></div>
  `;

  // Bind Add User Button
  container.querySelector('#btn-add-user').addEventListener('click', () => showAddUserModal(container));
}

function getAvatarColor(initials) {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'];
  const charCode = initials.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
}

function showAddUserModal(parent) {
  const modalContainer = parent.querySelector('#user-modal-container');
  
  modalContainer.innerHTML = `
    <div class="modal-backdrop" id="user-modal-backdrop">
      <div class="modal-content" id="user-modal" style="width: 500px;">
        <div class="modal-header">
          <h3 class="modal-title">Tambah Pegawai Baru</h3>
          <button class="btn btn-ghost btn-icon" id="btn-close-modal"><i class="ph ph-x" style="font-size: 18px;"></i></button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label class="form-label">Nama Lengkap</label>
            <input type="text" class="form-input" placeholder="Masukkan nama..." />
          </div>
          <div>
            <label class="form-label">Email PLN</label>
            <input type="email" class="form-input" placeholder="email@pln.co.id" />
          </div>
          <div>
            <label class="form-label">Divisi / Unit</label>
            <input type="text" class="form-input" placeholder="Contoh: UIP JBB" />
          </div>
          <div>
            <label class="form-label">Role Akses</label>
            <select class="form-input">
              ${rolesData.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="btn-cancel">Batal</button>
          <button class="btn btn-primary">Simpan Pegawai</button>
        </div>
      </div>
    </div>
  `;

  const closeFn = () => modalContainer.innerHTML = '';
  modalContainer.querySelector('#btn-close-modal').addEventListener('click', closeFn);
  modalContainer.querySelector('#btn-cancel').addEventListener('click', closeFn);
  modalContainer.querySelector('#user-modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'user-modal-backdrop') closeFn();
  });
}
