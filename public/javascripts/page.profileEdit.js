$(function () {
    uploadBox();
    closeDialog();
    formSubmit();
    initMenuSize();
    editProfileValidators()
    imageRefreshEventBind();
    circleRefreshImages();
});

var isImagesRefreshFinished = true;

function imageRefreshEventBind(){
    $("#refreshImages").click(function(){
        isImagesRefreshFinished = false;
        $(this).parent().find("img[imgUploaded='true']").each(function(target, item){
            if($(this).attr('imgUploaded') == 'true'){
                $(this).attr("orgsrc", $(this).attr("src"));
                $(this).attr("src", "");
            }
        })
        setTimeout("refreshImages();", 100);
    })
}


function refreshImages(){
    $(".photos .imgs a img").each(function(target, item){
        try{
            if($(this).attr('imgUploaded') == 'true'){
                $(this).attr("src", $(this).attr("orgsrc"));
            }
        }catch(error){}
    })
    isImagesRefreshFinished = true;
}


function circleRefreshImages(){
    if(isImagesRefreshFinished == true){
        isImagesRefreshFinished = false;
        $(".photos .imgs a img").each(function(target, item){
            if($(this).attr('imgUploaded') == 'true'){
                $(this).attr("orgsrc", $(this).attr("src"));
                $(this).attr("src", "");
            }
        })
        setTimeout("refreshImages();", 100);
        setTimeout("circleRefreshImages();", 30000);
    }
}

$(window).resize(function(){
//    initBox();
    setDialog();
})

$(window).scroll(function(){
    setDialog();
})

function closeDialog(){
    $(".close").click(function(){
        $(".dialog").hide(100);
        $("#shadow").hide(200);
    })
}

function uploadBox(){
    $("#addPhoto").click(function(){
//        alert("mmmm");
        showDialog(".dialog");
    })
    $("#shadow").find("iframe").attr("src", contextPath + "/uploadImage");
}
function setDialog(){
    var devWidth = $(window).width();
    var devHeight = $(window).height();
    var bodyWidth = $(document).width();
    var bodyHeiht = $(document).height();
    var top = $(window).scrollTop();
    $("#shadow").width(bodyWidth).height(bodyHeiht);
    $(".dialog").css({left:(devWidth - $(".dialog").width()) / 2,top:top + 100});
}



function formSubmit() {
    $("[name='profileEditSave']").click(function() {
        var form = $("[name='profileEdit']");
        form.submit();
    });
}

function editProfileValidators(){
    if($("[name='profileEdit']").length > 0){
        $("[name='profileEdit']").validate();
        $("[name='userName']").rules("add",vrUserName);
    }
}
