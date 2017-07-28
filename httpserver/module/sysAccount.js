
var SINGLE_ACCOUNT =
    {
        userid:"",
        passwd:"",
        name:"",
        nickname:"",
        mobile:"",
        email:"",
        address:""
    };

module.exports = (
    function sysAccount()
    {
        var instance =
            {
                ACCOUNT_DATA:{},

                initData:function () {
                    for (var i = 1; i <= 1000000; i++) {
                        //this.ACCOUNT_DATA[i] = {};
                        var newuserid = 'U' + i;
                        this.ACCOUNT_DATA[newuserid] = {
                            userid: newuserid,
                            passwd: '123456',
                            name: 'Name' + newuserid,
                            nickname: '',
                            mobile: '13800010001',
                            email: '',
                            address: ''
                        };
                    }
                },
                save:function (acount) {
                    if (acount == null)
                        return false;
                    if (acount.userid == null || acount.userid == '')
                        return false;
                    this.ACCOUNT_DATA[acount.userid] = acount;
                    return true;
                },
                update:function (acount) {
                    if (acount == null)
                        return false;
                    if (acount.userid == null || acount.userid == '')
                        return false;
                    this.ACCOUNT_DATA[acount.userid] = acount;
                    return true;
                },
                del:function (userid)
                {
                },
                find:function(userid)
                {
                    return this.ACCOUNT_DATA[userid];
                },
                verifypasswd_savetoken:function (userid, passwd, token)
                {
                    var item = this.ACCOUNT_DATA[userid];
                    if(item==null)
                        return false;
                    if(item.passwd==null)
                        return false;
                    if(item.passwd == passwd) {
                        item.token = token;
                        this.ACCOUNT_DATA[userid] = item;
                        return true;
                    }
                    else
                        return false;
                },
                savetoken:function (userid, token)
                {
                    if(userid==null || userid=='')
                        return false;
                    var item = this.ACCOUNT_DATA[userid];
                    if(item) {
                        item.token = token;
                        this.ACCOUNT_DATA[userid] = item;
                        return true;
                    }
                    else
                        return false;
                },
                updatetoken:function (userid, token)
                {
                    if(userid==null || userid=='')
                        return false;
                    var item = this.ACCOUNT_DATA[userid];
                    if(item) {
                        item.token = token;
                        this.ACCOUNT_DATA[userid] = item;
                        return true;
                    }
                    else
                        return false;
                },
                deltoken:function (userid, token)
                {
                    if(userid==null || userid=='')
                        return false;
                    var item = this.ACCOUNT_DATA[userid];
                    if(item) {
                        if(item.token && item.token == token) {
                            item.token = null;
                            this.ACCOUNT_DATA[userid] = item;
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
                    var item = this.ACCOUNT_DATA[userid];
                    if(item==null)
                        return false;
                    if(item.token==null)
                        return false;
                    return item.token == token;
                }


/*
                checkConn:function (id)
                {
                    //
                    var account = this.ACCOUNT_DATA[id];

                    if( account )
                    {
                        ///
                        if( account.time_check )
                        {

                        }

                    }
                    else
                    {

                    }

                    ///

                    return true;
                },
*/



        };

        instance.initData();
        return instance;
    })();
