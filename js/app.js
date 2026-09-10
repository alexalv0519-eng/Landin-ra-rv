/* ==========================================================================
   JURISTECH — LÓGICA Y MODULOS INTERACTIVOS (JavaScript Vanilla ES6+)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initLegalAIDemo();
  initNotaryPipeline();
  initTitleStudyLayers();
  initSuccessionCalc();
  initARConceptViewer();
  initBlockchainSim();
  initDashboardTabs();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. CAMBIO DE MODO CLARO Y OSCURO CON PERSISTENCIA
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('juristech_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('juristech_theme', currentTheme);
      updateThemeIcon(currentTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;
  
  if (theme === 'dark') {
    // Sun icon for dark mode (click to switch to light)
    themeBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zm12.37-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"/>
      </svg>
    `;
    themeBtn.setAttribute('aria-label', 'Cambiar a Modo Claro');
  } else {
    // Moon icon for light mode (click to switch to dark)
    themeBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M12.3 2c.43 0 .77.34.73.77-.38 4.09 2.5 7.73 6.64 8.16.42.04.72.4.63.82-1.28 6.01-7.1 10.25-13.3 9.25C1.8 19.98-1.5 13.9.7 7.75 2.28 3.32 6.55 2 12.3 2z"/>
      </svg>
    `;
    themeBtn.setAttribute('aria-label', 'Cambiar a Modo Oscuro');
  }
}

/* --------------------------------------------------------------------------
   2. MENÚ NAVEGACIÓN MÓVIL
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navDrawer = document.getElementById('mobileNavDrawer');
  
  if (!menuBtn || !navDrawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking links
  const drawerLinks = navDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   3. CASO 1: ASISTENTE DE IA JURÍDICA
   -------------------------------------------------------------------------- */
const AI_RESPONSES = {
  jurisprudence: {
    title: "Análisis de Jurisprudencia: Responsabilidad Civil Médica",
    content: `<strong>Fuentes Analizadas:</strong> Corte Suprema de Justicia, Sentencia SC-2023-1120.<br>
<strong>Subregla Aplicada:</strong> La obligación del médico especialista es generalmente de medio y no de resultado, salvo estipulación contractual garantizada.<br>
<strong>Carga probatoria:</strong> Corresponde a la víctima acreditar la culpa probada del profesional y el nexo causal directo con el daño material/moral alegado.`,
    legalIssue: "Determinación de la culpa profesional médica en intervenciones de alta complejidad."
  },
  comparison: {
    title: "Comparación Normativa: Ley de Comercio Electrónico vs. Código Civil",
    content: `<strong>Criterio:</strong> Validez probatoria del documento digital frente a la escritura o documento privado impreso.<br>
<strong>Resultado:</strong> El artículo 6 de la Ley 527 otorga equivalencia funcional a los mensajes de datos siempre que garanticen autenticidad e integridad inalterada.`,
    legalIssue: "Eficacia jurídica y fuerza ejecutiva de firmas electrónicas avanzadas."
  },
  drafting: {
    title: "Esquema preliminar de Cláusula de Confidencialidad (NDA)",
    content: `<strong>Cláusula 4. Protecciones Tecnológicas:</strong> Las Partes se obligan a mantener la reserva legal de la información calificada, utilizando cifrado de extremo a extremo y autenticación multifactor.<br>
<strong>Sanción por Incumplimiento:</strong> Clausula penal pecuniaria fija equivalente a 50 SMLMV sin perjuicio de la indemnización de perjuicios.`,
    legalIssue: "Seguridad de la información confidencial en negociaciones tecnológicas."
  }
};

function initLegalAIDemo() {
  const select = document.getElementById('aiPromptSelect');
  const outputBox = document.getElementById('aiOutputBox');
  const issueText = document.getElementById('aiIssueText');
  const executeBtn = document.getElementById('aiExecuteBtn');

  if (!select || !outputBox || !executeBtn) return;

  executeBtn.addEventListener('click', () => {
    const key = select.value;
    const data = AI_RESPONSES[key];
    if (!data) return;

    outputBox.style.opacity = '0.5';
    outputBox.innerHTML = '<p><em>Sintetizando razonamiento jurídico con modelos de procesamiento del lenguaje legal...</em></p>';

    setTimeout(() => {
      outputBox.style.opacity = '1';
      outputBox.innerHTML = `
        <h4 style="font-size: 1rem; color: var(--lasalle-gold); margin-bottom: 0.75rem;">${data.title}</h4>
        <div style="font-size: 0.88rem; line-height: 1.6; color: var(--text-main);">${data.content}</div>
      `;
      if (issueText) {
        issueText.textContent = data.legalIssue;
      }
    }, 400);
  });
}

