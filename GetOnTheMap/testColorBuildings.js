mapboxgl.accessToken =
  "pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsZ2pmNGhnNDAyZXAzbG00bTYxMGZiaDcifQ.RA09ZYFkRR-98BPbvYn3kQ";

////////////////////////////////////// adding map  /////////////////////////////////////////////////////////

const map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
  style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
  center: [-3.374294163506452, 47.76508753458999],
  zoom: 15,
  pitch: 45,
  bearing: -17.6,
  container: "map",
  antialias: true,
});

////////////////////////////////////// adding map  /////////////////////////////////////////////////////////

map.on("load", () => {
  map.setPaintProperty("building-extrusion", "fill-extrusion-color", [
    "interpolate",
    // Set the exponential rate of change to 0.5
    ["exponential", 0.5],
    ["zoom"],
    // When zoom is 15, buildings will be beige.
    15,
    "green",
    // When zoom is 18 or higher, buildings will be yellow.
    18,
    "#ffd700",
  ]);

  ////////////////////////////////////// setPainProperty  /////////////////////////////////////////////////////////
  // On change les propriétés d'affichage de la couche visée.

  map.setPaintProperty("building-extrusion", "fill-extrusion-opacity", [
    "interpolate",
    // Set the exponential rate of change to 0.5
    ["exponential", 0.5],
    ["zoom"],
    // When zoom is 10, buildings will be 100% transparent.
    15,
    0.8,
    // When zoom is 18 or higher, buildings will be 100% opaque.
    18,
    0,
  ]);
});

// When the button is clicked, zoom in to zoom level 19.
// The animation duration is 9000 milliseconds.
document.getElementById("zoom").addEventListener("click", () => {
  map.zoomTo(18, { duration: 9000 });
});
