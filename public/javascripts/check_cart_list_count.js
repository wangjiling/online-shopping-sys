function check_cart_list_count() {
    try {
        $("[name=btn_checkout_shopping_cart]").attr("disabled", "");
        $("[name=shopping_item_row]").each(function() {
            var _stock = parseInt($(this).find("[name=goods_stock]").val());
            var _count = parseInt($(this).find("[name=item_select_count]").val());
            if (_count > _stock) {
                $("[name=btn_checkout_shopping_cart]").attr("disabled", "disabled");
                $("[name=btn_checkout_shopping_cart]").attr("style", "cursor: default;");
//            $(this).find("[name=item_select_count]").css("borderColor", "red");
                $(this).find("[name=error]").show();
            } else if (_count <= _stock) {
//            $(this).find("[name=item_select_count]").css("borderColor", "#AACDED");
                $(this).find("[name=error]").hide();
                $("[name=btn_checkout_shopping_cart]").attr("style", "cursor: pointer;");
            }

        });
    } catch(error) {
        alert(error);
    }
}
