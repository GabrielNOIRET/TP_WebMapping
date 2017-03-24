//-------------------------------Couches----------------------------------/
var OSM = new ol.layer.Tile({source: new ol.source.OSM()})

var dog = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/dog.geojson',
  format: new ol.format.GeoJSON()
 })
})

var soil_types = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/soil_types.geojson',
  format: new ol.format.GeoJSON()
 })
})

var municipal_boundary = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/municipal_boundary.geojson',
  format: new ol.format.GeoJSON()
 })
})

var Formerlakes_wetlands = new ol.layer.Vector({
  target: 'Formerlakes_wetlands',
  source: new ol.source.Vector({
  url:'couches/Formerlakes_wetlands.geojson',
  format: new ol.format.GeoJSON()
 })
})

//-------------------------------carte----------------------------------/
var map = new ol.Map({
  target: 'map',
  layers: [ OSM, 
    
  ],

    view: new ol.View({
      center: ol.proj.fromLonLat([144.950117, -37.815399]),
      zoom: 13
  })
});

//-------------------------------Checkbox----------------------------------/

function change_formerlakes_wetlands(){
  if (id_formerlakes_wetlands.checked){map.addLayer(Formerlakes_wetlands)}
  else {map.removeLayer(Formerlakes_wetlands)}}

function change_municipal_boundary(){
  if (id_municipal_boundary.checked){map.addLayer(municipal_boundary)}
  else {map.removeLayer(municipal_boundary)}} //-