/* --------------------------------------------------------------------------
   4. CASO 2: DERECHO NOTARIAL & FLUJO PIPELINE
   -------------------------------------------------------------------------- */
const NOTARY_STEPS_DATA = [
  { step: 1, title: "1. Recepción y Minuta", desc: "El usuario o abogado radique el borrador del acto ante la notaría para inicio de trámite." },
  { step: 2, title: "2. Estudio de Títulos", desc: "Verificación de la tradición previa (20 años), tradición sin vicios de nulidad absoluta o relativa." },
  { step: 3, title: "3. Control de Legalidad", desc: "Examen notarial del cumplimiento estricto de requisitos constitucionales, tributarios y legales." },
  { step: 4, title: "4. Otorgamiento y Firma", desc: "Lectura formal de la escritura pública y suscripción biométrica/manuscrita de los comparecientes." },
  { step: 5, title: "5. Registro e Inscripción", desc: "Expedición de copias auténticas e inscripción formal ante la Oficina de Registro de Instrumentos Públicos." }
];

function initNotaryPipeline() {
  const steps = document.querySelectorAll('.pipeline-step');
  const detailBox = document.getElementById('notaryStepDetail');
  const chips = document.querySelectorAll('.notary-act-chip');
  const selectedActText = document.getElementById('selectedActText');

  if (steps.length > 0 && detailBox) {
    steps.forEach((stepEl, idx) => {
      stepEl.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('active'));
        stepEl.classList.add('active');
        const data = NOTARY_STEPS_DATA[idx];
        detailBox.innerHTML = `
          <h4 style="color: var(--lasalle-gold); font-size: 1.05rem; margin-bottom: 0.5rem;">${data.title}</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${data.desc}</p>
        `;
      });
    });
  }

  if (chips.length > 0 && selectedActText) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedActText.textContent = `Acto Notarial Seleccionado: ${chip.getAttribute('data-act')}`;
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. CASO 3: ESTUDIO DE TÍTULOS INMOBILIARIO INTELIGENTE
   -------------------------------------------------------------------------- */
const LAYER_DETAILS = {
  matricula: {
    title: "Matrícula Inmobiliaria No. 001-492041",
    status: "Clean",
    statusText: "SIN AFECCIONES",
    desc: "Registro único del inmueble. Consta de Folio Abierto en la Oficina de Registro de Instrumentos Públicos. Activo y sin duplicidad."
  },
  tradicion: {
    title: "Estudio de Tradición (20 Años)",
    status: "Clean",
    statusText: "TRADICIÓN CONTINUA Y SANA",
    desc: "Cadena de transferencias dominicales verificada. Compraventas registradas de 2004, 2012 y 2021 cumplen el tracto sucesivo legal sin interrupciones."
  },
  gravamenes: {
    title: "Gravámenes e Hipotecas",
    status: "Warning",
    statusText: "HIPOTECA BANCARIA ACTIVA",
    desc: "Aparece inscrita Hipoteca de Primer Grado a favor de entidad financiera por valor de \$180.000.000. Requiere minuta de cancelación previa o simultánea a la venta."
  },
  limitaciones: {
    title: "Limitaciones al Dominio / Afectación",
    status: "Clean",
    statusText: "LIBRE DE EMBARGOS",
    desc: "No registra afectación a vivienda familiar ni patrimonio de familia inembargable. Cero medidas cautelares u órdenes judiciales de embargo."
  }
};

