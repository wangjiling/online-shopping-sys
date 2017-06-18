/**
 * Created by IntelliJ IDEA.
 * User: carlos_yang
 * Date: 10/24/11
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */

function Remain(remainTimeParam) {

    var secondMs = 1000;
    var minuteMs = secondMs * 60;
    var hoursMs = minuteMs * 60;
    var dayMs = hoursMs * 24;

    this.remainTime = parseInt(remainTimeParam);
    this.day = this.remainTime / dayMs;
    this.remainTime = this.remainTime % dayMs;

    this.hours = this.remainTime / hoursMs;
    this.remainTime = this.remainTime % hoursMs;

    this.minute = this.remainTime / minuteMs;
    this.remainTime = this.remainTime % minuteMs;

    this.second = this.remainTime / secondMs;
//    this.remainTime = r%secondMs;

    this.day = Math.floor(this.day);
    this.hours = Math.floor(this.hours);
    this.minute = Math.floor(this.minute);
    this.second = Math.floor(this.second);


    this.toString = function () {
        var tos = "";
//        if()
        tos += this.day + " day ";
        tos += this.hours.formatPolishing(2) + ":";
        tos += this.minute.formatPolishing(2) + ":";
        tos += this.second.formatPolishing(2) + "";
        return tos;
    }
}
Number.prototype.formatPolishing = function(len) {
    try{
        var formatedValue = this.toString();
        var thisLen = formatedValue.length;
        if(thisLen<len){
            for(var i=0;i<len-thisLen;i++){
                formatedValue = "0" + formatedValue;
            }
        }
    }catch(error){
        return this;
    }
    return formatedValue;
}