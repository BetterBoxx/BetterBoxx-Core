import * as dotenv from "dotenv";
import { Server } from "@remote-kakao/core";
import https from "follow-redirects/https.js";

dotenv.config({ path: "./.env" });
console.log(process.env.OPENAI_API);
const server = new Server({ useKakaoLink: false });

const options = {
	method: "POST",
	hostname: "api.openai.com",
	path: "/v1/chat/completions",
	headers: {
		"Content-Type": "application/json",
		Authorization: process.env.OPENAI_API,
	},
	maxRedirects: 20,
};

server.on("message", async (msg) => {
	console.log("[" + msg.room + "] " + msg.sender.name + " : " + msg.content);

	const prefix = ">";
	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.split(" ");
	const cmd = args.shift()?.slice(prefix.length);

	switch (cmd) {
		case "ping": // not accurate
			const timestamp = Date.now();
			msg.replyText(`${Date.now() - timestamp}ms, pong!`);
			break;
		case ">":
			const allMsg = msg.content.slice(2);
			var req = https.request(options, function (res) {
				var chunks = [];

				res.on("data", function (chunk) {
					chunks.push(chunk);
				});

				res.on("end", function (chunk) {
					var body = Buffer.concat(chunks);
					let resExtract = JSON.parse(body.toString());
					//   For debugging
					//   console.log(resExtract);
					console.log("ChatGPT : " + resExtract.choices[0].message.content.trim());
					msg.replyText(resExtract.choices[0].message.content.trim());
				});

				res.on("error", function (error) {
					console.error(error);
				});
			});

			var postData = JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content: allMsg,
					},
				],
				temperature: 0.7,
			});

			req.write(postData);

			req.end();

			break;
	}
});

server.start(3000);
