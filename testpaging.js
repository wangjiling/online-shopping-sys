var setting = require("./setting.json");
var UserSchema = require('./schemas/User');
var UserTable = UserSchema.newHandler();

var query = UserTable.find();
query.skip(5).limit(10).exec(function (err, results) {
    try {
        if (!err) {
            if (results.length != 0) {
                console.log("count: " + results.length);
            }
        }
    } catch (err) {
        console.log("call back error : " + JSON.stringify(err));
    }
});
