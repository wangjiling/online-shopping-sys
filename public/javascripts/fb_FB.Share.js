/*1320902265,172005431,JIT Construction: v470329,en_US*/

if (!window.WFB) {
    WFB = {};
}
if (!WFB.dynData) {
    WFB.dynData = {"site_vars":{"canvas_client_compute_content_size_method":1,"use_postMessage":0,"use_xdProxy":0,"use_ui_server":1,"monitor_usage_regex":"somethingtoputhere.com|huffingtonpost.com|lala.com","monitor_usage_rate":0.05,"enable_custom_href":1},"ui_server_dialogs":{"bookmark.add":1,"friends.add":1},"resources":{"base_url_format":"http:\/\/{0}.facebook.com\/","base_cdn_url":"http:\/\/static.ak.fbcdn.net\/","api_channel":1320672776,"api_server":1320672776,"www_channel":1320672712,"xd_proxy":1320672638,"xd_comm_swf_url":"http:\/\/connect.facebook.net\/rsrc.php\/v1\/yK\/r\/RIxWozDt5Qq.swf","share_button":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yg\/r\/yZiDLhSvAE9.gif","login_img_dark_small_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/y2\/r\/ECSptXRJiXu.gif","login_img_dark_medium_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yN\/r\/WMAGVllinGS.gif","login_img_dark_medium_long":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yq\/r\/CtXTsD9gwTy.gif","login_img_dark_large_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yg\/r\/di8GQ4yWYmF.gif","login_img_dark_large_long":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yz\/r\/WuhUANysBjg.gif","login_img_light_small_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yG\/r\/HPpl_Q9ir03.gif","login_img_light_medium_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yG\/r\/QVAKZwo2mNu.gif","login_img_light_medium_long":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yA\/r\/11hJsvQEMup.gif","login_img_light_large_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yq\/r\/RwaZQIP0ALn.gif","login_img_light_large_long":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/y6\/r\/kGCxkZx-uZa.gif","login_img_white_small_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yu\/r\/HSGgAQzgm6f.gif","login_img_white_medium_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yJ\/r\/a3H8zoa1Ymj.gif","login_img_white_medium_long":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yK\/r\/McNhTwo6iLp.gif","login_img_white_large_short":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/y_\/r\/vE_oh0zqP1Z.gif","login_img_white_large_long":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yc\/r\/bGxF25CxBsQ.gif","logout_img_small":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yL\/r\/_gsP01S3mwQ.gif","logout_img_medium":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/y2\/r\/NhZ-RyMbOUr.gif","logout_img_large":"http:\/\/static.ak.fbcdn.net\/rsrc.php\/v1\/yf\/r\/C9lMHpC5ik8.gif"}};
}
if (!WFB.locale) {
    WFB.locale = "en_US";
}
if (!WFB.localeIsRTL) {
    WFB.localeIsRTL = false;
}


