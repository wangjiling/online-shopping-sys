var map;
var geocoder;
var infowindow;
var currentMarker;
var curAddress;
var DEFAULT_ADDRESS = "US";


$(document).ready(function(){
    try {
        initialize();
    }catch(error) {
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
//            if(!curAddress || !curAddress.city){
//                var state = $("[name=sel_state]").val();
//                var zipcode = $("[name=input_zipcode]").val();
//                var address = state + " " + zipcode + ", US ";
//                pointAddress(address);
//            }
            var allDealsForm = getAllDealsForm(getURI('/groupbuy/all_deals'));
            $('body')[0].appendChild(allDealsForm);
            allDealsForm.submit();
        } catch(error) {
        }
    });

})

function initialize() {
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
    } catch(error) {
    }
}

function getAllDealsForm(actionUrl) {

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');

    try {
        var hidDealsDate = $('[name=deals_date]').clone(true);
        hidDealsDate.attr('name', 'deals_date');
        hidDealsDate.val((new Date()).getTime());
        hidDealsDate = hidDealsDate[0];
        form.appendChild(hidDealsDate);

        var hidDealsCountry = $('[name=deals_country]').clone(true);
        hidDealsCountry.attr('name', 'deals_country');
        hidDealsCountry = hidDealsCountry[0];
        form.appendChild(hidDealsCountry);

        var hidDealsState = $('[name=deals_state]').clone(true);
        hidDealsState.attr('name', 'deals_state');
        hidDealsState = hidDealsState[0];
        form.appendChild(hidDealsState);

        var hidDealsCity = $('[name=deals_city]').clone(true);
        hidDealsCity.attr('name', 'deals_city');
        hidDealsCity = hidDealsCity[0];
        form.appendChild(hidDealsCity);

        var hidDealsZipCode = $('[name=deals_zipcode]').clone(true);
        hidDealsZipCode.attr('name', 'deals_zipcode');
        hidDealsZipCode = hidDealsZipCode[0];
        form.appendChild(hidDealsZipCode);

    } catch(error) {}
    return form;
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

