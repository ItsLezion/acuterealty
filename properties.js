const properties = [
  {
    id: 1,
    type: "house",
    name: "Brittens New Road",
    location: "St. Michael",
    price: 225000,
    beds: 4,
    baths: 3,
    size: "3,200 sq ft",
    tag: "Available",
    desc: "A family fixer-upper with a spacious backyard in an active city neighbourhood. Schools, shopping centres and parks are nearby.",
    address: "Brittens New Road, St. Michael",
    image: "assets/britt house.jpg",
    gallery: [
      "assets/britt house.jpg",
      "assets/britt1.jpeg",
      "assets/brit2.jpeg",
      "assets/britt3.jpeg",
      "assets/britt4.jpeg",
      "assets/britt5.jpeg",
      "assets/britt6.jpeg",
      "assets/britt7.jpeg",
      "assets/britt8.jpeg",
      "assets/britt9.jpeg",
      "assets/britt10.jpeg",
      "assets/britt11.jpeg",
    ],
  },
  {
    id: 2,
    type: "house",
    name: "Enterprise Residence",
    location: "Christ Church",
    price: 683000,
    beds: 4,
    baths: 3,
    size: "2+ acres",
    tag: "Available",
    desc: "Set on approximately 2.289 acres in Enterprise, this property is about seven minutes from Miami Beach and Oistins. It offers a residential setting with room for small-scale crop production and the opportunity to make the home your own.",
    address: "Enterprise, Christ Church",
    image: "assets/Enterprise.avif",
    gallery: [
      "assets/Enterprise.avif",
      "assets/enterprise1.jpeg",
      "assets/enterprise2.jpeg",
      "assets/enterprise3.jpeg",
      "assets/enterprise4.jpeg",
    ],
  },
  {
    id: 3,
    type: "house",
    name: "Harmony Lodge Residence",
    location: "St. Philip",
    price: 450000,
    beds: 6,
    baths: 4,
    size: "4,377 sq ft",
    tag: "Available",
    desc: "A three-bedroom, two-bathroom home with one-bedroom and two-bedroom apartments downstairs. The property needs an upgrade, with potential for rental income after completion, and sits on approximately 4,500 square feet.",
    address: "Harmony Lodge, St. Philip",
    image: "assets/Harmony.avif",
    gallery: ["assets/Harmony.avif", "assets/harmony1.jpeg"],
  },
  {
    id: 4,
    type: "house",
    name: "Bel Air Terrace Home",
    location: "St. Philip",
    price: 325000,
    beds: 2,
    baths: 1,
    size: "5,269 sq ft",
    tag: "Available",
    desc: "A two-bedroom home in the Bel Air neighbourhood, minutes from amenities at Six Roads and the airport. The property needs an upgrade and offers room to make it your own.",
    address: "Bel Air Terrace, St. Philip",
    image: "assets/Bell Air.avif",
    gallery: ["assets/Bell Air.avif", "assets/bell1.jpeg", "assets/bell2.jpeg", "assets/bell3.jpeg"],
  },
  {
    id: 5,
    type: "house",
    name: "Cadogan Road Residence",
    location: "St. Michael",
    price: 850000,
    beds: 3,
    baths: 2,
    size: "7,746 sq ft lot",
    tag: "Available",
    desc: "An elevated three-bedroom, two-bathroom home on 7,746 square feet, with harbour and cruise-ship views from the large rear verandah. Two ground-floor apartments offer income potential, and the property would benefit from an upgrade.",
    address: "Cadogan Road, St. Michael",
    image: "assets/graz1.jpeg",
    gallery: ["assets/graz1.jpeg", "assets/graz2.jpeg", "assets/graz3.jpeg", "assets/graz4.jpeg", "assets/graz5.jpeg"],
  },
  {
    id: 6,
    type: "house",
    name: "Strathclyde Home",
    location: "St. Michael",
    price: 445000,
    beds: 3,
    baths: 1,
    size: "5,000 sq ft",
    tag: "Available",
    desc: "A vintage home in the established Strathclyde neighbourhood, within minutes of Bridgetown and Eagle Hall. Its location offers quick access to the commercial hub of Barbados.",
    address: "Strathclyde, St. Michael",
    image: "assets/strath1.jpg",
    gallery: ["assets/strath1.jpg", "assets/strath2.jpg"],
  },
  {
    id: 7,
    type: "land",
    name: "Chimborazo Lot",
    location: "St. Joseph",
    price: 230000,
    beds: 0,
    baths: 0,
    size: "13,411 sq ft",
    tag: "Available",
    desc: "A parcel in a peaceful neighbourhood on the outskirts of the city, suited to a countryside-style home while remaining within reach of restaurants, gardens and other amenities.",
    address: "Chimborazo, St. Joseph",
    image: "assets/Chimbo.avif",
    gallery: ["assets/Chimbo.avif"],
  },
  {
    id: 8,
    type: "land",
    name: "Cottage Vale Lot",
    location: "St. Philip",
    price: 119200,
    beds: 0,
    baths: 0,
    size: "7,450 sq ft",
    tag: "Available",
    desc: "A homesite in a desirable neighbourhood with convenient access to local bars, restaurants, shopping centres and a gym.",
    address: "Cottage Vale, St. Philip",
    image: "assets/cottage.avif",
    gallery: ["assets/cottage.avif"],
  },
  {
    id: 9,
    type: "land",
    name: "Whitehall Lot 1",
    location: "St. Michael",
    price: 150000,
    beds: 0,
    baths: 0,
    size: "7,364.67 sq ft",
    tag: "Available",
    desc: "A parcel in a convenient area close to essential services, including schools, restaurants and supermarkets.",
    address: "Whitehall, St. Michael",
    image: "assets/whitehall.avif",
    gallery: ["assets/whitehall.avif"],
  },
  {
    id: 10,
    type: "land",
    name: "Rollins Road Lot 2",
    location: "Christ Church",
    price: 119479,
    beds: 0,
    baths: 0,
    size: "5,973.97 sq ft",
    tag: "Available",
    desc: "Approximately 5,973.97 square feet in the Rollins Road area, about ten minutes from Miami Beach and Oistins.",
    address: "Rollins Road, Christ Church",
    image: "assets/rollins.avif",
    gallery: ["assets/rollins.avif"],
  },
  {
    id: 11,
    type: "land",
    name: "Morning Rise Lot 38",
    location: "St. Philip",
    price: 105000,
    beds: 0,
    baths: 0,
    size: "5,389.49 sq ft",
    tag: "Available",
    desc: "A parcel of approximately 5,389.49 square feet on Pemberton Avenue in the Morning Rise development.",
    address: "Morning Rise, St. Philip",
    image: "assets/morningRise.jpeg",
    gallery: ["assets/morningRise.jpeg"],
  },
];

