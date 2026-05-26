(function () {
  const style = document.createElement('style');
  style.textContent = `
    #auditor-edit-btn {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
      background: rgba(245,166,35,0.12);
      border: 1px solid rgba(245,166,35,0.35);
      color: #F5A623;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 0.5rem 1.1rem;
      border-radius: 999px;
      cursor: pointer;
      font-family: 'Segoe UI', system-ui, sans-serif;
      letter-spacing: 0.5px;
      backdrop-filter: blur(8px);
      transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
      user-select: none;
    }
    #auditor-edit-btn:hover { background: rgba(245,166,35,0.22); }
    #auditor-edit-btn.active {
      background: rgba(0,200,150,0.15);
      border-color: rgba(0,200,150,0.4);
      color: #00C896;
    }
    #auditor-edit-notice {
      position: fixed;
      bottom: 4rem;
      right: 1.5rem;
      z-index: 9998;
      background: rgba(6,10,20,0.95);
      border: 1px solid rgba(255,255,255,0.1);
      color: #777;
      font-size: 0.72rem;
      padding: 0.4rem 0.85rem;
      border-radius: 8px;
      font-family: 'Segoe UI', system-ui, sans-serif;
      pointer-events: none;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 200ms ease, transform 200ms ease;
    }
    #auditor-edit-notice.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .auditor-editing [contenteditable="true"] {
      outline: 1px dashed rgba(245,166,35,0.3);
      border-radius: 4px;
      padding: 2px 4px;
      cursor: text;
      transition: outline 150ms ease, background 150ms ease;
    }
    .auditor-editing [contenteditable="true"]:hover {
      outline: 1px dashed rgba(245,166,35,0.6);
      background: rgba(245,166,35,0.04);
    }
    .auditor-editing [contenteditable="true"]:focus {
      outline: 2px solid rgba(245,166,35,0.65);
      background: rgba(245,166,35,0.06);
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'auditor-edit-btn';
  btn.textContent = '✏️  Editar';
  document.body.appendChild(btn);

  const notice = document.createElement('div');
  notice.id = 'auditor-edit-notice';
  notice.textContent = 'Haz clic en cualquier texto para editarlo';
  document.body.appendChild(notice);

  const SELECTORS = [
    /* videos / piezas */
    '.video-title', '.video-hook', '.video-desc', '.video-verdict',
    '.video-num', '.nuevo-title', '.nuevo-why', '.nuevo-desc', '.nuevo-formato',
    /* secciones */
    '.sec-title', '.sec-desc', '.sec-label',
    /* pilares */
    '.pilar-name', '.pilar-desc',
    /* gráficas */
    '.grafica-title', '.grafica-desc', '.grafica-tipo', '.grafica-num',
    /* funnel / campaña */
    '.funnel-title', '.funnel-sub', '.funnel-item',
    /* conjuntos */
    '.conjunto-name', '.conjunto-semana',
    /* configuración */
    '.config-val', '.copy-field-val', '.overview-val', '.overview-note',
    /* recomendaciones */
    '.rec-title', '.rec-desc', '.step-text',
    /* calendario */
    '.post-title', '.post-sub', '.semana-title', '.semana-focus',
    /* plataformas */
    '.plat-nm', '.plat-handle', '.plat-list li',
    /* hashtags */
    '.htag',
    /* hero */
    '.hero-sub',
    /* técnico */
    '.tecnico-title', '.tecnico-list li',
    /* auditoría / insights */
    '.insight-text', '.opp-title', '.opp-desc', '.action-text',
    '.score-desc', '.hallazgo-text', '.rec-text',
    /* cards generales */
    '.card h2', '.card p',
    /* hero stats */
    '.stat-pill .lbl',
    /* footer */
    'footer',
  ].join(', ');

  let editing = false;

  btn.addEventListener('click', function () {
    editing = !editing;
    document.body.classList.toggle('auditor-editing', editing);

    document.querySelectorAll(SELECTORS).forEach(function (el) {
      if (el.closest('nav')) return;
      el.contentEditable = editing ? 'true' : 'false';
      if (!editing) el.removeAttribute('contenteditable');
    });

    btn.textContent = editing ? '✓  Listo' : '✏️  Editar';
    btn.classList.toggle('active', editing);
    notice.classList.toggle('visible', editing);
  });
})();
