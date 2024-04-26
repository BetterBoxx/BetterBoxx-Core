import * as dotenv from "dotenv";
import https from "follow-redirects/https.js";

dotenv.config({ path: "./.env" });

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

const prefixGPT = process.env.GPT_PREFIX;

export function openAIChat(msg) {
	if (msg.content.startsWith(prefixGPT)) {
		const allMsg = msg.content.slice(prefixGPT.length);
		var req = https.request(options, function (res) {
			var chunks = [];

			res.on("data", function (chunk) {
				chunks.push(chunk);
			});

			res.on("end", function (chunk) {
				var body = Buffer.concat(chunks);
				let resExtract = JSON.parse(body.toString());
				msg.reply(resExtract.choices[0].message.content.trim());
				return;
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
			user: msg.sender.name,
		});

		req.write(postData);

		req.end();
	}
}
