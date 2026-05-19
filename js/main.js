/* ============================================================
   HAVANA MASSAGE · main.js
   Vanilla JS · IIFE pattern · defensive
   ============================================================ */

(function () {
  'use strict';

  // ---------- Utility ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function safe(fn, name) {
    try { fn(); } catch (err) {
      console.warn('[Havana] init failed:', name, err);
    }
  }

  // ---------- Year ----------
  function initYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ---------- Nav: scrolled state ----------
  function initNavScroll() {
    const nav = $('#nav');
    if (!nav) return;
    const update = () => {
      if (window.scrollY > 50) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // ---------- Nav: mobile menu ----------
  function initMobileMenu() {
    const burger = $('#navBurger');
    const menu = $('#navMobile');
    if (!burger || !menu) return;

    const close = () => {
      burger.classList.remove('is-active');
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('#navMobile a').forEach(link => link.addEventListener('click', close));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 720) close();
    });
  }

  // ---------- Reveal on scroll ----------
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    // Safety: ensure everything becomes visible eventually
    const safety = setTimeout(() => {
      items.forEach(el => el.classList.add('is-visible'));
    }, 6000);

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      clearTimeout(safety);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay
            ? parseInt(entry.target.dataset.delay, 10)
            : 0;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    items.forEach(el => io.observe(el));
  }

  // ---------- Services tabs ----------
  function initServicesTabs() {
    const tabs = $$('.services__tabs .tab');
    const panes = $$('[data-pane]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });
        panes.forEach(pane => {
          const show = pane.dataset.pane === target;
          pane.hidden = !show;
          if (show) {
            // re-trigger reveal on freshly-shown pane
            $$('.reveal', pane).forEach(el => el.classList.add('is-visible'));
          }
        });
      });
    });
  }

  // ---------- Team carousel ----------
  function initTeamCarousel() {
    const track = $('#teamTrack');
    const viewport = $('#teamViewport');
    const prevBtn = $('#teamPrev');
    const nextBtn = $('#teamNext');
    const dotsHost = $('#teamDots');
    if (!track || !viewport) return;

    const members = $$('.member', track);
    let index = 0;

    function perPage() {
      const w = window.innerWidth;
      if (w <= 720) return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    function totalPages() {
      return Math.max(1, members.length - perPage() + 1);
    }

    function setupDots() {
      if (!dotsHost) return;
      dotsHost.innerHTML = '';
      const pages = totalPages();
      for (let i = 0; i < pages; i++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
        if (i === index) b.classList.add('is-active');
        b.addEventListener('click', () => goTo(i));
        dotsHost.appendChild(b);
      }
    }

    function update() {
      const member = members[0];
      if (!member) return;
      const memberWidth = member.getBoundingClientRect().width;
      const gap = 16;
      const offset = -(index * (memberWidth + gap));
      track.style.transform = `translateX(${offset}px)`;

      // dots
      $$('button', dotsHost).forEach((d, i) => d.classList.toggle('is-active', i === index));

      // buttons
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= totalPages() - 1;
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, totalPages() - 1));
      update();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

    // Touch swipe
    let startX = 0;
    let isDown = false;
    viewport.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].clientX;
    }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
      if (!isDown) return;
      isDown = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(index + 1);
        else goTo(index - 1);
      }
    });

    // Keyboard
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    setupDots();
    update();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        index = Math.min(index, totalPages() - 1);
        setupDots();
        update();
      }, 150);
    });
  }

  // ---------- Lightbox ----------
  function initLightbox() {
    const lightbox = $('#lightbox');
    const lbImg = $('#lightboxImg');
    const closeBtn = $('#lightboxClose');
    if (!lightbox || !lbImg) return;

    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    $$('[data-gallery]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        lbImg.src = a.getAttribute('href');
        lbImg.alt = a.querySelector('img')?.alt || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }

  // ---------- Contact form ----------
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      // If Formspree action is still placeholder, fall back to WhatsApp
      const action = form.getAttribute('action') || '';
      const isPlaceholder = action.includes('REEMPLAZAR_ID') || !action.startsWith('http');

      if (isPlaceholder) {
        e.preventDefault();
        const name = $('#name').value.trim();
        const phone = $('#phone').value.trim();
        const email = $('#email').value.trim();
        const service = $('#service').value;
        const message = $('#message').value.trim();

        const text = encodeURIComponent(
          `Hola Havana, soy ${name}.\n` +
          `Teléfono: ${phone}\n` +
          (email ? `Email: ${email}\n` : '') +
          `Me interesa: ${service}\n` +
          (message ? `\n${message}` : '')
        );
        window.open(`https://wa.me/51922014182?text=${text}`, '_blank');
        return;
      }

      // Real Formspree submission
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Enviando…</span>';
      submitBtn.disabled = true;

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.classList.add('is-sent');
          const success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = '✓ Mensaje enviado. Te respondemos en menos de una hora.';
          form.appendChild(success);
          form.reset();
        } else {
          throw new Error('Network error');
        }
      } catch (err) {
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
        alert('Algo no salió bien. Escríbenos directo por WhatsApp: +51 922 014 182');
      }
    });
  }

  // ---------- Admin panel & visit counter ----------
  function initAdminPanel() {
    const STORE = 'hm_visits_v1';

    function load() {
      try { return JSON.parse(localStorage.getItem(STORE)) || { total: 0, sessions: [] }; }
      catch (e) { return { total: 0, sessions: [] }; }
    }

    function save(data) {
      try { localStorage.setItem(STORE, JSON.stringify(data)); } catch (e) {}
    }

    function recordVisit() {
      if (sessionStorage.getItem('hm_sess')) return;
      sessionStorage.setItem('hm_sess', '1');
      const data = load();
      data.total = (data.total || 0) + 1;
      const cutoff = Date.now() - 90 * 86400000;
      data.sessions = (data.sessions || []).filter(t => t > cutoff);
      data.sessions.push(Date.now());
      save(data);
    }

    function dayStart(offsetDays) {
      const d = new Date();
      d.setDate(d.getDate() - offsetDays);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }

    function weekStart() {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // lunes como primer día
      return d.getTime();
    }

    function monthStart() {
      const d = new Date();
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }

    function count(sessions, from, to) {
      return sessions.filter(t => t >= from && (to == null || t < to)).length;
    }

    function buildChart(sessions) {
      const chart = $('#adminChart');
      if (!chart) return;
      chart.innerHTML = '';

      const days = [];
      for (let i = 6; i >= 0; i--) {
        const from = dayStart(i);
        const to = i === 0 ? Date.now() + 1 : dayStart(i - 1);
        const d = new Date(from);
        const label = d.toLocaleDateString('es-PE', { weekday: 'short' })
          .replace('.', '').toUpperCase().slice(0, 2);
        days.push({ label, val: count(sessions, from, to) });
      }

      const max = Math.max(...days.map(d => d.val), 1);

      days.forEach(({ label, val }) => {
        const col = document.createElement('div');
        col.className = 'admin-chart__col';
        const pct = Math.max(6, Math.round((val / max) * 100));
        col.innerHTML =
          '<span class="admin-chart__val">' + val + '</span>' +
          '<div class="admin-chart__bar"><div class="admin-chart__fill" style="height:' + pct + '%"></div></div>' +
          '<span class="admin-chart__day mono">' + label + '</span>';
        chart.appendChild(col);
      });
    }

    function formatDate(ts) {
      if (!ts) return '—';
      return new Date(ts).toLocaleString('es-PE', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }

    // ── localStorage stats render ────────────────────────────
    function render() {
      const data = load();
      const sessions = data.sessions || [];
      const fmt = n => n.toLocaleString('es-PE');
      const set = (id, val) => { const el = $('#' + id); if (el) el.textContent = val; };
      set('statTotal',  fmt(data.total || 0));
      set('statToday',  fmt(count(sessions, dayStart(0))));
      set('statWeek',   fmt(count(sessions, weekStart())));
      set('statMonth',  fmt(count(sessions, monthStart())));
      set('statLast',   formatDate(sessions[sessions.length - 1]));
      buildChart(sessions);
    }

    // ── GA4 Real-time integration ────────────────────────────
    const GA_API  = 'https://analyticsdata.googleapis.com/v1beta/properties/';
    const GA_SCO  = 'https://www.googleapis.com/auth/analytics.readonly';
    let gaToken   = sessionStorage.getItem('hm_ga_token') || null;
    let gaTC      = null;   // token client
    let gaRInt    = null;   // refresh interval
    let gaCInt    = null;   // countdown interval
    let gaWired   = false;  // buttons wired flag

    function gaOK() {
      const pid = window.HM_GA_PROPERTY_ID || '';
      const cid = window.HM_GA_CLIENT_ID   || '';
      return pid && pid !== 'PROPERTY_ID' && cid && cid !== 'CLIENT_ID';
    }

    function gaState(id) {
      ['gaSetup','gaConnect','gaLoading','gaMetrics','gaError'].forEach(s => {
        const el = $('#' + s); if (el) el.hidden = s !== id;
      });
    }

    function gaFmt(n) { return (parseInt(n, 10) || 0).toLocaleString('es-PE'); }

    async function gaPost(path, body) {
      const r = await fetch(GA_API + window.HM_GA_PROPERTY_ID + path, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + gaToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (r.status === 401) throw new Error('EXPIRED');
      if (!r.ok) {
        let detail = 'ERR_' + r.status;
        try { const e = await r.json(); if (e.error && e.error.message) detail = e.error.message; } catch(_) {}
        throw new Error(detail);
      }
      return r.json();
    }

    // Safely extracts a metric value from a no-dimension report row
    function gaMV(report, idx) {
      const row = report && report.rows && report.rows[0];
      return gaFmt((row && row.metricValues && row.metricValues[idx] && row.metricValues[idx].value) || '0');
    }

    function gaDrawChart(rows) {
      const chart = $('#gaChart');
      if (!chart) return;
      chart.innerHTML = '';
      if (!rows || !rows.length) return;
      const vals = rows.map(r => parseInt(r.metricValues[0].value, 10) || 0);
      const max  = Math.max(...vals, 1);
      rows.forEach(row => {
        const ds  = row.dimensionValues[0].value;  // YYYYMMDD
        const val = parseInt(row.metricValues[0].value, 10) || 0;
        const d   = new Date(+ds.slice(0,4), +ds.slice(4,6) - 1, +ds.slice(6,8));
        const lbl = d.toLocaleDateString('es-PE', { weekday: 'short' })
                     .replace('.','').toUpperCase().slice(0,2);
        const pct = Math.max(6, Math.round((val / max) * 100));
        const col = document.createElement('div');
        col.className = 'admin-chart__col';
        col.innerHTML =
          '<span class="admin-chart__val">' + val + '</span>' +
          '<div class="admin-chart__bar"><div class="admin-chart__fill" style="height:' + pct + '%"></div></div>' +
          '<span class="admin-chart__day mono">' + lbl + '</span>';
        chart.appendChild(col);
      });
    }

    function gaCountdown() {
      clearInterval(gaCInt);
      let s = 30;
      const el = $('#gaCountdown');
      if (el) el.textContent = 'Actualiza en 30s';
      gaCInt = setInterval(() => {
        s--;
        if (el) el.textContent = s > 0 ? 'Actualiza en ' + s + 's' : 'Actualizando…';
        if (s <= 0) clearInterval(gaCInt);
      }, 1000);
    }

    async function gaLoad() {
      if (!gaToken) return;
      gaState('gaLoading');
      try {
        // Todas las peticiones en paralelo para máxima velocidad
        const [rt, rToday, r7d, r30d, rDaily] = await Promise.all([

          // Usuarios activos ahora mismo (Realtime API)
          gaPost(':runRealtimeReport', {
            metrics: [{ name: 'activeUsers' }]
          }),

          // Hoy: sesiones + usuarios (sin dimensiones → totales)
          gaPost(':runReport', {
            dateRanges: [{ startDate: 'today', endDate: 'today' }],
            metrics: [{ name: 'sessions' }, { name: 'totalUsers' }]
          }),

          // Últimos 7 días: sesiones + usuarios
          gaPost(':runReport', {
            dateRanges: [{ startDate: '6daysAgo', endDate: 'today' }],
            metrics: [{ name: 'sessions' }, { name: 'totalUsers' }]
          }),

          // Últimos 30 días: usuarios totales
          gaPost(':runReport', {
            dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
            metrics: [{ name: 'totalUsers' }]
          }),

          // Sesiones por día (últimos 7 días) para el gráfico
          gaPost(':runReport', {
            dateRanges: [{ startDate: '6daysAgo', endDate: 'today' }],
            dimensions: [{ name: 'date' }],
            metrics:    [{ name: 'sessions' }],
            orderBys:   [{ dimension: { dimensionName: 'date' }, desc: false }]
          })
        ]);

        const live = (rt.rows && rt.rows[0] && rt.rows[0].metricValues[0].value) || '0';
        const set  = (id, v) => { const e = $('#' + id); if (e) e.textContent = v; };

        set('gaActiveUsers',   live);
        set('gaSessionsToday', gaMV(rToday, 0));
        set('gaUsersToday',    gaMV(rToday, 1));
        set('gaSessions7d',    gaMV(r7d,    0));
        set('gaUsers30d',      gaMV(r30d,   0));
        gaDrawChart(rDaily.rows || []);
        gaState('gaMetrics');
        gaCountdown();

      } catch (e) {
        if (e.message === 'EXPIRED') {
          gaToken = null;
          sessionStorage.removeItem('hm_ga_token');
          gaState('gaConnect');
        } else {
          const msg = $('#gaErrorMsg');
          if (msg) msg.textContent = e.message;
          gaState('gaError');
        }
      }
    }

    function gaInitTC() {
      if (!window.google || !window.google.accounts || gaTC) return;
      const cid = window.HM_GA_CLIENT_ID;
      if (!cid || cid === 'CLIENT_ID') return;
      gaTC = window.google.accounts.oauth2.initTokenClient({
        client_id: cid,
        scope: GA_SCO,
        callback(resp) {
          if (resp.access_token) {
            gaToken = resp.access_token;
            sessionStorage.setItem('hm_ga_token', gaToken);
            gaLoad();
            clearInterval(gaRInt);
            gaRInt = setInterval(() => { if (gaToken) gaLoad(); }, 30000);
          }
        }
      });
    }

    function gaWireButtons() {
      if (gaWired) return;
      gaWired = true;

      const signIn = $('#gaSignIn');
      if (signIn) signIn.addEventListener('click', () => {
        if (gaTC) { gaTC.requestAccessToken(); return; }
        // GIS aún cargando — esperar y reintentar
        let tries = 0;
        const poll = setInterval(() => {
          tries++;
          gaInitTC();
          if (gaTC) { clearInterval(poll); gaTC.requestAccessToken(); }
          if (tries > 30) clearInterval(poll);
        }, 200);
      });

      const signOut = $('#gaSignOut');
      if (signOut) signOut.addEventListener('click', () => {
        gaToken = null;
        sessionStorage.removeItem('hm_ga_token');
        clearInterval(gaRInt);
        clearInterval(gaCInt);
        gaState('gaConnect');
      });

      const retry = $('#gaRetry');
      if (retry) retry.addEventListener('click', () => gaLoad());
    }

    function gaSetupUI() {
      if (!gaOK()) { gaState('gaSetup'); return; }
      gaInitTC();
      if (!gaTC && window.google) gaInitTC();
      gaWireButtons();
      if (gaToken) {
        gaLoad();
        clearInterval(gaRInt);
        gaRInt = setInterval(() => { if (gaToken) gaLoad(); }, 30000);
      } else {
        gaState('gaConnect');
      }
    }
    // ─────────────────────────────────────────────────────────

    function openPanel() {
      const panel = $('#adminPanel');
      if (!panel) return;
      render();
      gaSetupUI();
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closePanel() {
      const panel = $('#adminPanel');
      if (!panel) return;
      clearInterval(gaRInt);
      clearInterval(gaCInt);
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    recordVisit();

    if (new URLSearchParams(location.search).has('admin')) {
      openPanel();
    }

    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'H') {
        const panel = $('#adminPanel');
        if (panel && panel.classList.contains('is-open')) closePanel(); else openPanel();
      }
      if (e.key === 'Escape') {
        const panel = $('#adminPanel');
        if (panel && panel.classList.contains('is-open')) closePanel();
      }
    });

    $('#adminClose') && $('#adminClose').addEventListener('click', closePanel);
    $('#adminPanel') && $('#adminPanel').addEventListener('click', e => {
      if (e.target.id === 'adminPanel') closePanel();
    });
    $('#adminReset') && $('#adminReset').addEventListener('click', () => {
      if (confirm('¿Seguro que quieres borrar todos los datos de visitas? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(STORE);
        sessionStorage.removeItem('hm_sess');
        render();
      }
    });
  }

  // ---------- Marquee duplicate (ensure seamless loop) ----------
  function initMarquee() {
    const track = $('.marquee__track');
    if (!track) return;
    // already duplicated in HTML; nothing to do
  }

  // ---------- Splash safety ----------
  function initSplashSafety() {
    const splash = $('#splash');
    if (!splash) return;
    setTimeout(() => {
      splash.style.display = 'none';
    }, 5000);
  }

  // ---------- Smooth scroll for in-page anchors ----------
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length <= 1) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ---------- Init all ----------
  function init() {
    safe(initYear, 'year');
    safe(initNavScroll, 'nav-scroll');
    safe(initMobileMenu, 'mobile-menu');
    safe(initReveal, 'reveal');
    safe(initServicesTabs, 'services-tabs');
    safe(initTeamCarousel, 'team-carousel');
    safe(initLightbox, 'lightbox');
    safe(initContactForm, 'contact-form');
    safe(initMarquee, 'marquee');
    safe(initSplashSafety, 'splash-safety');
    safe(initSmoothScroll, 'smooth-scroll');
    safe(initAdminPanel, 'admin-panel');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
