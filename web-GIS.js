//Full Screen View
var mapId = document.getElementById('map')
function fullScreenView() {
    if(document.fullscreenElement){
        document.exitFullscreen()
    }else {
        mapId.requestFullscreen();
    }
    mapId.requestFullscreen();
}
 
//Leaflet browser print function
L.control.browserPrint({position :'topright'}).addTo(map);


//Leaflet search
L.Control.geocoder().addTo(map);
 

//Leaflet measure
L.control.measure({
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meter',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: undefined
    }).addTo(map);


//zoom to layer 
$('.zoom-to-layer').click(function(){
    map.setView([27.3516, 88.3239],7)
})
