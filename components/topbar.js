// Topbar Component — Premium SaaS style
export function renderTopbar(container) {
  container.innerHTML = `
    <!-- Left: Search -->
    <div class="topbar-search">
      <i class="ph ph-magnifying-glass search-icon"></i>
      <input type="text" placeholder="Cari project, monitoring, atau user..." />
    </div>

    <!-- Right: Actions -->
    <div class="topbar-actions">
      <!-- Add Button with dropdown -->
      <div style="position: relative;" id="add-btn-wrapper">
        <button class="btn btn-primary" id="add-quick-btn">
          <i class="ph ph-plus-bold" style="font-size: 14px;"></i>
          <span>Tambah Cepat</span>
          <i class="ph ph-caret-down" style="font-size: 12px; opacity: 0.7;"></i>
        </button>
        <div class="dropdown-menu" id="add-dropdown" style="display: none;">
          <button class="dropdown-item"><i class="ph ph-folder-plus"></i> Tambah Project</button>
          <button class="dropdown-item"><i class="ph ph-user-plus"></i> Tambah User</button>
          <button class="dropdown-item"><i class="ph ph-note-pencil"></i> Tambah Monitoring</button>
        </div>
      </div>

      <!-- Notification -->
      <button class="notif-btn">
        <i class="ph ph-bell" style="font-size: 20px;"></i>
        <span class="notif-dot"></span>
      </button>

      <!-- Profile -->
      <div class="topbar-profile">
        <div class="topbar-profile-info">
          <div class="topbar-profile-name">Admin PMO</div>
          <div class="topbar-profile-email">admin@pln.co.id</div>
        </div>
        <div class="avatar avatar-primary">AD</div>
      </div>

      <!-- Logout -->
      <button class="btn btn-secondary btn-sm">
        <i class="ph ph-sign-out" style="font-size: 14px;"></i>
        Logout
      </button>
    </div>
  `;

  // Add Quick dropdown toggle
  const addBtn = container.querySelector('#add-quick-btn');
  const addDropdown = container.querySelector('#add-dropdown');
  
  addBtn.addEventListener('click', () => {
    const isOpen = addDropdown.style.display !== 'none';
    addDropdown.style.display = isOpen ? 'none' : 'block';
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!container.querySelector('#add-btn-wrapper').contains(e.target)) {
      addDropdown.style.display = 'none';
    }
  });
}
