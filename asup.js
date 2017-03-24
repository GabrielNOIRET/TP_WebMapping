var nottingham = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-1.141092, 52.948222], 'EPSG:4326', 'EPSG:3857')),
    name: 'Nottingham'
});

var london = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-0.092236, 51.502684], 'EPSG:4326', 'EPSG:3857')),
    name: 'London'
});

var manchester = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-2.232212, 53.480188], 'EPSG:4326', 'EPSG:3857')),
    name: 'Manchester'
});

var birmingham = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-1.900878, 51.483952], 'EPSG:4326', 'EPSG:3857')),
    name: 'Birmingham'
});

var leeds = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-1.556692, 53.793635], 'EPSG:4326', 'EPSG:3857')),
    name: 'Leeds'
});

var southampton = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-1.556692, 50.793635], 'EPSG:4326', 'EPSG:3857')),
    name: 'Southampton'
});

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://openlayers.org/en/v3.3.0/examples/data/icon.png'
    }))
});

manchester.setStyle(iconStyle);
london.setStyle(iconStyle);
nottingham.setStyle(iconStyle);
leeds.setStyle(iconStyle);
birmingham.setStyle(iconStyle);
southampton.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
    features: [nottingham, birmingham, leeds, london, manchester]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    name: 'Cities Layer 1',
    visible: true
});

var vectorSource2 = new ol.source.Vector({
    features: [southampton]
});

var vectorLayer2 = new ol.layer.Vector({
    source: vectorSource2,
    name: 'Cities Layer 2',
    visible: false
});

var rasterLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    name: 'Open Street Map',
    visible: true
});

var center = ol.proj.transform([-2.547855, 53.00366], 'EPSG:4326', 'EPSG:3857');
var view = new ol.View({
    center: center,
    zoom: 6
});

var map = new ol.Map({
    layers: [rasterLayer, vectorLayer2, vectorLayer],
    target: document.getElementById('map'),
    view: view
});

/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
};

var popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 600
    }
});
map.addOverlay(popup);

// display popup on click
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,

    function (feature, layer) {
        return feature;
    });
    if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();

        content.innerHTML = feature.get('name');
        popup.setPosition(coord);
    } else {
        popup.setPosition(undefined);
    }
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
    if (e.dragging) {
        popup.setPosition(undefined);
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

// Name the root layer group
map.getLayerGroup().set('name', 'All Layers');

/**
 * Build a tree layer from the map layers with visible and opacity
 * options.
 *
 * @param {type} layer
 * @returns {String}
 */
function buildLayerTree(layer) {
    var elem;
    var name = layer.get('name') ? layer.get('name') : "Group";
    var div = "<li data-layerid='" + name + "'>" + layer.get('name') + "</span>" +
        "   <i class='glyphicon glyphicon-eye-" + (layer.getVisible() ? 'open' : 'close') + "'></i> ";
    if (layer.getLayers) {
        var sublayersElem = '';
        var layers = layer.getLayers().getArray(),
            len = layers.length;
        for (var i = len - 1; i >= 0; i--) {
            sublayersElem += buildLayerTree(layers[i]);
        }
        elem = div + " <ul>" + sublayersElem + "</ul></li>";
    } else {
        elem = div + " </li>";
    }
    return elem;
}

/**
 * Initialize the tree from the map layers
 * @returns {undefined}
 */
function initializeTree() {

    var elem = buildLayerTree(map.getLayerGroup());
    $('#layertree').empty().append(elem);

    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
        }
        e.stopPropagation();
    });
}

/**
 * Finds recursively the layer with the specified key and value.
 * @param {ol.layer.Base} layer
 * @param {String} key
 * @param {any} value
 * @returns {ol.layer.Base}
 */
function findBy(layer, key, value) {

    if (layer.get(key) === value) {
        return layer;
    }

    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
            len = layers.length,
            result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }

    return null;
}


$(document).ready(function () {

    initializeTree();

    // Handle visibility control
    $('i').on('click', function () {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);

        layer.setVisible(!layer.getVisible());

        if (layer.getVisible()) {
            $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
        } else {
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        }
    });

});
