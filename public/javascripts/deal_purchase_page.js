function startGenerateOrder() {
    showWaitPanel();
    $("[name=complete_order_button]").attr("disabled", "disabled");
    $("[name=complete_order_button]").css("opacity", .4);
}
function endGenerateOrder() {
    hideWaitPanel();
    msg("sorry! generate order fail, please try again later.");
    $("[name=complete_order_button]").attr("disabled", "");
    $("[name=complete_order_button]").css("opacity", 1);
}
//generate order function
function bindFunctionForFormInfo() {

    $("[name=complete_order_button]").click(function() {
        var agree = $("[name=agree_checkbox]").attr("checked");
        if (!agree) {
            msg("Terms of Use must be accepted.")
            return;
        }
        var flag = true;
        if ($("[name=user_name]").val() == "") {
            msg("please login or register.");
            return;
        }

        flag = flag && checkPurchaseQuantity() && checkPurchaseQuantityDownLimit()
            && checkCardholderNameFormat(true) && checkCardNumberFormat(true) && checkSecurityCodeFormat(true)
            && checkBillAddressFormat(true) && checkCityFormat(true) && checkStateFormat(true) && checkPostalCodeFormat(true);

        if (flag) {
            startGenerateOrder();
            var form = $("[name=form_purchase]")[0];
            ajaxRequest(form,
                function(data) {
                    if (data) {
                        buyWithPaypal(data.paypalId, data.orderNumber, data.orderId, data.totalPrice.format());
//                        window.location = getURI("/groupbuy/buy_now?order_id=") + data.orderId;
                    } else {
                        endGenerateOrder();
                    }
                }
                , function() {

                });
        }

    })

}


//load deal information
function loadDealInfo() {
    var form = getFormWithHidDealId(getURI('/groupbuy/ajax/load_deal_info'));
    ajaxRequest(form,
        function(data) {
            if (data) {
                $("[name=deal_title]").html(data.dealTitle);
                var purchase_quantity = $("[name=purchase_quantity]");
                purchase_quantity.val(data.downLimit);
                purchase_quantity.keyup(function() {
                    checkPurchaseQuantity();
                });
                purchase_quantity.blur(function() {
                    checkPurchaseQuantityDownLimit();
                });
                var deal_info = $("[name=deal_info]");
                deal_info.attr("downLimit", data.downLimit);
                deal_info.attr("upLimit", data.upLimit);
                deal_info.attr("dealStock", data.dealStock);
                $("[name=deal_now_price]").html("$" + data.nowPrice.formatDigit(2));
                $("[name=deal_now_price]").attr("number", data.nowPrice);
                calcTotalPrice();
            }
        }
        , function() {

        });
}
//check total price start
function checkPurchaseQuantityDownLimit() {
    var purchase_quantity = $("[name=purchase_quantity]");
    var purchase_quantity_val = purchase_quantity.val();
    if (!isNaN(purchase_quantity_val)) {
        var deal_info = $("[name=deal_info]");
        var downLimit = parseInt(deal_info.attr("downLimit"));
        purchase_quantity_val = parseInt(purchase_quantity_val);
        if (purchase_quantity_val < downLimit) {
            msg('Quantity not less than ' + downLimit)
            purchase_quantity.focus();
        } else {
            calcTotalPrice();
            return true;
        }
    } else {
//        msg("please input a number.")
    }
}
function checkPurchaseQuantity() {
    var purchase_quantity = $("[name=purchase_quantity]");
    var purchase_quantity_val = purchase_quantity.val();
    purchase_quantity_val = purchase_quantity_val.trim();
    purchase_quantity_val = parseInt(purchase_quantity_val);
    if (purchase_quantity_val>=0) {
        var deal_info = $("[name=deal_info]");
        var downLimit = parseInt(deal_info.attr("downLimit"));
        var upLimit = parseInt(deal_info.attr("upLimit"));
        var dealStock = parseInt(deal_info.attr("dealStock"));
        if (purchase_quantity_val > upLimit || purchase_quantity_val > dealStock) {//purchase_quantity_val<downLimit||
            msg("Quantity can't more than " + upLimit);
            purchase_quantity.focus();
            return false;
        } else {
            calcTotalPrice();
            return true;
        }
    } else {
        msg("please input a number.");
        purchase_quantity.focus();
        return false;
    }
}

