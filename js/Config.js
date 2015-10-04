"use strict";

/****************
 * Configuration
 ****************/

var Config = (function() {
    var tileProvider = 'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
    //var tileProvider = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var apiKey = '5eec7c1a3babb6b2abeabb0143c635d2d9aff1c3';
    //var stationsUrl = 'http://www.citibikenyc.com/stations/json';
    // Ok, that is crapy, but it CitiBike API did anything to prevent anybody to use it…
    var stationsUrl = 'http://alloworigin.com/get?url=http://www.citibikenyc.com/stations/json';

    return {
        tileProvider: tileProvider,
        stationsUrl: stationsUrl,
        max_starred_stations: 10,
        geolocation: {
            enableHighAccuracy: true,
            maximumAge: 10000
        },
        waitPositionTimeout: 1000,  // in ms
        waitStationsTimeout: 1000,  // in ms
        localStationStorageTimeout: 30 * 24 * 3600 * 1000,  // in ms
        defaultPosition: [40.70552, -74.01322],  // default position if there is no geolocation
        leafletConfig: {  // Leafleat settings, `zoomControl` will be overwritten
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            scrollWheelZoom: true,
            boxZoom: true,
            keyboard: true,
            zoom: 16
        }
    };
})();
