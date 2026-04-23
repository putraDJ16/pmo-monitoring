// Sidebar Component — Premium SaaS style (matching ZOHO)
export function renderSidebar(container) {
  const sidebar = container.closest('.sidebar');
  let isCollapsed = false;
  
  const menuItems = [
    { type: 'item', name: 'Beranda', icon: 'ph-house', route: '/' },
    { type: 'section', label: 'MODUL' },
    { type: 'item', name: 'User & Role', icon: 'ph-users', route: '/users' },
    { type: 'item', name: 'Dashboard', icon: 'ph-chart-bar', route: '/dashboard' },
    { 
      type: 'group', name: 'Monitoring', icon: 'ph-map-trifold',
      children: [
        { name: 'Peta & List Project', route: '/monitoring' },
      ]
    },
    { type: 'section', label: 'LAINNYA' },
    { type: 'item', name: 'Pengaturan', icon: 'ph-gear', route: '/settings' },
  ];

  function getActiveRoute() {
    return window.location.hash.slice(1) || '/monitoring';
  }

  function isRouteActive(route) {
    const current = getActiveRoute();
    if (route === '/') return current === '/';
    return current.startsWith(route);
  }

  function render() {
    let html = '';

    menuItems.forEach((item, idx) => {
      if (item.type === 'section') {
        html += `<div class="nav-section-label">${item.label}</div>`;
        return;
      }

      if (item.type === 'item') {
        const active = isRouteActive(item.route) ? 'active' : '';
        html += `
          <a href="#${item.route}" class="nav-item ${active}" data-route="${item.route}">
            <i class="ph ${item.icon} nav-icon"></i>
            <span class="nav-label">${item.name}</span>
          </a>
        `;
        return;
      }

      if (item.type === 'group') {
        const isChildActive = item.children.some(c => isRouteActive(c.route));
        const isOpen = isChildActive; // Auto-open if child active
        html += `
          <div class="nav-group" data-group="${idx}">
            <div class="nav-item ${isChildActive ? 'active' : ''}" data-toggle="${idx}">
              <i class="ph ${item.icon} nav-icon"></i>
              <span class="nav-label">${item.name}</span>
              <i class="ph ph-caret-down nav-chevron ${isOpen ? 'rotated' : ''}"></i>
            </div>
            <div class="nav-submenu ${isOpen ? 'open' : ''}">
              ${item.children.map(child => {
                const active = isRouteActive(child.route) ? 'active' : '';
                return `
                  <a href="#${child.route}" class="nav-sub-item ${active}">
                    <i class="ph ph-caret-right" style="font-size:10px; opacity:0.5;"></i>
                    ${child.name}
                  </a>
                `;
              }).join('')}  
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = `<nav class="nav-section sidebar-scroll">${html}</nav>`;

    // Submenu toggle handlers
    container.querySelectorAll('[data-toggle]').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const groupIdx = toggle.dataset.toggle;
        const submenu = container.querySelector(`[data-group="${groupIdx}"] .nav-submenu`);
        const chevron = toggle.querySelector('.nav-chevron');
        if (submenu) {
          submenu.classList.toggle('open');
          chevron?.classList.toggle('rotated');
        }
      });
    });
  }

  // Sidebar header 
  const headerEl = sidebar.querySelector('.sidebar-header');
  headerEl.innerHTML = `
    <div class="logo-area">
      <div class="logo-icon">⚡</div>
      <span class="logo-text">PMO Monitoring</span>
    </div>
    <button class="sidebar-toggle" title="Toggle Sidebar">
      <i class="ph ph-caret-left" style="font-size: 14px;"></i>
    </button>
  `;

  // Toggle collapse
  headerEl.querySelector('.sidebar-toggle').addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('collapsed', isCollapsed);
    const icon = headerEl.querySelector('.sidebar-toggle i');
    icon.className = isCollapsed ? 'ph ph-caret-right' : 'ph ph-caret-left';
    icon.style.fontSize = '14px';
  });

  // Initial render
  render();

  // Re-render on route change
  window.addEventListener('hashchange', render);
}
