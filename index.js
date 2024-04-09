import * as dotenv from "dotenv";
import { Server } from "@remote-kakao/core";
import { openAIChat } from "./plugins/openai-gpt/index.js"; // Importing openAIChat from openai-gpt.js
import { processKeyword } from "./plugins/keyword-manager/index.js"; // Importing keywordManager from keyword-manager.js
import { discordReceive } from "./plugins/discord-bridge/index.js"; // Importing discordBridge from discord-bridge.js


dotenv.config({ path: "./.env" });
const server = new Server({ useKakaoLink: false });

// Handle incoming messages
server.on("message", async (msg) => {
	console.log("[" + msg.room + "] " + msg.sender.name + " : " + msg.content);
	
	function processMessage(msg) {
		// NOTE: Add more features here
		// openAIChat(msg);
		scvaiChat(msg);
		processKeyword(msg);
		// discordReceive(msg);
	}

	const useAuth = process.env.USE_AUTH.toUpperCase();
	const authRoom = process.env.AUTH_ROOM.split(",");

	if (useAuth == "TRUE" && authRoom.includes(msg.room)) {
		processMessage(msg);

		if (msg.content.startsWith("/?")) {
			msg.reply(process.env.MSG_HELP);
		} else if (msg.content.toLowerCase().startsWith("ping!")) {
			msg.reply("Pong!");
		}
	} else if (useAuth == "FALSE") {
		processMessage(msg);

		if (msg.content.startsWith("/?")) {
			msg.reply(process.env.MSG_HELP);
		} else if (msg.content.toLowerCase().startsWith("ping!")) {
			msg.reply("Pong!");
		}
	}
});

server.start(process.env.PORT || 3000);
console.log("Server is running on port " + (process.env.PORT || 3000));
