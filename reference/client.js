// Code was originally written by thoratica
// remote-kakao's GitHub - https://github.com/remote-kakao
// thoratica's GitHub - https://github.com/thoratica
"use strict";
var config = {
	address: "127.0.0.1", // External IP address of the Node.js server
	port: 3000,
};
var socket = new java.net.DatagramSocket();
var address = java.net.InetAddress.getByName(config.address);
var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 65535);
var generateId = function (len) {
	var result = "";
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var _ = 0; _ < len; _++)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};
var getBytes = function (str) {
	return new java.lang.String(str).getBytes();
};
var inPacket = new java.net.DatagramPacket(buffer, buffer.length);
var sendMessage = function (event, data) {
	var bytes = getBytes(JSON.stringify({ event: event, data: data }));
	var outPacket = new java.net.DatagramPacket(
		bytes,
		bytes.length,
		address,
		config.port
	);
	socket.send(outPacket);
};
var sendReply = function (session, success, data) {
	var bytes = getBytes(
		JSON.stringify({ session: session, success: success, data: data })
	);
	var outPacket = new java.net.DatagramPacket(
		bytes,
		bytes.length,
		address,
		config.port
	);
	socket.send(outPacket);
};
var handleMessage = function (msg) {
	var _a;
	var _b = JSON.parse(decodeURIComponent(msg)),
		event = _b.event,
		data = _b.data,
		session = _b.session;
	switch (event) {
		case "sendText":
			var res = Api.replyRoom(
				data.room,
				((_a = data.text) !== null && _a !== void 0 ? _a : "").toString()
			);
			sendReply(session, res);
			break;
	}
};
var send = function (msg) {
	sendMessage("chat", {
		room: msg.room,
		content: msg.msg,
		sender: msg.sender,
		isGroupChat: msg.isGroupChat,
		profileImage: msg.imageDB.getProfileBase64(),
		packageName: msg.packageName,
	});
};
var response = function (
	room,
	msg,
	sender,
	isGroupChat,
	_,
	imageDB,
	packageName
) {
	return send({
		room: room,
		msg: msg,
		sender: sender,
		isGroupChat: isGroupChat,
		imageDB: imageDB,
		packageName: packageName,
	});
};
// @ts-ignore
var thread = new java.lang.Thread({
	run: function () {
		while (true) {
			socket.receive(inPacket);
			handleMessage(
				String(
					new java.lang.String(
						inPacket.getData(),
						inPacket.getOffset(),
						inPacket.getLength()
					)
				)
			);
		}
	},
});
var onStartCompile = function () {
	return thread.interrupt();
};
thread.start();