function calcTotalPrice() {
    var purchase_quantity = $("[name=purchase_quantity]");
    var deal_now_price = $("[name=deal_now_price]");
    var now_price = deal_now_price.attr("number");

    $("[name=deal_total_price]").html("$" + (now_price * purchase_quantity.val()).formatDigit(2));

}
//check total price end

//check bill information start

function bindRegisterCheckFunctions() {
    checkCardholderNameFormatBind();
    checkCardNumberFormatBind();
    checkSecurityCodeFormatBind();
    checkBillAddressFormatBind();
    checkCityFormatBind();
    checkStateFormatBind();
    checkPostalCodeFormatBind();
}
function checkCardholderNameFormatBind() {
    $("[name=cardholder_name]").blur(checkCardholderNameFormat);
}

function checkCardholderNameFormat(flag) {
    if (flag) {
        var cardholder_name = $("[name=cardholder_name]").val();
        if (cardholder_name == "") {
            $("[name=cardholder_name_msg]").html("The name field is empty!").addClass("error-msg-span");
            $("[name=cardholder_name]").focus();
            return false;
        } else {
            $("[name=cardholder_name_msg]").html("");
            return true;
        }

    }
}
function checkBillAddressFormatBind() {
    $("[name=bill_address]").blur(checkBillAddressFormat);
}

function checkBillAddressFormat(flag) {
    if (flag) {
        var bill_address = $("[name=bill_address]").val();
        if (bill_address == "") {
            $("[name=bill_address_msg]").html("The bill address field is empty!").addClass("error-msg-span");
            $("[name=bill_address]").focus();
            return false;
        } else {
            $("[name=bill_address_msg]").html("");
            return true;
        }

    }
}
function checkCardNumberFormatBind() {
    $("[name=card_number]").blur(checkCardNumberFormat);
}

function checkCardNumberFormat(flag) {
    if (flag) {
        var card_number = $("[name=card_number]").val();
        if (card_number == "") {
            $("[name=card_number_msg]").html("The card number field is empty!").addClass("error-msg-span");
            $("[name=card_number]").focus();
            return false;
        } else {
            if (/^[0-9]{12}$/.test(card_number)) {
                $("[name=card_number_msg]").html("");
                return true;
            } else {
                $("[name=card_number_msg]").html("The card number shall be 12 digital!!").addClass("error-msg-span");
                $("[name=card_number]").focus();
                return false;
            }
        }
    }
}
function checkCityFormatBind() {
    $("[name=city]").blur(checkCityFormat);
}
function checkCityFormat(flag) {
    if (flag) {
        var city = $("[name=city]").val();
        if (city == "") {
            $("[name=city_msg]").html("The city field is empty!").addClass("error-msg-span");
            $("[name=city]").focus();
            return false;
        } else {
            $("[name=city_msg]").html("");
            return true;
        }

    }
}
function checkSecurityCodeFormatBind() {
    $("[name=security_code]").blur(checkSecurityCodeFormat);
}
function checkSecurityCodeFormat(flag) {
    if (flag) {
        var security_code = $("[name=security_code]").val();
        if (security_code == "") {
            $("[name=security_code_msg]").html("The security code field is empty!").addClass("error-msg-span");
            $("[name=security_code]").focus();
            return false;
        } else {
            $("[name=security_code_msg]").html("");
            return true;
        }

    }
}
function checkStateFormatBind() {
    $("[name=state]").blur(checkStateFormat);
}
function checkStateFormat(flag) {
    if (flag) {
        var state = $("[name=state]").val();
        if (state == "") {
            $("[name=state_msg").html("The state field is empty!").addClass("error-msg-span");
            $("[name=state]").focus();
            return false;
        } else {
            $("[name=state_msg]").html("");
            return true;
        }

    }
}

