var ProductSchema = require('../Product.js');

var saveProduct = exports.saveProduct = function(data){
    var ProductTable = ProductSchema.newHandler();
    ProductTable.find({}, {}, {sort: [['_id', -1]]}, function (err, product) {
        try {
            if (!err) {
                var productId = product[0] ? (product[0].productId + 1) : 0;
                var productSave = new ProductTable({
                    productName: data.productName,
                    storeName: data.storeName,
                    storeLogo: data.storeLogo,
                    productId : productId,
                    majorImage: data.majorImage,
                    marketPrice: data.marketPrice,
                    nowPrice: data.nowPrice,
                    offPercent: data.offPercent,
                    property: data.property,
                    description: data.description,
                    stock: data.stock
                });
                productSave.save(function (err) {
                    if (!err) {
                        console.log("save is success!");
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

var productData = {
    "storeName": "Lenovo",
    "storeLogo": "",
    "productName": "Lenovo Yoga13-IFI",
    "majorImage": "/images/lenovo.jpg",
    "marketPrice": "349.95",
    "nowPrice": "199.50",
    "offPercent": "0.43",
    "property": "popular",
    "description":"this is a Lenovo computer",
    "stock": 100
};
var topProductData = {
    "storeName": "Apple",
    "storeLogo": "/images/touchStore.jpg",
    "productName": "Touch 3gs",
    "majorImage": "/images/to1.jpg",
    "marketPrice": "399.99",
    "nowPrice": "299.99",
    "offPercent": "0.25",
    "property": "groupBuy",
    "description": "this is a  Apple Touch",
    "stock": 100
};

saveProduct(topProductData);

