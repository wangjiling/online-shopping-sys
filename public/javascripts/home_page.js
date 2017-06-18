var xLabel = new Array();
$(function() {
    $('input[name=btn_join_us]').click(function(e) {
        location.href = getURI("/signup");
    })

    $('[name=lnk_local_search]').change(function(event) {
        var cityName = $(event.target).val();
        loadLocalProduct();
    })

    getStackGraph(new Date().getTime(), 4, 3,"month");

})

$(window).resize(function(){
//    $(".filter ul li a.on").trigger("click");
    resizeBox();
//    initFontSize();
})

function resizeBox(){
    var devWidth = $(window).width();
    var devHeight = $(window).height();
    $(".stack .wrap,.selection .wrap").width(478);
//    $(".stack .wrap,.selection .wrap").width($(".container").width() - (devWidth/3) - 60);
//    $(".data").width(devWidth/3);
//    $(".count .product,.count .sale").height(devWidth/3/2 -10);
//    $(".filter .title,.filter .fashion").width(devWidth/3/2 - 10).height(devWidth/3/2 - 10);
//    $(".popular canvas").width(devWidth/3);
//    var _h = $(".date-graph").height() - $(".data").height();
//    if(_h < 0){
//        $(".date-graph .stack .graph").height(375 + Math.abs(_h));
//    }
//    initFontSize();
    initMenuSize();
}

function initFontSize(){
    var width = $(".count").width();
    $(".product,.sale").css({fontSize:width / 8});
    $(".filter .title").css({fontSize:width / 2 * 0.3,lineHeight:(width - 20)/2 + "px"});
    $(".fashion ul li a").css({fontSize:(width - 20)/2 * .14});
    $(".fashion ul li a.on").css({fontSize:(width - 20)/2 * .18});
}


function getStackGraph(nowDate, lastTimes, topX, types){
    jQuery.ajax({
        type:'get',
        url:contextPath + '/ajax/top/stackGraph',
        data:{nowDate:nowDate, lastTimes: lastTimes, topX: topX, types:types},
        success:function(data){
            var graphData = new Array();
            var dataObj = eval('('+data+')');
            xLabel = [];
            for(var j = 0; j < 3; j++){
                graphData[j] = new Array();
                var topItem = graphData[j];
//                for(var i=lastTimes - 1;i >= 0;i--){
                for(var i=0; i< lastTimes; i++){
                    try{
                        formatXlabel(types,dataObj.extensions.stackGraph[i].dateMark);
                        topItem.push([dataObj.extensions.stackGraph[i].result[j].categoryName, dataObj.extensions.stackGraph[i].result[j].quantity]);
                    }catch(err){
                        topItem.push(0);
                    }
                }
            }
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'stack',
                    type: 'column',
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                        stops: [
                            [0, 'rgb(128, 128, 128)'],
                            [1, 'rgb(128, 128, 128)']
                        ]
                    }
                },
                title: {
                    text: '',
                    style:{
                        color:'#fff'
                    }
                },
                xAxis: {
                    showLastLabel:true,
                    categories: xLabel,
                    lineColor:'#fff',
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },
                    lineWidth:0
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    },
                    gridLineColor:'#a9a9a9',
                    gridLineWidth:1,
                    labels: {
                        style: {
                            color: '#fff'
                        },
                        enabled:true,
                        align: 'left',
                        x: 0,
                        y: 0
                    }
                },
                legend: {
                    align: 'right',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function() {
                        return '<b> Product: '+ this.key +'</b><br/>'+
                            this.series.name +': '+ this.y +'<br/>'+
                            'Total: '+ this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                credits:{
                    enabled:false
                },
                series: [{
                    name: "TOP1",
                    data: graphData[0],
                    color:'#8fc940',
                    borderColor:'#ffffff'
                }, {
                    name: "TOP2",
                    data: graphData[1],
                    color:'#628a2c',
                    borderColor:'#ffffff'
                }, {
                    name: "TOP3",
                    data: graphData[2],
                    color:'#1b2212',
                    borderColor:'#ffffff'
                }]
            });

