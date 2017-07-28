
const common = require('../common');
//var userdata = require('./userdata');
var accountdata = require('../module/sysAccount');

var loginsum = 0;
////

const error_code = common.error_code;

function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function GenToken()
{
    return 'T' + GetRandomNum(10000, 99999) + GetRandomNum(10000, 99999) + GetRandomNum(10000, 99999) + GetRandomNum(10000, 99999) + GetRandomNum(10000, 99999);
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

function login(userid, passwd)
{
    if(loginsum % 2000 == 0)
        console.log(getNowFormatDate() + ':\n\t\tlogin sum = ' + loginsum);
    loginsum ++;

    if(userid==null)
        return '\"status\": \"' + error_code.error_noaccount + '\"';
    if(passwd==null)
        return '\"status\": \"' + error_code.error_nopasswd + '\"';

    var token = GenToken();
    if(accountdata.verifypasswd_savetoken(userid, passwd, token))
        return '\"token\": \"' + token + '\", \"status\": \"0\"';
    else
        return '\"status\": \"' + error_code.error_account_or_passwd + '\"';
}

function logintoken(userid, token)
{
    if(userid==null)
        return '\"status\": \"' + error_code.error_noaccount + '\"';
    if(passwd==null)
        return '\"status\": \"' + error_code.error_nopasswd + '\"';

    if(accountdata.verifypasswd(userid, passwd))
        return '\"status\": \"0\"';
    else
        return '\"status\": \"' + error_code.error_account_or_passwd + '\"';
}

function login_postput(req , res)
{
    //login(req, res, 'POST');
    var statusitem = '';
    var seqid = '';
    var useriditem = '';
    if (req.body) {
        if(req.body.seqid)
            seqid = req.body.seqid;
        if(req.body.userid)
            useriditem = '\"userid\": \"' + req.body.userid + '\", ';
        statusitem = login(req.body.userid, req.body.passwd);
    }
    else
        statusitem = '\"status\": \"' + error_code.error_json_format + '\"';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var sendstr;

    sendstr = '{ \"seqid\": \"' + seqid + '\", ' + useriditem + statusitem + '}';
    res.end(sendstr);
}

module.exports =
    {
        cb_get_login:function (req , res)
        {
            //m.set('name','foo');
            //m.set('guest',{userid:'guest', usertype:'account', mobile:'13800010007', name:'hello'});
            //var s = m.get('name');
            //login(req, res, 'GET');

            loginsum = 0;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('GET login\n');
        },
        cb_post_login:function (req, res)
        {
            login_postput(req , res);
        },
        cb_put_login:function (req, res)
        {
            login_postput(req , res);
        }
    };

/*
//////////
module.exports =
    (
        function sysLogin(){
            var instance =
                {
                    login:function (req, res) {
                        //
                        var id ....
                        var account = this.ACCOUNT_DATA[id];

                        //check
                        account...

                    },
                    logout:function () {

                    },
                    regist:function () {

                    },
                };

            return instance;
        }
    )();

module.exports =
    (function sysAccount(){
        var instance =
            {
                ACCOUNT_DATA:{},

                checkConn:function (...) {
                    //

                    return ...isconn;
                },




            };

        return instance;
    })();

    module.exports =
        (
            function sysLogic()
            {
                var instance =
                    {

                    };

                return instance;
            }
        )();
*/

//exports.cb_get_login = function (req, res) {
//}

//exports.cb_post_login = function (req, res) {
//}

//exports.cb_put_login = function (req, res) {
//}
