var routelogin = require('./routeLogin');
var routetrade = require('./routeTrade');

module.exports =
    {
        attchToServer: function (app) {
            ////////
            //app.use(
            //    "/",
            //    function (req, res)
            //    {
            //    }
            //);

            routelogin.attchToServer(app);
        }
    };