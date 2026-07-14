/* =====================================================================
   animations.js — animations du site (progressive enhancement)
   1. Révélation des cartes au défilement (IntersectionObserver)
   2. Intro séquencée des schémas SVG des modèles (draw / pop / fade)
   3. Pulsation des flèches de pipelines
   4. Apparition en cascade des puces KPI
   Sans JavaScript ou avec prefers-reduced-motion, le contenu reste
   entièrement visible : les classes d'animation ne sont jamais posées.
   ===================================================================== */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- 1. Révélation des cartes ---- */
    var cards = document.querySelectorAll('.row, .fiche');
    cards.forEach(function (c) { c.classList.add('reveal'); });
    var ioCards = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ioCards.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    cards.forEach(function (c) { ioCards.observe(c); });

    /* ---- 2. Schémas SVG : intro séquencée ---- */
    var svgs = document.querySelectorAll('.c1 svg');
    svgs.forEach(prepareSvg);
    var ioSvg = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('play'); ioSvg.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    svgs.forEach(function (s) { ioSvg.observe(s); });

    /* Rejouer l'animation au survol de la carte */
    document.querySelectorAll('.row').forEach(function (row) {
      var svg = row.querySelector('.c1 svg');
      if (!svg) return;
      row.addEventListener('mouseenter', function () { replay(svg); });
    });

    /* ---- 3. Flèches de pipelines : pulsation de flux ---- */
    document.querySelectorAll('.pipe').forEach(function (pipe) {
      pipe.querySelectorAll('.arr').forEach(function (a, i) {
        a.style.animationDelay = (i * 0.25) + 's';
        a.classList.add('flow');
      });
    });

    /* ---- 4. Puces KPI en cascade (page fiches) ---- */
    var kpiLists = document.querySelectorAll('ul.kpis');
    kpiLists.forEach(function (ul) {
      ul.querySelectorAll('li').forEach(function (li, i) {
        li.style.transitionDelay = (i * 90) + 'ms';
        li.classList.add('kpi-hide');
      });
    });
    var ioKpi = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll('li').forEach(function (li) { li.classList.add('kpi-in'); });
          ioKpi.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    kpiLists.forEach(function (ul) { ioKpi.observe(ul); });
  });

  /* Prépare chaque forme du SVG selon sa nature :
     - forme pleine  -> "pop" (apparition élastique)
     - trait pointillé -> "fade" (fondu, pour préserver les pointillés)
     - trait plein   -> "draw" (tracé progressif via stroke-dashoffset)   */
  function prepareSvg(svg) {
    var shapes = svg.querySelectorAll('line, path, circle, rect, ellipse, polygon');
    var i = 0;
    shapes.forEach(function (el) {
      var fill = el.getAttribute('fill');
      var dash = el.getAttribute('stroke-dasharray');
      el.style.setProperty('--d', (i * 0.07) + 's');
      if (fill && fill !== 'none') {
        el.classList.add('a-pop');
      } else if (dash) {
        el.classList.add('a-fade');
      } else {
        try {
          var len = Math.ceil(el.getTotalLength());
          el.style.setProperty('--len', len + 'px');
          el.classList.add('a-draw');
        } catch (err) {
          el.classList.add('a-fade');
        }
      }
      i += 1;
    });
  }

  function replay(svg) {
    svg.classList.remove('play');
    void svg.getBoundingClientRect(); /* force le reflow pour relancer */
    svg.classList.add('play');
  }
})();
