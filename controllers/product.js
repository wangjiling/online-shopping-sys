var ProductSchema = require('../schemas/Product.js');

var utils = require("../utils");

exports.showStackGraph = function(req, res, renderFun){
    var result = new Array();
    for(var i= 0; i< 12; i++){
        result[i] = {};
        var date = new Date();
        result[i].dateMark = date.setMonth(i);
        result[i].result = new Array();
        var product = [{name: "iphone"},{name: "ipad"},{name: "apple touch"}];
        for (var j = 0; j< 3; j++){
        result[i].result[j] = {};
        result[i].result[j].categoryName = product[j].name;
        result[i].result[j].quantity = 100+20*(i-j);
        }
    }
    renderFun(req,res, {
        extensions: {
            stackGraph: result
        }
    })
}

exports.searchProductIcon = function(req, res, renderFun){
    var productId = req.params.productId;
    var ProductTable = ProductSchema.newHandler();
    ProductTable.findOne({productId : productId}, function (err, data) {
        try {
            if (!err) {
                var product = {};
                if (data) {
                    product = data;
                    product.offPercent = utils.parseNumber(data.offPercent);
                    var discount = 1 - utils.parseNumber(data.offPercent);
                    renderFun(req,res, {
                        title: 'Product Detail'
                        ,product: product
                        ,discount: discount
                    },'marketplace/product')
                }
            }
        }catch(err){
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}
