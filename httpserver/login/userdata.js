
function Map(){}
Map.prototype.get = function(key){
    return this[key];
};
Map.prototype.set = function(key,val){
    this[key]=val;
};

var userdata = new Map();

for(var i = 1; i <= 1000000; i++)
{
    var newuserid = 'U' + i;
    userdata.set(newuserid,{userid:newuserid, mobile:'13800010007', passwd:'123456'});
}

module.exports =
    {
        save:function (body)
        {
            //m.set('name','foo');
            //m.set('guest',{userid:'guest', usertype:'account', mobile:'13800010007', name:'hello'});
            //var s = m.get('name');
            if(body==null)
                return false;
            if(body.userid==null || body.userid=='')
                return false;
            userdata.set(body.userid, body);
            return true;
        },
        update:function (body)
        {
            if(body==null)
                return false;
            if(body.userid==null || body.userid=='')
                return false;
            userdata.set(body.userid, body);
            return true;
        },
        del:function (userid)
        {
        },
        find:function(userid)
        {
            return userdata.get(userid);
        },
        verifypasswd_savetoken:function (userid, passwd, token)
        {
            var item = userdata.get(userid);
            if(item==null)
                return false;
            if(item.passwd==null)
                return false;
            if(item.passwd == passwd) {
                item.token = token;
                userdata.set(userid, item);
                return true;
            }
            else
                return false;
        },
        savetoken:function (userid, token)
        {
            if(userid==null || userid=='')
                return false;
            var item = userdata.get(userid);
            if(item) {
                item.token = token;
                userdata.set(userid, item);
                return true;
            }
            else
                return false;
        },
        updatetoken:function (userid, token)
        {
            if(userid==null || userid=='')
                return false;
            var item = userdata.get(userid);
            if(item) {
                item.token = token;
                userdata.set(userid, item);
                return true;
            }
            else
                return false;
        },
        deltoken:function (userid, token)
        {
            if(userid==null || userid=='')
                return false;
            var item = userdata.get(userid);
            if(item) {
               if(item.token && item.token == token) {
                   item.token = null;
                   userdata.set(userid, item);
                   return true;
               }
               else
                   return false;
            }
            else
                return false;
        },
        verifytoken:function (userid, token)
        {
            var item = usersession.get(userid);
            if(item==null)
                return false;
            if(item.token==null)
                return false;
            return item.token == token;
        }
    };
