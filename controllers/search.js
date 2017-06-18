var ProductSchema = require('../schemas/Product.js');

/**
 * Search by product
 * @param req
 * @param res
 * @param renderFun
 */
exports.searchProduct = function(req, res, renderFun){
    var keywords = req.query.keywords;
    var reg = new RegExp( keywords, "i");
    var ProductTable = ProductSchema.newHandler();
    ProductTable.find({productName: reg}, function (err, data) {
        try {
            if (!err) {
                var products = [];
                if (data) {
                    products = data;
                    renderFun(req, res, {title:'Product', productList: products, keyword: keywords}, 'marketplace/product_search_horizontal');
                }
            }
        }catch(err){
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}


/**
 * Get Featured Products
 * @param req
 * @param res
 * @param renderFun
 */
exports.searchProductIcon = function(req, res, renderFun){
    var ProductTable = ProductSchema.newHandler();
    ProductTable.find({property:"popular"}, function (err, data) {
        try {
            if (!err) {
                var products = [];
                if (data) {
                    products = data;
                    renderFun(req, res, products);
                }
            }
        }catch(err){
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}

/**
 * Get hot sell product
 * @param req
 * @param res
 * @param renderFun
 */
exports.loadHotSale = function(req, res, renderFun){
    var ProductTable = ProductSchema.newHandler();
    ProductTable.find({property:"popular"}, function (err, data) {
        try {
            if (!err) {
                var products = [];
                if (data) {
                    products = data;
                    renderFun(req, res, products);
                }
            }
        }catch(err){
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}
