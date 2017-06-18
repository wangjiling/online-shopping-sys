/**
 * Module dependencies.
 */

var routes = require('./routes')

//  url mapping
exports.urlmapping = function(app){
    // index section
    app.get('/', routes.index);
    app.get('/index', routes.index);
    app.all('/groupbuy/ajax/load_home_top_deal', routes.loadHomeTopDeal);
    app.all('/home/ajax/load_home_categories', routes.getCategories);
    app.all('/search/ajax/load_hot_sale', routes.loadHotSale);

    // search feature products
    app.all('/search/ajax/featured_products', routes.searchProductIcon);
    app.get('/ajax/top/stackGraph', routes.showStackGraph);

    // product
    app.get('/product/:productId',routes.productDetail);

    // login
    app.get('/login', routes.login);
    app.post('/login',routes.loginPost);
    app.get('/logout', routes.logout)

    // sign up
    app.get('/signup', routes.signup);
    app.get('/ajax/userexist', routes.userExist);
    app.post('/signup', routes.signupPost);

    // user center
    app.get('/usercenter/:panel?', routes.userCenter);
    app.post('/profile/edit', routes.profileEdit);

    //   Sample Url Mapping
    app.get('/sample1/n/:name?', routes.sample1);
    app.get('/sample2', routes.sample2);

    //order
    // order confirmation
    app.post('/order/generate_order', routes.generateOrder);
    //show all orders by userId
    app.get('/order/list',routes.showOrderList);
    // order received confirm
    app.get('/order/view_received_confirm', routes.viewOrderConfirmAfterReceived)
    // paid success
    app.get('/order/buy_now', routes.buyOrderNow)
    // order_detail_input
    app.get('/order/input_order', routes.viewInputOrder)

    // search product
    app.get('/search/product', routes.searchProduct)



    // shopping cart list
    app.all('/cart/list', routes.listCart);
    app.get('/cart/ajax/add', routes.ajaxAddCart);
    app.get('/cart/ajax/remove',routes.ajaxRemoveCart);

    // dealorder received confirm
    app.get('/groupbuy/order/view_received_confirm', routes.viewConfirmAfterReceived)

    // Image Upload
    app.get('/uploadImage', routes.uploadImage);
    app.post('/uploadImage', routes.uploadImageToGae);

    //   Error
    app.error(function(error, req, res, next){

    })

    app.get('/404', function(req, res){
        throw new NotFound;
    });


}