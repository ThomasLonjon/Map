mapboxgl.accessToken =
  "pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsZndqYzN6dDA3NmkzbnRhZTBtMDN4Y2QifQ.Jv1RaxmPtEmRY9sLVwlC4g";

////////////////////////////////////// adding map  /////////////////////////////////////////////////////////

fetch(
  `https://api.geoapify.com/v1/boundaries/consists-of?id=51201564053193184059aa502b55811a4740f00101f901f0b7190000000000c0020692030747656ec3a87665&geometry=geometry_1000&apiKey=10602c3825fc4a50bec5b4127317ab5e`
)
  .then((response) => response.json())
  .then((data) => {
    const boundary = data.features[0].geometry.coordinates;
    const latZoom = data.features[0].properties.lat;
    const lonZoom = data.features[0].properties.lon;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/thomaslonjon/clfwkuheh00f601t6eikth6kg",
      center: [lonZoom, latZoom],
      zoom: 11,
      container: "map",
      antialias: true,
    });

    map.on("load", () => {
      map.addSource("boundary", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: boundary,
          },
        },
      });

      map.addLayer({
        id: "boundary",
        type: "fill",
        source: "boundary",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.4,
        },
      });
    });
  });
