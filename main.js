import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';
import { setupRouter } from './utils/router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render App Shell
  renderSidebar(document.getElementById('sidebar-nav'));
  renderTopbar(document.getElementById('topbar'));
  
  // Initialize Router
  setupRouter(document.getElementById('view-container'));
});
