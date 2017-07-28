

var userdata = require('./userdata');

////

const ENUM_LOGOUT_ERROR_CODE =
    {
        //logout
        "error_json_format": "logout:101",
        "error_noaccount": "logout:102",
        "error_token_verify": "logout:103",
    };

function logout(userid, token)
{
    if(userid==null)
        return '\"status\": \"' + ENUM_LOGOUT_ERROR_CODE.error_noaccount + '\"';

    if(userdata.deltoken(userid, token))
        return '\"status\": \"0\"';
    else
        return '\"status\": \"' + ENUM_LOGOUT_ERROR_CODE.error_token_verify + '\"';
}

function logout_postput(req , res)
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
        statusitem = logout(req.body.userid, req.body.token);
    }
    else
        statusitem = '\"status\": \"' + ENUM_LOGOUT_ERROR_CODE.error_json_format + '\"';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var sendstr;

    sendstr = '{ \"seqid\": \"' + seqid + '\", ' + useriditem + statusitem + '}';
    res.end(sendstr);
}

module.exports =
    {
        cb_get_logout:function (req , res)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('GET logout\n');
        },
        cb_post_logout:function (req, res)
        {
            logout_postput(req , res);
        },
        cb_put_logout:function (req, res)
        {
            logout_postput(req , res);
        }
    };
