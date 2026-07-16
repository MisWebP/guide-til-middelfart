async function loadStops() {
  const response = await fetch("data/skulpturer.json");
  if (!response.ok) {
    throw new Error("Kunne ikke hente data/skulpturer.json");
  }
  return response.json();
}

function createIcon(stop) {
  return L.divIcon({
    className: `numbered-marker ${stop.type === "start" ? "start-marker" : ""}`,
    html: stop.type === "start" ? "CLAY" : stop.number,
    iconSize: stop.type === "start" ? [52, 36] : [36, 36]
  });
}

function addStopList(stops) {
  const list = document.getElementById("stop-list");

  stops.forEach(stop => {
    const article = document.createElement("article");
    article.className = "stop-card";
    article.innerHTML = `
      <h3>${stop.type === "start" ? "Start" : stop.number + "."} ${stop.title}</h3>
      <p><strong>${stop.artist || ""}${stop.year ? " · " + stop.year : ""}</strong></p>
      <p>${stop.location}</p>
      <p>${stop.text}</p>
    `;
    list.appendChild(article);
  });
}

async function init() {
  const stops = await loadStops();

  const map = L.map("map", {
    scrollWheelZoom: false
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap-bidragydere'
  }).addTo(map);

  const points = [];

  stops.forEach(stop => {
    const coords = [stop.lat, stop.lng];
    points.push(coords);

    L.marker(coords, { icon: createIcon(stop) })
      .addTo(map)
      .bindPopup(`
        <h3>${stop.title}</h3>
        <p><strong>${stop.artist || ""}${stop.year ? " · " + stop.year : ""}</strong></p>
        <p>${stop.location}</p>
        <p>${stop.text}</p>
      `);
  });

  if (points.length > 1) {
    L.polyline(points, {
      color: "#ad593d",
      weight: 5,
      opacity: 0.85,
      lineJoin: "round"
    }).addTo(map);
  }

  map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
  L.control.scale({ imperial: false }).addTo(map);

  addStopList(stops);
}

init().catch(error => {
  console.error(error);
  document.getElementById("map").innerHTML =
    "<p style='padding:24px'>Kortet kunne ikke indlæses. Åbn siden via en webserver eller GitHub Pages.</p>";
});
