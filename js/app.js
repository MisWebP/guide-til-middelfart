const DATA_URL = "data/skulpturer.json";

const state = {
  stops: [],
  map: null,
  markers: new Map(),
  userMarker: null
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function placeholder(value, fallback) {
  return value && String(value).trim() ? value : fallback;
}

function markerIcon(stop) {
  const isStart = stop.type === "start";
  return L.divIcon({
    className: "",
    html: `<div class="${isStart ? "marker-start" : "marker-number"}">${isStart ? "CLAY" : stop.nummer}</div>`,
    iconSize: isStart ? [58, 38] : [38, 38],
    iconAnchor: isStart ? [29, 19] : [19, 19],
    popupAnchor: [0, -22]
  });
}

function popupHtml(stop) {
  const label = stop.type === "start" ? "Start" : `Værk ${stop.nummer}`;
  const meta = [stop.kunstner, stop.aar].filter(Boolean).join(" · ");
  return `
    <strong>${escapeHtml(label)}: ${escapeHtml(stop.titel)}</strong><br>
    ${meta ? `${escapeHtml(meta)}<br>` : ""}
    <span>${escapeHtml(stop.placering)}</span><br>
    ${stop.type !== "start" ? `<button type="button" class="popup-open" data-id="${escapeHtml(stop.id)}">Åbn værket</button>` : ""}
  `;
}

function initMap(stops) {
  if (typeof L === "undefined") {
    throw new Error("Leaflet kunne ikke indlæses.");
  }

  const map = L.map("map", { scrollWheelZoom: false, zoomControl: true });
  state.map = map;

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const coordinates = stops.map(stop => [stop.lat, stop.lng]);

  L.polyline(coordinates, {
    color: "#b75d3f",
    weight: 5,
    opacity: .82,
    dashArray: "2 10",
    lineCap: "round"
  }).addTo(map);

  stops.forEach(stop => {
    const marker = L.marker([stop.lat, stop.lng], { icon: markerIcon(stop) })
      .addTo(map)
      .bindPopup(popupHtml(stop));
    state.markers.set(stop.id, marker);
  });

  map.fitBounds(L.latLngBounds(coordinates), { padding: [42, 42] });
  L.control.scale({ imperial: false }).addTo(map);

  map.on("popupopen", event => {
    const button = event.popup.getElement()?.querySelector(".popup-open");
    if (button) button.addEventListener("click", () => openWork(button.dataset.id));
  });
}

function workCard(stop) {
  const meta = [stop.kunstner, stop.aar].filter(Boolean).join(" · ");
  return `
    <button class="work-card" type="button" data-id="${escapeHtml(stop.id)}">
      <span class="work-number">${stop.nummer}</span>
      <span>
        <h3>${escapeHtml(stop.titel)}</h3>
        <span class="work-meta">${escapeHtml(meta)} · ${escapeHtml(stop.placering)}</span>
      </span>
      <span class="work-arrow" aria-hidden="true">›</span>
    </button>
  `;
}

function renderWorks(stops) {
  const artworks = stops.filter(stop => stop.type !== "start");
  const list = document.getElementById("work-list");
  list.innerHTML = artworks.map(workCard).join("");
  list.querySelectorAll(".work-card").forEach(button => {
    button.addEventListener("click", () => openWork(button.dataset.id));
  });
}

function openWork(id) {
  const stop = state.stops.find(item => item.id === id);
  if (!stop) return;

  const meta = [stop.kunstner, stop.aar].filter(Boolean).join(" · ");
  const image = stop.billede
    ? `<img class="work-image" src="${escapeHtml(stop.billede)}" alt="${escapeHtml(stop.titel)}">`
    : `<div class="placeholder-image">Her kommer et billede af værket.<br>Indtil da må fantasien varme op.</div>`;

  document.getElementById("dialog-content").innerHTML = `
    <article class="dialog-inner">
      <p class="dialog-label">Værk ${stop.nummer}</p>
      <h2 class="dialog-title" id="dialog-title">${escapeHtml(stop.titel)}</h2>
      <p class="dialog-meta">${escapeHtml(meta)} · ${escapeHtml(stop.placering)}</p>
      ${image}
      <section class="story-block">
        <p>${escapeHtml(placeholder(stop.introduktion, "Her kommer en kort introduktion til værket."))}</p>
      </section>
      <section class="callout callout--look">
        <h3>Kig op</h3>
        <p>${escapeHtml(placeholder(stop.kig_op, "Her kommer en kort tekst, der inviterer dig til at lægge mærke til en detalje omkring værket."))}</p>
      </section>
      <section class="story-block">
        <h3>Historien bag</h3>
        <p>${escapeHtml(placeholder(stop.historien_bag, "Her kommer fortællingen om værket, kunstneren eller stedet."))}</p>
      </section>
      <section class="callout callout--tip">
        <h3>Mit tip</h3>
        <p>${escapeHtml(placeholder(stop.mit_tip, "Her kommer en lokal anbefaling eller en lille omvej, der er værd at tage."))}</p>
      </section>
      <section class="next-work">
        <h3>Næste værk</h3>
        <p>${escapeHtml(placeholder(stop.naeste_vaerk_tekst, "Her kommer en enkel vejvisning til næste værk."))}</p>
        ${stop.maps_url ? `<a class="map-link" href="${escapeHtml(stop.maps_url)}" target="_blank" rel="noopener">Åbn stedet i kort-app</a>` : ""}
      </section>
    </article>
  `;

  const dialog = document.getElementById("work-dialog");
  dialog.showModal();
}

function setupDialog() {
  const dialog = document.getElementById("work-dialog");
  document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

function setupLocation() {
  const button = document.getElementById("locate-button");
  button.addEventListener("click", () => {
    if (!navigator.geolocation) {
      document.getElementById("map-status").textContent = "Din browser understøtter ikke positionsvisning.";
      return;
    }
    document.getElementById("map-status").textContent = "Finder din placering …";
    navigator.geolocation.getCurrentPosition(position => {
      const coords = [position.coords.latitude, position.coords.longitude];
      if (state.userMarker) state.userMarker.remove();
      state.userMarker = L.circleMarker(coords, {
        radius: 9,
        color: "#fff",
        weight: 3,
        fillColor: "#245ca6",
        fillOpacity: 1
      }).addTo(state.map).bindPopup("Du er her").openPopup();
      state.map.setView(coords, 16);
      document.getElementById("map-status").textContent = "Din placering vises på kortet.";
    }, () => {
      document.getElementById("map-status").textContent = "Placeringen kunne ikke hentes. Tjek browserens tilladelse.";
    }, { enableHighAccuracy: true, timeout: 10000 });
  });
}

async function init() {
  setupDialog();
  setupLocation();

  const response = await fetch(DATA_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Datafilen svarede med ${response.status}`);
  const stops = await response.json();

  state.stops = stops;
  initMap(stops);
  renderWorks(stops);
  document.getElementById("map-status").textContent = "Kortet er klar.";
}

init().catch(error => {
  console.error(error);
  document.getElementById("map-status").textContent = "Kortet kunne ikke indlæses.";
  document.getElementById("map").innerHTML = `
    <div style="padding:2rem;max-width:34rem">
      <h2>Kortet tog en lille omvej</h2>
      <p>Kontrollér, at <code>data/skulpturer.json</code> og <code>js/app.js</code> ligger i de rigtige mapper, og at siden åbnes via GitHub Pages.</p>
    </div>`;
});
