var isInitCartListBar = false;

$(function() {

    /*home-cart-box*/
    $("[name=header_bar_cart_short_info]>a").hover(function() {
        clearAndInitCartListBar();
        if ($("[name=header_bar_shopping_cart_count]").text() != 0) {
            $(this).addClass("cart-hover");
            $("#header_bar_shopping_cart_items_div").show();
        }
    }, function() {
        $(this).removeClass("cart-hover");
        $("#header_bar_shopping_cart_items_div").hide();
    })

    $("#header_bar_shopping_cart_items_div").hover(function() {
        $("[name=header_bar_cart_short_info]>a").addClass("cart-hover");
        $("#header_bar_shopping_cart_items_div").show();
    }, function() {
        $("[name=header_bar_cart_short_info]>a").removeClass("cart-hover");
        $("#header_bar_shopping_cart_items_div").hide();
    })
})


function clearAndInitCartListBar() {
    if (isInitCartListBar) {
        return;
    }
    isInitCartListBar = true;
    $("div[name=show_cart_item_div]").remove();
}
