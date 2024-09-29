const axios = require('axios');

module.exports = {
    name: "rizz",
    description: "Sends a random rizz line",
    prefixRequired: false,
    adminOnly: false,
    async execute(api, event) {
        try {
            const { data: { pickupline } } = await axios.get('https://api.popcat.xyz/pickuplines');
            await api.sendMessage(global.convertToGothic(`"${pickupline}"`), event.threadID, event.messageID);
        } catch (error) {
            console.error('Error fetching pickup line:', error);
            await api.sendMessage(global.convertToGothic('Sorry, something went wrong while fetching a pickup line. Please try again later.'), event.threadID, event.messageID);
        }
    },
};
