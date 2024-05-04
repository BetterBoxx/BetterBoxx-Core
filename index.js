import * as dotenv from "dotenv";
import { Server } from "@remote-kakao/core";
import { openAIChat } from "./plugins/openai-gpt/index.js"; // Importing openAIChat from openai-gpt.js
import { processKeyword } from "./plugins/keyword-manager/index.js"; // Importing keywordManager from keyword-manager.js
import { randomFood } from "./plugins/random-food/index.js";
import { chatLogger, chatSummary } from "./plugins/chat-summary/index.js";

dotenv.config({ path: "./.env" });
const server = new Server({ useKakaoLink: false });

// Handle incoming messages
server.on("message", async (msg) => {
	// console.log("[" + msg.room + "] " + msg.sender.name + " : " + msg.content);

	function processMessage(msg) {
		// NOTE: Add more features here
		openAIChat(msg);
		processKeyword(msg);
		randomFood(msg);
		chatLogger(msg);
		chatSummary(msg);
	}

	const useAuth = process.env.USE_AUTH.toUpperCase();
	const authRoom = process.env.AUTH_ROOM.split(",");

	function defaultMessages() {
		switch (true) {
			// START: Help messages for keyword-manager
			case msg.content.startsWith("/? " + process.env.MSG_HELP_SUMMARY):
				msg.reply(process.env.MSG_HELP_SUMMARY_EXP);
				break;
			case msg.content.startsWith("/? " + process.env.MSG_HELP_ADD):
				msg.reply(process.env.MSG_HELP_KEYWORD_ADD);
				break;
			case msg.content.startsWith("/? " + process.env.MSG_HELP_EDIT):
				msg.reply(process.env.MSG_HELP_KEYWORD_EDIT);
				break;
			case msg.content.startsWith("/? " + process.env.MSG_HELP_REMOVE):
				msg.reply(process.env.MSG_HELP_KEYWORD_REMOVE);
				break;
			case msg.content.startsWith("/? " + process.env.MSG_HELP_LIST):
				msg.reply(process.env.MSG_HELP_KEYWORD_LIST);
				break;
			case msg.content.startsWith("/?"):
				msg.reply(process.env.MSG_HELP);
				console.log("/? " + process.env.MSG_HELP_ADD);
				break;
			// END: Help messages for keyword-manager
			case msg.content.toLowerCase().startsWith("ping!"):
				msg.reply("Pong!");
				break;
			case msg.content === "야!":
				const replies = [
					"sp?",
					"sp",
					"네?",
					"네",
					"무엇을 도와드릴까요?",
					"바쁜데",
					"아",
					"왜요",
					"잠시만 뒤에 다시 불러주실래요?",
					"사랑해",
				];
				msg.reply(replies[Math.floor(Math.random() * replies.length)]);
				break;
		}
	}

	if (useAuth == "TRUE" && authRoom.includes(msg.room)) {
		processMessage(msg);
		defaultMessages(msg);
	} else if (useAuth == "FALSE") {
		processMessage(msg);
		defaultMessages(msg);
	}
});

server.start(process.env.PORT || 3000);
console.log("Server is running on port " + (process.env.PORT || 3000));