function initTitleStudyLayers() {
  const items = document.querySelectorAll('.layer-item');
  const titleDisplay = document.getElementById('layerTitleDisplay');
  const statusDisplay = document.getElementById('layerStatusDisplay');
  const descDisplay = document.getElementById('layerDescDisplay');

  if (!items.length || !titleDisplay) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const layerKey = item.getAttribute('data-layer');
      const data = LAYER_DETAILS[layerKey];
      if (!data) return;

      titleDisplay.textContent = data.title;
      statusDisplay.textContent = data.statusText;
      statusDisplay.className = `layer-status ${data.status === 'Clean' ? 'status-clean' : 'status-warning'}`;
      descDisplay.textContent = data.desc;
    });
  });
}

/* --------------------------------------------------------------------------
   6. CASO 4: SIMULADOR PEDAGÓGICO DE SUCESIONES
   -------------------------------------------------------------------------- */
function initSuccessionCalc() {
  const totalAssetsInput = document.getElementById('succAssets');
  const totalDebtsInput = document.getElementById('succDebts');
  const heirsCountInput = document.getElementById('succHeirsCount');
  const spouseCheckbox = document.getElementById('succSpouse');
  const calcBtn = document.getElementById('succCalcBtn');

  const netLiquidityText = document.getElementById('succNetLiquidity');
  const spouseShareText = document.getElementById('succSpouseShare');
  const heirShareText = document.getElementById('succHeirShare');

  if (!calcBtn || !netLiquidityText) return;

  calcBtn.addEventListener('click', () => {
    const assets = parseFloat(totalAssetsInput.value) || 0;
    const debts = parseFloat(totalDebtsInput.value) || 0;
    const heirs = parseInt(heirsCountInput.value) || 1;
    const hasSpouse = spouseCheckbox ? spouseCheckbox.checked : false;

    const netValue = Math.max(0, assets - debts);
    let spouseGain = 0;
    let poolForHeirs = netValue;

    if (hasSpouse) {
      // Gananciales 50% para el cónyuge en liquidación conyugal
      spouseGain = netValue * 0.5;
      poolForHeirs = netValue * 0.5;
    }

    const perHeirShare = heirs > 0 ? (poolForHeirs / heirs) : 0;

    netLiquidityText.textContent = `\$ ${netValue.toLocaleString('es-CO')}`;
    spouseShareText.textContent = hasSpouse ? `\$ ${spouseGain.toLocaleString('es-CO')} (50% Gananciales)` : '\$ 0 (No aplica)';
    heirShareText.textContent = `\$ ${perHeirShare.toLocaleString('es-CO')} por heredero (Total: ${heirs})`;
  });
}

/* --------------------------------------------------------------------------
   7. CASO 5: VISUALIZADOR CONCEPTUAL AR/MR
   -------------------------------------------------------------------------- */
