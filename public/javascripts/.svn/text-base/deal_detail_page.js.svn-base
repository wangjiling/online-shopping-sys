var google_static_map_url = "http://maps.google.com/maps/api/staticmap?size=200x200&sensor=false&markers=color:red|size:mid";

function loadWebsitePath() {
    var form = getFormWithHidDealId(getURI('/groupbuy/ajax/load_website_path'));
    ajaxRequest(form,
        function(data) {
            var websitePathPanel = $('#panel_website_path');
            var pathLine = websitePathPanel.find(".website_path_line")[0];

            for (var i = 0;
                 i < data.length;
                 i++
                ) {
                var pathNode = $(pathLine).find('.hid_template').clone(true);
                var pathNodeObj = data[i];
                pathNode.find('a.path_node').html(pathNodeObj.name);
                pathNode.find('a.path_node').attr('href', pathNodeObj.url);
                if (i == data.length - 1) {
                    pathNode.find('p.path_arrow').html("");
                }
                pathNode.removeClass('hid_template');
                pathLine.appendChild(pathNode[0]);
            }

        }
        , function() {
        });
}


function showDealIsOn() {
    $("[name=deal_on]").show();
}
function hideDealIsOn() {
    $("[name=deal_on]").hide();
}
function loadDealInfo() {
    var form = getFormWithHidDealId(getURI('/groupbuy/ajax/load_deal_info'));
    ajaxRequest(form,
        function(data) {
            if (data) {

                // Initialized the Points Calculator.
                initPointsCalculator(data);
//                //init web site path
//                $("[name=deal_store_link]").attr({href:getURI('/store?store_id=') + data.storeId}).html(data.storeTitleOutCmd.name);
//                $("[name=deal_title]").html(data.dealTitle);

                var deal_detail_panel = $('#deal_detail_panel');

                if (data.upLimit > 0 ){
                    //TODO no stock
                }
                if (data.beginTime < new Date().getTime()){
                    //TODO not started
                }
                //check the deal can buy
                if (data.remainingTime > 1000 && data.upLimit > 0 && data.beginTime < new Date().getTime()) {//can buy
                    showDealIsOn();
                    deal_detail_panel.find("[name=deal_purchase_a]").attr("href", getURI('/groupbuy/purchase?deal_id=') + data.dealId);
                } else {
                    hideDealIsOn();
                    deal_detail_panel.find("[name=deal_purchase_a]").attr("href", "#action");
                }
                //check valid_group_time and tippingPoint
                if (data.validGroupDatetime != 0 && data.boughtCount >= data.tippingPoint) {
                    $("[name=valid_group]").show();
                    $("[name=valid_group_time]").html((new Date(data.validGroupDatetime)).pattern("MM-dd HH:mm:ss"));
                    $("[name=tipping_point]").html(data.tippingPoint);
                } else {
                    $("[name=valid_group]").hide();
                }
                deal_detail_panel.find("[name=deal_title]").html(data.dealTitle);
                deal_detail_panel.find("[name=deal_subtitle]").html(data.dealSubtitle);
                deal_detail_panel.find("[name=deal_now_price]").html("$" + data.nowPrice.formatDigit(2));
                deal_detail_panel.find("[name=deal_original_price]").html("$" + data.originalPrice.formatDigit(2));
                //check the dealDiscountType
                if (data.dealDiscountType == "discount") {
                    deal_detail_panel.find("[name=deal_discount_type_desc]").html("Discount:");
                    deal_detail_panel.find("[name=deal_discount_show_value]").html(data.disCount.formatDigit(0) + "%");
                } else {
                    deal_detail_panel.find("[name=deal_discount_type_desc]").html("Save:");
                    deal_detail_panel.find("[name=deal_discount_show_value]").html("$" + (data.originalPrice - data.nowPrice).formatDigit(2));
                }

                deal_detail_panel.find("[name=deal_bought_count]").html("Over " + data.boughtCount + " Bought");
                //minimum bought date
//                deal_detail_panel.find("[name=deal_with_bought]").html("Tipped at 10:54AM with 10 bought "+data.minimumBoughtDate);
                deal_detail_panel.find("[name=deal_icon]").attr("src", (data.dealIcon));

                deal_detail_panel.find("[name=deal_static_map]").attr("src", google_static_map_url + "|" + data.address);
//                deal_detail_panel.find("[name=deal_static_map]").attr("src", google_static_map_url + "|" + data.location.address1 + "|" + data.location.address2);
                deal_detail_panel.find("[name=description]").html(data.description);
                deal_detail_panel.find("[name=businessDescription]").html(data.businessDescription);
                //the deal of store info
                deal_detail_panel.find("[name=store_icon]").attr("src", (data.storeTitleOutCmd.majorImage));
                deal_detail_panel.find("[name=store_link]").attr("href", getURI('/store?store_id=') + data.storeId);
                //hidden property
                deal_detail_panel.find("[name=address]").val(data.address);
                deal_detail_panel.find("[name=downLimit]").val(data.downLimit);
                deal_detail_panel.find("[name=upLimit]").val(data.upLimit);
                deal_detail_panel.find("[name=dealStock]").val(data.dealStock);
                deal_detail_panel.find("[name=endTime]").val(data.endTime);
                deal_detail_panel.find("[name=remainingTime]").val(data.remainingTime);
                deal_detail_panel.find("[name=tippingPoint]").val(data.tippingPoint);
                deal_detail_panel.find("[name=deal_purchase_a]").val(data.downLimit);
                deal_detail_panel.find("[name=couponExpire]").val(data.couponExpire);

                deal_detail_panel.find("[name=fb_share_title]").val(data.dealTitle);
                deal_detail_panel.find("[name=fb_share_summary]").val(data.description);
                deal_detail_panel.find("[name=fb_share_image]").val(data.dealIcon);


                //count down 
//                data.remainingTime = 3000;
//                if (data.remainingTime > 1000) {
//                    $("[name=remain_time_content]").html(new Remain(data.remainingTime).toString());
//                    data.remainingTime = data.remainingTime - 1000;
//                } else {
//                    hideDealIsOn();
//                    deal_detail_panel.find("[name=deal_purchase_a]").attr("href", "#action");
//                    $("[name=remain_time_content]").html(" DEAL EXPIRED ");
//                }
                var timer = new Timer();
                timer.setFunction(function(timerObj) {
                    if (timerObj.params >= 1000) {
                        var remain = new Remain(timerObj.params);
                        $("[name=remain_time_content]").html(remain.toString());
                        timerObj.params = timerObj.params - 1000;
                    } else {
                        hideDealIsOn();
                        deal_detail_panel.find("[name=deal_purchase_a]").attr("href", "#action");
                        $("[name=remain_time_content]").html(" DEAL EXPIRED ");
                    }
                }, data.remainingTime, 1000, {cycle: true, runBeforeTimeout: true});
                timer.start();


            }
        }
        , function() {

        });
}
function loadDealDescription() {
    var form = getFormWithHidDealId(getURI('/groupbuy/ajax/load_deal_desc'));
    ajaxRequest(form,
        function(data) {
            if (data) {
                var deal_detail_panel = $('#deal_detail_panel');
                deal_detail_panel.find("[name=deal_brief_desc]").html(data.briefDescription);

                deal_detail_panel.find("[name=deal_gist_desc]").html(data.gistDescription);
                deal_detail_panel.find("[name=deal_article_desc]").html(data.article);
            }
        }
        , function() {

        });
}


function getFormWithHidDealId(actionUrl) {
    var hidDealId = $('[name=deal_id]').clone(true);
    hidDealId = hidDealId[0];
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    form.appendChild(hidDealId);
    return form;
}

