/* ============================================================
   script.js — Interactividad de la landing page
   Incluye:
   - Navbar sticky con efecto scroll
   - Animaciones de entrada con IntersectionObserver
   - Acordeón FAQ
   - Smooth scroll en links ancla
============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 1. NAVBAR — agregar clase .scrolled al hacer scroll
  // ============================================================
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ============================================================
  // 2. ANIMACIONES DE ENTRADA — fade-in al entrar en viewport
  //    Agrega la clase .fade-in a los elementos que querés animar
  //    y .visible se agrega automáticamente al hacer scroll
  // ============================================================
  const fadeTargets = document.querySelectorAll(
    '.module-card, .problem-card, .testimonial-card, .benefit-item, .faq-item, .trust-item, .gallery-item, .pain-item, .method-pillar, .result-card'
  );

  if ('IntersectionObserver' in window && fadeTargets.length) {
    // Agregar clase fade-in a todos los targets
    fadeTargets.forEach((el) => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // dejar de observar tras activar
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach((el) => observer.observe(el));
  }

  // ============================================================
  // 3. ACORDEÓN FAQ — abrir/cerrar respuestas
  // ============================================================
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Cerrar todos los demás
      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAnswer = otherBtn.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove('open');
        }
      });

      // Toggle del actual
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.classList.toggle('open', !isOpen);
    });
  });

  // ============================================================
  // 4. SMOOTH SCROLL — para todos los links ancla (#)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // altura del navbar fijo
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // 5. STAGGER ANIMATION — módulos y cards con delay escalonado
  // ============================================================
  const staggerGroups = [
    '.modules-grid .module-card',
    '.problem-grid .problem-card',
    '.testimonials-grid .testimonial-card',
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // ============================================================
  // 6. VIDEOS — ahora usando HTML5 video tag nativo (sin necesidad de mock)
  // ============================================================
  // Los videos se cargan automáticamente con controles HTML5
  // No se necesita lógica adicional

})();
