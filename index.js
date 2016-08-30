var express = require('express');
var co = require('co');

function forwardError(res) {
  return function(error) {
    if (!error.statusCode)
      console.log(error.stack ||  error.statusMessage || error)
    if (error instanceof Error) {
      error = {
        name: error.name,
        message: error.message
      };
    }
    if (!error.statusCode) {
      return res.status(500).json(error);
    }
    // console.error(error);
    res.status(error.statusCode).send(error.statusMessage);
    //  res.render('error', { error: err.statusMessage });
  }
}

function asyncRouter(router,pararm) {
  var ret = {};
  ret.router = router;
  function addMethod(method) {
    ret[method] = function(path, handlerGenerator) {
      router[method](path, function(req, res, next) {
        co.wrap(handlerGenerator)(req, res, next).catch(pararm.catchhandler(res));
      });
    };
  }
  addMethod('get');
  addMethod('put');
  addMethod('post');
  return ret;
}

// var router = asyncRouter(express.Router());
var opts = {
    catchhandler:forwardError
  }
}

var Router = function(pararms){
  var opts = pararms;
  return asyncRouter(express.Router(),opts)
}

module.exports = Router;