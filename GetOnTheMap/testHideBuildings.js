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

////////////////////////////////////// adding geojson /////////////////////////////////////////////////////////

map.on("load", () => {
  // Add a data source containing GeoJSON data.
  map.addSource("perim", {
    type: "geojson",
    data: "../sources/perim.geojson",
  });

  // Add a new layer to visualize the polygon.
  map.addLayer({
    id: "perim",
    type: "fill",
    source: "perim", // reference the data source
    layout: {},
    paint: {
      "fill-color": "#0080ff", // blue color fill
      "fill-opacity": 0.5,
    },
  });
});
