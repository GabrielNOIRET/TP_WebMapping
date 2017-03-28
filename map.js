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

var mask_municipal_boundary = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/mask_municipal_boundary.geojson',
  format: new ol.format.GeoJSON()
  })
})

var Formerlakes_wetlands = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/Formerlakes_wetlands.geojson',
  format: new ol.format.GeoJSON()
 })
 /* style: new ol.style.Style({
	stroke: new ol.style.Stroke({
		color: '#FF0000',
		width: 1
	})
	fill: new ol.style.Fill({
		color: 'rgba(255,0,0,0,1)'
	})
  })*/
});


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

function change_mask_municipal_boundary(){
  if (id_mask_municipal_boundary.checked){map.addLayer(mask_municipal_boundary)}
  else {map.removeLayer(mask_municipal_boundary)}} 

// ----------------------------style des couches ---------------------------/