function checkPostalCodeFormatBind() {
    $("[name=postal_code]").blur(checkPostalCodeFormat);
}
function checkPostalCodeFormat(flag) {
    if (flag) {
        var postal_code = $("[name=postal_code]").val();
        if (postal_code == "") {
            $("[name=postal_code_msg]").html("The zip field is empty!").addClass("error-msg-span");
            $("[name=postal_code]").focus();
            return false;
        } else {
            if (/^[0-9]*$/.test(postal_code)) {
                $("[name=postal_code_msg]").html("");
                return true;
            } else {
                $("[name=postal_code_msg]").html("The ZIP/Postal Code field is invalid!").addClass("error-msg-span");
                $("[name=postal_code]").focus();
                return false;
            }
        }
    }
}
//check bill information end
function getFormWithHidDealId(actionUrl) {
    var hidStoreId = $('[name=deal_id]').clone(true);
    hidStoreId = hidStoreId[0];
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    form.appendChild(hidStoreId);
    return form;
}

function bindRegisterFunction() {

    $("[name=btnReg]").click(function() {
        $("[name=registerMsg]").html("");
        var flag = checkUserFormat() && checkEmailFormat() && checkPasswordIsEmpty() && checkRePasswordIsSame();
        if (!flag) {
            return;
        }   
        var form = getForm(getURI("/groupbuy/ajax/register"));
        var register_username = $("[name=register_username]");
        var register_email = $("[name=register_email]");
        var register_password = $("[name=register_password]");
        var register_repsw = $("[name=register_repsw]");

        register_username.clone().appendTo($(form));
        register_email.clone().appendTo($(form));
        register_password.clone().appendTo($(form));
        register_repsw.clone().appendTo($(form));
        ajaxRequest(form,
            function(data) {
                if (data.username) {
                    $("[name=sing_panel]").css("display", "none");
                } else {
                    $("[name=registerMsg]").html("Register failed, please register again.").addClass("error-msg-span");
                }
            }
            , function() {

            });


    })

}

//sign
function bindSignFunction() {

    $("[name=sign_in]").click(function() {
        $("[name=login_msg]").html("");
        var form = getForm(getURI("/ajax/login"));
        var login_username = $("[name=login_username]");
        var login_password = $("[name=login_password]");
        if (login_username.val() == "") {
            login_username.focus();
//            $("[name=login_username_msg]").html("Email can't be empty!").addClass("error-msg-span");
            return;
        }
        if (login_password.val() == "") {
            login_password.focus();
//            $("[name=login_password_msg]").html("Password can't be empty!").addClass("error-msg-span");

            return;
        }

        login_username.clone().appendTo($(form));
        login_password.clone().appendTo($(form));
        $("[name=login_remember_me_flg]").clone().appendTo($(form));
        ajaxRequest(form,
            function(data) {
                if (data.username) {
                    $("[name=sing_panel]").css("display", "none");
                } else {
                    $("[name=login_msg]").html("The user password is wrong, or the user email does not exist").addClass("error-msg-span");
                }
            }
            , function() {

            });


    })

}
//sign up check
function bindUserCheckFunctions() {
    checkUserFormatBind();
    checkEmailFormatBind();
    checkPasswordIsEmptyBind();
    checkRePasswordIsSameBind();
}
function checkUserFormatBind() {
    $("[name=register_username]").blur(checkUserFormat);
}
function checkUserFormat() {
    var strUserName = $("[name=register_username]").val();
    if (strUserName == "") {
        $("[name=nameMsg]").html("User's name can't be empty!").addClass("error-msg-span");
        $("[name=register_username]").focus();
        return false;
    } else {
        if (strUserName.match("[0-9_a-zA-Z]*")) {
            $("[name=nameMsg]").html("");
            return true;
        } else {
            $("[name=nameMsg]").html("Please don't enter special character!").addClass("error-msg-span");
            $("[name=register_username]").focus();
            return false;
        }
    }
}

