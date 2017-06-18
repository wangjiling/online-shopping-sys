$(function() {
    usePoints();

    $('[name=btn_remove]').click(function() {
        removeItemFromCart();
    })

    $('[name=btn_checkout_shopping_cart]').click(function() {
//        location.href = getURI("/order/input_order");
        orderDetail();
    })
    $('[name = "payNow"]').click(function() {
//        location.href = getURI("/order/input_order");
        orderDetail();
    })

})

function orderDetail(){
    var usedPoint = $('[name = "usePoint"]').val();
    $('.usedPoint').html("").html(usedPoint);
    $('[name = "usedPoint"]').val(usedPoint);
    $(".cartList").addClass("hid_template");
    $(".orderDetail").removeClass("hid_template");
//    jQuery.ajax({
//        type:"get",
//        url:contextPath + "/order/input_order",
//        success:function(data){
//            $(".container").html("").html(data);
//        },
//        error: function(XMLHttpRequest, XMLHttpRequest, errorThrown){
//
//        }
//    })

}
function usePoints(){
    $("[name='usePoint']").change(function(){
        var usePoints = parseFloat($(this).val());
        var totalPrice = parseFloat($(".totalPrice").html());
        var payMoney = totalPrice - usePoints;
        $(".payMoney").html("").html(payMoney);
        $('[name="payMoney"]').val(payMoney);
    })
}

function removeItemFromCart() {
    var cartId_array = new Array();
    $('[name = "item_remove_check"]:checked').each(function(){
        var cartItem = {};
        cartItem.cartId = $(this).parent().find('[name="cartId"]').val();
        var itemTotalMoney = $(this).parent().parent().find('[name="itemTotalMoney"]').html();
        cartItem.itemTotalMoney = parseFloat(itemTotalMoney);
        cartId_array.push(cartItem);

    })
    jQuery.ajax({
        type:"get",
        url:contextPath + "/cart/ajax/remove",
        data:{cartIds:cartId_array},
        success:function(data){
            data = eval('(' + data + ')');
            $('[name = "item_remove_check"]:checked').each(function(){
                var cartId = $(this).parent().find('[name="cartId"]').val();
                $(this).parent().parent().remove();
                $('.' + cartId).remove();
            })
            $(".header-bar .nav .cart-span .cart-count").html("").html(data.cartNumber + ")");
            $(".header-bar .nav .cart-span .shop-cart-div .shop-cart-total .cartNumber").html("").html(data.cartNumber);
            $(".header-bar .nav .cart-span .shop-cart-div .shop-cart-total .totalMoney").html("").html("$"+data.totalMoney);
            $(".totalPrice").html("").html(data.totalMoney);
            $("[name='usePoint']").val(0);
            $(".payMoney").html("").html(data.totalMoney);
        },
        error: function(XMLHttpRequest, XMLHttpRequest, errorThrown){

        }
    })
}

var isShoppingCartEmpty = function() {
    try {
        var shoppingStoreRows = $('[name=cart_items_list]').find('[name=shopping_store_row]');
        for (var i = 0; i < shoppingStoreRows.length; i++) {
            if ($(shoppingStoreRows[i]).find('[name=shopping_item_row]').length < 1) {
                $(shoppingStoreRows[i]).remove();
            }
        }
    } catch(error) {

    }

    var shoppingItemRows = $('[name=cart_items_list]').find('[name=shopping_item_row]');
    if (shoppingItemRows.length < 1) {
        $('[name=cart_items_list]').addClass('hid_template');
        $('.m-nog').removeClass('hid_template');
    }

}

function getTotalItemsPrice() {
    var totalPrice = 0;
    var items = $('[name=cart_items_list]').find('[name=goods_subtotal_price]');
    for (var i = 0; items != null && i < items.length; i++) {
        totalPrice += new Number(removeCommaInDigital(items[i].innerHTML));
    }

    return totalPrice.format();
}



