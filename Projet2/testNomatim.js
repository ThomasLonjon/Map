mapboxgl.accessToken =
  "pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsZndqYzN6dDA3NmkzbnRhZTBtMDN4Y2QifQ.Jv1RaxmPtEmRY9sLVwlC4g";

var latitude = 48.8566;
var longitude = 2.3522;




// Créer la requête API
var url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Extraire les limites administratives de la ville choisie
        var bounds = data.address.boundary;
        var city = data.address.city;

        // Récupérer les limites administratives de la ville choisie
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            countries: 'fr',
            bbox: data.boundingbox,
            types: 'administrative',
            limit: 1
        });
        geocoder.on('result', function(result) {
            // Afficher les limites administratives sur la carte Mapbox
            map.addLayer({
                "id": "city-boundary",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": result.result.geometry
                },
                "paint": {
                    "line-color": "red",
                    "line-width": 2
                }
            });
        });
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    })
    .catch(error => console.log(error));