var _ = require('underscore');

// 获取当前系统信息
var os = require('os');

function getServerIp() {

	// 拿到当前服务器的网络信息, 用于动态地告诉前端sokcet连接的ip地址和端口号
	var netInfo = os.networkInterfaces();

	var ipArr = [];

	_.each(_.values(netInfo), function(arr) {
		_.each(arr, function(obj) {
			if (/ipv4/i.test(obj.family) && /^192/i.test(obj.address)) {
				ipArr.push(obj);
			}
		});
	});
	// 找到主机ip地址
	return _.find(_.pluck(ipArr, "address"), function(ip) {
		return /^192/i.test(ip);
	});
}

module.exports = getServerIp;