
var userdata = require('./userdata');

////

const ENUM_REGISTER_ERROR_CODE =
    {
        //login
        "error_json_format": "register:101",
        "error_noaccount": "register:102",
        "error_nopasswd": "register:103",

        "error_account_exist": "register:201",
        "error_account_noexist": "register:202",
    };

function regiter(userid, body)
{
    if(userid==null)
        return '\"status\": \"' + ENUM_REGISTER_ERROR_CODE.error_noaccount + '\"';
    if(body.passwd==null || body.passwd=='')
        return '\"status\": \"' + ENUM_REGISTER_ERROR_CODE.error_nopasswd + '\"';
    if(userdata.find(userid))
        return '\"status\": \"' + ENUM_REGISTER_ERROR_CODE.error_account_exist + '\"';
    if(userdata.save(body))
        return '\"status\": \"0\"';
    else
        return '\"status\": \"' + ENUM_REGISTER_ERROR_CODE.error_json_format + '\"';
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
        statusitem = '\"status\": \"' + ENUM_REGISTER_ERROR_CODE.error_json_format + '\"';
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
            //m.set('name','foo');
            //m.set('guest',{userid:'guest', usertype:'account', mobile:'13800010007', name:'hello'});
            //var s = m.get('name');
            //login(req, res, 'GET');
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
