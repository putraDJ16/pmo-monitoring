import { menusData } from '../../data/user-data.js';

export function renderMenusTab(container) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5);">
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">Struktur Menu Aplikasi</h3>
        <p style="font-size: 13px; color: var(--text-muted);">Atur urutan dan visibilitas menu sidebar untuk semua user.</p>
      </div>
      <button class="btn btn-secondary">
        <i class="ph ph-plus"></i> Tambah Menu Utama
      </button>
    </div>

    <!-- Nested List for Menus -->
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); max-width: 800px;">
      ${menusData.map(section => renderMenuNode(section, 0)).join('')}
    </div>
  `;
}

function renderMenuNode(node, depth = 0) {
  const isSection = node.type === 'section';
  const paddingLeft = depth * 24 + 16;
  const hasChildren = node.children && node.children.length > 0;

  let html = `
    <div style="display: flex; align-items: center; padding: 12px 16px; padding-left: ${paddingLeft}px; border-bottom: 1px solid var(--border-light); background: ${isSection ? 'var(--slate-50)' : 'transparent'};">
      
      <!-- Drag Handle -->
      <div style="color: var(--slate-300); cursor: grab; margin-right: 12px;">
        <i class="ph ph-dots-six-vertical" style="font-size: 16px;"></i>
      </div>

      <!-- Icon & Label -->
      <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
        ${node.icon ? `<i class="ph ${node.icon}" style="font-size: 18px; color: var(--indigo-500);"></i>` : ''}
        <span style="font-size: ${isSection ? '12px' : '14px'}; font-weight: ${isSection ? '700' : '500'}; color: ${isSection ? 'var(--text-muted)' : 'var(--text-primary)'}; text-transform: ${isSection ? 'uppercase' : 'none'}; tracking-wide;">${node.title}</span>
        ${node.path ? `<span style="font-size: 11px; font-family: var(--font-mono, monospace); color: var(--text-muted); background: var(--slate-100); padding: 2px 6px; border-radius: 4px;">${node.path}</span>` : ''}
      </div>

      <!-- Actions -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <button class="btn btn-ghost btn-icon" style="color: ${node.isVisible !== false ? 'var(--text-primary)' : 'var(--slate-300)'};" title="${node.isVisible !== false ? 'Sembunyikan' : 'Tampilkan'}">
          <i class="ph ${node.isVisible !== false ? 'ph-eye' : 'ph-eye-slash'}" style="font-size: 16px;"></i>
        </button>
        <button class="btn btn-ghost btn-icon" title="Edit Menu"><i class="ph ph-pencil-simple" style="font-size: 16px;"></i></button>
      </div>
    </div>
  `;

  if (hasChildren && node.expanded !== false) {
    node.children.forEach(child => {
      html += renderMenuNode(child, depth + 1);
    });
  }

  return html;
}
