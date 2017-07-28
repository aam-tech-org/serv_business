const regist = require('./login/regist');
const login = require('./login/login');
const logout = require('./login/logout');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const ENUM_HTTP_REQUEST =
    {
        "POST":0,
        "PUT":1,
        "GET":2,
        "DELETE":3
    };

const HEAD_ROUTE = "/login";

var httplogictable =
    {
        logic_route:
            [
                //{path: "/regist", method: ENUM_HTTP_REQUEST.GET, func: regist.cb_get_register, json: null},
                {path: "/regist", method: ENUM_HTTP_REQUEST.POST, func: regist.cb_post_register, json: 1},
                {path: "/regist", method: ENUM_HTTP_REQUEST.PUT, func: regist.cb_put_register, json: 1},
                //{path: "/login", method: ENUM_HTTP_REQUEST.GET, func: login.cb_get_login, json: null},
                {path: "/login", method: ENUM_HTTP_REQUEST.POST, func: login.cb_post_login, json: 1},
                {path: "/login", method: ENUM_HTTP_REQUEST.PUT, func: login.cb_put_login, json: 1},
                //{path: "/logout", meghod: ENUM_HTTP_REQUEST.GET, func: logout.cb_get_logout, json: null},
                //{path: "/logout", meghod: ENUM_HTTP_REQUEST.POST, func: logout.cb_post_logout, json: 1},
                //{path: "/logout", meghod: ENUM_HTTP_REQUEST.PUT, func: logout.cb_put_logout, json: 1}
            ]
    };

module.exports =
    {
        attchToServer: function (app) {

            ////////
            const _pathRoot = HEAD_ROUTE;
            const _table = httplogictable;
            for (var key1 in _table.logic_route) {
                var _tableInfo = _table.logic_route[key1];
                const _path = _pathRoot + _tableInfo.path;

                switch (_tableInfo.method) {
                    case ENUM_HTTP_REQUEST.POST: {
                        if (_tableInfo.func) {
                            if (_tableInfo.json)
                                app.post(_path, jsonParser, _tableInfo.func);
                            else
                                app.post(_path, _tableInfo.func);
                        }

                        break;
                    }
                    case ENUM_HTTP_REQUEST.PUT: {
                        if (_tableInfo.func) {
                            if (_tableInfo.json)
                                app.put(_path, jsonParser, _tableInfo.func);
                            else
                                app.put(_path, _tableInfo.func);
                        }

                        break;
                    }
                    case ENUM_HTTP_REQUEST.GET: {
                        if (_tableInfo.func) {
                            if (_tableInfo.json)
                                app.get(_path, jsonParser, _tableInfo.func);
                            else
                                app.get(_path, _tableInfo.func);
                        }

                        break;
                    }
                    case ENUM_HTTP_REQUEST.DELETE: {
                        if (_tableInfo.func) {
                            if (_tableInfo.json)
                                app.delete(_path, jsonParser, _tableInfo.func);
                            else
                                app.delete(_path, _tableInfo.func);
                        }

                        break;
                    }
                }
            }
        }
    };