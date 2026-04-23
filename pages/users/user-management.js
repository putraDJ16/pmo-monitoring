import { renderUsersTab } from './tab-users.js';
import { renderRolesTab } from './tab-roles.js';
import { renderMenusTab } from './tab-menus.js';

export function renderUserManagement(container) {
  let activeTab = 'users'; // default tab: 'users', 'roles', 'menus'

  container.innerHTML = `
    <!-- Page Header -->
    <div style="margin-bottom: var(--space-6);">
      <div class="breadcrumb">
        <a href="#/">Beranda</a>
        <span class="separator">/</span>
        <span style="color: var(--text-secondary); font-weight: 500;">User Management</span>
      </div>
      <h1 class="page-title">User Management</h1>
      <p class="page-subtitle">Kelola akses pengguna, aturan role, dan hierarki menu aplikasi.</p>
    </div>

    <!-- Tabbed Navigation -->
    <div class="tabs-wrapper" style="border-bottom: 1px solid var(--border); margin-bottom: var(--space-6); display: flex; gap: var(--space-6);">
      <button class="tab-btn active" data-tab="users">List Pegawai</button>
      <button class="tab-btn" data-tab="roles">Group & Role Akses</button>
      <button class="tab-btn" data-tab="menus">Konfigurasi Menu</button>
    </div>

    <!-- Tab Content Area -->
    <div id="tab-content" style="min-height: 400px;"></div>
  `;

  // Custom inline styles for Tabs (instead of bloating components.css further)
  const style = document.createElement('style');
  style.innerHTML = `
    .tab-btn {
      padding: var(--space-3) 0;
      color: var(--text-secondary);
      font-weight: 500;
      font-size: var(--text-sm);
      border-bottom: 2px solid transparent;
      transition: all var(--transition-fast);
      margin-bottom: -1px;
    }
    .tab-btn:hover { color: var(--text-primary); }
    .tab-btn.active {
      color: var(--primary);
      font-weight: 600;
      border-bottom-color: var(--primary);
    }
  `;
  container.appendChild(style);

  const tabContent = container.querySelector('#tab-content');
  const tabBtns = container.querySelectorAll('.tab-btn');

  function switchTab(tabId) {
    activeTab = tabId;
    
    // Update button states
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Render corresponding component
    tabContent.innerHTML = '';
    if (tabId === 'users') renderUsersTab(tabContent);
    else if (tabId === 'roles') renderRolesTab(tabContent);
    else if (tabId === 'menus') renderMenusTab(tabContent);
  }

  // Attach click handlers
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Initial render
  switchTab(activeTab);
}
