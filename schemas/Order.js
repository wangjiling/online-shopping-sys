var mongoose = require('mongoose');
var myUtils = require("../utils");

var tableName = exports.tableName = 'order'

var Schema = exports.Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: Number,
    city: String,
    address : String,
    receiverName: String,
    telephone: String,
    payType: String,
    zipCode: String,
    payMoney: String,
    totalPrice: String,
    product: Array,
    usedPoint: Number,
    createDate: Date
})

var newHandler = exports.newHandler = function (pDb) {
    try {
        if (pDb) {
            var db = pDb;
        } else {
            var db = myUtils.connectMongoDB();
        }
        console.log("Success to get handler of %s", tableName);
        return db.model(tableName, Schema);
    } catch (err) {
        console.log("Failed to get handler of %s : %s", tableName, JSON.stringify(err));
    }
}