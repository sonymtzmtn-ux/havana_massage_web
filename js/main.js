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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
