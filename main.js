$(function() {
  var style = 'Map {' +
              '-torque-time-attribute:"date";' +
              '-torque-aggregation-function:"sum(revenue)";' +
              '-torque-resolution:16;' +
              '-torque-data-aggregation:linear;' +
              '-torque-frame-count: 1;' +
              '-torque-animation-duration: 15;' +
              '}' +
              '#layer {' +
              'image-filters: colorize-alpha(blue, cyan, lightgreen, yellow , orange, red);' +
              'marker-file: url(http://s3.amazonaws.com/com.cartodb.assets.static/alphamarker.png);' +
              'marker-fill-opacity: 0.4*[value];' +
              'marker-width: 35;' +
              'comp-op: "lighten";' +
              '[value > 2] { marker-fill: #A0F4FF; }' +
              '[value > 7] { marker-fill: #FFFFFF; }' +
              '[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05;}' +
              '[frame-offset = 2] { marker-width: 20; marker-fill-opacity: 0.02;}' +
              '}';


  var map = L.map('map-container').setView([42.6642942,-71.2245177], 14)
  L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    subdomains: ['a','b','c','d'],
    maxZoom: 18,
    mapId: 'fullofcaffeine.lolfiin0',
    token: 'pk.eyJ1IjoiZnVsbG9mY2FmZmVpbmUiLCJhIjoiTkVBUWR4RSJ9.K3obpBAXnizS3LNLd7_VcA'
  }).addTo(map, 0);

  var torqueLayer = new (L.TorqueLayer)({user: 'fullofcaffeine', table: 'spencer_the_cat', cartocss: style});

  torqueLayer.addTo(map)

  var hover = null;

  map.on('mousemove', function(e) {
    var p = e.containerPoint;

    var value = torqueLayer.getValueForPos(p.x, p.y);

    console.debug(value);

    if (hover != null) {
      map.removeLayer(hover);
      hover = null;
    }

    if (value != null) {
      console.debug(value);
      hover = L.rectangle(value.bbox, {color: '#000', weight: 1}).addTo(map);
      map._container.style.cursor = 'pointer';
    } else {
      map._container.style.cursor = 'auto';
    }
  })
})
