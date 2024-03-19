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

	switch (true) {
		case msg.content.startsWith(">>"):
			const allMsg = msg.content.slice(2);
			const req = https.request(options, (res) => {
				const chunks = [];

				res.on("data", (chunk) => {
					chunks.push(chunk);
				});

				res.on("end", () => {
					const body = Buffer.concat(chunks);
					const resExtract = JSON.parse(body.toString());
					console.log("ChatGPT : " + resExtract.choices[0].message.content.trim());
					msg.replyText(resExtract.choices[0].message.content.trim());
				});

				res.on("error", (error) => {
					console.error(error);
				});
			});

			const postData = JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content: allMsg,
					},
				],
				temperature: 0.7,
				user: msg.sender.name,
			});

			req.write(postData);
			req.end();
			break;
		case msg.content.startsWith(">ping"):
			msg.replyText("Pong!");
			break;
		default:
			return;
	}
});

server.start(process.env.PORT || 3000);
