var bodyParser  = require('body-parser');
var express     = require('express');
var morgan      = require('morgan');
var path        = require('path');
var routes      = require('./routes');
var pkg         = require('./package.json');

var PORT = process.env.NODE_PORT || 3000;

var app = express();
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(routes);

listen();

function listen() {
    app.listen(PORT, function() {
        console.log('**********');
        console.log(pkg.description);
        console.log('TIME     : %s', (new Date()));
        console.log('PORT     : %s', PORT);
        console.log('CWD      : %s', process.cwd());
        console.log('**********');
    });
}

