const { chatbox } = require('chatbox-dev-ai');

module.exports = {
    name: "blackbox",
    description: "Interact with the Blackbox AI.",
    prefixRequired: true,
    adminOnly: false,
    async execute(api, event, args) {
        const { threadID, messageID, senderID } = event;

        if (!args.length) {
            return api.sendMessage("Please provide a query for the Blackbox AI.", threadID, messageID);
        }

        const query = args.join(" ");
        try {
            const response = await chatbox(senderID, query); 
            await api.sendMessage(response, threadID, messageID);
        } catch (error) {
            await api.sendMessage("Error interacting with Blackbox AI. Please try again later.", threadID, messageID);
        }
    }
};
