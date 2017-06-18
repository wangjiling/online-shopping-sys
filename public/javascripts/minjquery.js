$(function() {
    /*menu*/
    var timeot;
    $('.li1').hover(function() {
        var that = $(this);
        var _a = that.find('a').eq(0);
        var _ul = that.find('ul');
        //timeot = setTimeout(function(){
        _a.addClass('ahover');
        _ul.show();
        //},200)
    }, function() {
        var that = $(this);
        var _a = that.find('a').eq(0);
        var _ul = that.find('ul');
        //clearTimeout(timeot);
        _a.removeClass('ahover');
        _ul.hide();
    })

    /*place*/
    $('#place').hover(function() {
        //timeot = setTimeout(function(){
        $('.place').show();
        $('#place').find('a').eq(0).addClass('pa2');
        //},200)
    }, function() {
        //clearTimeout(timeot);
        $('.place').hide();
        $('#place').find('a').eq(0).removeClass('pa2');
    })

    /*showmore*/
    $('#showmore_a').toggle(function() {
        $('#showmore_div').slideDown(300);
        $(this).find('a').html('Pack up');
    }, function() {
        $('#showmore_div').slideUp(300);
        $(this).find('a').html('Show more');
    })

    /*groupbuy*/
    $(".sign>.signbt").click(function() {
        $(this).parent().hide();
        $(this).parent().parent().find(".sign-from").show();
    })
    $("tr.sold-out").find("a").removeAttr("href");

    $(".tabs a.order").click(function() {
        $(".tabs a").removeClass("onhover");
        $(this).addClass("onhover");
        $(this).parent().parent().find(".list").children().hide();
        $(this).parent().parent().find(".list .order").show();
    })

    $(".tabs a.coupon").click(function() {
        $(".tabs a").removeClass("onhover");
        $(this).addClass("onhover");
        $(this).parent().parent().find(".list").children().hide();
        $(this).parent().parent().find(".list .coupon").show();
    })

//   /*locality*/
//    $(".state-nav ul li").click(function() {
//        var lcn = null;
//        lcn = $(this).attr("class");
//        $(".state-nav ul li").removeClass("onhover");
//        $(this).addClass("onhover");
//        $(".state-cont ul").hide();
//        $(".state-cont ul").each(function() {
//            var ucn = null;
//            ucn = $(this).attr("class");
//            if (ucn == lcn) {
//                $(this).show();
//            }
//        });
//
//    })
//    $(".state-cont ul li a").click(function() {
//        $(".state-cont ul li").removeClass("onhover");
//        $(this).addClass("onhover");
//        var val = $(this).html();
//        $(".locality .city h2").html(val);
//        $("[name=hid_city]").val(val);
//        $(".locality .state").hide();
//    })


    /*home-categories*/
//    $("a.parents").hover(function(){
//        $("a.parents").removeClass("p-hover");
//        $("a.parents").parent().find("ul.child").hide();
//        $(this).addClass("p-hover");
//        $(this).parent().find("ul.child").show();
//    },function(){
//        $("a.parents").removeClass("p-hover");
//        $("a.parents").parent().find("ul.child").hide();
//    })
//
//    $("ul.child").hover(function(){
//        $(this).show();
//        $(this).parent().find("a.parents").addClass("p-hover");
//    },function(){
//        $(this).hide();
//        $(this).parent().find("a.parents").removeClass("p-hover");
//    })

})
