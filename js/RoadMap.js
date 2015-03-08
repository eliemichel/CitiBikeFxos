"use strict";

/********
 * RoadMap
 ********/

var RoadMap = (function() {

    // Init the roadMap
    var init = (function() {
        console.log('RoadMap', 'init', 'RoadMap under construction');
        var selectedLayer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        window.roadMap = L.map('map', {
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            scrollWheelZoom: true,
            boxZoom: true,
            keyboard: true,
            zoomControl: false,
            zoom: 16
        }).setView([48.842206, 2.345169], 16); // default position if there is no geolocation

        // search plugin
        console.log('RoadMap', 'init', 'Search plugin is available');
        var osmGeocoder = new L.Control.OSMGeocoder();
        roadMap.addControl(osmGeocoder);

        L.tileLayer(selectedLayer).addTo(window.roadMap);

        console.log('RoadMap', 'init', 'RoadMap built');

        return init;
    });

    // Init map for bikes and stands view
    var initCircle = (function(pos) {
        console.log('RoadMap', 'init_circl', 'RoadMap under construction');
        var selectedLayer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        window.roadMap = L.map('map', {
            dragging: true,
            touchZoom: true,
            doubleClickZoom: false,
            scrollWheelZoom: true,
            boxZoom: true,
            keyboard: false,
            zoomControl: true,
            zoom: 16
        }).setView([pos.latitude, pos.longitude], 16);

        //window.roadMap.panTo([pos.latitude, pos.longitude]);
        L.tileLayer(selectedLayer).addTo(window.roadMap);

        console.log('RoadMap', 'init_circl', 'RoadMap built');

        return initCircle;
    });

    // Add all markers to the Map
    var addMarkers = (function() {
        console.log('RoadMap', 'addMarkers');
        var stations = Stations.getFullList();
        var myIcon = '';

        for(var i=0; i < stations.length; i++) {
            // Set icon for each stations
            myIcon = L.divIcon({
                className: 'mapIcon',
                html: '<div class="avail_bikes">' + stations[i].available_bikes + '</div>' + '<div class="avail_bike_stands">' + stations[i].available_bike_stands + '</div>'
            });

            // Set markers for each stations
            L.marker( stations[i].position, {
                icon: myIcon,
                clickable: true,
                draggable: false,
                title: stations[i].address,
                alt: stations[i].name,
                address: stations[i].address,
                number: stations[i].number
            }).addTo(window.roadMap).on('click', function (e) {
                // Click on marker for more details about the station
                window.location.hash = "/station/" + e.target.options.number;
            });
        }

        return true;
    });

    // Add a marker for the current position
    var addMarkerPosition = (function(pos) {
        L.marker([pos.latitude, pos.longitude], {
            clickable: false,
            draggable: false,
            title: "Moi",
            alt: "Vous êtes ici !"
        }).addTo(window.roadMap);

        window.roadMap.panTo([pos.latitude, pos.longitude]);
    });

    // Add a marker for any search
    var addMarkerSearch = (function(position) {
        console.log('RoadMap', 'addMarkers');
        var stations = Stations.getFullList();
        var myIcon = '';

        L.marker([position._initialCenter.lat, position._initialCenter.lng], {
            clickable: false,
            draggable: false,
            title: "Station recherchée",
            alt: "Je veux aller ici"
        }).addTo(window.roadMap);

        return true;
    });

    // Add markers from position to a station
    var addMarker = (function(pos, activeStation, view) {

        var startIcon = L.icon({
            iconUrl: 'js/images/map-my-position.svg',
            iconSize: [40, 45]
        });

        // icon is customized according to the view
        if(view == 'bikes') {
            var endIcon = L.icon({
                iconUrl: 'js/images/map-available-bike.svg',
                iconSize: [40, 45]
            });
        } else {
            var endIcon = L.icon({
                iconUrl: 'js/images/map-available-stand.svg',
                iconSize: [40, 45]
            });
        }

        // 1st marker is the current position
        L.marker([pos.latitude, pos.longitude], {
            icon: startIcon,
            clickable: false,
            draggable: false,
            title: "Moi",
            alt: "Vous êtes ici !"
        }).addTo(window.roadMap);

        // 2nd marker is the activeStation
        L.marker(activeStation[0].position, {
            icon: endIcon,
            clickable: true,
            draggable: false,
            title: activeStation[0].address,
            alt: activeStation[0].name,
            address: activeStation[0].address,
            number: activeStation[0].number
        }).addTo(window.roadMap);

        return true;
    });

    return {
        init: init,
        initCircle: initCircle,
        addMarkers: addMarkers,
        addMarker: addMarker,
        addMarkerSearch: addMarkerSearch,
        addMarkerPosition: addMarkerPosition
    };
})();