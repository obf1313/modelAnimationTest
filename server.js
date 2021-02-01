let http = require('http');
//引入文件读取模块
let fs = require('fs');
var mime = require('./mime').mime;

http.createServer(function(req,res){
	let url = req.url;
	let file = './' + url;

	fs.readFile( file , function(err,data){
		/**
		 * 一参为文件路径
		 * 二参为回调函数
		 * 回调函数的一参为读取错误返回的信息，返回空就没有错误
		 * 二参为读取成功返回的文本内容
		 * **/
		if(err){
			res.writeHeader(404,{
				'content-type' : 'text/html;charset="utf-8"'
			});
			res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
			res.end();
		} else {
			const urlPointList = req.url.split('.');
			const requestType = urlPointList.length > 0 ? urlPointList[urlPointList.length - 1] : 'unKnow';
			const contentType = mime[requestType] || 'unKnow';
			res.writeHeader(200,{
				'content-type' : contentType
			});
			res.write(data);
			res.end();
		}
	});
}).listen(3000);

console.log('服务器开启成功');
console.log('访问地址：http://localhost:3000/index.html');
