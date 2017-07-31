const io = require('socket.io-client');
var Buffer = require('Buffer').Buffer;
const socket = io('http://127.0.0.1');

//socket.on('connect', function(io) {
//    console.log(socket.id); // 'G5p5...'
//    socket.emit('my other event', 'Hi, server.');
//}

socket.on('news', function (data) {
        console.log('news: ' + JSON.stringify(data));
        socket.emit('my other event', {my: 'data'});
    });
socket.on('data', function (data) {
    var buf = new Buffer(data);
    console.log('news: ' + buf.readIntBE(0, 4), buf.readDoubleBE(4, 8));
    console.log('news: ' + buf.toString('utf8', 12, 12+9));
    //var bufstr = new Buffer(10);
    //buf.copy(bufstr, 0, 12, 12+6);
    //console.log('news: ' + bufstr.toString());
    socket.emit('my other event', {my: 'data'});
});

/*
setInterval(function() {
    if(socket.connected)
        socket.emit('my other event', {my: 'data'});
    },1000 * 1);
*/
