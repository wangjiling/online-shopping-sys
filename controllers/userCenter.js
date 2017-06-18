var setting = require("../setting.json");
var UserSchema = require('../schemas/User');
var constant = require('../constant/index');

exports.userCenter = function(req, res, renderFun){
    var UserTable = UserSchema.newHandler();
    UserTable.findOne({_id:req.session.userInfo.userId}, function (err, data) {
        try {
            if (!err) {
                if (data) {
                    var user = data;
                    user.userId = data._id;
                    renderFun(req, res, {title:'My YellConnect - Purchasing History', sel_panel:req.params.panel, user:user}, 'marketplace/user_center');
                } else {
                    renderFun(req, res, { title:'Sign in', login_response_msg:'sorry,please log in again', fbApiKey:'' }, 'user/login');
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

exports.profileEdit = function(req, res, renderFun){
    var UserTable = UserSchema.newHandler();
    UserTable.findOne({_id:req.body.userId}, function (err, user) {
        try {
            if (!err) {
                if (user) {
                    user.userName = req.body.userName;
                    user.sex = req.body.sex;
                    user.email = req.body.email;
                    user.photo = req.body.image;
                    user.signature = req.body.signature? req.body.signature: "";
                    user.modifiedDate = new Date();
                    user.save(function(err, user){
                        if(!err){
                            console.log("save is success!");
                            renderFun(req, res, {title:'My YellConnect - Purchasing History', sel_panel:constant.USERPROFILE, user:user}, 'marketplace/user_center');
                        }else{
                            console.log("save is failed!");
                        }
                    });
                }
            }
        }catch (err) {
            console.log("call back error : " + JSON.stringify(err));
        }
    })
}