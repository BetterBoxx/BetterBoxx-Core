import * as dotenv from "dotenv";
import { Server } from "@remote-kakao/core";
import { openAIChat } from "./plugins/openai-gpt.js"; // Importing openAIChat from openai-gpt.js

dotenv.config({ path: "./.env" });
console.log(process.env.OPENAI_API);
const server = new Server({ useKakaoLink: false });

// Handle incoming messages
server.on("message", async (msg) => {
	const authRoom = process.env.AUTH_ROOM.split(",");										// Authorise the room first
	if (authRoom.includes(msg.room)) {
		// console.log("[" + msg.room + "] " + msg.sender.name + " : " + msg.content);
		// Add features for all authorised rooms
		openAIChat(msg); // Using openAIChat from openai-gpt.js
	}

	// Parse ping request
	if (msg.content.toLowerCase().startsWith("ping!")) {
		msg.replyText("Pong!");
	}
});

server.start(process.env.PORT || 3000);
