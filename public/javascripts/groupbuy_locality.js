$(function() {
    $(".locality .city").click(function() {
        var h = $(".locality .state").css("display");
        if (h == "none") {
            $(".locality .state").show();
            $(".close").click(function() {
                $(".locality .state").hide();
            })
        }
        else {
            $(".locality .state").hide();
        }
    })

    $(".state-nav ul li").click(function(event) {
        var thisObj = $(event.target);
        var lcn = null;
        lcn = thisObj.attr("class");
        $(".state-nav ul li").removeClass("onhover");
        thisObj.addClass("onhover");
        $(".state-cont ul").hide();
        $(".state-cont ul").each(function() {
            var ucn = null;
            ucn = $(this).attr("class");
            if (ucn == lcn) {
                $(this).show();
            }
        });

    })
    $(".state-cont ul li a").click(function(event) {
        var thisObj = $(event.target);
        $(".state-cont ul li").removeClass("onhover");
        thisObj.parent().addClass("onhover");
        var val = thisObj.html();
        $(".locality .city h2").html(val);
        $("[name=hid_city]").val(val);
        $(".locality .state").hide();

        var _city = thisObj.attr("city");
        var _state = thisObj.attr("state");
        var _country = thisObj.attr("country");

        $("[name=deals_city]").val(_city);
        $("[name=deals_state]").val(_state);
        $("[name=deals_country]").val(_country);

        loadGroupbuyPrimaryDeal();
        loadGroupbuyDeals();
    })

    try {

        var g_city = $("[name=deals_city]").val();
        var g_state = $("[name=deals_state]").val();
        $("[name=select_city]").html(g_city);
        var selLink = $("[name=states-selections]").find("a[city='" + g_city + "'][state='" + g_state + "']");
        var e = jQuery.Event("click");
        selLink.trigger(e);
        var navLetterClass = $(selLink.parents("ul")[0]).attr("class");
        var selNav = $("[name=nav_letters_div]").find("." + navLetterClass);
        selNav.trigger(e);

    } catch(error) {

    }

})