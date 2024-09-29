const axios = require('axios');

module.exports = {
    name: "bible",
    description: "Send a random Bible verse",
    prefixRequired: false,
    adminOnly: false,
    async execute(api, event, args) {
        const { threadID, messageID } = event;

        try {
            const response = await axios.get('https://bible-api.com/?random=verse');

            if (response.data && response.data.reference && response.data.text) {
                const verse = response.data;
                const message = `${verse.reference}:\n\n${verse.text}\n\nTranslation: ${verse.translation_name}`;

                await api.sendMessage(global.convertToGothic(message), threadID, messageID);
            } else {
                await api.sendMessage(global.convertToGothic("Failed to fetch a Bible verse. Please try again."), threadID, messageID);
            }
        } catch (error) {
            console.error(error);
            await api.sendMessage(global.convertToGothic("An error occurred while fetching the Bible verse."), threadID, messageID);
        }
    }
};