function checkEmailFormatBind() {
    $("[name=register_email]").blur(checkEmailFormat);
}
function checkEmailFormat() {
    var strEmail = $("[name=register_email]").val();
    if (strEmail == "") {
        $("[name=emailMsg]").html("Email address can't be empty!").addClass("error-msg-span");
        $("[name=register_email]").focus();
        return false;
    } else {
        if (strEmail.match("^([0-9a-zA-Z]+[_.0-9a-zA-Z-]+)@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2,3})$")) {
            $("[name=emailMsg]").html("");
            return true;
        } else {
            $("[name=emailMsg]").html("Email address format error!").addClass("error-msg-span");
            $("[name=register_email]").focus();
            return false;
        }
    }
}
function checkPasswordIsEmptyBind() {
    $("[name=register_password]").blur(checkPasswordIsEmpty);
}
function checkPasswordIsEmpty() {
    var strPassword = $("[name=register_password]").val();
    if (strPassword == "") {
        $("[name=pswMsg]").html("User's password can't be empty!").addClass("error-msg-span");
        $("[name=register_password]").focus();
        return false;
    } else {
        $("[name=pswMsg]").html("");
        return true;
    }
}
function checkRePasswordIsSameBind() {
    $("[name=register_repsw]").blur(checkRePasswordIsSame);
}
function checkRePasswordIsSame() {
    var strPassword = $("[name=register_password]").val();
    var strRePassword = $("[name=register_repsw]").val();
    if (strPassword != strRePassword) {
        $("[name=rePswMsg]").html("Re-enter password error!").addClass("error-msg-span");
        $("[name=register_repsw]").focus();
        return false;
    } else {
        $("[name=rePswMsg]").html("");
        return true;
    }
}


function buyWithPaypal(paypal_id, order_number, order_id, total_price) {
    var form = getPaypalStandardForm(paypal_id
        , order_number
        , order_number
        , total_price
        , 'USD'
        , 'US'
//        , getServerBaseUrl('/groupbuy/buy_now?order_number=' + order_number)
        , getServerBaseUrl('/usercenter/groupbuy')
        , getServerBaseUrl('/groupbuy/paypal/receive_paypal_ipn')
        , location.href);
    $('body')[0].appendChild(form);
    form.submit();
}

function getPaypalStandardForm(busAccount, itemName, orderNumber, amount, currency, location, callback, ipnURL, cancelUrl) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://www.sandbox.paypal.com/cgi-bin/webscr');
    form.setAttribute('name', 'frm_paypal');

    var hidVal = document.createElement('input');
    hidVal.setAttribute('type', 'hidden');

    var hidCmd = $(hidVal).clone(true);
    hidCmd.attr('name', 'cmd');
    hidCmd.val('_xclick');
    form.appendChild(hidCmd[0]);

    var hidBusiness = $(hidVal).clone(true);
    hidBusiness.attr('name', 'business');
    hidBusiness.val(busAccount);
    form.appendChild(hidBusiness[0]);

    var hidItemName = $(hidVal).clone(true);
    hidItemName.attr('name', 'item_name');
    hidItemName.val(itemName);
    form.appendChild(hidItemName[0]);

    var hidOrderNumber = $(hidVal).clone(true);
    hidOrderNumber.attr('name', 'invoice');
    hidOrderNumber.val(orderNumber);
    form.appendChild(hidOrderNumber[0]);

    var hidItemNumber = $(hidVal).clone(true);
    hidItemNumber.attr('name', 'item_number');
    hidItemNumber.val(orderNumber);
    form.appendChild(hidItemNumber[0]);

    var hidAmount = $(hidVal).clone(true);
    hidAmount.attr('name', 'amount');
    hidAmount.val(amount);
    form.appendChild(hidAmount[0]);

    var hidCurrencyCode = $(hidVal).clone(true);
    hidCurrencyCode.attr('name', 'currency_code');
    hidCurrencyCode.val(currency);
    form.appendChild(hidCurrencyCode[0]);

    var hidLocation = $(hidVal).clone(true);
    hidLocation.attr('name', 'lc');
    hidLocation.val(location);
    form.appendChild(hidLocation[0]);

    var hidCallBack = $(hidVal).clone(true);
    hidCallBack.attr('name', 'return');
    hidCallBack.val(callback);
    form.appendChild(hidCallBack[0]);

    var hidCancelReturn = $(hidVal).clone(true);
    hidCancelReturn.attr('name', 'cancel_return');
    hidCancelReturn.val(cancelUrl);
    form.appendChild(hidCancelReturn[0]);

    var hidReturnMethod = $(hidVal).clone(true);
    hidReturnMethod.attr('name', 'rm');
    // Use Post method to call back to my site.
    hidReturnMethod.val(2);
    form.appendChild(hidReturnMethod[0]);

    var hidIPNLink = $(hidVal).clone(true);
    hidIPNLink.attr('name', 'notify_url');
    hidIPNLink.val(ipnURL);
    form.appendChild(hidIPNLink[0]);

    return form;
}


