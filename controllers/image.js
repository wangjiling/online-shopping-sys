var setting = require('../setting.json');
var fs = require('fs');
var path = require('path');
var http = require('http');
var querystring = require('querystring');

exports.uploadImage = function(req, res, renderFun){
    renderFun(req,res, {
        title: 'uploadImage'
    },'business/uploadImage');
}
exports.uploadImageToGae = function(req, res, renderFun){
    var tempImagePath = req.files.upload.path;
    var extName = path.extname(req.files.upload.name);
    var imageUrl = '/store/upload/' + path.basename(tempImagePath) + extName;
    var newPath = __dirname + "/../public" + imageUrl;
    fs.readFile(tempImagePath, "binary", function (error, data) {
        if (error) throw error;
        fs.writeFile(newPath, data, "binary", function (err) {
            if (error) throw error;
        });

        var cropParams = {
            cropTop: 0,
            cropLeft: 0,
            cropBottom: 64,
            cropRight: 64
        }
        var cropQuery = querystring.stringify(cropParams);
        //console.log("cropQuery: " +  cropQuery);
        //imageUrl += '&' + cropQuery;
        renderFun(req, res, {title:'uploaded', imageUrl: imageUrl, cropQuery: cropQuery}, 'business/uploaded' );
    })
}

//exports.uploadImageToGae = function(req, res, renderFun){
//    var tempImagePath = req.files.upload.path;
//    var imageServerHost = setting.imageServer.host;
//    var imageUploadPath = setting.imageServer.path;
//    var imageServerPort = setting.imageServer.port;
//    var imageServerMethod = setting.imageServer.method;
//    var image = fs.readFile(tempImagePath, "binary", function (error, data) {
//        if (error) throw error;
////        console.log("\n imagebinary is :\n" +  data);
////        console.log("\n upload to gae is began...");
//        uploadBinaryImage(data, imageServerHost, imageServerPort, imageUploadPath, imageServerMethod, {}, function (data) {
////            console.log("\nupload response status: " + data.status);
////            console.log("\nupload response header: " + JSON.stringify(data.headers));
////            console.log("\nupload response content: " + JSON.stringify(data.rawData));
//            var imageHost = imageServerHost;
//            if(imageServerPort != 80){
//                imageHost += ":" + imageServerPort;
//            }
//            var imageUrl = "http://" + imageHost + imageUploadPath + "?id="+ data.rawData;
//            var cropParams = {
//                cropTop: 0,
//                cropLeft: 0,
//                cropBottom: 64,
//                cropRight: 64
//            }
//            var cropQuery = querystring.stringify(cropParams);
//            //console.log("cropQuery: " +  cropQuery);
//            //imageUrl += '&' + cropQuery;
//            renderFun(req, res, {title:'uploaded', imageUrl: imageUrl, cropQuery: cropQuery}, 'business/uploaded' );
//        })
//    })
//}


//
//exports.uploadImage = function(req, res, renderFun){
//    if(req.files.upload.path){
//        var tempImageFile = fs.readFile(req.files.upload.path, "binary", function (error, data) {
//            if (error) throw error;
//            //console.log("\n imagebinary is :\n" +  data);
//            console.log("\n upload is began...");
//            uploadBinaryImage(data, setting.imageServer.host,
//                                setting.imageServer.port, setting.imageServer.path,
//                                setting.imageServer.method, {}, function (data) {
//                console.log("\nupload response status: " + data.status);
//                console.log("\nupload response header: " + JSON.stringify(data.headers));
//                console.log("\nupload response content: " + JSON.stringify(data.rawData));
//                renderFun(req, res, data);
//            })
//        })
//    }
//}

var uploadBinaryImage = exports.uploadBinaryImage = function(imageBinary, uploadServerHost, uploadServerPort,
                                                             uploadUriPath, requestMethod, requestParams, callback){
    //console.log("data length:" + imageBinary.length);
    // Ready for api request.
    var options = {
        host: uploadServerHost,
        port: uploadServerPort,
        path: uploadUriPath,
        method: requestMethod,
        headers: {
            "content-length": imageBinary.length
        }
    };

    // Request special url.
    var req = http.request(options, function(res) {
        var data = '';
        //res.setEncoding('utf8');

        res.on('data', function (chunk) {
            data = data + chunk
        });

        res.on('end', function(){
            var parsedData;
            try{
                parsedData = data;
            }catch(error){
                parsedData = {}
            }

            var response = {
                status: res.statusCode,
                headers: res.headers,
                content: parsedData,
                rawData: data
            }

            // processes error of response.
            driverErrorProcess(response);

            callback(response);

            //console.log("value of product:" + JSON.stringify(response.content));
        })

    });

    req.on('error', function(e) {
        //console.log('problem with request: ' + e.message);
    });

    req.write(imageBinary, encoding='binary');


    // write data to request body
    req.end();

    //console.log("end of request.");

}

/**
 * Process driver invoke error.
 * @param data
 */
var driverErrorProcess = function(data){
    if(data.status != 200){
        //todo: Error process.
        if(data.content.errors){
            //todo: Some business errors happened.
        }else{
            //todo: Some connection error happened.
        }
    }else{

    }
}