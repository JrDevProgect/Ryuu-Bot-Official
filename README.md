
---

# Ryuu Bot 🤖<sub><sub>Template for Facebook Bots</sub></sub>

<p align="center">
	<a href="https://nodejs.org/dist/v16.20.0">
		<img src="https://img.shields.io/badge/Nodejs%20Support-18.x-brightgreen.svg?style=flat-square" alt="Nodejs Support v18.x">
	</a>
  	<img alt="Size" src="https://img.shields.io/github/repo-size/JrDevProgect/Ryuu-Bot-Official.svg?style=flat-square&label=size">
  	<img alt="Version" src="https://img.shields.io/badge/dynamic/json?color=brightgreen&label=code%20version&prefix=v&query=%24.version&url=https://github.com/JrDevProgect/Ryuu-Bot-Official/raw/main/package.json&style=flat-square">
  	<img alt="Visitors" src="https://visitor-badge.laobi.icu/badge?style=flat-square&page_id=JrDevProgect.RyuuBot">
</p>

### ABOUT

Welcome to the **Ryuu Bot** template! This project serves as a foundation for creating Facebook bots with a range of features, including auto-posting and customizable commands. Follow this guide to get started with your bot!

---

## TABLE OF CONTENTS

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Configuration](#configuration)
4. [Command Structure](#command-structure)
5. [Event Structure](#event-structure)
6. [How to Run the Bot](#how-to-run-the-bot)
7. [Troubleshooting](#troubleshooting)
8. [Credits](#credits)
9. [License](#license)

---

## FEATURES

- **Auto-Post**: Automatically posts random pick-up lines.
- **Customizable Commands**: Easily add and modify commands to fit your needs.
- **Auto-Greet**: Sends greet message every morning,afternoon and night.
- **Prefix Support**: Use commands with or without a prefix.

---

## GETTING STARTED

1. **Clone the Repository**: Clone or fork the repository to your local machine or Replit.
   ```bash
   git clone https://github.com/JrDevProgect/Ryuu-Bot-Official.git
   cd Ryuu-Bot-Official
   ```

2. **Set Up Dependencies**: Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Create Facebook App**: Set up a Facebook App to get the necessary credentials to run the bot.

---

## CONFIGURATION

1. **Edit `config.json`**: Open the `config.json` file and customize the following settings:
   ```json
   {
       "prefix": "/",
       "owner": "Owner Name",
       "botname": "Ryuu Bot",
       "apiOptions": {
           "forceLogin": false,
           "logLevel": "silent",
           "selfListen": false,
           "autoReconnect": false,
           "updatePresence": false,
           "userAgent": "Your User Agent",
           "autoMarkDelivery": false,
           "autoMarkRead": false,
           "online": false,
           "listenEvents": true
       },
       "adminBot": [
           "Admin UID"
       ],
       "autoLoad": true,
       "autopost": true,
       "autogreet": true,
       "proxy": "Your Proxy"
   }
   ```
   - **prefix**: Command prefix for the bot (default is `/`).
   - **owner**: Your name or identifier.
   - **botname**: The name of your bot.
   - **apiOptions**: Configure API options for your bot's behavior.
   - **adminBot**: List of admin user IDs for elevated command permissions.

---

## COMMAND STRUCTURE

Each command should follow this structure. Create a new command file in the `commands` directory:

```javascript
module.exports = {
    name: "commandName",
    description: "Description of the command.",
    prefixRequired: false, // Indicates if the command requires a prefix
    adminOnly: false, // Indicates if the command is admin-only
    async execute(api, event, args) {
        // Your command logic here
    },
};
```

**Example Command: Ping**

```javascript
module.exports = {
    name: "ping",
    description: "Check latency.",
    prefixRequired: false,
    adminOnly: false,
    async execute(api, event, args) {
        const { threadID, messageID } = event;
        const sentMessage = await api.sendMessage("Calculating ping, please wait...", threadID, messageID);
        const startTime = Date.now();
        const latency = Date.now() - startTime;
        await api.editMessage(`Ping: ${latency}ms`, sentMessage.messageID);
    },
};
```

---

## EVENT STRUCTURE

Event handling should follow this structure. Create a new event file in the `events` directory:

```javascript
module.exports = {
    name: 'eventName',
    description: 'Description of the event.',
    async handle(api, event) {
        // Your event handling logic here
    },
};
```

**Example Event: Join**

```javascript
module.exports = {
    name: 'join',
    description: 'Handles new user joins.',
    async handle(api, event) {
        if (event.logMessageType === 'log:subscribe') {
            const addedParticipants = event.logMessageData.addedParticipants;
            for (const participant of addedParticipants) {
                const userName = participant.fullName || 'New User';
                await api.sendMessage(`Welcome to the group, ${userName}! We're happy to have you here.`, event.threadID);
            }
        }
    },
};
```

---

## HOW TO RUN THE BOT

1. **Login to Facebook**: Make sure you're logged into the Facebook account you want to use for the bot.
2. **Get Appstate**: Use a tool like [C3C fbstate](https://github.com/c3cbot/c3c-fbstate/archive/refs/tags/1.5.zip) to obtain your `appstate.json`.
3. **Run the Bot**: Start the bot using:
   ```bash
   node index.js
   ```
4. **Monitor Console**: Watch the console for messages indicating the bot's status.

---

## TROUBLESHOOTING

- **Bot Not Responding**: Ensure your Facebook account is not restricted and that the appstate is correct.
- **Error Messages**: Check console logs for any error messages that can help diagnose issues.

---

## CREDITS

Developed by [Jr Busaco](https://www.facebook.com/profile.php?id=100091592152325). Special thanks to all contributors and the community for their support.

---

## LICENSE

This project is open source and available for modification and distribution.

---

_Updated on: September 29, 2024_

---
