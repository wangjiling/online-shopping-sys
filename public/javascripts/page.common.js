$(function(){
    formatMonthYear();
})

function showDialog(box){
    var ifShadow = $("#shadow").length;
    var bodyHeight = $("body").height();
    var bodyWidth = $("body").width();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var boxHeight = $(box).height();
    var boxWidth = $(box).width();
    if(ifShadow <= 0){
        var shadow = document.createElement("div");;
        $("body").append(shadow);
        if(windowHeight > bodyHeight){
            $(shadow).attr({id:"shadow"}).css({height:windowHeight});
        }else{
            $(shadow).attr({id:"shadow"}).css({height:bodyHeight});
        }
        if(windowWidth > bodyWidth){
            $("#shadow").width(windowWidth);
        }else{
            $("#shadow").width(bodyWidth);
        }
    }
    var top = $(window).scrollTop();
    $("#shadow").show();
    $(box).css({top:(windowHeight - boxHeight)/2 + top,left:(windowWidth - boxWidth)/2}).show();

    $(".close").click(function(){
        $(shadow).hide();
        $(box).hide();
    })
}
function resizeDialog(box){
    var bodyHeight = $("body").height();
    var bodyWidth = $("body").width();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var boxHeight = $(box).height();
    var boxWidth = $(box).width();
    if(windowHeight > bodyHeight){
        $("#shadow").height(windowHeight);
    }else{
        $("#shadow").height(bodyHeight);
    }
    if(windowWidth > bodyWidth){
        $("#shadow").width(windowWidth);
    }else{
        $("#shadow").width(bodyWidth);
    }
    $(box).css({top:(windowHeight - boxHeight)/2,left:(windowWidth - boxWidth)/2});
}
function resizeDialogTop(box){
    var top = $(window).scrollTop();
    var bodyWidth = $("body").height();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var boxHeight = $(box).height();
    var boxWidth = $(box).width();
    $("#shadow").height(bodyWidth);
    $(box).css({top:(windowHeight - boxHeight)/2 + top,left:(windowWidth - boxWidth)/2});
}

function initMenuSize(){
    var width = $(".tab").width();
    var lengths = $(".tab").find("a").length;
    var elemWidth = width / lengths;
    $(".tab a").width(elemWidth - 4);
}


function tableSelectItem(){
    $("#DataTable tbody tr").live("click",(function(){
        $(".DataTable tbody tr").removeClass("onSelected");
        $(this).addClass("onSelected");
    })
    )
}

function formatMonthYear(){
    Date.prototype.formatMonth = function(){
        var month = this.getMonth();
        switch (month){
            case 0:
                month = 'Jan';
                break;
            case 1:
                month = 'Feb';
                break;
            case 2:
                month = 'Mar';
                break;
            case 3:
                month = 'Apr';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'Jun';
                break;
            case 6:
                month = 'Jul';
                break;
            case 7:
                month = 'Aug';
                break;
            case 8:
                month = 'Sep';
                break;
            case 9:
                month = 'Oct';
                break;
            case 10:
                month = 'Nov';
                break;
            case 11:
                month = 'Dec';
                break;
        }
        return month;
    }

    Date.prototype.formatDay = function(){
        var day = this.getDay();
        switch (day){
            case 0:
                day = 'Sun';
                break;
            case 1:
                day = 'Mon';
                break;
            case 2:
                day = 'Tue';
                break;
            case 3:
                day = 'Wed';
                break;
            case 4:
                day = 'Thu';
                break;
            case 5:
                day = 'Fri';
                break;
            case 6:
                day = 'Sat';
                break;
        }
        return day;
    }
}