var setting = require("../setting.json");
var UserSchema = require('../schemas/User');

exports.signup = function(req, res, renderFun){
    renderFun(req, res, {title:'Register'}, 'user/signup');
}

exports.userExist = function (req, res) {
    var UserTable = UserSchema.newHandler();
    var userName = req.query.userName;
    UserTable.find({userName:userName}, function (err, data) {
        if (!err) {
            if (data.length == 0) {
                console.log("no");
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write("true");
                res.end();
            } else {
                console.log("yes");
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write("false");
                res.end();
            }
        }
    });
};

exports.signupPost = function(req, res, renderFun){
    var UserTable = UserSchema.newHandler();
    UserTable.find({userName:req.body.userName}, function (err, data) {
        try {
            if (!err) {
                if (data.length == 0) {
                    var userSave = new UserTable({
                        userName:req.body.userName,
                        email:req.body.email,
                        password:req.body.password,
                        sex:req.body.sex,
                        point:10,
                        createDate: new Date(),
                        modifiedDate: new Date(),
                        loginNumber: 0
                    });
                    userSave.save(function (err) {
                        if (!err) {
                            console.log("save is success!");
//                            req.session.userInfo = userInfo;
                            res.redirect("/login");
//                            })
                        } else {
                            console.log("save is failed!");
                            renderFun(req, res, { title:'error occur' }, 'user/signup');
                        }
                    });
                } else {
                    renderFun(req, res, { title:'the user already existed' }, 'user/signup');
                }
            } else {
                renderFun(req, res, { title:'mongo db error' }, 'user/signup');
            }
        } catch (err) {
            console.log("call back error : " + JSON.stringify(err));
            renderFun(req, res, { title:'error occur' }, 'user/login');
        }
    })
}