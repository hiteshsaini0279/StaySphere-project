 maptilersdk.config.apiKey = mapToken;
    const map = new maptilersdk.Map({
      container: 'map',
      style: "base-v4",
      center: [75.79, 26.91], // starting position [lng, lat]
      zoom: 1   // starting zoom
    });
 