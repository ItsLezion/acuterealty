  // ============================
    // SLIDESHOW
    // ============================
    const slides = document.querySelectorAll('.slides');

    if (slides.length > 0) {
      let slideIndex = 0;

      function showSlides() {
        slides.forEach(slide => {
          slide.style.display = 'none';
        });

        slideIndex++;

        if (slideIndex > slides.length) {
          slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';

        setTimeout(showSlides, 4000);
      }

      showSlides();
    }

    // ============================
    // PROPERTY IMAGE NAVIGATION
    // ============================
    const propertyImageContainers = document.querySelectorAll('.property-image-container');

    propertyImageContainers.forEach(container => {
      const mainImage = container.querySelector('.main-image');
      const thumbnails = Array.from(container.querySelectorAll('.thumbnail-row img'));

      if (!mainImage || thumbnails.length === 0) return;

      const prevButton = document.createElement('button');
      prevButton.type = 'button';
      prevButton.className = 'image-nav-btn prev';
      prevButton.setAttribute('aria-label', 'Show previous image');
      prevButton.innerHTML = '&larr;';

      const nextButton = document.createElement('button');
      nextButton.type = 'button';
      nextButton.className = 'image-nav-btn next';
      nextButton.setAttribute('aria-label', 'Show next image');
      nextButton.innerHTML = '&rarr;';

      container.appendChild(prevButton);
      container.appendChild(nextButton);

      let activeIndex = -1;

      function updateActiveImage(index) {
        const safeIndex = (index + thumbnails.length) % thumbnails.length;
        activeIndex = safeIndex;

        mainImage.src = thumbnails[activeIndex].src;
        mainImage.alt = thumbnails[activeIndex].alt || mainImage.alt;

        thumbnails.forEach((thumb, thumbIndex) => {
          thumb.classList.toggle('active-thumbnail', thumbIndex === activeIndex);
        });
      }

      prevButton.addEventListener('click', event => {
        event.stopPropagation();
        updateActiveImage(activeIndex - 1);
      });

      nextButton.addEventListener('click', event => {
        event.stopPropagation();
        updateActiveImage(activeIndex + 1);
      });

      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', event => {
          event.stopPropagation();
          updateActiveImage(index);
        });
      });
    });

    // ============================
    // IMAGE EXPAND MODAL
    // ============================
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');

    const allImages = document.querySelectorAll('.main-image, .thumbnail-row img');

    allImages.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
      });
    });

    closeBtn.onclick = function() {
      modal.style.display = 'none';
    };

    window.onclick = function(e) {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    };


    // ============================
    // DARK MODE TOGGLE
    // ============================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle?.querySelector('.toggle-icon');
    const toggleLabel = darkModeToggle?.querySelector('.toggle-label');

    function applyTheme(theme) {
      const isDark = theme === 'dark';
      document.body.classList.toggle('dark-mode', isDark);

      if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-pressed', String(isDark));
        if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
        if (toggleLabel) toggleLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    }

    const savedTheme = localStorage.getItem('acuterealty-theme');
    applyTheme(savedTheme || 'light');

    darkModeToggle?.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('acuterealty-theme', nextTheme);
      applyTheme(nextTheme);
    });

    // ============================
    // MOBILE HEADER HIDE / SHOW
    // ============================
    (function() {
      let lastScrollY = window.scrollY;
      const header = document.querySelector('header');
      const threshold = 50;
      let ticking = false;

      function updateHeader() {
        const currentScroll = window.scrollY;
        const isMobile = window.innerWidth <= 820;
        if (!header || !isMobile) {
          header?.classList.remove('header-hidden');
          ticking = false;
          return;
        }

        if (currentScroll > lastScrollY + threshold && currentScroll > 120) {
          header.classList.add('header-hidden');
        } else if (currentScroll < lastScrollY - threshold || currentScroll <= 80) {
          header.classList.remove('header-hidden');
        }

        lastScrollY = Math.max(currentScroll, 0);
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 820) {
          header?.classList.remove('header-hidden');
        }
      });
    })();

    // ============================
    // NAV SECTION HIGHLIGHT
    // ============================
    const sectionLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function triggerSectionPulse(targetId) {
      const targetSection = document.getElementById(targetId);
      targetSection?.classList.remove('section-highlight');
      void targetSection?.offsetWidth;
      targetSection?.classList.add('section-highlight');
    }

    sectionLinks.forEach(link => {
      link.addEventListener('click', event => {
        const href = link.getAttribute('href');
        const targetId = href?.replace('#', '');

        if (!targetId) return;

        setTimeout(() => triggerSectionPulse(targetId), 120);
      });
    });

    // ============================
    // PROPERTY COMPARE
    // ============================
    const compareButtons = document.querySelectorAll('.compare-btn');
    const compareList = document.getElementById('compare-list');
    const compareNavItem = document.querySelector('.nav-compare-item');
    const clearCompareBtn = document.getElementById('clear-compare-btn');
    const selectedForCompare = new Set();

    function getNumericValue(value) {
      if (!value) return 0;
      const lower = value.toLowerCase();
      const numericMatch = lower.replace(/,/g, '').match(/\d+(?:\.\d+)?/g);
      const baseValue = numericMatch ? parseFloat(numericMatch.join('')) : 0;

      if (/acre/.test(lower)) {
        return baseValue * 43560;
      }

      return baseValue;
    }

    function extractSpecs(card) {
      const specElements = Array.from(card.querySelectorAll('.property-specs .spec-column p, .land-specs .spec-column p'));
      return specElements.map(spec => {
        const text = spec.textContent.trim();
        const [labelPart, ...valueParts] = text.split(':');
        const label = labelPart.trim();
        const value = valueParts.join(':').trim();
        const numeric = getNumericValue(value);
        return { label, value, numeric };
      });
    }

    function getCompareKey(card) {
      const type = card.dataset.type || 'property';
      const id = card.dataset.id || card.querySelector('h2')?.textContent.trim();
      return `${type}-${id}`;
    }

    function getCardData(card) {
      const titleEl = card.querySelector('.property-details h2:last-of-type, .land-details h2:last-of-type');
      const priceEl = card.querySelector('.price-band');
      const imageEl = card.querySelector('.main-image');
      const title = titleEl?.textContent.trim() || 'Property';
      return {
        id: card.dataset.id,
        type: card.dataset.type || 'property',
        title,
        price: priceEl?.textContent.trim() || '',
        image: imageEl?.src || '',
        specs: extractSpecs(card)
      };
    }

    function createCompareSideCard(data, side) {
      const sideCard = document.createElement('div');
           sideCard.className = `compare-card-side ${side}`;
      sideCard.innerHTML = `
        <div class="compare-card-header">
          <img src="${data.image}" alt="${data.title}" />
          <div>
            <p class="compare-card-price">${data.price}</p>
            <h3>${data.title}</h3>
          </div>
        </div>
      `;
      const specList = document.createElement('div');
      specList.className = 'compare-card-specs';
      data.specs.forEach(spec => {
        const row = document.createElement('div');
        row.className = 'compare-card-spec-row';
        row.innerHTML = `<span class="compare-spec-label">${spec.label}</span><span class="compare-spec-value">${spec.value}</span>`;
        specList.appendChild(row);
      });
      sideCard.appendChild(specList);
      return sideCard;
    }

    function buildCompareStats(left, right) {
      const labels = Array.from(new Set([...left.specs.map(s => s.label), ...right.specs.map(s => s.label)]));
      const compareBar = document.createElement('div');
      compareBar.className = 'compare-bar';

      labels.forEach(label => {
        const leftSpec = left.specs.find(s => s.label === label) || { value: '—', numeric: 0 };
        const rightSpec = right.specs.find(s => s.label === label) || { value: '—', numeric: 0 };
        const total = leftSpec.numeric + rightSpec.numeric;
        const leftPct = total > 0 ? Math.round((leftSpec.numeric / total) * 100) : 50;
        const rightPct = 100 - leftPct;
        let status = 'Even';
        if (leftSpec.numeric > rightSpec.numeric) {
          status = `${left.title} higher`;
        } else if (rightSpec.numeric > leftSpec.numeric) {
          status = `${right.title} higher`;
        }

        const row = document.createElement('div');
        row.className = 'compare-bar-row';
        const leftWin = leftSpec.numeric > rightSpec.numeric;
        const rightWin = rightSpec.numeric > leftSpec.numeric;
        row.innerHTML = `
          <div class="compare-bar-title">${label}</div>
          <div class="compare-bar-values">
            <span class="compare-value compare-value-left ${leftWin ? 'winner' : ''} ${rightWin ? 'loser' : ''}">${leftSpec.value}</span>
            <div class="compare-meter" aria-label="${label} comparison">
               <span class="meter-fill left-fill" style="width: ${leftPct}%;"></span>
              <span class="meter-fill right-fill" style="width: ${rightPct}%;"></span>
            </div>
            <span class="compare-value compare-value-right ${rightWin ? 'winner' : ''} ${leftWin ? 'loser' : ''}">${rightSpec.value}</span>
          </div>
          <div class="compare-bar-status">${status}</div>
        `;

        compareBar.appendChild(row);
      });

      return compareBar;
    }

    function renderCompareList() {
      compareList.innerHTML = '';
      compareList.classList.remove('compare-two-columns');

      const compareIds = Array.from(selectedForCompare);
      if (compareIds.length === 0) return;

      const compareData = compareIds.map(key => {
        const [type, id] = key.split('-');
        const selector = `[data-type="${type}"][data-id="${id}"]`;
        const card = document.querySelector(selector);
        return card ? getCardData(card) : null;
      }).filter(Boolean);

      if (compareData.length === 2) {
        compareList.classList.add('compare-two-columns');
       const leftCard = createCompareSideCard(compareData[0], 'left-card');
        const middleBar = buildCompareStats(compareData[0], compareData[1]);
        const rightCard = createCompareSideCard(compareData[1], 'right-card');
        compareList.appendChild(leftCard);
        compareList.appendChild(middleBar);
        compareList.appendChild(rightCard);
      } else {
        compareData.forEach(data => {
          const card = createCompareSideCard(data);
          card.classList.add('compare-card-side');
          compareList.appendChild(card);
        });
      }
    }

    function syncCompareButtons() {
      compareButtons.forEach(button => {
        const card = button.closest('.property-card, .land-card');
            const compareKey = card ? getCompareKey(card) : null;

        if (compareKey && selectedForCompare.has(compareKey)) {
          button.textContent = '✓ Added';
          button.classList.add('is-selected');
        } else {
          button.textContent = '⇄ Compare';
          button.classList.remove('is-selected');
        }
      });
    }

    function updateCompareControls() {
      syncCompareButtons();
      clearCompareBtn.disabled = selectedForCompare.size === 0;
      const compareSection = document.querySelector('.compare-section');
      compareSection?.classList.toggle('is-empty', selectedForCompare.size === 0);
      renderCompareList();
    }

    function clearCompareSelection() {
      if (!clearCompareBtn || clearCompareBtn.disabled) return;

      const compareSection = document.querySelector('.compare-section');
      clearCompareBtn.classList.remove('is-clearing');
      compareSection?.classList.remove('compare-resetting');
      void clearCompareBtn.offsetWidth;
      clearCompareBtn.classList.add('is-clearing');
      compareSection?.classList.add('compare-resetting');
      clearCompareBtn.textContent = 'Clearing...';

      window.setTimeout(() => {
        selectedForCompare.clear();
        compareNavItem?.classList.remove('active');
        clearCompareBtn.textContent = 'Clear';
        clearCompareBtn.classList.remove('is-clearing');
        compareSection?.classList.remove('compare-resetting');
        updateCompareControls();
      }, 450);
    }

    clearCompareBtn?.addEventListener('click', clearCompareSelection);

    compareButtons.forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.property-card, .land-card');

        if (!card) return;

        const compareKey = getCompareKey(card);
        if (selectedForCompare.has(compareKey)) {
          selectedForCompare.delete(compareKey);
          updateCompareControls();
          return;
        }

        if (selectedForCompare.size >= 2) {
          alert('You can compare up to 2 properties or land parcels at a time.');
          return;
        }

        selectedForCompare.add(compareKey);
        compareNavItem?.classList.remove('active');
        void compareNavItem?.offsetWidth;
        compareNavItem?.classList.add('active');
        updateCompareControls();

        if (selectedForCompare.size === 2) {
          document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const compareSection = document.querySelector('.compare-section');
          compareSection?.classList.remove('section-highlight');
          void compareSection?.offsetWidth;
          compareSection?.classList.add('section-highlight');
        }
      });
    });

    // ============================
    // BOOK VIEWING BUTTON
    // ============================
    const viewingButtons = document.querySelectorAll('.view-btn');

    viewingButtons.forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.property-card, .land-card');
        const title = card?.querySelector('h2')?.innerText || 'this property';

        const userName = prompt('Enter your name to book a viewing for ' + title);

        if (userName) {
          const subject = encodeURIComponent(`Viewing request for ${title}`);
          const body = encodeURIComponent(`Hello,\n\nI would like to book a viewing for ${title}.\n\nCustomer name: ${userName}`);
          window.location.href = `mailto:acuterealty2004@gmail.com?subject=${subject}&body=${body}`;
        }
      });
    });

    // ============================
    // CONTACT FORM
    // ============================
    const form = document.querySelector('form');

    if (form) {
      form.addEventListener('submit', function() {
        form.reset();
      });
    }

    // ============================
    // PROPERTY FILTERS (All / Houses / Land)
    // ============================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    function applyFilter(filter) {
      propertyCards.forEach(card => {
        const type = card.dataset.type || 'house';
        if (filter === 'all' || type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });

    function openEmail() {
      var Email = "YWN1dGVyZWFsdHkyMDA0QGdtYWlsLmNvbQ=="; // Base64 encoded email address
      var decodedEmail = atob(Email);
      window.location.href = "mailto:" + decodedEmail;
    }
