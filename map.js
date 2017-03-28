//-------------------------------Couches----------------------------------/
var OSM = new ol.layer.Tile({source: new ol.source.OSM()})

var dog = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/dog.geojson',
  format: new ol.format.GeoJSON()
 })
})

var satelite = new ol.layer.Tile({
    source: new ol.source.TileWMS({
    url: 'https://ahocevar.com/geoserver/wms',
    params: {LAYERS: 'nasa:bluemarble', TILED: true}
  })
})

var soil_types = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/soil_types.geojson',
  format: new ol.format.GeoJSON()
 })
})

var Formerlakes_wetlands = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/Formerlakes_wetlands.geojson',
  format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
  })
});

var mask_municipal_boundary = new ol.layer.Vector({
  source: new ol.source.Vector({
  url:'couches/mask_municipal_boundary.geojson',
  format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.8)',
    }),
      stroke: new ol.style.Stroke({
      color: 'grey',
      width: 1
    })
  })
})



//-------------------------------carte----------------------------------/
var map = new ol.Map({
  target: 'map',
  layers: [OSM, 
    
  ],

    view: new ol.View({
      center: ol.proj.fromLonLat([144.945117, -37.815399]),
      zoom: 13.2
  })
});

//-------------------------------Checkbox----------------------------------/

function change_formerlakes_wetlands(){
  if (id_formerlakes_wetlands.checked){map.addLayer(Formerlakes_wetlands)}
  else {map.removeLayer(Formerlakes_wetlands)}}

function change_mask_municipal_boundary(){
  if (id_mask_municipal_boundary.checked){map.addLayer(mask_municipal_boundary)}
  else {map.removeLayer(mask_municipal_boundary)}} 

function change_satelite(){
  if (id_satelite.checked){map.addLayer(satelite)}
  else {map.removeLayer(satelite)}} 

function change_OSM(){
  if (id_OSM.checked){map.addLayer(OSM)}
  else {map.removeLayer(OSM)}}

// ----------------------------style des couches ---------------------------/