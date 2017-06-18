$(document).ready(function() {
//    loadGroupbuyPrimaryDeal();
//    loadGroupbuyDeals();
})


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

function loadGroupbuyPrimaryDeal() {
    var form = getAllDealsForm(getURI('/groupbuy/ajax/load_primary_deal'));
    var originalElems = $("[name=group_buy_primary_deal]");
    originalElems.html("");
    ajaxRequest(form,
            function(data) {
                if (null == data || "" == data || data.dealId <= 0) {
                    $("[name=group_buy_primary_deal]")[0].innerHTML = "Sorry, there is not top deal information for this location.";
                    return;
                }
                var primaryDealElem = $("[name=group_buy_primary_deal]")[0];
                var primaryDealTemplate = $("[name=group_buy_primary_deal_template]");
                primaryDealElem.innerHTML = "";

                var imageElem = primaryDealTemplate.find("[name=div_primary_deal_image]").clone(true);
                imageElem.find('img[name=primary_deal_image]').attr({'src':data.dealIcon,'alt':data.dealName});
                imageElem.find('a[name=lnk_deal_primary_image]').attr({'href':getURI("/groupbuy/deal?deal_id=") + data.dealId});
                primaryDealElem.appendChild(imageElem[0]);

                var bodyElem = primaryDealTemplate.find("[name=div_primary_deal_body]").clone(true);
                bodyElem.find('a[name=primary_deal_price]').html("$" + data.nowPrice + " for $" + data.originalPrice + " at " + data.dealName);
                bodyElem.find('a[name=lnk_deal_primary_price]').attr({'href':getURI("/groupbuy/deal?deal_id=") + data.dealId});
                bodyElem.find('b[name=primary_deal_subtitle]').html(data.dealSubtitle);
                bodyElem.find('p[name=primary_deal_description]').html(data.dealDescription);
                bodyElem.find('a[name=lnk_deal_primary_info]').attr({'href':getURI("/groupbuy/deal?deal_id=") + data.dealId});

                if (data.remainingTime > 1000) {
                    bodyElem.find("b[name=remain_time_content]").html(new Remain(data.remainingTime).toString());
                    data.remainingTime = data.remainingTime - 1000;
                } else {
                    bodyElem.find("b[name=remain_time_content]").html(" DEAL EXPIRED ");
                }
                var timer = new Timer();
                timer.setFunction(function(timerObj) {
                    if (timerObj.params >= 1000) {
                        var remain = new Remain(timerObj.params);
                        bodyElem.find("b[name=remain_time_content]").html(remain.toString());
                        timerObj.params = timerObj.params - 1000;
                    } else {
                        bodyElem.find("b[name=remain_time_content]").html(" DEAL EXPIRED ");
                    }
                }, data.remainingTime, 1000, {cycle: true, runBeforeTimeout: false});
                timer.start();

                primaryDealElem.appendChild(bodyElem[0]);
            }
            , function() {
            });
}

function loadGroupbuyDeals() {
    var form = getAllDealsForm(getURI('/groupbuy/ajax/load_deals'));
    var originalElems = $("[name=group_buy_deal_list]");
    originalElems.html("");
    ajaxRequest(form,
            function(data) {
                if (data.length < 1) {
                    return;
                }
                var groupbuyDealElem = $("[name=group_buy_deal_body]")[0];
                var groupbuyDealTemplate = $('[name=group_buy_deal_body_template]');


                var productUl = $(groupbuyDealElem).find("[name=group_buy_deal_list]")[0];
                productUl.innerHTML = "";

                for (var i = 0;
                     i < data.length;
                     i++
                        ) {
                    var productLi = groupbuyDealTemplate.find('[name=group_buy_deal_item]').clone(true);
                    var productObj = data[i];
                    productLi.find('img[name=deal_item_image]').attr({'src':productObj.dealIcon,'alt':productObj.dealName});
                    productLi.find('a[name=lnk_deal_item_image]').attr({'href':getURI("/groupbuy/deal?deal_id=") + productObj.dealId});
                    productLi.find('a[name=lnk_deal_item_name]').attr({'href':getURI("/groupbuy/deal?deal_id=") + productObj.dealId,'title':productObj.dealName});
                    productLi.find('p[name=deal_item_name]').html(productObj.dealName);
                    productLi.find('p[name=deal_item_description]').html(productObj.dealDescription);
                    if (productObj.saleOutFlag) {
                        var soldOutElem = productLi.find('div[name=sold_out_flag]').clone(true);
                        soldOutElem.removeClass('hid_template');
                        productLi[0].appendChild(soldOutElem[0]);
                    }
                    productLi.removeClass('hid_template');
                    productUl.appendChild(productLi[0]);
                }

                groupbuyDealElem.appendChild(productUl);

            }
            , function() {
            });
}

