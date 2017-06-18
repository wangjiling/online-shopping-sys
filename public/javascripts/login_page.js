$(function(){
    loginBindValidators();
    removeError();
})

function loginBindValidators(){
    try{
        $("#Login").validate();
        $("[name=userName]").rules("add", vrUserName);
        $("[name=password]").rules("add", vrLoginPassword);
    }catch(error){
        alert("Some errors happen: " + JSON.stringify(error));
    }
}

function removeError(){
    $("[name=userName]").focus(function(){
        $(".errorMsg").html("");
    })
}