function money(n) {
  return "BDS $" + n.toLocaleString("en-US");
}

function card(p, showCompare = false) {
  const saved = JSON.parse(localStorage.getItem("acuteFavorites") || "[]").includes(p.id);

  return `
    <article class="property-card" data-id="${p.id}" data-type="${p.type}" tabindex="0" aria-label="Open ${p.name} property details">
      <div class="property-image" style="background-image:url('${p.image}')">
        <span class="tag">${p.tag}</span>
        <button class="heart ${saved ? "saved" : ""}" data-action="favorite" data-id="${p.id}" aria-label="${saved ? "Remove" : "Save"} ${p.name} from favorites">
          ${saved ? "♥" : "♡"}
        </button>
      </div>
      <div class="property-info">
        <div class="location">${p.location}</div>
        <div class="price">${money(p.price)}</div>
        <h3>${p.name}</h3>
        <div class="property-meta">
          ${p.beds ? `<span>${p.beds} Beds</span>` : ""}
          ${p.baths ? `<span>${p.baths} Baths</span>` : ""}
          <span>${p.size}</span>
        </div>
        <div class="property-card-actions">
          <a class="text-link" href="property.html?id=${p.id}">View property →</a>
          ${showCompare ? `<button class="compare-btn" data-action="compare" data-id="${p.id}" type="button">⇄ Compare</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

function toggleFavorite(id) {
  let fav = JSON.parse(localStorage.getItem("acuteFavorites") || "[]");
  fav = fav.includes(id) ? fav.filter((x) => x !== id) : [...fav, id];
  localStorage.setItem("acuteFavorites", JSON.stringify(fav));
  updateFavCount();

  if (document.getElementById("favoritesGrid")) {
    renderFavorites();
  } else if (document.getElementById("propertyGrid")) {
    renderProperties();
  } else if (document.getElementById("featuredGrid")) {
    renderFeatured();
  }
}

function updateFavCount() {
  const favCount = document.getElementById("favCount");
  if (favCount) {
    favCount.textContent = JSON.parse(localStorage.getItem("acuteFavorites") || "[]").length;
  }
}

function renderFeatured() {
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    featuredGrid.innerHTML = properties.slice(0, 3).map((p) => card(p)).join("");
  }
}