function initARConceptViewer() {
  const arButtons = document.querySelectorAll('.ar-mode-btn');
  const hudTitle = document.getElementById('arHudTitle');
  const hudDesc = document.getElementById('arHudDesc');

  if (!arButtons.length || !hudTitle) return;

  arButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      arButtons.forEach(b => b.classList.remove('btn-primary'));
      arButtons.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const mode = btn.getAttribute('data-ar-mode');
      if (mode === 'inmueble') {
        hudTitle.textContent = 'CAPA AR: LINDEROS Y REGISTRO EN TIEMPO REAL';
        hudDesc.textContent = 'Visualización holográfica proyectada sobre estructura física. Matrícula: 001-492041 | Área: 142.5 m² | Coordenadas GPS vinculadas al catastro.';
      } else {
        hudTitle.textContent = 'CAPA AR: ESCRITURA PÚBLICA TRIDIMENSIONAL';
        hudDesc.textContent = 'Desglose holográfico de cláusulas notariales. Seleccione la cláusula de saneamiento para verificar jurisprudencia sobre evicción.';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. CASO 6: SIMULADOR DE BLOQUES BLOCKCHAIN
   -------------------------------------------------------------------------- */
function initBlockchainSim() {
  const verifyBtn = document.getElementById('bchainVerifyBtn');
  const hashOutput = document.getElementById('bchainHashOutput');

  if (!verifyBtn || !hashOutput) return;

  verifyBtn.addEventListener('click', () => {
    hashOutput.textContent = 'Calculando Hash SHA-256 de la escritura pública...';
    setTimeout(() => {
      const mockHash = '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
      hashOutput.innerHTML = `<strong>HASH SELLADO:</strong> <span style="color: var(--lasalle-gold);">${mockHash}</span><br><span style="color: var(--accent-success); font-size: 0.8rem;">✓ Inmutabilidad verificada en red de evidencia digital</span>`;
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   9. PANEL INTERACTIVO (DASHBOARD CATEGORY FILTER)
   -------------------------------------------------------------------------- */
const DASHBOARD_DATA = {
  ESTUDIAR: {
    tools: [
      { name: "Simulador de Casos Complejos", desc: "Plataforma de estudio de casos reales anonimizados para entrenamiento en argumentación." },
      { name: "Mapas Conceptuales Dinámicos", desc: "Generación automática de redes semánticas entre códigos, doctrinas y jurisprudencias." }
    ],
    prompt: "Prompt sugerido: 'Resume la línea jurisprudencial sobre daño extrapatrimonial en los últimos 5 años destacando los cambios de criterio.'"
  },
  INVESTIGAR: {
    tools: [
      { name: "Buscador Semántico de Jurisprudencia", desc: "Búsqueda conceptual en bases de datos procesales mediante incrustaciones de IA." },
      { name: "Análisis de Fuentes Normativas", desc: "Verificación de vigencia y derogatorias implícitas o explícitas en tiempo real." }
    ],
    prompt: "Prompt sugerido: 'Compara la interpretación constitucional del derecho al mínimo vital frente a suspensiones notarias.'"
  },
  ANALIZAR: {
    tools: [
      { name: "Detector de Inconsistencias Contratuales", desc: "Auditoría automatizada de contratos para detectar cláusulas abusivas o ambiguas." },
      { name: "Visualizador de Tracto Sucesivo Inmobiliario", desc: "Línea de tiempo gráfica de la tradición dominical de bienes inmuebles." }
    ],
    prompt: "Prompt sugerido: 'Evalúa la nulidad relativa de la compraventa suscrita por representante sin facultad suficiente.'"
  },
  REDACTAR: {
    tools: [
      { name: "Generador de Minutas Notariales Inteligente", desc: "Plantillas parametrizables con control de requisitos legales automáticos." },
      { name: "Asistente de Estilo y Rigor Jurídico", desc: "Corrección técnica de terminología legal, citas en formato oficial y coherencia." }
    ],
    prompt: "Prompt sugerido: 'Redacta una cláusula compromisoria de arbitraje institucional para un contrato de arrendamiento comercial.'"
  },
  SIMULAR: {
    tools: [
      { name: "Simulador de Audiencias Virtuales", desc: "Entorno interactivo para ensayar alegatos de conclusión y contrainterrogatorios." },
      { name: "Simulador de Partición de Herencia", desc: "Cálculo en vivo de acervo líquido, hijuelas de herederos y liquidación conyugal." }
    ],
    prompt: "Prompt sugerido: 'Genera las objeciones probatorias probables que formularía la contraparte durante la audiencia inicial.'"
  },
  ENSEÑAR: {
    tools: [
      { name: "Realidad Aumentada para la Docencia", desc: "Modelos 3D interactivos de expedientes, escrituras y bienes para clases de Derecho." },
      { name: "Rúbricas de Evaluación Basadas en IA", desc: "Herramienta docente para retroalimentar la claridad del razonamiento escrito de estudiantes." }
    ],
    prompt: "Prompt sugerido: 'Diseña una actividad pedagógica basada en simulación de roles sobre un litigio de propiedad horizontal.'"
  }
};

function initDashboardTabs() {
  const tabs = document.querySelectorAll('.dash-tab-btn');
  const toolsContainer = document.getElementById('dashToolsContainer');
  const promptContainer = document.getElementById('dashPromptText');

  if (!tabs.length || !toolsContainer) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.getAttribute('data-dash-mode');
      const data = DASHBOARD_DATA[mode];
      if (!data) return;

      // Render tools
      toolsContainer.innerHTML = data.tools.map(tool => `
        <div class="dash-tool-card">
          <div class="dash-tool-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div class="dash-tool-info">
            <h4>${tool.name}</h4>
            <p>${tool.desc}</p>
          </div>
        </div>
      `).join('');

      if (promptContainer) {
        promptContainer.textContent = data.prompt;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. SCROLL SUAVE PARA ENLACES INTERNOS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 76;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
