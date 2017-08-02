var app = require('express')();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
var io = require('socket.io')(server, {
    path: '/test'
});
//var Buffer = require('Buffer').Buffer;

var infosum = 0;
var senddatasum = 0;


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

function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

server.listen(8098,
    function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('http server running at port:%d', port);
    });

app.get('/', function (req, res) {
    //res.sendfile(__dirname + '/index.html');
    res.end('Welcome to visit socket.io for WebSocket.');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    /*
    socket.on('info', function (data) {
        if(infosum % 2000 == 0)
            console.log(getNowFormatDate() + ':\n\t\tinfo sum = ' + infosum);
        infosum ++;

        //console.log(data);
        //var buf = new Buffer(data);
        //console.log('info: ' + buf.readIntBE(0, 4));
        //io.emit('news', { hello: 'world' });
    });
    */
    /*
    socket.on('my other event', function (data) {
        console.log(data);
        //var buf = new B(1)
        var buf = new Buffer(4+8+9);
        buf.writeIntBE(GetRandomNum(10000,99999), 0, 4);
        buf.writeDoubleBE(789.123456, 4, 8);
        buf.write('Aimyunion', 12, 9, 'utf8');
        io.compress(true).emit('data', buf);
    });
    */
    socket.on('senddata', function (data) {
        if(senddatasum % 2000 == 0)
            console.log(getNowFormatDate() + ':\n\t\tsenddata sum = ' + senddatasum);
        senddatasum ++;
        io.emit('data', data);
    });
    socket.on('h5data', function (data) {
        //console.log('h5data: ' + data);
        io.emit('rsph5', {msg: 'you welcome!'});
    });
});

