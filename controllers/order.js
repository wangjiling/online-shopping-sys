var orderList = require("../mockupdata/orderList_1.json");
var orderAction = require("../mockupdata/orderAction.json");
var checkOutList = require("../mockupdata/checkOutList.json");
var async = require("async");
var utils = require('../utils/index.js');
var OrderSchema = require('../schemas/Order');
var CartSchema = require('../schemas/Cart.js');
var UserSchema = require('../schemas/User');
var OrderTable = OrderSchema.newHandler();
var CartTable = CartSchema.newHandler();
var UserTable = UserSchema.newHandler();
var Order = require('../beans/order.js');

exports.viewInputOrder = function(req, res, renderFun){
    renderFun(req, res, {title:'pay confirmation', checkOutList: checkOutList}, 'marketplace/order_detail_input');
}

exports.generateOrder = function(req, res, renderFun){
    OrderTable.find({}, {}, {sort: [['_id', -1]]}, function (err, order) {
        try {
            if (!err) {
                var orderId = order[0] ? (order[0].orderId + 1) : 201301;
                var orderSave = new OrderTable({
                    orderId: orderId,
                    city:req.body.city,
                    address:req.body.address,
                    receiverName: req.body.receiverName,
                    telephone: req.body.telephone,
                    payType: req.body.payType,
                    zipCode: req.body.zipCode,
                    payMoney: req.body.payMoney,
                    totalPrice: req.body.totalPrice,
                    product: req.body.product,
                    usedPoint: req.body.usedPoint,
                    createDate: new Date()
                });
                orderSave.save(function (err, orderData) {
                    if (!err) {
                        console.log("save is success!");
                        CartTable.remove(function(err,cartData){
                            if(!err){
                                req.session.userInfo.cartNumber = 0;
                                req.session.userInfo.totalMoney = 0;
                                UserTable.findById(req.session.userInfo.userId,function(err, userData){
                                    if(!err){
                                        if (userData) {
                                            userData.point =  userData.point - req.body.usedPoint;
                                            userData.save(function(err){
                                                if(!err){
                                                    renderFun(req, res, {title:'checkout - order confirmation', order: orderData}, 'marketplace/order_confirmation');
                                                }else{
                                                    console.log("err: " + err);
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    } else {
                        console.log("save is failed!");
                    }
                });
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}


exports.showOrderList = function(req, res, renderFun){
    OrderTable.find({},function (err, orderList) {
        try {
            if (!err) {
                if(orderList.length>0){
                    var orders = new Array();
                    for(var i = 0; i<orderList.length; i++){
                        var order = new Order();
                        order.orderId = orderList[i].orderId;
                        order.city = orderList[i].city;
                        order.address = orderList[i].address;
                        order.receiverName = orderList[i].receiverName;
                        order.telephone = orderList[i].telephone;
                        order.payType = orderList[i].payType;
                        order.zipCode = orderList[i].zipCode;
                        order.payMoney = orderList[i].payMoney;
                        order.totalPrice = orderList[i].totalPrice;
                        order.product = orderList[i].product;
                        order.usedPoint = orderList[i].usedPoint;
                        order.createDate = utils.getDate(orderList[i].createDate);
                        orders.push(order);
                    }
                    renderFun(req, res, {title:'checkout - order confirmation', orderList: orders}, 'marketplace/orderList');
                }else{
                    renderFun(req, res, {title:'checkout - order confirmation', orderList: orderList}, 'marketplace/orderList');
                }
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}


exports.buyOrderNow = function(req, res, renderFun){
    renderFun(req, res, {title:'pay confirmation', orderAction: orderAction}, 'marketplace/paid_success');
}

exports.viewOrderConfirmAfterReceived = function(req, res, renderFun){
    renderFun(req, res, {title:'Received Confirmation', orderAction: orderAction}, 'marketplace/received_confirm');
}