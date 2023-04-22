mapboxgl.accessToken =
  "pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsZndqYzN6dDA3NmkzbnRhZTBtMDN4Y2QifQ.Jv1RaxmPtEmRY9sLVwlC4g";

////////////////////////////////////// adding map  /////////////////////////////////////////////////////////

const map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
  style: "mapbox://styles/thomaslonjon/clg57qtqn006v01mmewmuetzj",
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
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "min_height"],
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

////////////////////////////////////// adding other style /////////////////////////////////////////////////////////

// Define the area where the style change should be applied
// const area = {
//   type: "Feature",
//   geometry: {
//     type: "Polygon",
//     coordinates: [
//       [
//         [2.346402507560419, 48.85486527430587],
//         [2.352246343742489, 48.85521822551312],
//         [2.354146336815157, 48.85135891586368],
//         [2.348302452576565, 48.85099485535233],
//         [2.346402507560419, 48.85486527430587],
//       ],
//     ],
//   },
// };

// Add the area to the map as a GeoJSON source
// map.addSource("area", {
//   type: "geojson",
//   data: area,
// });

// Add a layer that will use the area source to trigger the style change
// map.addLayer({
//   id: "area-layer",
//   type: "fill",
//   source: "area",
//   paint: {
//     "fill-color": "rgba(255, 255, 255, 0)",
//     "fill-outline-color": "rgba(255, 255, 255, 0)",
//   },
// });

////////////////////////////////////// adding city contour /////////////////////////////////////////////////////////
map.on("load", function () {
  map.addSource("admin-boundaries", {
    type: "vector",
    url: "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0Aarea%5BISO3166-2%3D%22FR-IDF%22%5D-%3E.a%3B%0A%28relation%5B%22admin_level%22%3D%226%22%5D%28area.a%29%3B%0Arelation%5B%22admin_level%22%3D%227%22%5D%28area.a%29%3B%0A%29%3B%0Aout%20body%3B%0A",
  });

  map.addLayer({
    id: "admin-boundaries",
    type: "line",
    source: "admin-boundaries",
    "source-layer": "osmdata",
    filter: [
      "all",
      ["==", "boundary", "administrative"],
      ["==", "admin_level", 8],
      ["==", "name", "Paris"],
    ],
    paint: {
      "line-color": "red",
      "line-width": 2,
    },
  });
});
