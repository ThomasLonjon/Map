mapboxgl.accessToken =
  "pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsZ2pmNGhnNDAyZXAzbG00bTYxMGZiaDcifQ.RA09ZYFkRR-98BPbvYn3kQ";

////////////////////////////////////// adding map  /////////////////////////////////////////////////////////

const map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
  style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
  center: [2.346402507560419, 48.85486527430587],
  zoom: 11,
  pitch: 45,
  bearing: -17.6,
  container: "map",
  antialias: true,
});

////////////////////////////////////// load boundaries  /////////////////////////////////////////////////////////

map.on("load", function () {
  // Add a vector source for admin-1 boundaries
  map.addSource("admin-1", {
    type: "vector",
    url: "mapbox://mapbox.boundaries-adm1-v4",
    promoteId: "mapbox_id",
  });

  // Define a filter for US worldview boundaries
  let worldviewFilter = [
    "any",
    ["==", "all", ["get", "worldview"]],
    ["in", "US", ["get", "worldview"]],
  ];

  // Add a style layer with the admin-1 source below map labels
  map.addLayer(
    {
      id: "admin-1-fill",
      type: "fill",
      source: "admin-1",
      "source-layer": "boundaries_admin_1",
      filter: worldviewFilter,
      paint: {
        "fill-color": "#CCCCCC",
        "fill-opacity": 0.5,
      },
    },
    // This final argument indicates that we want to add the Boundaries layer
    // before the `waterway-label` layer that is in the map from the Mapbox
    // Light style. This ensures the admin polygons are rendered below any labels
    "waterway-label"
  );
});
