
const common = require('../common');
//var userdata = require('./userdata');
var accountdata = require('../module/sysAccount');

////
const error_code = common.error_code;


function regiter(userid, body)
{
    if(userid==null)
        return '\"status\": \"' + error_code.error_noaccount + '\"';
    if(body.passwd==null || body.passwd=='')
        return '\"status\": \"' + error_code.error_nopasswd + '\"';
    if(accountdata.find(userid))
        return '\"status\": \"' + error_code.error_account_exist + '\"';
    if(accountdata.save(body))
        return '\"status\": \"0\"';
    else
        return '\"status\": \"' + error_code.error_json_format + '\"';
}

function register_postput(req , res)
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
        statusitem = regiter(req.body.userid, req.body);
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
        cb_get_register:function (req , res)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('GET regist\n');
        },
        cb_post_register:function (req, res)
        {
            register_postput(req , res);
        },
        cb_put_register:function (req, res)
        {
            register_postput(req , res);
        }
    };