if (!window.WFB)window.WFB = {};
if (!window.WFB.isSecure)window.WFB.isSecure = function() {
    return (window.location.href.indexOf('https') === 0) || (window.name.indexOf('_fb_https') > -1);
};
if (!window.WFB.Share) {
    WFB.Share = {results:{},resetUrls:function() {
        this.urls = {};
        this.urlsA = [];
    },addQS:function(d, c) {
        var a = [];
        for (var b in c)if (c[b])a.push(b.toString() + '=' + encodeURIComponent(c[b]));
        return d + '?' + a.join('&');
    },getUrl:function(a) {
        return a.getAttribute('share_url') || window.location.href;
    },getType:function(a) {
        return a.getAttribute('type') || 'button_count';
    },pretty:function(a) {
        return a >= 1e+07 ? Math.round(a / 1e+06) + 'M' : (a >= 10000 ? Math.round(a / 1000) + 'K' : a);
    },updateButton:function(a) {
        var b = this.getUrl(a);
        if (this.results[b])a.fb_count = this.results[b].total_count;
        this.displayBox(a, 3);
    },displayBox:function(a, d) {
        if (typeof(a.fb_count) == 'number' && a.fb_count >= d)for (var c = 1; c <= 2; c++) {
            var b = a.firstChild.childNodes[c];
            b.className = b.className.replace('fb_share_no_count', '');
            if (c == 2)b.lastChild.innerHTML = this.pretty(a.fb_count);
        }
    },renderButton:function(c) {
        var k = this.getUrl(c);
        var h = this.getType(c);
        var i = c.innerHTML.length > 0 ? c.innerHTML : 'Share';
        var g = {u:k,t:k == window.location.href ? document.title : null,src:'sp'};
        c.href = this.addQS((WFB.isSecure() ? 'https:' : 'http:') + '//www.facebook.com/sharer.php', g);
//        c.onclick = function() {
//            if (!c.fb_clicked) {
//                c.fb_count += 1;
//                WFB.Share.displayBox(this, 1);
//                c.fb_clicked = true;
//            }
//            window.open(c.href, 'sharer', 'toolbar=0,status=0,width=626,height=436');
//            return false;
//        };
        c.style.textDecoration = 'none';
        if (!this.results[k] && (h.indexOf('count') >= 0)) {
            this.urls[k] = true;
            this.urlsA.push(k);
        }
        var j = 'Small';
        var a = '<span class=\'FBConnectButton FBConnectButton_' + j + '\'' + ' style=\'cursor:pointer;\'>' + '<span class=\'FBConnectButton_Text\'>' + i + '</span></span>';
        if (h.indexOf('count') >= 0) {
            var e = (h == 'box_count');
            var f = (e ? 'top' : 'right');
            var d = '<span class=\'fb_share_size_' + j + ' ' + (e ? 'fb_share_count_wrapper' : '') + '\'>';
            var b = '<span class=\'fb_share_count_nub_' + f + ' fb_share_no_count\'></span>';
            b += '<span class=\'fb_share_count fb_share_no_count' + ' fb_share_count_' + f + '\'>' + '<span class=\'fb_share_count_inner\'>&nbsp;</span></span>';
            d += (e) ? '<span></span>' + b + a : a + b;
        } else if (h.indexOf('icon') >= 0) {
            var d = '<span class=\'FBConnectButton_Simple\'>' + '<span class=\'FBConnectButton_Text_Simple\'>' + (h == 'icon_link' ? i : '&#xFEFF;') + '</span>';
        } else var d = a;
        c.innerHTML = d;
        c.fb_rendered = true;
    },insert:function(a) {
        (document.getElementsByTagName('HEAD')[0] || document.body).appendChild(a);
    },renderAll:function(d) {
        var c = document.getElementsByName('fb_share');
        var a = c.length;
        for (var b = 0; b < a; b++) {
            if (!c[b].fb_rendered)this.renderButton(c[b]);
            if (this.getType(c[b]).indexOf('count') >= 0 && !c[b].fb_count && this.results[this.getUrl(c[b])])this.updateButton(c[b]);
        }
    },fetchData:function() {
        var c = document.createElement('script');
        var a = [];
        for (var b = 0; b < this.urlsA.length; ++b)a.push('"' + this.urlsA[b].replace('\\', '\\\\').replace('"', '\\"') + '"');
        c.src = this.addQS((WFB.isSecure() ? 'https:' : 'http:') + '//api.facebook.com/restserver.php', {v:'1.0',method:'links.getStats',urls:'[' + a.join(',') + ']',format:'json',callback:'fb_sharepro_render'});
        this.resetUrls();
        this.insert(c);
    },stopScan:function() {
        clearInterval(WFB.Share.scanner);
        WFB.Share.renderPass();
    },renderPass:function() {
        WFB.Share.renderAll();
        if (WFB.Share.urlsA.length > 0)WFB.Share.fetchData();
    },_onFirst:function() {
        var b = document.createElement('link');
        b.rel = 'stylesheet';
        b.type = 'text/css';
        var a = (WFB.isSecure() ? 'https://s-static.ak.fbcdn.net/' : 'http://static.ak.fbcdn.net/');
        b.href = a + 'connect.php/css/share-button-css';
        this.insert(b);
        this.resetUrls();
        window.fb_sharepro_render = function(c) {
            for (var d = 0; c && d < c.length; d++)WFB.Share.results[c[d].url] = c[d];
            WFB.Share.renderAll();
        };
        this.renderPass();
        this.scanner = setInterval(WFB.Share.renderPass, 700);
        if (window.attachEvent) {
            window.attachEvent("onload", WFB.Share.stopScan);
        } else window.addEventListener("load", WFB.Share.stopScan, false);
    }};
    WFB.Share._onFirst();
}


if (WFB && WFB.Loader) {
    WFB.Loader.onScriptLoaded(["WFB.Share","WFB.SharePro"]);
}