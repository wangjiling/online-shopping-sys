function getStock() {
    var stock = $("[name=hid_stocks]").val();
    return stock;
}

function getAddCartForm(actionUrl) {
    var hidProductId = $('#page_product_id').clone(true);
    hidProductId.attr('name', 'product_id');
    var hidProductCount = $('#product_count').clone(true);
    hidProductCount.attr('name', 'product_count');
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    form.appendChild(hidProductId[0]);
    form.appendChild(hidProductCount[0]);

    return form;
}

function addToCart() {
//    var form = getAddCartForm(getURI("/cart/ajax/add"));
    var productId = $('#page_product_id').val();
    var quantity = $('#product_count').val();
    var price = $('#now_price').val();
    jQuery.ajax({
        type: 'get',
        url: contextPath + '/cart/ajax/add',
        data:{productId: productId, quantity: quantity, price: price},
        success: function(data){
            data = eval('(' + data + ')');
//            alert("data: " + data);
//            var cartNumber = data.cartNumber;
            $(".header-bar .nav .cart-span .cart-count").html("").html(data.cartNumber + ")");
            $(".header-bar .nav .cart-span .shop-cart-div .shop-cart-total .cartNumber").html("").html(data.cartNumber);
            $(".header-bar .nav .cart-span .shop-cart-div .shop-cart-total .totalMoney").html("").html("$"+data.totalMoney);
        },
        error: function(XMLHttpRequest, XMLHttpRequest, errorThrown){

        }
    })
}

$(function() {
    $('#add_to_cart').click(function() {
        addToCart();
    })

    $('[name=product_count]').bind('change', function(event) {
        $(".action .counts .errorMsg").html("");
        var curCount = $(event.target).val();
        if (/^[1-9][0-9]*$/.test(curCount)) {
            curCount = parseInt(curCount);
            var stock = parseInt($("[name=hid_stocks]").val());
            if (curCount > stock) {
                $('[name=product_count]').val(stock);
                $(".action .counts .errorMsg").html("").html("Maximum quantity");
            }
        } else {
            $('[name=product_count]').val(1);
        }

    })

    $('a.minus').click(function() {
        $(".action .counts .errorMsg").html("");
        var val = $('[name=product_count]').val();
        if (val < 2) {
            $('[name=product_count]').val(1);
        } else {
            val = $('[name=product_count]').val();
            val--;
            $('[name=product_count]').val(val);

        }
    })

    $('a.plus').click(function() {
        $(".action .counts .errorMsg").html("");
        var stock = parseInt(getStock());
        var val = $('[name=product_count]').val();
        if (val >= stock) {
            $(".action .counts .errorMsg").html("Maximum quantity");
            $('[name=product_count]').val(stock);
            return false;
        }
        val++;
        $('[name=product_count]').val(val);

    })
})

/*product image scroll*/

function initScrollImages() {
    var scrollImage;
    scrollImage = {};
    scrollImage.currentBigPicUrl = -1;
    scrollImage.canPre = 0
    scrollImage.preNum = 1;
    scrollImage.canNext = 0;
    scrollImage.nextNum = 1;
    $("#pic_chg_area_ss").find("img").click(function(event) {
        $(".pic_in_area_ss").find('li').each(function() {
            $(this).removeClass("onhover");
        });
        $(this).parent().addClass("onhover");
        var imgUrl = $(this).attr("src");
        if (scrollImage.currentBigPicUrl == imgUrl) {
            return;
        }
        $(".major_image").attr("src", imgUrl);
        scrollImage.currentBigPicUrl = imgUrl;
    });
    $(".pic_chg_box_prev").click(function () {
        pre(scrollImage)
    });
    $(".pic_chg_box_next").click(function () {
        next(scrollImage)
    });
    scrollImage.canNext = $(".pic_in_area_ss").find('li').length - 4 - 1;
    if (scrollImage.canNext < 0) {
        scrollImage.canNext = 0;
    }
    changeScrollButtonColor(scrollImage);
}
function pre(scrollImage) {
    if (scrollImage.canPre == 0) {//||preNum>canPre
        return;
    }
    as(scrollImage.canPre - 1);
    scrollImage.canPre--;
    scrollImage.canNext++;
    scrollImage.nextNum--;
    changeScrollButtonColor(scrollImage);
}
function next(scrollImage) {
    if (scrollImage.canNext <= 0) {
        return;
    }
    var picNum = scrollImage.nextNum;
    move(picNum);
    scrollImage.nextNum++;
    scrollImage.canPre++;
    scrollImage.canNext--;
    if (scrollImage.preNum > 1) {
        scrollImage.preNum--;
    }
    changeScrollButtonColor(scrollImage);
}
function as(index) {
    var picNum = index;
    move(picNum);
}
function move(index) {
    var picNum = index;
    var movePos = (($('#pic_chg_area_ss>li').width() + 12) * (-picNum)) - 0;
    $("#pic_chg_area_ss").animate({marginLeft:movePos}, 200);
}
function changeScrollButtonColor(scrollImage) {
    if (scrollImage.canNext > 0) {
        $(".pic_chg_box_next a").css({"color":"#333333",backgroundColor:"#ffffff"});
        $(".pic_chg_box_next").removeClass("pic_chg_box_no");
    } else {
        $(".pic_chg_box_next a").css({"color":"#ababab",backgroundColor:"#F3F3F3"});
        $(".pic_chg_box_next").addClass("pic_chg_box_no");
    }
    if (scrollImage.canPre > 0) {
        $(".pic_chg_box_prev a").css({"color":"#333333",backgroundColor:"#ffffff"});
        $(".pic_chg_box_prev").removeClass("pic_chg_box_no");
    } else {
        $(".pic_chg_box_prev a").css({"color":"#ababab",backgroundColor:"#F3F3F3"});
        $(".pic_chg_box_prev").addClass("pic_chg_box_no");
    }
}

