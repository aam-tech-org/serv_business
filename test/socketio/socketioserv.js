var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Buffer = require('Buffer').Buffer;

function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

server.listen(80,
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
    socket.on('info', function (data) {
        //console.log(data);
        var buf = new Buffer(data);
        console.log('info: ' + buf.readIntBE(0, 4));
        io.emit('news', { hello: 'world' });
    });
    socket.on('my other event', function (data) {
        console.log(data);
        //var buf = new B(1)
        var buf = new Buffer(4+8+9);
        buf.writeIntBE(GetRandomNum(10000,99999), 0, 4);
        buf.writeDoubleBE(789.123456, 4, 8);
        buf.write('Aimyunion', 12, 9, 'utf8');
        io.emit('data', buf);
    });
});

