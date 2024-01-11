//map class initialize
var map = L.map('map').setView([27.3516, 88.3239], 7);
map.zoomControl.setPosition('topright');

//adding osm titlelayer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var watercolorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});

var st = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});


//adding marker in the center of map
var singleMarker= L.marker([27.3516, 88.3239])
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


//add map scale
L.control.scale().addTo(map);


//map coordinate display
map.on('mousemove', function (e) {
   $('.coordinate').html(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
})


//Geojson load

var marker = L.markerClusterGroup();
var taji = L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
});
taji.addTo(marker);
marker.addTo(map);


//Leaflet layer control 
var basemaps = {
    'OSM': osm,
    'Water Color Map': watercolorMap,
    'Stamen Toner': st
}

var overlayMaps = {
    'GeoJSON Markers': marker,
    'Single Marker': singleMarker
}

L.control.layers(basemaps, overlayMaps,{ collaped: false, position:'topleft'}).addTo(map);



// main.js
document.addEventListener('DOMContentLoaded', function () {
    // Create the map
    //var map = L.map('map').setView([51.505, -0.09], 13);
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    // Fetch the CSV data from the server
    fetch('data.csv')
      .then(response => response.text())
      .then(data => {
        // Process the CSV data and create scatter plot
        var scatterData = processData(data);
        createScatterPlot(map, scatterData);
      })
      .catch(error => {
        console.error('Error fetching CSV data:', error);
      });
  });
  
  // Function to process the CSV data
  function processData(data) {
    var rows = data.split('\n');
    var scatterData = [];
    for (var i = 1; i < rows.length; i++) {
      var columns = rows[i].split(',');
      var lat = parseFloat(columns[0]);
      var lng = parseFloat(columns[1]);
      var value = parseFloat(columns[2]);
      scatterData.push({ lat: lat, lng: lng, value: value });
    }
    return scatterData;
  }
  
  // Function to create the scatter plot
  function createScatterPlot(map, scatterData) {
    scatterData.forEach(function (dataPoint) {
      var latlng = L.latLng(dataPoint.lat, dataPoint.lng);
      var marker = L.circleMarker(latlng, {
        radius: dataPoint.value, // Use 'value' attribute to set marker size
        color: 'blue', // Set marker color
        fillColor: 'blue', // Set fill color
        fillOpacity: 0.5, // Set fill opacity
      });
      marker.bindPopup('Value: ' + dataPoint.value);
      marker.addTo(map);
    });
  }
  

