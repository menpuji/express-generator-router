# express-generator-router

> express router



## Install

>npm install express-generator-router



## Usage

 ``` js
  var Router = require("express-generator-router");
  router = Router();

  app.use('/api/', router.router);

  router.post('/test', function*(req, res, next) {
    //var result = yield fetch(url);
    res.json(result.data);
  })

 ```



## License

MIT

