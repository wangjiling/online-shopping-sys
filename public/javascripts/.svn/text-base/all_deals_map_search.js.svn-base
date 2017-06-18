var map;
var geocoder;
var infowindow;
var currentMarker;
var mapNeverLoaded = true;
var curAddress;
var DEFAULT_ADDRESS = "US";


$(document).ready(function() {
    // Select initialized city.
    try {
        var selectCity = $('[name=deals_city]').val();
        $("[name=select_city]").html(selectCity);

    } catch(error) {
    }

    $("[name=sel_state]").bind("change", function(e) {
        try {
            var state = $("[name=sel_state]").val();
            var zipcode = $("[name=input_zipcode]").val();
            var address = state + " " + zipcode + ", US ";
            pointAddress(address);
        } catch(error) {
        }
    });

    $("[name=btn_loc_search]").bind("click", function(e) {
        try {
            loadGroupbuyPrimaryDeal();
            loadGroupbuyDeals();
            $(".locality .state").hide();
        } catch(error) {
        }
    });

})

function initializeMap() {
    var mapOptions = {
        zoom: 4,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var localInfo = getLocationInfo();
    var address = combineAddress(localInfo);

    map = new google.maps.Map(document.getElementById("map_search"), mapOptions);
    geocoder = new google.maps.Geocoder();
    if(address == DEFAULT_ADDRESS){
        codeAddress(address, map);
    }else{
        pointAddress(address);
    }

    addLocationController(map);

    google.maps.event.addListener(map, 'click', function(event) {
        getAddress(event.latLng, map);
    });
    mapNeverLoaded = false;

}

function codeAddress(address, map) {
    if (geocoder) {
        try {
            geocoder.geocode({ 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                } else {
                }
            });
        } catch(error) {

        }
    }
}

function pointAddress(address) {
    if (geocoder) {
        try {
            geocoder.geocode({ 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    deleteMarker(currentMarker);
                    currentMarker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    curAddress = parseUSAddress(results[0].formatted_address);
                    setLocationInfo(curAddress);
                    infowindow = new google.maps.InfoWindow();
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, currentMarker);
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        } catch(error) {
            alert(error);
        }
    }
}

function getAddress(location, map) {
    var latlng = location;
    if (geocoder) {
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    deleteMarker(currentMarker);
                    currentMarker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    curAddress = parseUSAddress(results[0].formatted_address);
                    setLocationInfo(curAddress);
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, currentMarker);
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }

}

function addLocationController(map) {
    // Adds controllers;
    var locControlDiv = $('[name=div_loc_setting]')[0];
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locControlDiv);
}

function deleteMarker(marker) {
    try {
        if (currentMarker) {
            currentMarker.setMap(null);
        }
    } catch(error) {
    }
}

function setLocationInfo(locInfo) {
    try {
        setValueIncludeInSelectionController($('[name=sel_state]')[0],locInfo.state);
        $("[name=input_zipcode]").val(locInfo.zipcode);
        $("[name=deals_country]").val(locInfo.country);
        $("[name=deals_state]").val(locInfo.state);
        $("[name=deals_city]").val(locInfo.city);
        $("[name=deals_zipcode]").val(locInfo.zipcode);
        $("[name=deals_date]").val((new Date()).getTime());
        $("[name=select_city]").html(locInfo.city);
    } catch(error) {
    }
}

function getLocationInfo() {
    var localInfo = new LocationInfo();
    try {
        localInfo.zipcode = $("[name=deals_zipcode]").val();
        localInfo.country = $("[name=deals_country]").val();
        localInfo.state = $("[name=deals_state]").val();
        localInfo.city = $("[name=deals_city]").val();

    } catch(error) {
    }

    return localInfo;
}






