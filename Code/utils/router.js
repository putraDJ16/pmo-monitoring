import { renderMonitoringMap } from '../pages/monitoring/monitoring-map.js';
import { renderMonitoringDetail } from '../pages/monitoring/monitoring-detail.js';
import { renderUserManagement } from '../pages/users/user-management.js';

export function setupRouter(container) {
  function handleRoute() {
    let path = window.location.hash.slice(1) || '/monitoring'; // default to monitoring map!
    container.innerHTML = '';
    
    // Quick routing
    if (path.match(/^\/monitoring\/\d+$/)) {
      const projectId = path.split('/').pop();
      renderMonitoringDetail(container, projectId);
    } else if (path.startsWith('/monitoring')) {
      renderMonitoringMap(container);
    } else if (path.startsWith('/users')) {
      renderUserManagement(container);
    } else {
      container.innerHTML = `
        <div class="p-8 text-center text-gray-500 mt-20">
          <i class="ph ph-cone text-4xl mb-4 text-warning"></i>
          <h2 class="text-xl font-semibold mb-2">Halaman Sedang Dibangun</h2>
          <p>Routing untuk ${path} belum diimplementasi (fokus ke Peta & List Project dulu).</p>
        </div>
      `;
    }
  }

  window.addEventListener('hashchange', handleRoute);
  // Initial load
  handleRoute();
}
