module.exports =
    {
        ENUM_HTTP_REQUEST:
            {
                "POST":0,
                "PUT":1,
                "GET":2,
                "DELETE":3
            },

        error_code:
            {
                //common
                "success": 0,
                "error_unknown": 100,
                "error_format": 101,
                "error_wrongdata": 102,
                "error_noaccount": 103,
                "error_nodata": 104,
                "error_json_format": 105,

                "error_database": 110,
                "error_notfinddata": 111,
                "error_notlogin": 120,

                "error_right_limited": 121,

                //register/login/logout
                "error_noaccount": 201,
                "error_nopasswd": 202,

                "error_account_exist": 211,
                "error_account_noexist": 212,

                "error_account_or_passwd": 221,
                "error_login_wrong_data": 222,

                "error_login_already_in": 230,
                "error_login_already_out": 231,
                "error_login_in_timeout": 232,
                "error_token_verify": 233

            }

};