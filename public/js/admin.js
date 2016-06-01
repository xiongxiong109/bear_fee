// 遥控器控制ppt播放

var $connectBtn = $(".btn-connect");
var $controllerBtn = $(".btn-controller");
$connectBtn.one('click', function() {

	// 从服务端获取socket连接的相关信息, 并生成socket代码

	$.ajax({

		url: '/socket/info',
		type: 'post',
		dataType: 'json',
		data: {
			username: 'xiongxiong109'
		},
		success: function(socketInfo) {
			// 拿到socket的链接地址, 初始化socket
			initSocket(socketInfo);
			$connectBtn.hide(400);
			$controllerBtn.show().css('display', 'block');
		}

	});

});

/* 初始化控制器socket */
function initSocket(socketInfo) {

	// console.log(socketInfo);
	var socket = io(['http://', socketInfo.ip, ':', socketInfo.port].join(''));

	// 管理员进入socket;
	socket.emit('admin ready', {name: 'Bear Cambridge'});

	// 发送翻页指令
	$(".btn-prev").on('click', function() {
		socket.emit('go next');
	});

	$(".btn-next").on('click', function() {
		socket.emit('go prev');
	});
}