var mongoose = require('mongoose');
var myUtils = require("../utils");

var tableName = exports.tableName = 'product'

var Schema = exports.Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: String,
    storeName: String,
    storeLogo: String,
    productId : Number,
    stock: Number,
    majorImage: String,
    marketPrice: String,
    nowPrice: String,
    offPercent: String,
    property: String,
    description: String
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