const io = require('socket.io-client');
var socket = io.connect('http://10.0.2.67:80');

function delay1s() {
	var buf = new Buffer(4+8);
	buf.writeIntBE(3000,0,4);
	buf.write('xiaoyuan',4,8);
        socket.emit('info',buf);
	//socket.emit('info', 'hello');
}	
socket.on('news', function (data) {
    console.log(data);
    setTimeout(delay1s,1000);
 });


