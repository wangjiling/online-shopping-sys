var dealIcon = require("../mockupdata/dealIcon.json");
var categoryTree = require("../mockupdata/categoryTree.json");

exports.index = function(req, res, renderFun){

    renderFun(req, res, { title: 'Home' }, 'index')
}


/**
 * Get home top deal data
 * @param req
 * @param res
 * @param renderFun
 */
exports.loadHomeTopDeal = function(req, res, renderFun){
    renderFun(req, res, dealIcon);
}


/**
 * Get home nav
 * @param req
 * @param res
 * @param renderFun
 */
exports.getCategories = function(req, res, renderFun){
    renderFun(req, res, categoryTree);
}


