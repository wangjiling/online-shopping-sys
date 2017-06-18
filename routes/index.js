var indexControllers = require('../controllers/index');
var productController = require('../controllers/product');
var sampleController = require('../controllers/index').sample1;
var loginController = require('../controllers/login');
var signupController = require('../controllers/signup');
var orderController = require('../controllers/order');
var userCenterController = require('../controllers/userCenter');
var imageController = require('../controllers/image');
var cartController = require('../controllers/cart');
var searchControllers = require('../controllers/search');
var utils = require('../utils');
var urllib = require('url');
var setting = require('../express.configuration').setting;
var __appdir = require('../express.configuration').__appdir;
var log = require('../utils/log');



/*
 * GET home page.
 */

exports.index = function(req, res, next){
    console.log("url:" + req.url);
    indexControllers.index(req, res, renderView);

};

/**
 * Image
 */

exports.uploadImage = function(req, res, next){
    imageController.uploadImage(req, res, renderView);
}


exports.uploadImageToGae = function(req, res, next){
    imageController.uploadImageToGae(req, res, renderView);
}

/*
 * GET home top deal.
 */
exports.loadHomeTopDeal = function(req, res, next){
    indexControllers.loadHomeTopDeal(req, res, renderJson);
};

/*
 * GET home hot sell.
 */
exports.loadHotSale = function(req, res, next){
    searchControllers.loadHotSale(req, res, renderJson);
};

/*
 * GET home nav
 */
exports.getCategories = function(req, res, next){
    indexControllers.getCategories(req, res, renderJson);
};

/*
 * GET Store Info page.
 */
exports.storeInfo = function(req, res, next){
    console.log("url:" + req.url);
    var params = urllib.parse(req.url, true);
    storeController.index(req, res,renderView);

};


/*
 * GET Store products.
 */
exports.getProductsByStoreId = function(req, res, next){
    console.log("url:" + req.url);
    var params = urllib.parse(req.url, true);
    storeController.getProductsByStoreId(req, res,renderJson);

};

/*
 * GET Product Detail page.
 */
exports.productDetail = function(req, res, next){
    console.log("url:" + req.url);
    productController.searchProductIcon(req, res,renderView);

};
/**
 * Get Deal Detail
 */
exports.dealDetail = function(req, res, next){
    console.log("url:" + req.url);
    var params = urllib.parse(req.url, true);
    groupbuyController.dealDetail(req, res,renderView);

};

/*
 * order received confirm
 */
exports.viewOrderConfirmAfterReceived = function(req, res){
    orderController.viewOrderConfirmAfterReceived(req, res, renderView);
};

/*
 * order confirmation
 */
exports.generateOrder = function(req, res){
    orderController.generateOrder(req, res, renderView);
};

/*
 * order list
 */
exports.showOrderList = function(req, res){
    orderController.showOrderList(req, res, renderView);
};

/*
 * paid success
 */
exports.buyOrderNow = function(req, res){
    orderController.buyOrderNow(req, res, renderView);
};

/*
 * order_detail_input
 */
exports.viewInputOrder = function(req, res){
    orderController.viewInputOrder(req, res, renderView);
};


/*
 * search
 */
exports.searchAll = function(req, res){
    searchControllers.searchAll(req, res, renderView);
};


/*
 * search deal
 */
exports.searchDeal = function(req, res){
    searchControllers.searchDeal(req, res, renderView);
};


/*
 * search product
 */
exports.searchProduct = function(req, res){
    searchControllers.searchProduct(req, res, renderView);
};


/*
 * search store
 */
exports.searchStore = function(req, res){
    searchControllers.searchStore(req, res, renderView);
};


/*
 * search feature products
 */
exports.searchProductIcon = function(req, res){
    searchControllers.searchProductIcon(req, res, renderJson);
};

/*
 show top products
 */
exports.showStackGraph = function(req, res, next){
    productController.showStackGraph(req, res, renderJson);
};


/*
 * shopping cart list
 */
exports.listCart = function(req, res, next){
    cartController.listCart(req, res, renderView);
};

exports.ajaxAddCart = function(req, res, next){
    cartController.ajaxAddCart(req, res, renderJson)

}

exports.ajaxRemoveCart = function(req, res, next){
    cartController.ajaxRemoveCart(req, res, renderJson)

}


/*
 * dealorder received confirm
 */
exports.viewConfirmAfterReceived = function(req, res){
    groupbuyController.viewConfirmAfterReceived(req, res, renderView);
};


/*
 * AntiSpider login
 */

exports.antiSpiderLogin = function(req, res){
    antiSpiderLoginController(req, res, renderView);
};

/*
 * user login
 */
exports.login = function(req, res){
    loginController.login(req, res, renderView);
};

exports.loginPost = function(req, res){
    loginController.loginPost(req, res, renderView);
};

exports.logout = function(req, res){
    loginController.logout(req, res, renderView);
};

/*
 * user sign up
 */
exports.signup = function(req, res, next){
    signupController.signup(req, res, renderView);
};

exports.userExist = function(req, res, next){
    signupController.userExist(req, res, renderView);
};

exports.signupPost = function(req, res, next){
    signupController.signupPost(req, res, renderView);
};

/*
 * user center
 */
exports.userCenter = function(req, res){
    userCenterController.userCenter(req, res, renderView);
};

exports.profileEdit = function(req, res){
    userCenterController.profileEdit(req, res, renderView);
};

//exports.getProfile = function(req, res){
//    userCenterController.getProfile(req, res, renderView);
//};

exports.sample1 = function(req, res, next){

//    console.log("url:" + req.url);
    var params = urllib.parse(req.url, true);
//    console.log('userid.session: '+req.session.userid);
//    console.log("params:" + params);
//    console.log("pathname:" + req.params.name);
//    console.log("name:" + params.query.name);
//    utils.sleep(20000);
    sampleController(req, res, renderView);
}

exports.sample2 = function(req, res, next){
    renderView(req, res, {title: 'AntiSpider'}, 'sample2')
}

/**
 * Render the view and append some common values.
 * @type {Function}
 */
var renderView = exports.renderView = function(req, res, module, view){
    module.contextPath = setting.contextPath;
    module.appRoot = __appdir
    module.keywords = utils.whenUndefined(req.session.keywords, function(value){return '';})
    module.utils = utils;
    module.session = req.session;
    module.cartNumber = 0;
    module.totalMoney = 0;
    module.loginNumber = 0;
    if (req.session.userInfo) {
        module.userName = req.session.userInfo.userName ? req.session.userInfo.userName : "";
        module.cartNumber = req.session.userInfo.cartNumber ? req.session.userInfo.cartNumber : 0;
        module.totalMoney = req.session.userInfo.totalMoney ? req.session.userInfo.totalMoney : 0;
        module.loginNumber = req.session.userInfo.loginNumber ? req.session.userInfo.loginNumber : 0;
    }
    res.render(view, module)
}

var renderJson = exports.renderJson = function(req, res, module){
    res.writeHead(200, {"Content-Type": 'text/plain; charset=utf-8'});
    res.end(JSON.stringify(module));
}