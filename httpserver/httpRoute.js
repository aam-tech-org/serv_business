var routelogin = require('./routeLogin');

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