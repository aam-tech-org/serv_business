var express     = require('express');
var httproute   = require('./httpRoute');
var cookie      = require('cookie-parser');
var session     = require('express-session');
var bodyParser  = require('body-parser');

var app         = express();

////
module.exports =
    {
        run: function () {
            ////
            httproute.attchToServer(app);
            //use
            app.use(bodyParser.text());
            app.use(bodyParser.json());
            app.use(bodyParser.raw());
            app.use(cookie());
            app.use(session(
                {
                    secret: "Jack.L's Server",
                    cookie: {maxAge: 600000, httpOnly: true}
                }
            ));

            app.all("*",
                function (req, res, next) {
                    ////////
                    res.header("Access-Control-Allow-Origin", req.headers.origin);
                    res.header("Access-Control-Allow-Headers", "Content-Type");
                    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                    res.header("Access-Control-Allow-Credentials", true);
                    //res.header("Content-Type", "application/json;charset=utf-8");
                    //res.header("cache-control","no-cache");
                    //res.type("application/json");

                    //res.statusCode = 200;

                    next();
                }
            );

            //app.get('/',
            app.use('/',
                function (req, res) {
                    res.send("Welcome To Jack.L's Server");
                }
            );

            ////
            const http_port = 8099;

            var httpServer = app.listen(
                http_port,
                function () {
                    var host = httpServer.address().address;
                    var port = httpServer.address().port;

                    console.log('http server running at port:%d', port);
                }
            );
        }
    };
