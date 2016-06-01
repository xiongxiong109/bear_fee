var express = require('express');
var router = express.Router();

// 引入socket
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const SOCKET_PORT = '8888';
const SOCKET_IP = require('../services/getServerIp')(); // 拿服务器ip

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

/* ppt操作界面 */
router.get('/admin', function(req, res, next) {
	res.render('admin');
});

/* 获取socketInfo */
router.post('/socket/info', function(req, res, next) {

	// 拿到用户名
	// console.log(req.body.username);

	res.send({
		ip: SOCKET_IP,
		port: SOCKET_PORT
	});

});


// socket io connection
io.on('connection', function(socket) {

	console.log('someone connected');

	// ppt 连接就绪
	socket.on('ppt ready', function() {
		console.log('ppt ready');
		// io.emit('next');
	});

	// admin入场
	socket.on('admin ready', function(data) {
		console.log('admin ready');
		// 通知所有页面, 管理员入场
		io.emit('admin comming', data);
	});

	// 监听翻页指令
	socket.on('go next', function() {
		io.emit('next');
	});

	socket.on('go prev', function() {
		io.emit('prev');
	});

});

// socket io port 
http.listen(SOCKET_PORT, function() {
	console.log('socket online...');
});

module.exports = router;
