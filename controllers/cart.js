var CartSchema = require('../schemas/Cart.js');
var ProductSchema = require('../schemas/Product.js');
var UserSchema = require('../schemas/User');
var Cart = require('../beans/cart.js');
var async = require("async");
var UserTable = UserSchema.newHandler();
var ProductTable = ProductSchema.newHandler();
var CartTable = CartSchema.newHandler();


exports.listCart = function(req, res, renderFun){
    try{
        CartTable.find({},function(err,data){
            if(!err){
                var shoppingCartList = new Array();
                if(data.length != 0){
                    async.forEachSeries(data,function(item,callback){
                        var cartItem = new Cart();
                        cartItem.quantity = item.quantity;
                        cartItem.price = item.price;
                        cartItem.cartId = item._id;
                        cartItem.productId = item.productId;
                        var productId = item.productId;
                        cartItem.itemTotalMoney = item.quantity * item.price;

                        ProductTable.findOne({productId : productId},function(err,productData){
                            if(!err){
                                if (productData) {
                                    cartItem.productName = productData.productName;
                                    cartItem.majorImage = productData.majorImage;
                                    cartItem.storeName = productData.storeName;
                                    cartItem.description = productData.description;
                                    shoppingCartList.push(cartItem);
                                    callback(null,cartItem);
                                }
                            }
                        })
                    },function(err){
                        if(!err){
                            var point = 0;
                            UserTable.findOne({_id:req.session.userInfo.userId},function(err,userData){
                                if(!err){
                                    if (userData) {
                                        point =  userData.point;
                                        renderFun(req,res, {
                                            title: 'My shopping cart',
                                            shoppingCartList: shoppingCartList,
                                            point: point
                                        },'marketplace/cart_list');
                                    }
                                }
                            });
                        }else{
                            console("err: "+err);
                        }
                    })
                } else {
                    renderFun(req,res, {
                        title: 'My shopping cart',
                        shoppingCartList: []
                    },'marketplace/cart_list');
                }
            }
        });
    } catch(err){
        console.log("call back error : " + JSON.stringify(err));
        renderFun(req,res, {
            title: 'My shopping cart',
            shoppingCartList: []
        },'marketplace/cart_list');
    }
}

exports.ajaxAddCart = function(req, res, renderFun){
    var productId = parseInt(req.query.productId);
    var quantity = parseInt(req.query.quantity);
    var userId = req.session.userInfo.userId;
    var price = parseFloat(req.query.price);

    var cartSave = new CartTable({
        userId: userId,
        productId: productId,
        quantity: quantity,
        price: price
    })
    cartSave.save(function (err) {
        if (!err) {
            console.log("save is success!");
                        req.session.userInfo.cartNumber = req.session.userInfo.cartNumber + 1;
                        req.session.userInfo.totalMoney = parseFloat((req.session.userInfo.totalMoney + quantity*price).toFixed(2));
                        renderFun(req, res, {cartNumber: req.session.userInfo.cartNumber, totalMoney: req.session.userInfo.totalMoney});
        } else {
            console.log("save is failed!");
            renderFun(req, res, {cartNumber: 0});
        }
    });
}


exports.ajaxRemoveCart = function(req, res, renderFun){
    try{
        var cartIds = req.query.cartIds;
        async.forEachSeries(cartIds,function(item,callback){
            CartTable.findByIdAndRemove(item.cartId,function(err){
                if(!err){
                    req.session.userInfo.cartNumber = req.session.userInfo.cartNumber - 1;
                    req.session.userInfo.totalMoney = parseFloat((req.session.userInfo.totalMoney - item.itemTotalMoney).toFixed(2));
                    callback(null,req.session.userInfo.cartNumber);
                }
            });
        },function(err){
            if(!err){
                renderFun(req, res, {cartNumber: req.session.userInfo.cartNumber, totalMoney: req.session.userInfo.totalMoney});
            }else{
                console("err: "+err);
            }

        });

    }catch(err){
        console.log("err : " + err);
        renderFun(req, res, {cartNumber: req.session.userInfo.cartNumber, totalMoney: req.session.userInfo.totalMoney});
    }
}