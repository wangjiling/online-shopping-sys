/*hot sale JS*/
function hotListRoll() {
    var li_count = $("#hot_sale_list li").length - 1;
    $("#hot_sale_list").width(li_count * 180);
    var ul_width = $("#hot_sale_list").width();
    var ul_roll_count =  Math.ceil(ul_width / 900);
    var ul_count = 1;

    $("#hot_left a").click(function() {
        if(1 < ul_count && ul_count <= ul_roll_count){
            $("#hot_sale_list").animate({marginLeft:'+=900'},300);
            ul_count--;
        }
    })
    $("#hot_right a").click(function() {
        if(ul_count < ul_roll_count){
            $("#hot_sale_list").animate({marginLeft:-900*ul_count},300);
            ul_count++;
        }else{
            ul_count = ul_roll_count;
        }
    })
}