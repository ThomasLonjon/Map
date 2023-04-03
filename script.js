mapboxgl.accessToken =
  "pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsZndqYzN6dDA3NmkzbnRhZTBtMDN4Y2QifQ.Jv1RaxmPtEmRY9sLVwlC4g";

////////////////////////////////////// adding map  /////////////////////////////////////////////////////////

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
  center: [2.346402507560419, 48.85486527430587],
  zoom: 11,
  pitch: 45,
  bearing: -17.6,
  container: "map",
  antialias: true,
});

////////////////////////////////////// adding 3D terrain /////////////////////////////////////////////////////////

map.on("style.load", () => {
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });
  // add the DEM source as a terrain layer with exaggerated height
  map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });
});

////////////////////////////////////// adding 3D buildings /////////////////////////////////////////////////////////

map.on("style.load", () => {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  ).id;

  // The 'building' layer in the Mapbox Streets
  // vector tileset contains building height data
  // from OpenStreetMap.
  map.addLayer(
    {
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayerId
  );
});

////////////////////////////////////// adding hill shade/////////////////////////////////////////////////////////

map.on("load", () => {
  map.addSource("dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
  });
  map.addLayer(
    {
      id: "hillshading",
      source: "dem",
      type: "hillshade",
    },
    // Insert below land-structure-polygon layer,
    // where hillshading sits in the Mapbox Streets style.
    "land-structure-polygon"
  );
});

////////////////////////////////////// adding search bar /////////////////////////////////////////////////////////

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);
