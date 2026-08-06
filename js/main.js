/* ============================================================
   KARNATAKA CAFE — PATNA
   Interactions: reveal on scroll, 3D pop-out text, live search,
   dish modal, lightbox, table reservation modal, scroll progress
   ============================================================ */
(function(){
  'use strict';

  /* ---------- Scroll Progress Bar & Floating Top Button ---------- */
  var progressBar = document.querySelector('.scroll-progress');
  var floatTop = document.querySelector('.float-top');
  var header = document.querySelector('header');

  function onScroll(){
    var scrollY = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if(progressBar && docHeight > 0){
      var progress = (scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }
    if(header){
      header.classList.toggle('scrolled', scrollY > 40);
    }
    if(floatTop){
      if(scrollY > 300) floatTop.classList.add('show');
      else floatTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  if(floatTop){
    floatTop.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

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

  /* ---------- KINETIC WORD POP REVEAL ---------- */
  function initPopWords(){
    var targets = document.querySelectorAll('.pop-words');
    targets.forEach(function(el){
      var text = el.textContent.trim();
      if(!text) return;
      var words = text.split(/\s+/);
      el.innerHTML = '';
      words.forEach(function(word, idx){
        var span = document.createElement('span');
        span.className = 'pop-word';
        span.style.transitionDelay = (idx * 0.07) + 's';
        span.innerHTML = word + '&nbsp;';
        el.appendChild(span);
      });
    });

    var wordEls = document.querySelectorAll('.pop-word');
    if('IntersectionObserver' in window && wordEls.length){
      var wio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('in');
            wio.unobserve(e.target);
          }
        });
      }, {threshold:0.1, rootMargin:'0px 0px -20px 0px'});
      wordEls.forEach(function(w){ wio.observe(w); });
    } else {
      wordEls.forEach(function(w){ w.classList.add('in'); });
    }
  }
  initPopWords();

  /* ---------- Standard Scroll Reveal Observer ---------- */
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

  /* ---------- Animated Pop-out Counters ---------- */
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

  /* ---------- Hero Parallax & subtle 3D Tilt ---------- */
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

  /* 3D Tilt on Feature Cards & Regional Cards */
  var tiltCards = document.querySelectorAll('.fcard, .cat-card, .tcard, .regional-card');
  tiltCards.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width/2;
      var y = e.clientY - rect.top - rect.height/2;
      var rx = (-y / rect.height) * 8;
      var ry = (x / rect.width) * 8;
      card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });
  });

  /* ---------- TABLE RESERVATION MODAL (SASIVE STYLE) ---------- */
  var reserveModal = document.getElementById('reserveModal');
  var reserveModalBackdrop = document.getElementById('reserveModalBackdrop');
  var reserveModalClose = document.getElementById('reserveModalClose');
  var reserveBtns = document.querySelectorAll('.btn-reserve-trigger');
  var reserveForm = document.getElementById('reserveForm');

  function openReserveModal(){
    if(!reserveModal) return;
    reserveModal.classList.add('open');
    if(reserveModalBackdrop) reserveModalBackdrop.classList.add('open');
  }

  function closeReserveModal(){
    if(!reserveModal) return;
    reserveModal.classList.remove('open');
    if(reserveModalBackdrop) reserveModalBackdrop.classList.remove('open');
  }

  reserveBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      openReserveModal();
    });
  });

  if(reserveModalClose) reserveModalClose.addEventListener('click', closeReserveModal);
  if(reserveModalBackdrop) reserveModalBackdrop.addEventListener('click', closeReserveModal);

  if(reserveForm){
    reserveForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('resName') ? document.getElementById('resName').value : '';
      var phone = document.getElementById('resPhone') ? document.getElementById('resPhone').value : '';
      var date = document.getElementById('resDate') ? document.getElementById('resDate').value : '';
      var time = document.getElementById('resTime') ? document.getElementById('resTime').value : '';
      var guests = document.getElementById('resGuests') ? document.getElementById('resGuests').value : '2';

      var msg = 'Hello Karnataka Cafe Patna! I would like to reserve a table.%0A' +
                '*Name:* ' + encodeURIComponent(name) + '%0A' +
                '*Phone:* ' + encodeURIComponent(phone) + '%0A' +
                '*Date:* ' + encodeURIComponent(date) + '%0A' +
                '*Time:* ' + encodeURIComponent(time) + '%0A' +
                '*Guests:* ' + encodeURIComponent(guests) + ' Person(s)';

      window.open('https://wa.me/918130384879?text=' + msg, '_blank');
      closeReserveModal();
    });
  }

  /* ---------- Menu category tabs & deep links ---------- */
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
        var first = document.querySelector('#' + target);
        if(first && window.innerWidth > 600){
          var rect = first.getBoundingClientRect();
          var offset = window.scrollY + rect.top - 90;
          window.scrollTo({top: offset, behavior:'smooth'});
        }
      });
    });
  }

  /* ---------- Live Menu Search & Filter Pills ---------- */
  var menuSearchInput = document.getElementById('menuSearchInput');
  var filterPills = document.querySelectorAll('.filter-pill');

  function filterMenuItems(){
    var query = menuSearchInput ? menuSearchInput.value.toLowerCase().trim() : '';
    var activePill = document.querySelector('.filter-pill.active');
    var pillFilter = activePill ? activePill.getAttribute('data-filter') : 'all';

    var menuCards = document.querySelectorAll('.menu-card, .beverage-card');
    menuCards.forEach(function(card){
      var title = (card.querySelector('h4') ? card.querySelector('h4').textContent : '').toLowerCase();
      var desc = (card.querySelector('p, small') ? card.querySelector('p, small').textContent : '').toLowerCase();
      var priceText = (card.querySelector('.price') ? card.querySelector('.price').textContent : '');
      var priceVal = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;
      var badge = (card.querySelector('.badge') ? card.querySelector('.badge').textContent : '').toLowerCase();

      var matchesSearch = !query || title.includes(query) || desc.includes(query);
      var matchesPill = true;

      if(pillFilter === 'bestseller'){
        matchesPill = badge.includes('bestseller') || badge.includes('popular') || badge.includes('house special');
      } else if(pillFilter === 'under150'){
        matchesPill = priceVal <= 150 && priceVal > 0;
      } else if(pillFilter === 'spicy'){
        matchesPill = desc.includes('spicy') || title.includes('mysore') || badge.includes('spicy') || desc.includes('chilli');
      } else if(pillFilter === 'beverage'){
        matchesPill = card.classList.contains('beverage-card') || title.includes('coffee') || title.includes('shake') || title.includes('chai');
      }

      if(matchesSearch && matchesPill){
        card.style.display = '';
        card.style.animation = 'fadeUp 0.3s ease both';
      } else {
        card.style.display = 'none';
      }
    });

    if(query || pillFilter !== 'all'){
      panels.forEach(function(panel){
        var visibleInPanel = panel.querySelectorAll('.menu-card:not([style*="display: none"]), .beverage-card:not([style*="display: none"])');
        if(visibleInPanel.length > 0){
          panel.classList.add('active');
        }
      });
    }
  }

  if(menuSearchInput){
    menuSearchInput.addEventListener('input', filterMenuItems);
  }

  filterPills.forEach(function(pill){
    pill.addEventListener('click', function(){
      filterPills.forEach(function(p){ p.classList.remove('active'); });
      pill.classList.add('active');
      filterMenuItems();
    });
  });

  /* ---------- DISH QUICK VIEW MODAL ---------- */
  var dishModal = document.getElementById('dishModal');
  var dishModalBackdrop = document.getElementById('dishModalBackdrop');
  var dishModalClose = document.getElementById('dishModalClose');
  var currentQty = 1;

  function openDishModal(data){
    if(!dishModal) return;
    currentQty = 1;

    var imgEl = document.getElementById('dishModalImg');
    var titleEl = document.getElementById('dishModalTitle');
    var priceEl = document.getElementById('dishModalPrice');
    var descEl = document.getElementById('dishModalDesc');
    var badgeEl = document.getElementById('dishModalBadge');
    var qtyValEl = document.getElementById('dishQtyVal');
    var waBtn = document.getElementById('dishWaBtn');

    if(imgEl) imgEl.src = data.img || 'images/dosa.jpg';
    if(titleEl) titleEl.textContent = data.title || 'Delicious South Indian Dish';
    if(priceEl) priceEl.textContent = data.price || '₹120';
    if(descEl) descEl.textContent = data.desc || 'Freshly prepared authentic South Indian delight made with traditional spices.';
    if(badgeEl){
      badgeEl.textContent = data.badge || 'Pure Veg';
    }
    if(qtyValEl) qtyValEl.textContent = currentQty;

    function updateWaLink(){
      if(waBtn){
        var msg = encodeURIComponent('Hi Karnataka Cafe Patna! I would like to order ' + currentQty + 'x ' + data.title + ' (' + data.price + ' each).');
        waBtn.href = 'https://wa.me/918130384879?text=' + msg;
      }
    }
    updateWaLink();

    var minusBtn = document.getElementById('qtyMinus');
    var plusBtn = document.getElementById('qtyPlus');
    if(minusBtn){
      minusBtn.onclick = function(){
        if(currentQty > 1){
          currentQty--;
          if(qtyValEl) qtyValEl.textContent = currentQty;
          updateWaLink();
        }
      };
    }
    if(plusBtn){
      plusBtn.onclick = function(){
        currentQty++;
        if(qtyValEl) qtyValEl.textContent = currentQty;
        updateWaLink();
      };
    }

    dishModal.classList.add('open');
    if(dishModalBackdrop) dishModalBackdrop.classList.add('open');
  }

  function closeDishModal(){
    if(!dishModal) return;
    dishModal.classList.remove('open');
    if(dishModalBackdrop) dishModalBackdrop.classList.remove('open');
  }

  if(dishModalClose) dishModalClose.addEventListener('click', closeDishModal);
  if(dishModalBackdrop) dishModalBackdrop.addEventListener('click', closeDishModal);

  /* Attach click listeners to menu cards & category cards */
  document.addEventListener('click', function(e){
    var card = e.target.closest('.menu-card, .cat-card, .beverage-card');
    if(card && !e.target.closest('a[href^="http"]') && !e.target.closest('a[href^="#"]') && !e.target.closest('.btn-reserve-trigger')){
      var img = card.querySelector('img') ? card.querySelector('img').src : 'images/dosa.jpg';
      var title = card.querySelector('h4, h3') ? card.querySelector('h4, h3').textContent.replace(/Bestseller|Popular|House Special|Spicy/gi, '').trim() : 'Special Dish';
      var price = card.querySelector('.price') ? card.querySelector('.price').textContent : '₹120';
      var desc = card.querySelector('p, small') ? card.querySelector('p, small').textContent : 'Authentic Karnataka Cafe recipe made fresh daily.';
      var badge = card.querySelector('.badge, .tagged') ? card.querySelector('.badge, .tagged').textContent : 'Pure Veg';

      openDishModal({
        img: img,
        title: title,
        price: price,
        desc: desc,
        badge: badge
      });
    }
  });

  /* ---------- GALLERY LIGHTBOX ---------- */
  var lightbox = document.getElementById('lightboxModal');
  var lightboxClose = document.getElementById('lightboxClose');

  var galleryItems = document.querySelectorAll('.g-item');
  galleryItems.forEach(function(item){
    item.addEventListener('click', function(){
      var img = item.querySelector('img');
      if(!img || !lightbox) return;

      var lbImg = document.getElementById('lightboxImg');
      var lbCaption = document.getElementById('lightboxCaption');
      if(lbImg) lbImg.src = img.src;
      if(lbCaption) lbCaption.textContent = img.alt || 'Karnataka Cafe Patna Food Gallery';

      lightbox.classList.add('open');
    });
  });

  function closeLightbox(){
    if(lightbox) lightbox.classList.remove('open');
  }

  if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if(lightbox) lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      closeDishModal();
      closeLightbox();
      closeFontModal();
      closeReserveModal();
    }
  });

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

  /* ---------- Font Switcher & Presets ---------- */
  var fontPresets = {
    'outfit': {
      id: 'outfit',
      name: 'Modern Cafe',
      head: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    'dm-serif': {
      id: 'dm-serif',
      name: 'Royal Heritage',
      head: "'DM Serif Display', Georgia, serif",
      body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    'poppins': {
      id: 'poppins',
      name: 'Vibrant & Bold',
      head: "'Poppins', system-ui, -apple-system, sans-serif",
      body: "'Inter', system-ui, -apple-system, sans-serif"
    },
    'philosopher': {
      id: 'philosopher',
      name: 'South Indian Classic',
      head: "'Philosopher', Georgia, serif",
      body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    'cinzel': {
      id: 'cinzel',
      name: 'Imperial Grandeur',
      head: "'Cinzel', Georgia, serif",
      body: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
    },
    'playfair': {
      id: 'playfair',
      name: 'Editorial Gourmet',
      head: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }
  };

  function setWebsiteFont(presetKey, persist){
    var preset = fontPresets[presetKey] || fontPresets['outfit'];
    document.documentElement.style.setProperty('--font-head', preset.head);
    document.documentElement.style.setProperty('--font-body', preset.body);

    var labelEl = document.getElementById('currentFontName');
    if(labelEl) labelEl.textContent = preset.name;

    var optionCards = document.querySelectorAll('.font-option-card');
    optionCards.forEach(function(card){
      if(card.getAttribute('data-preset') === preset.id){
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if(persist !== false){
      try {
        localStorage.setItem('kc_font_preset', preset.id);
      } catch(e){}
    }
  }

  try {
    var savedPreset = localStorage.getItem('kc_font_preset') || 'outfit';
    setWebsiteFont(savedPreset, false);
  } catch(e){
    setWebsiteFont('outfit', false);
  }

  var switcherBtn = document.getElementById('fontSwitcherBtn');
  var fontModal = document.getElementById('fontModal');
  var modalBackdrop = document.getElementById('fontModalBackdrop');
  var modalCloseBtn = document.getElementById('fontModalClose');

  function openFontModal(){
    if(!fontModal) return;
    fontModal.classList.add('open');
    if(modalBackdrop) modalBackdrop.classList.add('open');
  }

  function closeFontModal(){
    if(!fontModal) return;
    fontModal.classList.remove('open');
    if(modalBackdrop) modalBackdrop.classList.remove('open');
  }

  if(switcherBtn){
    switcherBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if(fontModal && fontModal.classList.contains('open')){
        closeFontModal();
      } else {
        openFontModal();
      }
    });
  }

  if(modalCloseBtn){
    modalCloseBtn.addEventListener('click', function(e){
      e.stopPropagation();
      closeFontModal();
    });
  }

  if(modalBackdrop){
    modalBackdrop.addEventListener('click', closeFontModal);
  }

  var fontCards = document.querySelectorAll('.font-option-card');
  fontCards.forEach(function(btn){
    btn.addEventListener('click', function(){
      var key = btn.getAttribute('data-preset');
      setWebsiteFont(key, true);
      setTimeout(closeFontModal, 280);
    });
  });
})();
