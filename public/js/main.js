// 首页页面主体

// 开启极限装逼模式
var $impress = $("#impress");
var impress = impress();
impress.init();
// console.log(impress);

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

	}

});

// 连接socket
function initSocket(socketInfo) {

	// console.log(socketInfo);
	var socket = io(['http://', socketInfo.ip, ':', socketInfo.port].join(''));
	// 通知服务端ppt 准备就绪
	socket.emit('ppt ready');

	// 管理员入场时, 播放入场动画
	socket.on('admin comming', function(data) {
		showAdminName(data.name);
	});

	// 翻动下一页
	socket.on('next', function() {
		impress.next();
	});

	// 翻动上一页
	socket.on('prev', function() {
		impress.prev();
	});

}

function showAdminName(name) {
	var $dom = $(
		'<div class="admin-show-wrap">'
			+'<div class="admin-show-content">'
				+'<h2>Welcome, admin: ' + name + '</h2>'
			+'</div>'
		+'</div>');

	$dom.insertBefore($impress);
	$dom.on('webkitAnimationEnd animationEnd', function() {
		$dom.delay(1000).fadeOut(400, function() {
			$dom.remove();
		});
	});
}