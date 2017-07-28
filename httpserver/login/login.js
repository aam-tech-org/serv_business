
var userdata = require('./userdata');
var loginsum = 0;
////

const ENUM_LOGIN_ERROR_CODE =
    {
        //login
        "error_json_format": "login:101",
        "error_noaccount": "login:102",
        "error_nopasswd": "login:103",

        "error_account_noexist": "login:201",
        "error_account_or_passwd_fail": "login:202",

        "error_login_already_in": "login:210",
        "error_login_already_out": "login:211",
        "error_login_in_timeout": "login:212"
    };


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
        return '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_noaccount + '\"';
    if(passwd==null)
        return '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_nopasswd + '\"';

    var token = GenToken();
    if(userdata.verifypasswd_savetoken(userid, passwd, token))
        return '\"token\": \"' + token + '\", \"status\": \"0\"';
    else
        return '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_account_or_passwd_fail + '\"';
}

function logintoken(userid, token)
{
    if(userid==null)
        return '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_noaccount + '\"';
    if(passwd==null)
        return '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_nopasswd + '\"';

    if(userdata.verifypasswd(userid, passwd))
        return '\"status\": \"0\"';
    else
        return '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_account_or_passwd_fail + '\"';
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
        statusitem = '\"status\": \"' + ENUM_LOGIN_ERROR_CODE.error_json_format + '\"';
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
            //res.statusCode = 200;
            //res.setHeader('Content-Type', 'text/plain');
            //res.end('PUT login\n');
        }
    };

//exports.cb_get_login = function (req, res) {
//}

//exports.cb_post_login = function (req, res) {
//}

//exports.cb_put_login = function (req, res) {
//}
