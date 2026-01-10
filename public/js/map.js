 mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/mapbox/streets-v12",
      center: [75.79, 26.91], // starting position [lng, lat]
      zoom: 10   // starting zoom
    });
 