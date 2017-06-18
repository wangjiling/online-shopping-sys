function LocationInfo() {
    var country = "US";
    var state;
    var city;
    var zipcode;
}

function parseUSAddress(address) {
    var locInfo = new LocationInfo();
    try {
        var addressSections = address.split(',');

        if (addressSections && addressSections.length > 0) {
            var length = addressSections.length;
            if (addressSections[length - 1]) {
                locInfo.country = addressSections[length - 1].trim().substring(0, 2);
            }

            if (addressSections[length - 2]) {
                var stateAndZip = addressSections[length - 2].trim().split(' ');
                var length2 = stateAndZip.length;
                // When there are vals greater than 2.
                if(length2 > 1){
                    locInfo.zipcode = stateAndZip[length2 - 1].trim();
                    if(!/[0-9]+/.test(locInfo.zipcode)){
                        locInfo.zipcode = "";
                    }

                    locInfo.state = stateAndZip[length2 - 2].trim();

                }else{
                    var stateOrZip = stateAndZip[length2 - 1].trim();
                    if(/[a-zA-Z]+/.test(stateOrZip)){
                        locInfo.state = stateOrZip;
                    }else if(/[0-9]+/.test(stateOrZip)){
                        locInfo.zipcode = stateOrZip;
                    }
                }
            }

            if (addressSections[length - 3]) {
                locInfo.city = addressSections[length - 3].trim();
            }


        }

        return locInfo;
    } catch(error) {
        return  new LocationInfo();
    }
}

function combineAddress(localInfo){
    try{
        var address = "";
        if(localInfo.city){
            address += localInfo.city;
        }
        if(localInfo.state){
            address += "," + localInfo.state;
        }
        if(localInfo.zipcode){
            address += " " + localInfo.zipcode;
        }
        if(localInfo.country){
            address += "," + localInfo.country;
        }
        return address;
    }catch(error){
        return DEFAULT_ADDRESS;
    }
}