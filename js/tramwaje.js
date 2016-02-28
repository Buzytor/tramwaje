var speed2color = function(speed) {
    if(speed > 30) {
        return '#c2ed77';
    } else if(speed > 25) {
        return '#eddd67';
    } else if(speed > 20) {
        return '#ffc800';
    } else if(speed > 15) {
        return 'orange';
    } else if(speed > 10) {
        return 'red';
    } else {
        return 'black';
    }
};

var map = null;
jQuery(function($) {
    map = L.map('map').setView([52.232222, 21.008333], 14);
    var layer = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 25,
                    minZoom: 0,
                    crs: L.CRS.EPSG3857
                }).addTo(map);

    $.ajax("tram_speed.json").success(function(data) {
        data = JSON.parse(data);
        for(var line in data) {
            line_points = data[line];
            line_points.forEach(function(row) {
                L.polyline([row["point1"], row["point2"]],
                    {color: speed2color(row["speed"]), opacity: 0.9}).addTo(map);
            });
        }
    });
});

