$(function() {
    var catShowTimer;
    var catHideTimer
    try {
        $("[name=top_category]").livequery(function() {
            $(this).hover(function(event) {
                try {
                    catShowTimer.stop();
                } catch(error) {
                }
                try {
                    catHideTimer.stop();
                } catch(error) {
                }
                catShowTimer = new Timer();
                catShowTimer.setFunction(function(timerObj) {
                    $("[name=top_category]").removeClass("p-hover");
                    $("[name=top_category]").parent().find("ul.child").hide();
                    $(timerObj.params).addClass("p-hover");
                    $(timerObj.params).parent().find("ul.child").slideDown();
                }, this, 500, {cycle: false, runBeforeTimeout: false})
                catShowTimer.start();
            }, function(event) {
                try {
                    catShowTimer.stop();
                } catch(error) {
                }
                try {
                    catHideTimer.stop();
                } catch(error) {
                }
                var target = $(event.target);

                catHideTimer = new Timer();
                catHideTimer.setFunction(function(timerObj) {
                    if (timerObj.params.find('li').length < 1) {
                        $("[name=top_category]").parent().find("ul.child").slideUp(function() {
                            $("[name=top_category]").removeClass("p-hover");
                        });
                    }
                }, target, 400, {cycle: false, runBeforeTimeout: false})
                catHideTimer.start();
            })
        }, function() {
            $(this).unbind('mouseover').unbind('mouseout');
        })

        $("ul.child").livequery(function() {
            $(this).hover(function(event) {
                try {
                    catShowTimer.stop();
                } catch(error) {
                }
                try {
                    catHideTimer.stop();
                } catch(error) {
                }
                catShowTimer = new Timer();
                catShowTimer.setFunction(function(timerObj) {
                    $(timerObj.params).show();
                    $(timerObj.params).parent().find("[name=top_category]").addClass("p-hover");
                }, this, 500, {cycle: false, runBeforeTimeout: false});
                catShowTimer.start();
            }, function(event) {
                try {
                    catShowTimer.stop();
                } catch(error) {
                }
                try {
                    catHideTimer.stop();
                } catch(error) {
                }

                catHideTimer = new Timer();
                catHideTimer.setFunction(function(timerObj) {
                    $(timerObj.params).slideUp(function() {
                        $(timerObj.params).parent().find("[name=top_category]").removeClass("p-hover");
                    });

                }, this, 400, {cycle: false, runBeforeTimeout: false});
                catHideTimer.start();
            })
        }, function() {
            $(this).unbind('mouseover').unbind('mouseout');
        })
    } catch(error) {
    }

    // Sets last search target.
    try {
        var selSearchTarget = $('[name=search_target]').val();
        $('[name=search_type_select]').val(selSearchTarget)
    } catch(error) {
    }

    try {
        loadHomeCategoryTree();
    } catch(error) {
    }


})

$(function() {
    $("#btn_generic_search").click(function(e) {
        var keywordElem = $(e.target).parents(".generic_search_bar").find('[name=keywords]')
        var keywords = escape(keywordElem.val());
        if (null != keywords && keywords.length != 0) {
            var actionUrl = "keywords=" + keywords;
            location.href = getURI("/search/product?") + actionUrl;
        } else {
            location.href = getURI("/search/product");
        }
    })
})

function getAllParam() {
    var urlParam = "&deals_date=" + (new Date()).getTime()
            + "&deals_country=" + $('[name=deals_country]').val()
            + "&deals_state=" + $('[name=deals_state]').val()
            + "&deals_city=" + $('[name=deals_city]').val()
            + "&deals_zipcode=" + $('[name=deals_zipcode]').val();

    return urlParam;
}

