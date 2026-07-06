
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
