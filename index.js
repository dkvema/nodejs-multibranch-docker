const {loadSecrets} = require('./secrets_getsecretvalue.js');
loadSecrets()
  .then(()=>{
    console.log(process.env);
  console.log('starting of index page envrionment from jenkins::::'+process.env.environment);
  console.log('starting of index page envrionment from jenkins::::'+process.env.environment);
    const express = require('express');
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const routes = require('./routes/index');
    const app = express();
    // View enginer setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    // Middleware setup
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    // Mount routes
    app.use('/', routes);
    //added newly devenda end
    // Start server
    var port = process.env.PORT || '3000';
    app.set('port', port);
    app.listen(port, function () {
      console.log('Example app listening on port ' + port);
      console.log('index page secrets::::'+process.env.DATA_FILE);
     // console.log('index page ENVIRONMENT:::'+process.env.ENVIRONMENT);
    });
  });
