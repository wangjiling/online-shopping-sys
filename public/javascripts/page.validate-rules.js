var vrUserName = {
    required: true,
    minlength: 1,
    maxlength: 50,
    messages: {
        required: "Required User Name.",
        minlength: jQuery.format("Please, at least {0} characters are necessary."),
        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
    }
}

var vrSignUpUserName = {
    required: true,
    minlength: 1,
    maxlength: 50,
    remote:{
        url: "/ajax/userexist",
        type: "get",
        dataType: "json",
        data: {
        }
    },
    messages: {
        remote:"User Name was existed.",
        required: "Required User Name.",
        minlength: jQuery.format("Please, at least {0} characters are necessary."),
        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
    }
}

var vrLoginPassword = {
    required: true,
    minlength: 1,
    maxlength: 50,
    messages: {
        required: "Required password.",
        minlength: jQuery.format("Please, at least {0} characters are necessary."),
        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
    }
}

var vrConfirmPassword = {
    required: true,
    minlength: 1,
    maxlength: 50,
    equalTo:"[name='password']",
    messages: {
        required: "Required password.",
        equalTo:"Password must be same.",
        minlength: jQuery.format("Please, at least {0} characters are necessary."),
        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
    }
}

var vrConfirmNewPassword = {
    required: true,
    minlength: 1,
    maxlength: 50,
    equalTo:"[name='newPassword']",
    messages: {
        required: "Required password.",
        equalTo:"Password must be same.",
        minlength: jQuery.format("Please, at least {0} characters are necessary."),
        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
    }
}

var vrLoginEmail = {
    required: true,
    minlength: 1,
    maxlength: 50,
    email: true,
    messages: {
        required: "Required a email.",
        minlength: jQuery.format("Please, at least {0} characters are necessary."),
        maxlength: jQuery.format("Please, at most {0} characters are accepted."),
        email: "Please, input a email."
    }
}




///* Product Name Validator Rule */
//var vrProductName = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required product name",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Price validator rule*/
//var vrPrice = {
//    required: true,
//    min: 0.1,
//    max: 99999,
//    number: true,
//    messages: {
//        required: "Required price.",
//        min: jQuery.format("Please, at least {0} number are necessary."),
//        max: jQuery.format("Please, at most {0} number are accepted."),
//        number: "Please, input a number."
//    }
//}
//
///* Part Number validator rule*/
//var vrPartNumber = {
//    number: true,
//    messages: {
//        number: "Please, input a number."
//    }
//}
//
///* Zonde Id validator rule*/
//var vrZondeId = {
//    number: true,
//    messages: {
//        number: "Please, input a number."
//    }
//}
//
///* Quantity validator rule*/
//var vrQuantity = {
//    required: true,
//    min: 0,
//    max: 99999,
//    number: true,
//    messages: {
//        required: "Required quantity.",
//        min: jQuery.format("Please, at least {0} number are necessary."),
//        max: jQuery.format("Please, at most {0} number are accepted."),
//        number: "Please, input a number."
//    }
//}
//
///* Sku validator rule*/
//var vrSku = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required SKU/UPC",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Description validator rule*/
//var vrDescription = {
//    required: true,
//    minlength: 1,
//    maxlength: 200,
//    messages: {
//        required: "Required Description",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Attr value size validator rule */
//var vrAttrValSize = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required attribute value size",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Attr value color validator rule */
//var vrAttrValColor = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required attribute value color",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Attr value weight validator rule */
//var vrAttrValWeight = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required attribute value weight",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Attr value height validator rule */
//var vrAttrValHeight = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required attribute value height",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Attr value width validator rule */
//var vrAttrValWidth = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required attribute value width",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Attr value depth validator rule */
//var vrAttrValDepth = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required attribute value depth",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
//
//
///* Tax rules name */
//var vrTaxRuleName ={
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required tax rule name.",
//        minlength: jQuery.format("Please, at least {0} characters are necessary."),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Tax rules value */
//var vrTaxRuleValue ={
//    required: true,
//    min: 0,
//    max: 100,
//    number: true,
//    messages: {
//        required: "Required tax rule value.",
//        min: jQuery.format("Please, at least {0} number are necessary."),
//        max: jQuery.format("Please, at most {0} number are accepted."),
//        number: "Please, input a number."
//    }
//}
//
///* Discount name */
//var vrDiscountName = {
//    required: true,
//    minlength: 1,
//    maxlength: 50,
//    messages: {
//        required: "Required discount name",
//        minlength: jQuery.format("Please, at least {0} characters are necessary"),
//        maxlength: jQuery.format("Please, at most {0} characters are accepted.")
//    }
//}
//
///* Date from */
//var vrDateFrom = {
//    required: true,
//    messages: {
//        required: "Required date "
//    }
//}
//
///* Date to */
//var vrDateTo = {
//    required: true,
//    messages: {
//        required: "Required date "
//    }
//}
//
///* Discount number value */
//var vrDiscountNumber = {
//    required: true,
//    min: 0,
//    max: 100,
//    number: true,
//    messages: {
//        required: "Required number.",
//        min: jQuery.format("Please, at least {0} number are necessary."),
//        max: jQuery.format("Please, at most {0} number are accepted."),
//        number: "Please, input a number."
//    }
//}
//
//
/////* Choose product */
////var vrChooseProduct = {
////    required: true,
////    messages: {
////        required: "Required product name"
////    }
////}
