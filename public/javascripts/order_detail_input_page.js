function checkNameFormat(flag){
    if(flag){
        var strUserName = $("#address_name").val();
        if(strUserName == ""){
            $("#nameMsg").html("The name field is empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
            $("#address_name").focus();
            return false;
        }else{
            $("#nameMsg").html("");
            return true;
        }

    }
}

function checkAddressFormat(flag){
    if(flag){
        var strAddress = $("#address_value").val();
        if(strAddress == ""){
            $("#addressMsg").html("The address field is empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
            $("#address_value").focus();
            return false;
        }else{
            $("#addressMsg").html("");
            return true;
        }
    }
}

function checkCityFormat(flag){
    if(flag){
        var strCity = $("#city_value").val();
        if(strCity == ""){
            $("#cityMsg").html("The city field is empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
            $("#city_value").focus();
            return false;
        }else{
            $("#cityMsg").html("");
            return true;
        }
    }
}

//function checkStateFormat(flag){
//    if(flag){
//        var strState = $("#state_select").val();
//        if(strState.length != 2 ){
//            $("#stateMsg").html("The state field is missing!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            return false;
//        }else{
//            $("#stateMsg").html("");
//            return true;
//        }
//    }
//
//}

function checkZipFormat(flag){
    if(flag){
        var strZip = $("#zip_code").val();
        if(strZip == ""){
            $("#zipMsg").html("The zip field is empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
            $("#zip_code").focus();
            return false;
        }else{
            if(/^[0-9]*$/.test(strZip)){
                $("#zipMsg").html("");
                return true;
            }else{
                $("#zipMsg").html("The ZIP/Postal Code field is invalid!").css("color", "red").css("width", "250px").css("margin-left", "20px");
                $("#zip_code").focus();
                return false;
            }
        }
    }
}

function checkTelPhoneFormat(flag){
    if(flag){
        var strPhone = $("#tel_number").val();
        if(strPhone == ""){
            $("#mobilePhoneMsg").html("The phone number field is empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
            $("#tel_number").focus();
            return false;
        }else{
            if(strPhone.match("\\(?[0-9]{3}\\)?[- ]?[0-9]{3}[- ]?[0-9]{4}")){
                $("#mobilePhoneMsg").html("");
                return true;
            }else{
                $("#mobilePhoneMsg").html("Your phone number shall be greater than 10 digital!").css("color", "red").css("width", "250px").css("margin-left", "20px");
                $("#tel_number").focus();
                return false;
            }
        }
    }
}

$(function() {
    $("#address_name").blur(function(){
        checkNameFormat(true);
    });

    $("#address_value").blur(function(){
        checkAddressFormat(true);
    });

    $("#city_value").blur(function(){
        checkCityFormat(true);
    });

//    $("#state_select").change(function(){
//        checkStateFormat(true);
//    })

    $("#zip_code").blur(function(){
        checkZipFormat(true);
    });

    $("#tel_number").blur(function(){
        checkTelPhoneFormat(true);
    });

    $('#btn_order_info').click(function() {

        var flag = checkNameFormat(true) && checkAddressFormat(true) && checkCityFormat(true) && checkZipFormat(true) && checkTelPhoneFormat(true);

        if(flag){
            var form = $('#form_order_detail')
            form.submit();
        }

    })
})

