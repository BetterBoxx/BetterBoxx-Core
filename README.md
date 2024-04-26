# BetterWagon - Chatbot powered by Node.js and OpenAI

This is a simple chatbot application that uses the OpenAI API to generate responses to user inputs. The code is written in Node.js 18 or higher and relies on the [`@remote-kakao/core`](https://github.com/remote-kakao/core) package for its messaging functionality.

This bot also supports plugins via the /plugins directory, allowing users to extend its functionality by adding custom features and integrations. Developers can easily create new plugins and enhance the chatbot's capabilities to suit their specific needs.

This repository hosts both server and client codes. The document below explains configuring server-end of the project. Pasting `reference/client.js` into [Messenger Bot R](https://play.google.com/store/apps/details?id=com.xfl.msgbot&hl=ko&gl=US) should make the client work out of the box.

# Getting Started

To get started with this project, first, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/shanefully-done/BetterWagon.git
```

After cloning the repository, navigate to the project directory and install the required dependencies using `npm`.

```bash
cd BetterWagon
npm install
```

## Configuration

Before running the chatbot, you will need to configure the environment variables. Rename the `.env.example` file to `.env` and replace the value of `OPENAI_API` with your OpenAI API key. Optionally, you can also set your desired port to expose in the same file.

```
OPENAI_API=YOUR_API_KEY
PORT=YOUR_PORT #optional
```

You can also configure authentication for each room by setting `USE_AUTH` to `TRUE` and `AUTH_ROOM` to the room ID you want to authenticate.

```
USE_AUTH=TRUE #or FALSE
AUTH_ROOM=YOUR_ROOM_ID,SECOND_ROOM,THIRD,SO_FORTH
```

<<<<<<< HEAD
To enhance security, it is advised to rename room names with random strings on your device while using the KakaoSCV client to serve as a secret key.
=======
To enhance security, it is advised to rename room names with random strings on your device while using the BetterWagon client to serve as a secret key.
>>>>>>> prod

## Usage

To start the chatbot, run the following command in your terminal:

```bash
npm start
```

The chatbot will log your OpenAI API to console and start listening on the port specified in the `.env` file or default to port 3000.

## Functionality

The chatbot responds to messages that begin with the `>` character. The chatbot responds to the `>ping` command with a "Pong!" message.

Additionally, attaching messages following `>>` will pass the message to OpenAI gpt-3.5-turbo API, replying to the chat with an AI generated response. Be sure to put a space after `>>` to ensure the command is working.

## Conclusion

This is a simple example of a chatbot application that uses the OpenAI API to generate responses. The code can be modified to include more complex functionality, and the messaging functionality can be swapped out for other messaging platforms as needed.

# Using Android as a server

KKS has written a great guide on doing this on Android using Termux. [Link to the guide](https://iris-kilometer-f84.notion.site/readme-43ed9bb956ae44e4824105087c83a1f5)

"If you think you screwed up somewhere, it's better to start over." - KKS

If the link above is broken, refer to archived page. [Link to the archived guide](https://web.archive.org/web/20240319035753/https://iris-kilometer-f84.notion.site/readme-43ed9bb956ae44e4824105087c83a1f5)

# Developing Plugins

To develop a plugin for BetterWagon, follow these steps:

1. **Create a new directory for your plugin**: In the `plugins` folder, create a new directory named after your plugin.

2. **Create a new JavaScript file**: Inside your plugin directory, create a JavaScript file with the same name as your plugin.

3. **Define your plugin**: Define your plugin as an object in your JavaScript file. It should have properties like `name`, `version`, `onLoad`, and `onMessage`.

Use the `openai-gpt` plugin, which is included in this repository, as an example to understand the structure and functionality of a plugin.

# Credits

This project uses code from [remote-kakao](https://github.com/remote-kakao) by thoratica (MIT License).

I would like to express my gratitude to the developers of these projects for their valuable contributions to the open-source community.

# License

This project is licensed under the MIT License - see the LICENSE file for details. You are free to use, modify, and distribute this code as you see fit.
