var setting = require("../setting.json");
var UserSchema = require('../schemas/User');
var CartSchema = require('../schemas/Cart.js');

exports.login = function(req, res, renderFun){
    renderFun(req, res, {title:'Sign in', login_response_msg:'', fbApiKey:''}, 'user/login');
}

exports.loginPost = function(req, res, renderFun){
    var UserTable = UserSchema.newHandler();
    UserTable.findOne({userName:req.body.userName}, function (err, userData) {
        try {
            if (!err) {
                if(userData){
                    if (userData.password == req.body.password) {
                        req.session.userInfo = {};
                        req.session.userInfo.userId = userData._id;
                        req.session.userInfo.userName = userData.userName;
                        userData.loginNumber =  userData.loginNumber +1;
                        req.session.userInfo.loginNumber = parseInt(userData.loginNumber);

                        userData.save(function (err) {
                            if (!err) {
                                console.log("save is success!");

                                var CartTable = CartSchema.newHandler();
                                CartTable.find({},function(err, data){
                                    if(!err){
                                        var cartNumber = data.length;
                                        var totalMoney = 0;
                                        for(var i=0; i<data.length; i++){
                                            totalMoney = totalMoney + data[i].quantity * data[i].price;
                                        }
                                        req.session.userInfo.cartNumber = parseInt(cartNumber);
                                        req.session.userInfo.totalMoney = parseFloat(totalMoney.toFixed(2));
                                    }
                                    res.redirect("/");
                                })
                            } else {
                                console.log("save is failed!");
                            }
                        });
                    }else{
                        renderFun(req, res, { title:'Sign in', login_response_msg:'the password is not correct', fbApiKey:'' }, 'user/login');
                    }
                }else {
                    renderFun(req, res, { title:'Sign in', login_response_msg:'the user not existed', fbApiKey:'' }, 'user/login');
                }
            } else {
                renderFun(req, res, { title:'Sign in', login_response_msg:'mongo db error', fbApiKey:'' }, 'user/login');
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
            renderFun(req, res, { title:'Sign in', login_response_msg:'error occur' , fbApiKey:''}, 'user/login');
        }
    })
}

exports.logout = function(req, res,renderView){
    req.session.userInfo = null;
    res.redirect('/index');
    res.end();
}