function renderProperties() {
  const grid = document.getElementById("propertyGrid");
  if (!grid) {
    return;
  }

  const type = document.getElementById("filterType")?.value || "all";
  const loc = document.getElementById("filterLocation")?.value || "all";
  const price = document.getElementById("filterPrice")?.value || "all";
  const beds = document.getElementById("filterBeds")?.value || "all";

  const result = properties.filter(
    (p) =>
      (type === "all" || p.type === type) &&
      (loc === "all" || p.location === loc) &&
      (price === "all" || p.price <= Number(price)) &&
      (beds === "all" || p.beds >= Number(beds)),
  );

  grid.innerHTML = result.length
    ? result.map((p) => card(p, true)).join("")
    : '<div class="empty-state" style="grid-column:1/-1"><h2>No matching properties</h2><p>Try changing your filters.</p></div>';

  const count = document.getElementById("resultCount");
  if (count) {
    count.textContent = `${result.length} ${result.length === 1 ? "property" : "properties"} found`;
  }

  renderCompareList();
}

function renderFavorites() {
  const grid = document.getElementById("favoritesGrid");
  const empty = document.getElementById("emptyFavorites");

  if (!grid) {
    return;
  }

  const ids = JSON.parse(localStorage.getItem("acuteFavorites") || "[]");
  const result = properties.filter((p) => ids.includes(p.id));

  grid.innerHTML = result.map((p) => card(p)).join("");

  if (empty) {
    empty.hidden = result.length > 0;
  }
}