//            var chart2 = new Highcharts.Chart({
//                chart: {
//                    renderTo: 'selection',
//                    backgroundColor: {
//                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
//                        stops: [
//                            [0, 'rgb(128, 128, 128)'],
//                            [1, 'rgb(128, 128, 128)']
//                        ]
//                    }
//                },
//                title: {
//                    text: '',
//                    style:{
//                        color:'#fff'
//                    }
//                },
//                xAxis: {
//                    showLastLabel:true,
//                    categories: xLabel,
//                    lineColor:'#fff',
//                    labels: {
//                        style: {
//                            color: '#fff'
//                        }
//                    },
//                    gridLineColor:'#a9a9a9',
//                    gridLineWidth:1,
//                    lineWidth:0
//                },
//                yAxis: {
//                    min: 0,
//                    title: {
//                        text: ''
//                    },
//                    stackLabels: {
//                        enabled: true,
//                        style: {
//                            fontWeight: 'bold',
//                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
//                        }
//                    },
//                    gridLineColor:'#fff',
//                    gridLineWidth:0,
//                    labels: {
//                        style: {
//                            color: '#fff'
//                        },
//                        enabled:false,
//                        align: 'left',
//                        x: 0,
//                        y: -5
//                    }
//                },
//                legend: {
//                    align: 'right',
//                    x: 0,
//                    verticalAlign: 'top',
//                    y: 0,
//                    floating: true,
//                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
//                    borderColor: '#CCC',
//                    borderWidth: 1,
//                    shadow: false,
//                    enabled:false
//                },
//                tooltip: {
//                    formatter: function() {
//                        return '<b> Product: '+ this.key +'</b><br/>'+
//                            this.series.name +': '+ this.y +'<br/>'
//                    }
//                },
//                plotOptions: {
//                    column: {
//                        stacking: 'normal',
//                        dataLabels: {
//                            enabled: false,
//                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
//                        }
//                    }
//                },
//                credits:{
//                    enabled:false
//                },
//                series: [{
//                    name: "TOP1",
//                    data: graphData[0],
//                    color:'#8fc940',
//                    borderColor:'#ffffff'
//                }, {
//                    name: "TOP2",
//                    data: graphData[1],
//                    color:'#628a2c',
//                    borderColor:'#ffffff'
//                }, {
//                    name: "TOP3",
//                    data: graphData[2],
//                    color:'#6d7b90',
//                    borderColor:'#ffffff'
//                }]
//            });


        },
        error:function(XMLHttpRequest, XMLHttpRequest, errorThrown){
        }
    });
}

function formatXlabel(type,dataMark){
    switch (type){
        case 'year':
            xLabel.push(new Date(dataMark).getFullYear());
            break;
        case 'month':
            xLabel.push(new Date(dataMark).formatMonth() + '-' + new Date(dataMark).getFullYear());
            break;
        case 'week':
            xLabel.push(new Date(dataMark).getDate() + '-' + new Date(dataMark).formatMonth());
            break;
        case 'day':
            xLabel.push(new Date(dataMark).getDate() + '-' + new Date(dataMark).formatMonth());
            break;
        default :
            xLabel.push(new Date(dataMark).formatMonth() + '-' + new Date(dataMark).getFullYear());
    }
}



/*
search featured product
 */
function loadLocalProduct() {

    var form = getFormLocalProductSearch(getURI('/search/ajax/featured_products'));
    ajaxRequest(form,
            function(data) {
                var productUl = $('#local_products_list')[0];
                var productTemplate = $(productUl).find('li.hid_template').clone(true);
                productUl.innerHTML = "";
                productUl.appendChild(productTemplate[0]);

                var i = 0;
                for (var i = 0;
                     i < data.length;
                     i++) {

                    var productLi = $('li.product_thumbnail').clone(true);
                    var productObj = data[i];
                    productLi.find('img.product_major_image').attr({'src':contextPath + productObj.majorImage,'alt':productObj.productName});
                    productLi.find('a.lnk_product_image').attr({'href':getURI("/product/") + productObj.productId});
                    productLi.find('a.lnk_product_name').attr({'href':getURI("/product/") + productObj.productId,'title':productObj.productName});
                    productLi.find('p.product_name').html(productObj.productName);
                    productLi.find('p.product_now_price').html(productObj.nowPrice);
                    productLi.removeClass('hid_template');
                    productUl.appendChild(productLi[0]);
                }

            }
            , function() {
            });
}

function getFormLocalProductSearch(actionUrl) {
    var hidCategoryPath = document.createElement('input');
    $(hidCategoryPath).attr('type', 'hidden');
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    form.appendChild(hidCategoryPath);

    return form;
}

$(document).ready(function() {
    try {
        loadLocalProduct("Boston");
    } catch(error) {
    }

    try {
        loadHotSaleProduct();
    } catch(error) {
    }

    try {
        loadHomeTopDeal();
    } catch(error) {
    }

})

