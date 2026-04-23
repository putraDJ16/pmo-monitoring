import { rolesData } from '../../data/user-data.js';

export function renderRolesTab(container) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5);">
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">Group Akses & Permissions</h3>
        <p style="font-size: 13px; color: var(--text-muted);">Atur batasan wewenang (RBAC) pada masing-masing group role.</p>
      </div>
      <button class="btn btn-primary">
        <i class="ph ph-shield-plus"></i> Tambah Role Baru
      </button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
      ${rolesData.map(r => `
        <div class="card card-padding role-card" data-id="${r.id}" style="cursor: pointer; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 32px; height: 32px; background: var(--indigo-50); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--indigo-600);">
                <i class="ph ph-shield-check" style="font-size: 18px;"></i>
              </div>
              <h4 style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0;">${r.name}</h4>
            </div>
            <button class="btn btn-ghost btn-icon" style="margin: -8px -8px 0 0;"><i class="ph ph-dots-three-vertical"></i></button>
          </div>
          
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; min-height: 40px;">${r.description}</p>
          
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
            ${r.permissions.slice(0, 3).map(p => `
              <span style="background: var(--slate-100); color: var(--slate-600); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-family: var(--font-mono, monospace);">
                ${p}
              </span>
            `).join('')}
            ${r.permissions.length > 3 ? `<span style="background: var(--slate-100); color: var(--slate-500); padding: 2px 6px; border-radius: 4px; font-size: 11px;">+${r.permissions.length - 3}</span>` : ''}
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); font-weight: 500;">
              <i class="ph ph-users"></i> ${r.userCount} Pegawai
            </div>
            <div style="font-size: 13px; font-weight: 600; color: var(--primary);">Edit Akses <i class="ph ph-arrow-right"></i></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Role Config Drawer Anchor -->
    <div id="role-drawer-container"></div>
  `;

  // Bind click event to cards
  container.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const role = rolesData.find(r => r.id === id);
      if (role) showRoleDrawer(container, role);
    });
  });
}

function showRoleDrawer(parent, role) {
  const drawerContainer = parent.querySelector('#role-drawer-container');
  
  // Dummy permissions list for matrix
  const permissionGroups = [
    { title: 'Project Management', perms: [{ id: 'read:project', label: 'Lihat Project', checked: role.permissions.includes('read:project') || role.permissions.includes('read:all') }, { id: 'write:project', label: 'Buat/Edit Project', checked: role.permissions.includes('write:project') || role.permissions.includes('write:all') }] },
    { title: 'Task & Kanban', perms: [{ id: 'read:task', label: 'Lihat Task', checked: true }, { id: 'write:task', label: 'Buat/Edit Task', checked: role.permissions.includes('write:task') || role.permissions.includes('write:all') }] },
    { title: 'System Access', perms: [{ id: 'manage:users', label: 'Kelola User', checked: role.permissions.includes('manage:users') || role.permissions.includes('write:all') }, { id: 'manage:roles', label: 'Kelola Role', checked: role.permissions.includes('manage:roles') || role.permissions.includes('write:all') }] }
  ];

  drawerContainer.innerHTML = `
    <div class="drawer-backdrop" id="role-drawer-backdrop"></div>
    <div class="drawer-panel" id="role-drawer" style="width: 500px;">
      <div class="drawer-header" style="background: var(--slate-50);">
        <div>
          <div style="font-size: 11px; font-weight: 600; color: var(--indigo-600); margin-bottom: 2px;">EDIT PERMISSIONS</div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">${role.name}</h2>
        </div>
        <button class="btn btn-ghost btn-icon" id="btn-close-drawer"><i class="ph ph-x" style="font-size: 18px;"></i></button>
      </div>

      <div class="drawer-body" style="padding: 0;">
        <div style="padding: var(--space-5); border-bottom: 1px solid var(--border-light);">
          <label class="form-label">Deskripsi Role</label>
          <textarea class="form-input" rows="2">${role.description}</textarea>
        </div>

        <div style="padding: var(--space-5);">
          <h4 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">Matrix Permission Akses</h4>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${permissionGroups.map(group => `
              <div>
                <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--border-light);">${group.title}</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${group.perms.map(p => `
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                      <input type="checkbox" ${p.checked ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--primary);" />
                      <span style="font-size: 14px; color: var(--text-primary);">${p.label}</span>
                      <span style="margin-left: auto; font-family: var(--font-mono, monospace); font-size: 10px; color: var(--text-muted); background: var(--slate-100); padding: 2px 6px; border-radius: 4px;">${p.id}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 8px; background: white; margin-top: auto;">
        <button class="btn btn-secondary" id="btn-cancel-drawer">Batal</button>
        <button class="btn btn-primary">Simpan Perubahan</button>
      </div>
    </div>
  `;

  const closeFn = () => drawerContainer.innerHTML = '';
  drawerContainer.querySelector('#btn-close-drawer').addEventListener('click', closeFn);
  drawerContainer.querySelector('#btn-cancel-drawer').addEventListener('click', closeFn);
  drawerContainer.querySelector('#role-drawer-backdrop').addEventListener('click', closeFn);
}