function renderDetail() {
  const root = document.getElementById("propertyDetails");
  if (!root) {
    return;
  }

  const id = Number(new URLSearchParams(location.search).get("id"));
  const p = properties.find((x) => x.id === id);

  if (!p) {
    root.innerHTML = `
      <section class="section">
        <div class="container">
          <h2>Property not found.</h2>
          <a class="btn btn-dark" href="properties.html">Back to properties</a>
        </div>
      </section>
    `;
    return;
  }

  const images = p.gallery || [p.image];

  root.innerHTML = `
    <section class="property-detail">
      <div class="container">
        <div class="detail-gallery" id="detailGallery" data-gallery-index="0">
          <div class="gallery-main-wrap">
            <button class="gallery-image-button" data-gallery-action="zoom" type="button" aria-label="Enlarge property photo">
              <img class="main-img" src="${images[0]}" alt="${p.name} property photo" />
            </button>
            <button class="image-nav-btn prev" data-gallery-action="previous" type="button" aria-label="Show previous photo">←</button>
            <button class="image-nav-btn next" data-gallery-action="next" type="button" aria-label="Show next photo">→</button>
          </div>

          <div class="gallery-thumbnails">
            ${images
              .map(
                (image, index) => `
                <button class="gallery-thumb ${index === 0 ? "active" : ""}" data-gallery-action="select" data-index="${index}" type="button" aria-label="Show photo ${index + 1}">
                  <img src="${image}" alt="" />
                </button>
              `,
              )
              .join("")}
          </div>
        </div>

        <div class="detail-content">
          <div>
            <p class="eyebrow">${p.tag}</p>
            <h1 class="detail-title">${p.name}</h1>
            <p class="location">${p.address}, Barbados</p>
            <div class="detail-price">${money(p.price)}</div>
            <div class="detail-meta">
              ${p.beds ? `<span>${p.beds} Bedrooms</span>` : ""}
              ${p.baths ? `<span>${p.baths} Bathrooms</span>` : ""}
              <span>${p.size}</span>
            </div>

            <h2>About this property</h2>
            <p>${p.desc}</p>

            <div class="detail-map">
              <h2>Location</h2>
              <iframe
                title="Map of ${p.address}"
                src="https://www.google.com/maps?q=${encodeURIComponent(p.address + ", Barbados")}&output=embed"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <section class="booking" id="viewingForm" aria-labelledby="viewingHeading">
            <h3 id="viewingHeading">Book a viewing</h3>
            <input required name="name" autocomplete="name" maxlength="100" placeholder="Your name" />
            <input required name="email" type="email" autocomplete="email" maxlength="254" placeholder="Email address" />

            <label for="viewingDate">Preferred date</label>
            <input required id="viewingDate" name="date" type="date" />

            <select name="time" aria-label="Preferred time">
              <option value="">Preferred time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>

            <textarea name="message" rows="4" maxlength="1000" placeholder="Message"></textarea>
            <button class="btn btn-dark" id="requestViewingButton" type="button">Request viewing</button>
            <p class="form-message" id="viewingMessage" aria-live="polite">
              Your email app will open with a draft. Review it and send it from your email account.
            </p>
          </section>
        </div>
      </div>
    </section>

    <dialog class="image-modal" id="imageModal" aria-label="Property photo">
      <button class="modal-close" type="button" aria-label="Close photo">×</button>
      <img id="modalImage" alt="" />
    </dialog>
  `;

  const viewingPanel = document.getElementById("viewingForm");
  document.getElementById("requestViewingButton")?.addEventListener("click", () => {
    const fields = [...viewingPanel.querySelectorAll("input[required]")];
    if (fields.some((field) => !field.reportValidity())) {
      return;
    }

    const formData = new FormData();
    viewingPanel.querySelectorAll("[name]").forEach((field) => formData.set(field.name, field.value));

    const subject = `Viewing request: ${p.name}`;
    const body = [
      "Hello Acute Realty,",
      "",
      `I would like to request a viewing for ${p.name} (${p.address}).`,
      "",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Preferred date: ${formData.get("date")}`,
      `Preferred time: ${formData.get("time") || "Not specified"}`,
      `Message: ${formData.get("message") || "None"}`,
    ].join("\n");

    openEmail(subject, body);
  });

}

const selectedForCompare = new Set();

function toggleCompare(id) {
  if (selectedForCompare.has(id)) {
    selectedForCompare.delete(id);
  } else if (selectedForCompare.size >= 2) {
    window.alert("You can compare up to two properties at a time.");
    return;
  } else {
    selectedForCompare.add(id);
  }

  renderCompareList();
}

function renderCompareList() {
  const list = document.getElementById("compareList");
  if (!list) {
    return;
  }

  const chosen = properties.filter((p) => selectedForCompare.has(p.id));

  list.innerHTML = chosen.length
    ? chosen
        .map(
          (p) => `
          <article class="compare-property">
            <img src="${p.image}" alt="" />
            <div>
              <p class="eyebrow">${p.type}</p>
              <h3>${p.name}</h3>
              <p>${p.location}</p>
              <strong>${money(p.price)}</strong>
              <dl>
                ${p.beds ? `<div><dt>Bedrooms</dt><dd>${p.beds}</dd></div>` : ""}
                ${p.baths ? `<div><dt>Bathrooms</dt><dd>${p.baths}</dd></div>` : ""}
                <div><dt>Size</dt><dd>${p.size}</dd></div>
              </dl>
            </div>
          </article>
        `,
        )
        .join("")
    : '<p class="compare-empty">Choose up to two listings above to compare them here.</p>';

  if (chosen.length === 2) {
    const sizeValue = (p) => {
      const match = p.size.replace(/,/g, "").match(/[\d.]+/);
      const value = match ? Number(match[0]) : 0;
      return /acre/i.test(p.size) ? value * 43560 : value;
    };

    const metrics = [
      {
        label: "Price",
        left: chosen[0].price,
        right: chosen[1].price,
        leftText: money(chosen[0].price),
        rightText: money(chosen[1].price),
      },
      {
        label: "Bedrooms",
        left: chosen[0].beds,
        right: chosen[1].beds,
        leftText: chosen[0].beds || "—",
        rightText: chosen[1].beds || "—",
      },
      {
        label: "Bathrooms",
        left: chosen[0].baths,
        right: chosen[1].baths,
        leftText: chosen[0].baths || "—",
        rightText: chosen[1].baths || "—",
      },
      {
        label: "Area",
        left: sizeValue(chosen[0]),
        right: sizeValue(chosen[1]),
        leftText: chosen[0].size,
        rightText: chosen[1].size,
      },
    ];

    list.insertAdjacentHTML(
      "beforeend",
      `<div class="compare-stats">${metrics
        .map((metric) => {
          const total = metric.left + metric.right;
          const leftWidth = total ? Math.round((metric.left / total) * 100) : 50;
          const status =
            metric.left === metric.right
              ? "Even"
              : `${metric.left > metric.right ? chosen[0].name : chosen[1].name} higher`;

          return `
            <div class="compare-stat">
              <div class="compare-stat-head">
                <strong>${metric.label}</strong>
                <span>${metric.leftText} vs ${metric.rightText}</span>
              </div>
              <div class="compare-meter">
                <span class="left-meter" style="width:${leftWidth}%"></span>
                <span class="right-meter" style="width:${100 - leftWidth}%"></span>
              </div>
              <p>${status}</p>
            </div>
          `;
        })
        .join("")}</div>`,
    );
  }

  const clear = document.getElementById("clearCompare");
  if (clear) {
    clear.disabled = chosen.length === 0;
  }

  document.querySelectorAll("[data-action='compare']").forEach((button) => {
    const isSelected = selectedForCompare.has(Number(button.dataset.id));
    button.classList.toggle("is-selected", isSelected);
    button.textContent = isSelected ? "✓ Added" : "⇄ Compare";
  });
}
