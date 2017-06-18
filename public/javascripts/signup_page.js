$(function(){
    bindValidators();
});

function bindValidators(){
    try{
        $("#register_form").validate();
        $("[name=userName]").rules("add", vrSignUpUserName);
        $("[name=email]").rules("add", vrLoginEmail);
        $("[name=password]").rules("add", vrLoginPassword);
        $("[name=confirmPassword]").rules("add", vrConfirmPassword);
    }catch(error){
        alert("Some errors happen: " + JSON.stringify(error));
    }
};

///**
// * Created by IntelliJ IDEA.
// * User: v_yina01
// * Date: 8/25/11
// * Time: 1:44 PM
// * To change this template use File | Settings | File Templates.
// */
//function checkUserFormat(){
//    $("#register_username").blur(function(){
//        var strUserName = $("#register_username").val();
//        if(strUserName == ""){
//            $("#nameMsg").html("User's name can't be empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_username").focus();
//        }else{
//            if(/^[a-zA-Z0-9_\s]*$/.test(strUserName)){
//                $("#nameMsg").html("");
//            }else{
//                $("#nameMsg").html("Please don't enter special character!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//                $("#register_username").focus();
//            }
//        }
//    });
//}
//function checkFirstNameFormat(){
//    $("#register_first_name").blur(function(){
//        var val = $("#register_first_name").val();
//        if(val == ""){
//            $("#firstNameMsg").html("User's firstName can't be empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_first_name").focus();
//        }else{
//            if(/^[a-zA-Z0-9_\s]*$/.test(val)){
//                $("#firstNameMsg").html("");
//            }else{
//                $("#firstNameMsg").html("Please don't enter special character!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//                $("#register_first_name").focus();
//            }
//        }
//    });
//}
//function checkLastNameFormat(){
//    $("#register_last_name").blur(function(){
//        var val = $("#register_last_name").val();
//        if(val == ""){
//            $("#lastNameMsg").html("User's lastName can't be empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_last_name").focus();
//        }else{
//            if(/^[a-zA-Z0-9_\s]*$/.test(val)){
//                $("#lastNameMsg").html("");
//            }else{
//                $("#lastNameMsg").html("Please don't enter special character!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//                $("#register_last_name").focus();
//            }
//        }
//    });
//}
//
//
//
//
//function checkPhoneFormat(){
//    $("#register_phone").blur(function(){
//        var strPhone = $("#register_phone").val();
//        if(strPhone == ""){
//            $("#phoneMsg").html("Please enter 10 digital number!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_phone").focus();
//        }else{
//            if(strPhone.match("\\(?[0-9]{3}\\)?[- ]?[0-9]{3}[- ]?[0-9]{4}")){
//                $("#phoneMsg").html("");
//            }else{
//                $("#phoneMsg").html("Please enter 10 digital number!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//                $("#register_phone").focus();
//            }
//        }
//    });
//}
//
//function checkEmailFormat(){
//    $("#register_email").blur(function(){
//        var strEmail = $("#register_email").val();
//        if(strEmail == ""){
//            $("#emailMsg").html("Email address can't be empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_email").focus();
//        }else{
//            if(strEmail.match("^([0-9a-zA-Z]+[_.0-9a-zA-Z-]+)@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2,3})$")){
//                $("#emailMsg").html("");
//            }else{
//                $("#emailMsg").html("Email address format error!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//                $("#register_email").focus();
//            }
//        }
//    });
//}
//
//function checkPasswordIsEmpty(){
//    $("#register_password").blur(function(){
//        var strPassword = $("#register_password").val();
//        if(strPassword == ""){
//            $("#pswMsg").html("User's password can't be empty!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_password").focus();
//        }else{
//            $("#pswMsg").html("");
//        }
//    });
//}
//
//function checkRePasswordIsSame(){
//    $("#register_repsw").blur(function(){
//        var strPassword = $("#register_password").val();
//        var strRePassword = $("#register_repsw").val();
//        if( strPassword != strRePassword){
//            $("#rePswMsg").html("Re-enter password error!").css("color", "red").css("width", "250px").css("margin-left", "20px");
//            $("#register_repsw").focus();
//        }else{
//            $("#rePswMsg").html("");
//        }
//    });
//}