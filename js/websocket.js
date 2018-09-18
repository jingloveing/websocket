var username, socket;

function connect() {
	username = document.getElementById("num").value;
	var ip = "106.14.3.202";
	var port = 8888;
	var password = "123";
	socket = new WebSocket("ws:" + ip + ":" + port + "?username=" + username + "&password=" + password);
	socket.onopen = function(e) {
		console.log("登陆成功");
		var userCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\"" + username + "\"}";
		socket.send(userCmd); //获取登录用户信息;
	};
	socket.onerror = function(e) {
		console.log("登录异常");
	};
    socket.onclose = function()
    {
        // 关闭 websocket
       console.log("连接已关闭...");
    };
	socket.onmessage = function(e){
		var data = eval("("+e.data+")");
		var contentdata = eval("("+data.data+")");
		//接收消息触发
		if(data.command == "COMMAND_CHAT_RESP" & contentdata.from != username){
			console.log("接收成功");
			document.getElementById("liao").innerHTML += " <br/><div><div class='headimg'></div><div class='aaa'>"+contentdata.content+"</div></div>";
		}
	}

}

var onSelected;

function send() {
	var toId = "";
	if(onSelected) {
		toId = "1876887572210";
	}
	var createTime = new Date().getTime();
	var content = document.getElementById('content').value;
	if(content == "")
		return;
	var msg = "{\"from\": \""+username+"\",\"createTime\":"+createTime+",\"cmd\":11,\"group_id\":\"100\",\"chatType\":\"1\",\"msgType\":\"text\",\"content\": \""+content+"\"}";
	socket.send(msg);
	var chatObj = eval("(" + msg + ")");
	document.getElementById("liao").innerHTML += " <br/><div style='float: right;'><div class='bbb' id='me'>"+chatObj.content+"</div><div class='headimg'></div></div>";
	var createTime = "2017-10-20";
	document.getElementById('content').value = "";
}








//
// var lockReconnect = false;//避免重复连接
// // var wsUrl = "wss://echo.websocket.org";
// var ws;
// var tt;
// function createWebSocket() {
//     try {
//         console.log('进入')
//         username = document.getElementById("num").value;
//         var ip = "106.14.3.202";
//         var port = 8888;
//         var password = "123";
//         ws = new WebSocket("ws:" + ip + ":" + port + "?username=" + username + "&password=" + password);
//         cosnole.log(ws)
//         init();
//     } catch(e) {
//         console.log('catch');
//         reconnect();
//     }
// }
// function init() {
//     ws.onclose = function () {
//         console.log('链接关闭');
//         reconnect();
//     };
//     ws.onerror = function() {
//         console.log('发生异常了');
//         reconnect();
//     };
//     ws.onopen = function () {
//         //心跳检测重置
//         heartCheck.start();
//         var userCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\"" + username + "\"}";
//         ws.send(userCmd); //获取登录用户信息;
//
//
//     };
//     ws.onmessage = function (event) {
//         //拿到任何消息都说明当前连接是正常的
//         console.log('接收到消息');
//         heartCheck.start();
//         var data = eval("("+e.data+")");
//         var contentdata = eval("("+data.data+")");
//         //接收消息触发
//         if(data.command == "COMMAND_CHAT_RESP" & contentdata.from != username){
//             console.log("接收成功");
//             document.getElementById("liao").innerHTML += " <br/><div><div class='headimg'></div><div class='aaa'>"+contentdata.content+"</div></div>";
//         }
//     }
// }
// function reconnect() {
//     if(lockReconnect) {
//         return;
//     };
//     lockReconnect = true;
//     //没连接上会一直重连，设置延迟避免请求过多
//     tt && clearTimeout(tt);
//     tt = setTimeout(function () {
//         createWebSocket();
//         lockReconnect = false;
//     }, 4000);
// }
// //心跳检测
// var heartCheck = {
//     timeout: 3000,
//     timeoutObj: null,
//     serverTimeoutObj: null,
//     start: function(){
//         console.log('start');
//         var self = this;
//         this.timeoutObj && clearTimeout(this.timeoutObj);
//         this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
//         this.timeoutObj = setTimeout(function(){
//             //这里发送一个心跳，后端收到后，返回一个心跳消息，
//             console.log('55555');
//             ws.send("123456789");
//             self.serverTimeoutObj = setTimeout(function() {
//                 console.log(111);
//                 console.log(ws);
//                 ws.close();
//                 // createWebSocket();
//             }, self.timeout);
//
//         }, this.timeout)
//     }
// }
// // createWebSocket(wsUrl);
//
// var onSelected;
//
// function send() {
//     var toId = "";
//     if(onSelected) {
//         toId = "1876887572210";
//     }
//     var createTime = new Date().getTime();
//     var content = document.getElementById('content').value;
//     if(content == "")
//         return;
//     var msg = "{\"from\": \""+username+"\",\"createTime\":"+createTime+",\"cmd\":11,\"group_id\":\"100\",\"chatType\":\"1\",\"msgType\":\"text\",\"content\": \""+content+"\"}";
//     console.log(msg)
//     // console.log(ws)
//     ws.send(msg);
//     var chatObj = eval("(" + msg + ")");
//     document.getElementById("liao").innerHTML += " <br/><div style='float: right;'><div class='bbb' id='me'>"+chatObj.content+"</div><div class='headimg'></div></div>";
//     var createTime = "2017-10-20";
//     document.getElementById('content').value = "";
// }