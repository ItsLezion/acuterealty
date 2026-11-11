document.addEventListener("DOMContentLoaded", () => {
  updateFavCount();
  renderFeatured();
  renderProperties();
  renderFavorites();
  renderDetail();

  const heroSlideshow = document.querySelector(".hero-slideshow");

  if (heroSlideshow && typeof properties !== "undefined") {
    const slides = properties.map((property, index) => {
      const image = document.createElement("img");
      image.className = `hero-slide${index === 0 ? " is-active" : ""}`;
      image.src = property.image;
      image.alt = "";
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";
      heroSlideshow.append(image);
      return image;
    });

    if (slides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let activeIndex = 0;
      window.setInterval(() => {
        slides[activeIndex].classList.remove("is-active");
        activeIndex = (activeIndex + 1) % slides.length;
        slides[activeIndex].classList.add("is-active");
      }, 6000);
    }
  }

  document.querySelector(".menu-toggle")?.addEventListener("click", () => {
    document.querySelector(".nav")?.classList.toggle("open");
  });

  document.querySelectorAll("[data-email-action]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openEmail();
    });
  });

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action], [data-gallery-action], .modal-close");

    if (action) {
      event.stopPropagation();

      if (action.dataset.action === "favorite") {
        toggleFavorite(Number(action.dataset.id));
      }

      if (action.dataset.action === "compare") {
        toggleCompare(Number(action.dataset.id));
      }

      if (action.dataset.galleryAction) {
        handleGalleryAction(action);
      }

      if (action.classList.contains("modal-close")) {
        document.getElementById("imageModal")?.close();
      }

      return;
    }

    const card = event.target.closest(".property-card[data-id]");
    if (card && !event.target.closest("a,button")) {
      location.href = `property.html?id=${card.dataset.id}`;
    }
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target.closest(".property-card[data-id]");

    if (card && (event.key === "Enter" || event.key === " ") && !event.target.closest("a,button")) {
      event.preventDefault();
      location.href = `property.html?id=${card.dataset.id}`;
    }
  });

  document.getElementById("clearCompare")?.addEventListener("click", () => {
    selectedForCompare.clear();
    renderCompareList();
  });

  const modal = document.getElementById("imageModal");
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  document.getElementById("heroSearch")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      type: document.getElementById("heroType").value,
      location: document.getElementById("heroLocation").value,
      price: document.getElementById("heroPrice").value,
    });

    location.href = "properties.html?" + params.toString();
  });

  ["filterType", "filterLocation", "filterPrice", "filterBeds"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", renderProperties);
  });

  document.getElementById("clearFilters")?.addEventListener("click", (e) => {
    e.preventDefault();

    ["filterType", "filterLocation", "filterPrice", "filterBeds"].forEach((id) => {
      const field = document.getElementById(id);
      if (field) {
        field.value = "all";
      }
    });

    renderProperties();
  });

  const params = new URLSearchParams(location.search);

  if (document.getElementById("propertyGrid")) {
    if (params.get("type")) {
      document.getElementById("filterType").value = params.get("type");
    }

    if (params.get("location")) {
      document.getElementById("filterLocation").value = params.get("location");
    }

    if (params.get("price")) {
      document.getElementById("filterPrice").value = params.get("price");
    }

    renderProperties();
  }

  const gallery = document.getElementById("detailGallery");
  let touchStartX = 0;

  gallery?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true },
  );

  gallery?.addEventListener(
    "touchend",
    (event) => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) > 50) {
        changeGalleryImage(distance < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );

});

function openEmail(subject = "", body = "") {
  const encodedEmail = "YWN1dGVyZWFsdHkyMDA0QGdtYWlsLmNvbQ==";
  const params = [];

  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }

  window.location.href = `mailto:${atob(encodedEmail)}${params.length ? `?${params.join("&")}` : ""}`;
}

function changeGalleryImage(offset) {
  const gallery = document.getElementById("detailGallery");
  if (!gallery) {
    return;
  }

  const images = properties.find((p) => p.id === Number(new URLSearchParams(location.search).get("id")))?.gallery || [];
  if (!images.length) {
    return;
  }

  const current = Number(gallery.dataset.galleryIndex || 0);
  setGalleryImage((current + offset + images.length) % images.length);
}

function setGalleryImage(index) {
  const gallery = document.getElementById("detailGallery");
  const image = gallery?.querySelector(".main-img");

  if (!gallery || !image) {
    return;
  }

  const property = properties.find((p) => p.id === Number(new URLSearchParams(location.search).get("id")));
  const images = property?.gallery || [];

  if (!images[index]) {
    return;
  }

  gallery.dataset.galleryIndex = String(index);
  image.src = images[index];
  image.alt = `${property.name} property photo ${index + 1}`;

  gallery.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

function handleGalleryAction(action) {
  if (action.dataset.galleryAction === "previous") {
    changeGalleryImage(-1);
  }

  if (action.dataset.galleryAction === "next") {
    changeGalleryImage(1);
  }

  if (action.dataset.galleryAction === "select") {
    setGalleryImage(Number(action.dataset.index));
  }

  if (action.dataset.galleryAction === "zoom") {
    const gallery = document.getElementById("detailGallery");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const mainImage = gallery?.querySelector(".main-img");

    if (modal && modalImage && mainImage) {
      modalImage.src = mainImage.src;
      modalImage.alt = mainImage.alt;
      modal.showModal();
    }
  }
}
