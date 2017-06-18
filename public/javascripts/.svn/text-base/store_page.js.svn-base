function loadStoreTitle() {
    var form = getFormWithHidStoreId(getURI('/store/ajax/load_title'));
    ajaxRequest(form,
        function(data) {
            $('#store_title_major_image').attr('src', data.majorImage);
        }
        , function() {
            $('#store_title_major_image').attr('src', 'static/pics/sbanner.jpg');
        });
}

function loadBasicInfo() {
    var form = getFormWithHidStoreId(getURI('/store/ajax/load_basic_info'));
    ajaxRequest(form,
        function(data) {
            if (data) {
                var basicInfoPanel = $('#panel_basic_info');
                var storeName = basicInfoPanel.find('.lbl_store_name');
                storeName.html(data.name);
                var storeAddress = basicInfoPanel.find('.lbl_store_address');
                storeAddress.html(data.address);
                var storeIntro = basicInfoPanel.find('.lbl_store_introduction');
                storeIntro.html(data.introduction);
                var storeAppraise = basicInfoPanel.find('.lbl_store_appraise');
                storeAppraise.html(data.rank);
                var storeTitle = $('title');
                storeTitle.html(data.name);
            }
        }
        , function() {

        });
}

function loadCategories() {
    var form = getFormWithHidStoreId(getURI('/store/ajax/load_categories'));

    ajaxRequest(form,
        function(data) {
            var categroyUl = $('ul.panel_category_list')[0];

            var i = 0;
            for (var i = 0;
                 i < data.length;
                 i++
                ) {
                var categoryLi = $('li.category_item').clone(true);
                var categoryObj = data[i];
                categoryLi.find('a.lnk_category').html(categoryObj.name);
                categoryLi.find('a.lnk_category').click(function(event){
                    var id = $(this).parent().find('input[name=hid_category_id]').val();
                    var cpath = $(this).parent().find('input[name=hid_category_path]').val();
//                    searchStoreProductsByCPath(0,0,cpath);
                    searchStoreProductsByCategoryId(0,0,id);
                });
                categoryLi.find('input[name=hid_category_id]').val(categoryObj.categoryId);
                categoryLi.find('input[name=hid_category_path]').val(categoryObj.path);

                categoryLi.removeClass('hid_template');
                categroyUl.appendChild(categoryLi[0]);
            }

        }
        , function() {
        });
}

function searchStoreProductsByCategoryId(willShowPage, lastShowPage,id) {
    var myForm = getFormWithHidStoreId(getURI('/store/ajax/searchProduct'));
    $('<input>', {type:"text",name:"category_id",value:id}).appendTo($(myForm));
    loadProducts(willShowPage, lastShowPage, myForm);
}
function searchStoreProductsByCPath(willShowPage, lastShowPage,path) {
    var myForm = getFormWithHidStoreId(getURI('/store/ajax/searchProduct'));
    $('<input>', {type:"text",name:"category_path",value:path}).appendTo($(myForm));
    loadProducts(willShowPage, lastShowPage, myForm);
}
function searchStoreProductsByKeywords(willShowPage, lastShowPage,keywords) {
    var myForm = getFormWithHidStoreId(getURI('/store/ajax/searchProduct'));
    $('<input>', {type:"text",name:"keywords",value:keywords}).appendTo($(myForm));
    loadProducts(willShowPage, lastShowPage, myForm);
}

function loadStoreProducts(willShowPage, lastShowPage) {

    var myForm = getFormWithHidStoreId(getURI('/store/ajax/load_products'));
//    myForm.action = "get";

    loadProducts(willShowPage, lastShowPage, myForm);
}

function loadProducts(willShowPage, lastShowPage, myForm) {
    appendPageInfoToForm(willShowPage, lastShowPage, myForm);
    ajaxRequest(myForm,
        function(data) {
            var products = data.showList;
            $('li[name=product_thumbnail]').remove();
            var productUl = $('#all_products_summary_list')[0];

            for (var i = 0; i < products.length; i++) {
                var productLi = $('li.product_thumbnail').clone(true);
                var productObj = products[i];
                productLi.find('img.product_major_image').attr({'src':productObj.majorImage,'alt':productObj.name});
                productLi.find('a.lnk_product_image').attr('href', getURI("/product/") + productObj.productId);
                productLi.find('a.lnk_product_name').attr({'href':getURI("/product/") + productObj.productId,'title':productObj.name});
                productLi.find('p.product_name').html(productObj.name);
                productLi.find('p.product_now_price').html(productObj.nowPriceStr);
                productLi.removeClass('hid_template');
                productLi.attr("name", "product_thumbnail");
                productUl.appendChild(productLi[0]);
            }

            generatePaginationFoot(data, $('#product_list_page_area'), loadProducts, myForm);
        }
        , function() {
            alert("error.")
        });
}

function initSearchProductByKeywords() {
    $('[name=search_keywords]').keypress(function(e){
        if(e.keyCode==13){
            searchProductByKeywords();
        }
    });
    $('[name=search_button]').click(searchProductByKeywords);
}
function searchProductByKeywords() {
    var search_keywords_input = $('input[name=search_keywords]');
    var keywords = search_keywords_input.val();
    keywords = $.trim(keywords);
//    keywords = escape(keywords);
    if (keywords) {
        searchStoreProductsByKeywords(0, 0, keywords);
    }else{
        search_keywords_input.val('');
        loadStoreProducts();
    }
}
function getFormWithHidStoreId(actionUrl) {
    var hidStoreId = $('#page_store_id').clone(true);
    hidStoreId.attr('name', 'store_id');
    hidStoreId = hidStoreId[0];
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');
    form.appendChild(hidStoreId);

    return form;
}