function loadHotSaleProduct() {
    var form = getForm(getURI('/search/ajax/load_hot_sale'));
    ajaxRequest(form,
            function(data) {
                if (data.length < 1) {
                    return;
                }
                var productUl = $('#hot_sale_list')[0];
                var productTemplate = $(productUl).find('li.hid_template').clone(true);
                productUl.innerHTML = "";
                productUl.appendChild(productTemplate[0]);

                var i = 0;
                for (var i = 0;
                     i < data.length;
                     i++
                        ) {
                    var productLi = $('li[name=hot_sale_item]').clone(true);
                    var productObj = data[i];
                    productLi.find('.hot_sale_item_image').attr({'src':contextPath + productObj.majorImage,'alt':productObj.productName});
                    productLi.find('.lnk_hot_sale_item_image').attr({'href':getURI("/product/") + productObj.productId});
                    productLi.find('.lnk_hot_sale_item_name').attr({'href':getURI("/product/") + productObj.productId,'title':productObj.productName});
                    productLi.find('.hot_sale_item_name').html(productObj.productName);
                    productLi.find('.hot_sale_item_price').html(productObj.nowPrice);
                    productLi.find('[name=link_purchase_now]').attr({'href': getURI("/product/") + productObj.productId});

                    productLi.removeClass('hid_template');
                    productUl.appendChild(productLi[0]);
                }
                hotListRoll();
            }
            , function() {
            });
}

function getDealsRequestForm(actionUrl) {

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

    } catch(error) {
    }
    return form;
}

function loadHomeTopDeal() {

//    jQuery.ajax({
//        type:"post",
//        url: '/groupbuy/ajax/load_home_top_deal',
//        data: null,
//        success:function(data) {
//            var dataObj;
//            try {
//                dataObj = eval('(' + data + ')');
//                if (dataObj) {
//                    alert(dataObj);
//                }
//            } catch(error) {
//            }
//
//        },
//        error:function(XMLHttpRequest, XMLHttpRequest, errorThrown) {
//            funcFailed();
//        }
//    });


    var form = getDealsRequestForm(getURI('/groupbuy/ajax/load_home_top_deal'));
    ajaxRequest(form,
            function(data) {
                if (null == data || "" == data || data.dealId <= 0) {
//                    $("[name=div_top_recommend_deal]").addClass('hid_template');
                    return;
                }
                var topDealElem = $("[name=div_top_recommend_deal]");
                topDealElem.removeClass('hid_template');
                topDealElem.find('[name=title]').html(data.dealName);
                topDealElem.find('[name=title]').attr('href', getURI(contextPath + "/product/") + data.productId);
                topDealElem.find("[name=deal_purchase_a]").attr("href", getURI(contextPath + '/product/') + data.productId);
                topDealElem.find('img[name=major_img]').attr({'src':contextPath + data.dealIcon,'alt':data.dealName});
                topDealElem.find('[name=major_img_link]').attr({'href':getURI(contextPath + '/product/') + data.productId});
                topDealElem.find('[name=description]').html(data.dealDescription);
                topDealElem.find('[name=now_price]').html(data.nowPrice);
                topDealElem.find('[name=original_price]').html(data.originalPrice);

//                topDealElem.find('[name=off_percent]').html(data.offPercent);
                if (data.dealDiscountType == "discount") {
                    topDealElem.find("[name=deal_discount_type_desc]").html("Discount:");
                    topDealElem.find("[name=deal_discount_show_value]").html(data.disCount.formatDigit(0) + "%");
                } else {
                    topDealElem.find("[name=deal_discount_type_desc]").html("Save:");
                    topDealElem.find("[name=deal_discount_show_value]").html("$" + (data.originalPrice - data.nowPrice).formatDigit(2));
                }

                topDealElem.find('[name=boughtCount]').html(data.boughtCount);


                if (data.remainingTime > 1000) {
                    $("[name=remain_time_content]").html(new Remain(data.remainingTime).toString());
                    data.remainingTime = data.remainingTime - 1000;
                } else {
                    $("[name=remain_time_content]").html(" DEAL EXPIRED ");
                }

                var timer = new Timer();
                timer.setFunction(function(timerObj) {
                    if (timerObj.params >= 1000) {
                        var remain = new Remain(timerObj.params);
                        $("[name=remain_time_content]").html(remain.toString());
                        timerObj.params = timerObj.params - 1000;
                    } else {
                        $("[name=remain_time_content]").html(" DEAL EXPIRED ");
                    }
                }, data.remainingTime, 1000, {cycle: true, runBeforeTimeout: false});
                timer.start();
                topDealElem.find('[name=business_description]').html(data.businessDescription);
                topDealElem.find('[name=expiredDate]').val(data.expiredDate);
                topDealElem.find('[name=upLimit]').val(data.upLimit);
                topDealElem.find('[name=downLimit]').val(data.downLimit);
                topDealElem.find('[name=dealStock]').val(data.dealStock);
                topDealElem.find('[name=tippingPoint]').val(data.tippingPoint);
                topDealElem.find('[name=minimumBoughtDate]').val(data.minimumBoughtDate);
                topDealElem.find('[name=disCount]').val(data.disCount);
                topDealElem.find('[name=saleOutFlag]').val(data.saleOutFlag);

                topDealElem.find("[name=fb_share_title]").val(data.dealName);
                topDealElem.find("[name=fb_share_summary]").val(data.dealDescription);
                topDealElem.find("[name=fb_share_image]").val(data.dealIcon);
            }
            , function() {
            });
}



