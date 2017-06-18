function ajaxRequest(form, funcSuccess, funcFailed) {
    jQuery.ajax({
        type:form.method,
        url: form.action,
        data: $(form).serialize(),
        success:function(data, textStatus) {
            var dataObj;
            try {
                dataObj = eval('(' + data + ')');
                if (dataObj) {
                    funcSuccess(dataObj);
                }
            } catch(error) {
            }

        },
        error:function(XMLHttpRequest, XMLHttpRequest, errorThrown) {
            funcFailed();
        }
    });
}

function ajaxRequestAllowNull(form, funcSuccess, funcFailed) {
    jQuery.ajax({
        type:form.method,
        url: form.action,
        data:$(form).serialize(),
        success:function(data, textStatus) {
            var dataObj;
            try {
                dataObj = eval('(' + data + ')');
            } catch(error) {
            }

            funcSuccess(dataObj);

        },
        error:function(XMLHttpRequest, XMLHttpRequest, errorThrown) {
            funcFailed();
        }
    });
}

function getServerContextPath() {
    var hidContextPath = $('#server-context-path').attr('rel');
    if (hidContextPath != null) {
        return hidContextPath;
    } else {
        return "";
    }
}

function getServerBaseUrl(urlPath) {
    var nowurl = location.href;

    var baseurl = /^[a-zA-Z]+:\/\/[^:/]+(:[0-9]+)?/.exec(nowurl);

    if (baseurl && baseurl.length > 0) {
        return baseurl[0] + getServerContextPath() + urlPath;
    } else {
        return "";
    }


}

function getURI(uri) {
    var rstURI = getServerContextPath() + uri;
    return rstURI;
}

function getAjaxURI(uri) {
    var rstURI = getServerContextPath() + "/ajax" + uri;
    return rstURI;
}

// Number format
Number.prototype.format = function() {
    try{
        var formatedValue = $().number_format(this, {
                             numberOfDecimals:2,
                             decimalSeparator: '.',
                             thousandSeparator: ',',
                             symbol: ''});
    }catch(error){
        return this;
    }
    return formatedValue;
}


Number.prototype.formatDigit = function(digit) {
    try{
        var formatedValue = $().number_format(this, {
                             numberOfDecimals:digit,
                             decimalSeparator: '.',
                             thousandSeparator: ',',
                             symbol: ''});
    }catch(error){
        return this;
    }
    return formatedValue;
}

Number.prototype.formatValue = function(value) {
    try{
        var formatedValue = $().number_format(value, {
                             numberOfDecimals:2,
                             decimalSeparator: '.',
                             thousandSeparator: ',',
                             symbol: ''});
    }catch(error){
        return value;
    }
    return formatedValue;
}

var removeCommaInDigital = function(value){
    try{
        return new Number(value.trim().replace(new RegExp(",","gm"),''));
    }catch(error){
        return value
    }
}


// Date format
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S" : this.getMilliseconds()
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function getLoginCheckForm(actionUrl) {

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');

    return form;
}

$(document).ready(function() {
    $("#msgbox").dialog({autoOpen:false,modal:true});

})

function getActionForm(actionUrl) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    return form;
}

var showWaitPanel = function() {
    var h = $(document).height();
    var w = $(document).width();
//    $("body").append("<div id='layout'></div>");
    $("#layout").css({"height":h,"width":w});
    var _x = $(document).width() - $(".layout-wait").width();
    var _y = $(document).height() - $(".layout-wait").height();
    $('.layout-wait').css({left:_x / 2,top:_y / 2});
    $("#layout").show();
    $('.layout-wait').show();
//    $("#layout").hide();
//    $(".error-p").html(msg);
//    $("#msg").show();
//    $("#msg .close").click(function() {
//        $("#msg").hide();
//        $("#layout").hide();
//    })

}
var hideWaitPanel = function() {
    $("#layout").hide();
    $('.layout-wait').hide();
}
//
/**
 * generate PaginationFoot
 * @param data PageInfoOutCmd
 * @param product_list_page_area foot panel (jqueryObject)
 */