$(function() {
    $('a[name=previousLink]').click(function(event) {
        var willPage = $(event.target).attr('willpage');
        location.href = parseUrl(true, willPage, "");
    })

    $('a[name=previousPageLink]').click(function(event) {
        var willPage = $(event.target).html();
        $(event.target).attr('href', parseUrl(true, willPage, ""));
    })

    $('a[name=nextPageLink]').click(function(event) {
        var willPage = $(event.target).html();
        $(event.target).attr('href', parseUrl(true, willPage, ""));
    })

    $('a[name=nextLink]').click(function(event) {
        var willPage = $(event.target).attr('willpage');
        location.href = parseUrl(true, willPage, "");
    })

    $('input[name=input_will_page]').keyup(function(event) {
        if (event.keyCode == 13) {
            var pageNum = $(event.target).val();
            var lastPage = $(event.target).attr('lastPage');
            if ("" != pageNum && /^[0-9]*$/.test(pageNum)) {
                location.href = parseUrl(true, pageNum, lastPage);
            }
        }
    })

    $('input[name=input_will_page_button]').click(function(event) {
        var pageElem = $(event.target).parents(".pagination-foot").find('[name=input_will_page]');
        var pageNum = pageElem.val();
        var lastPage = pageElem.attr('lastPage');
        if ("" != pageNum && /^[0-9]*$/.test(pageNum)) {
            location.href = parseUrl(true, pageNum, lastPage);
        }
    })
})

function parseUrl(flag, willPage, lastPage) {
    if (flag) {
        var currentUrl = location.href;
        var index = currentUrl.indexOf("&will_page=");
        if (index > 0) {
            currentUrl = currentUrl.substr(0, index);
        }

        var url = currentUrl + "&will_page=" + willPage;

        if ("" != lastPage) {
            url = url + "&last_show_page=" + lastPage;
        }

        return url;
    }
}

var checkSelectVal = function() {
    var val = $('[name=search_type_select]').val();

    if (val == "store") {
        $('[name=search_categories_select]').attr("disabled", "disabled");
    } else {
        $('[name=search_categories_select]').attr("disabled", "");
    }
//    $("[name=search_type_select]").change(function() {
//        var val = $('[name=search_type_select]').val();
//        if (val == "store") {
//            $('[name=search_categories_select]').attr("disabled", "disabled");
//        } else {
//            $('[name=search_categories_select]').attr("disabled", "");
//        }
//    })
}

function getHomeCategoryTreeForm(actionUrl) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', actionUrl);
    form.setAttribute('name', 'frm_ajax');

    return form;
}

function loadHomeCategoryTree() {

    var form = getHomeCategoryTreeForm(getURI('/home/ajax/load_home_categories'));
    ajaxRequest(form,
            function(data) {
                // Get Home Categories DOMs
                var rootDOM = $('[name=home_category_root]')[0];
                rootDOM.innerHTML = "";
                var branchElem = $('[name=category_branch]')[0];
                try {
                    // Loop first class categorys
                    for (var i = 0;
                         i < data.length;
                         i++) {

                        var firstLevelCategoryElem = $(branchElem).clone(true)[0];
                        var firstLevelCategoryObj = data[i];
                        $(firstLevelCategoryElem).find("a").attr('name', "top_category");
                        $(firstLevelCategoryElem).find('[name=top_category] em').html(firstLevelCategoryObj.name);
                        $(firstLevelCategoryElem).find('[name=top_category]').attr('href',
                                getURI("/search/product/horizontal?category_path=") + firstLevelCategoryObj.path);

                        if (firstLevelCategoryObj.subCategories &&
                                firstLevelCategoryObj.subCategories.length > 0) {
                            var firstLevelListElem = $(firstLevelCategoryElem).find('[name=category_children]')[0];
                            $(firstLevelListElem).removeClass('hid_template');

                            for (var j = 0;
                                 j < firstLevelCategoryObj.subCategories.length;
                                 j++) {
                                try {
                                    var secLevelCategoryElem = $(branchElem).clone(true)[0];

                                    var secLevelCategoryObj = firstLevelCategoryObj.subCategories[j];
                                    $(secLevelCategoryElem).find('[name=category_link]').html(secLevelCategoryObj.name);
                                    $(secLevelCategoryElem).find('[name=category_link]').attr('href',
                                            getURI("/search/product/horizontal?category_path=") + secLevelCategoryObj.path);
                                    $(secLevelCategoryElem).find('[name=category_link]').removeClass('parents');
                                    $(secLevelCategoryElem).find('[name=category_link]').removeClass('p-hover');

                                    // Removes unnecessary classes.
                                    $(secLevelCategoryElem).removeClass('child');
                                    $(secLevelCategoryElem).find('[name=category_children]').remove();
                                    firstLevelListElem.appendChild(secLevelCategoryElem);
                                } catch(error) {
                                }
                            }

                        }


                        rootDOM.appendChild(firstLevelCategoryElem);
                        rootDOM;

                    }
                } catch(error) {
                }

            },
            function() {

            });

}

