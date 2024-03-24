import * as dotenv from "dotenv";
import { Server } from "@remote-kakao/core";
import { openAIChat } from "./plugins/openai-gpt/index.js"; // Importing openAIChat from openai-gpt.js

dotenv.config({ path: "./.env" });
const server = new Server({ useKakaoLink: false });

// Handle incoming messages
server.on("message", async (msg) => {
	function processMessage(msg) {
		// console.log("[" + msg.room + "] " + msg.sender.name + " : " + msg.content);
		// NOTE: Add more features here
		openAIChat(msg);
	}

	const useAuth = process.env.USE_AUTH.toUpperCase();
	const authRoom = process.env.AUTH_ROOM.split(",");

	if (useAuth == "TRUE" && authRoom.includes(msg.room)) {
		processMessage(msg);
	} else if (useAuth == "FALSE") {
		processMessage(msg);
	}

	// Parse ping request
	if (msg.content.toLowerCase().startsWith("ping!")) {
		msg.replyText("Pong!");
	}
});

server.start(process.env.PORT || 3000);
console.log("Server is running on port " + (process.env.PORT || 3000));