function generatePaginationFoot(data, product_list_page_area, loadDataFunction, myForm) {
    product_list_page_area.html('');
    if (data.showList.length < 1 && !data.showObject) {
        return;
    }
    if (data.canLeftPage > 0) {
        $('<a>', {
            text:'<<Previous',
            href:'#action',
            click:function() {
                loadDataFunction(data.willShowPage - 1, data.willShowPage, myForm);
            }
        }).appendTo(product_list_page_area);
        $('<span class="sp2">|</span>').appendTo(product_list_page_area);
    }
    
    $('<span class="sp2">Page:</span>').appendTo(product_list_page_area);

    for (var i = data.canLeftPage; i > 0; i--) {
        var temp = data.willShowPage - i;
        $('<a>', {
            text:temp,
            href:'#action',
            click:function() {
                loadDataFunction($(this).text(), data.willShowPage, myForm);
            }
        }).appendTo(product_list_page_area);
    }

    $('<span class="sp2">'+data.willShowPage+'</span>').appendTo(product_list_page_area);
//    product_list_page_area.append("[ " + data.willShowPage + " ]");

    for (var i = 1; i <= data.canRightPage; i++) {
        var temp = data.willShowPage + i;
        $('<a>', {
            text:temp,
            href:'#action',
            click:function() {
                loadDataFunction($(this).text(), data.willShowPage, myForm);
            }
        }).appendTo(product_list_page_area);
    }
    //
    if (data.canRightPage > 0) {

        $('<a>', {
            text:'...',
            href:'#action',
            click:function() {
                loadDataFunction(data.willShowPage + data.canRightPage + 1, data.willShowPage, myForm);
            }
        }).appendTo(product_list_page_area);

        $('<span class="sp2">|</span>').appendTo(product_list_page_area);
        $('<a>', {
            text:'Next>>',
            href:'#action',
            click:function() {
                loadDataFunction(data.willShowPage + 1, data.willShowPage, myForm);
            }
        }).appendTo(product_list_page_area);
    }
}
/**
 * append pageinfo to the
 * @param willShowPage
 * @param lastShowPage
 * @param myForm
 */
function appendPageInfoToForm(willShowPage, lastShowPage, myForm) {
    $(myForm).find('input[name=will_page]').remove();
    $(myForm).find('input[name=last_show_page]').remove();
    $('<input>', {type:"text",name:"will_page",value:willShowPage}).appendTo($(myForm));
    $('<input>', {type:"text",name:"last_show_page",value:lastShowPage}).appendTo($(myForm));
}

function getForm(actionUrl){
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');

    return form;
}

function setValueIncludeInSelectionController(controller, val) {
    try {
        var options = $(controller).find('option');
        var patt = new RegExp(val)
        var selectVal;
        for (var i = 0; i < options.length; i++) {
            if(patt.test($(options[i]).val())){
                selectVal = $(options[i]).val();
                break;
            }
        }
        $(controller).val(selectVal);
    } catch(error) {
    }
}

function loadHotSaleProduct() {
    var form = getForm(getURI('/home/ajax/load_hot_sale'));
    ajaxRequest(form,
        function(data) {
            if (data.length < 1) {
                return;
            }

            var productUl = $('#hot_sale_list')[0];
            var productTemplate = $(productUl).find('li.hid_template');

            var i = 0;
            for (var i = 0;
                 i < data.length;
                 i++
                ) {
                var productLi = productTemplate.clone(true);
                var productObj = data[i];
                productLi.find('[name=hot_sale_item_image]').attr({'src':productObj.majorImage,'alt':productObj.name});
                productLi.find('[name=lnk_hot_sale_item_image]').attr({'href':getURI("/product?product_id=") + productObj.id});
                productLi.find('[name=hot_sale_item_name]').attr({'href':getURI("/product?product_id=") + productObj.id,'title':productObj.name});
//                    productLi.find('a.lnk_hot_sale_item_image').attr({'href':getURI("") + productObj.storeURL});
//                    productLi.find('a.lnk_hot_sale_item_name').attr({'href':getURI("") + productObj.storeURL,'title':productObj.name});
//                    productLi.find('[name=hot_sale_item_name]').html(productObj.name);
                productLi.find('[name=hot_sale_item_name]').html("the name");
                productLi.find('[name=hot_sale_item_price]').html(productObj.marketPriceStr);
                productLi.find('[name=link_purchase_now]').attr({'href': getURI("/product?product_id=") + productObj.id});

                productLi.removeClass('hid_template');
                productUl.appendChild(productLi[0]);
            }

        }
        , function() {
        });
}



