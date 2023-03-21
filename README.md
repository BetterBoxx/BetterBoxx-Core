# KakaoSCV - Chatbot powered by Node.js and OpenAI

This is a simple chatbot application that uses the OpenAI API to generate responses to user inputs. The code is written in Node.js 18 or higher and relies on the [`@remote-kakao/core`](https://github.com/remote-kakao/core) package for its messaging functionality.

This repository hosts both server and client codes. The document below explains configuring server-end of the project. Pasting `reference/client.js` into [Messenger Bot R](https://play.google.com/store/apps/details?id=com.xfl.msgbot&hl=ko&gl=US) should make the client work out of the box.

# Getting Started

To get started with this project, first, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/RixxLx/KakaoSCV.git
```

After cloning the repository, navigate to the project directory and install the required dependencies using `npm`.

```bash
cd KakaoSCV
npm install
```

## Configuration

Before running the chatbot, you will need to configure the environment variables. Rename the `.env.example` file to `.env` and replace the value of `OPENAI_API` with your OpenAI API key. Optionally, you can also set your desired port to expose in the same file.

```
OPENAI_API=YOUR_API_KEY
PORT=YOUR_PORT #optional
```

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

# Credits
This project uses code from [remote-kakao](https://github.com/remote-kakao) by thoratica.

I would like to express our gratitude to the developer of these projects for their valuable contributions to the open-source community.

# License

This project is licensed under the MIT License - see the LICENSE file for details. You are free to use, modify, and distribute this code as you see fit.
