const io = require('socket.io-client');
var Buffer = require('Buffer').Buffer;
var sockets = [];
const num = 2000;

for(var i=0; i<num; i++) {
    sockets[i] = new io('http://39.108.71.104:8098');
    sockets[i].on('data', function (data) {
        //var buf = new Buffer(data);
        //console.log('news: ' + buf.readIntBE(0, 4), buf.readDoubleBE(4, 8));
        //console.log('news: ' + buf.toString('utf8', 12, 12+9));
        ////var bufstr = new Buffer(10);
        ////buf.copy(bufstr, 0, 12, 12+6);
        ////console.log('news: ' + bufstr.toString());
        //socket.emit('my other event', {my: 'data'});
    });
}

function forloop() {
    var buf = new Buffer(256);
    for (var i = 0; i < num; i++) {
        if (sockets[i].connected)
            sockets[i].emit('senddata', buf);
    }
    setTimeout(forloop, 1000 * 1);
}

setTimeout(forloop, 1000 * 1);

