
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

    const compareButtons = document.querySelectorAll('.compare-btn');
    const compareList = document.getElementById('compare-list');
    const compareNavItem = document.querySelector('.nav-compare-item');
    const clearCompareBtn = document.getElementById('clear-compare-btn');
    const selectedForCompare = new Set();

    function syncCompareButtons() {
      compareButtons.forEach(button => {
        const card = button.closest('.property-card, .land-card');
        const cardId = card?.dataset.id;

        if (cardId && selectedForCompare.has(cardId)) {
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
    }

    function clearCompareSelection() {
      compareList.innerHTML = '';
      selectedForCompare.clear();
      compareNavItem?.classList.remove('active');
      updateCompareControls();
    }

    clearCompareBtn?.addEventListener('click', clearCompareSelection);

    compareButtons.forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.property-card, .land-card');

        if (!card) return;

        const propertyId = card.dataset.id || card.querySelector('h2')?.textContent.trim();
        const existingItem = compareList.querySelector(`[data-property-id="${propertyId}"]`);

        if (existingItem) {
          existingItem.remove();
          selectedForCompare.delete(propertyId);
          updateCompareControls();
          return;
        }

        if (selectedForCompare.size >= 2) {
          alert('You can compare up to 2 properties at a time.');
          return;
        }

        const compareItem = card.cloneNode(true);
        compareItem.classList.add('saved-item', 'compare-card');
        compareItem.dataset.propertyId = propertyId;
        compareItem.querySelectorAll('.card-buttons').forEach(btn => btn.remove());

        compareList.appendChild(compareItem);
        selectedForCompare.add(propertyId);
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


    const form = document.querySelector('form');

    if (form) {
      form.addEventListener('submit', function() {
        form.reset();
      });
    }

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
      var Email = "YWN1dGVyZWFsdHkyMDA0QGdtYWlsLmNvbQ==";
      var decodedEmail = atob(Email);
      window.location.href = "mailto:" + decodedEmail;
    }
