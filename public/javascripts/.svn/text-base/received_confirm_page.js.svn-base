$(function(){
    $('[name=btn_confirm]').bind('click', function(event){
        var form = getOrderActionForm(getURI('/order/received_confirm'), event);
        $('body')[0].appendChild(form);
        form.submit();

    })
})

function getOrderActionForm(actionUrl, event) {
    var hidOrderId = $('[name=order_id]').clone(true);
    hidOrderId.attr('name', 'order_id');

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    form.appendChild(hidOrderId[0]);

    return form;
}