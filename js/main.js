/* ============================================================
   KARNATAKA CAFE — PATNA
   Interactions: reveal on scroll, navbar, counters, tabs, parallax
   ============================================================ */
(function(){
  'use strict';

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('header');
  function onScrollHeader(){
    if(!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScrollHeader);
  onScrollHeader();

  /* ---------- Mobile nav ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if(hamburger && navLinks){
    hamburger.addEventListener('click', function(){
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if(counters.length && 'IntersectionObserver' in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1600, start = performance.now();
        function tick(now){
          var p = Math.min((now - start)/dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(target * eased).toLocaleString('en-IN') + (p===1? suffix : '');
          if(p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('en-IN') + suffix;
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, {threshold:0.5});
    counters.forEach(function(c){ cio.observe(c); });
  }

  /* ---------- Hero parallax (subtle) ---------- */
  var heroBg = document.querySelector('.hero .hero-bg img');
  if(heroBg){
    var ticking = false;
    window.addEventListener('scroll', function(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var y = window.scrollY;
        if(y < window.innerHeight) heroBg.style.transform = 'translateY(' + (y*0.28) + 'px) scale(1.05)';
        ticking = false;
      });
    });
  }

  /* ---------- Menu category tabs ---------- */
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.menu-panel');

  function activatePanel(id){
    if(!panels.length) return;
    var target = id || 'dosa';
    var tab = document.querySelector('.tab[data-target="'+target+'"]');
    tabs.forEach(function(t){ t.classList.remove('active'); });
    panels.forEach(function(p){ p.classList.remove('active'); });
    var panel = document.getElementById(target);
    if(tab) tab.classList.add('active');
    if(panel) panel.classList.add('active');
  }

  /* deep-link / hash support (e.g. menu.html#thali) */
  if(panels.length){
    function fromHash(){
      var h = window.location.hash.replace('#','');
      if(h && document.getElementById(h)) activatePanel(h);
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }
  if(tabs.length){
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        tabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.getAttribute('data-target');
        panels.forEach(function(p){
          p.classList.remove('active');
          if(p.id === target) p.classList.add('active');
        });
        /* smooth scroll to panel top */
        var first = document.querySelector('#' + target);
        if(first && window.innerWidth > 600){
          var rect = first.getBoundingClientRect();
          var offset = window.scrollY + rect.top - 90;
          window.scrollTo({top: offset, behavior:'smooth'});
        }
      });
    });
  }

  /* ---------- Active nav link highlight ---------- */
  var sections = document.querySelectorAll('section[id]');
  if(sections.length && 'IntersectionObserver' in window){
    var links = document.querySelectorAll('.nav-links a[href^="#"]');
    var so = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(l){ l.classList.remove('active'); });
          var match = document.querySelector('.nav-links a[href="#'+e.target.id+'"]');
          if(match) match.classList.add('active');
        }
      });
    }, {threshold:0.5});
    sections.forEach(function(s){ so.observe(s); });
  }
})();
