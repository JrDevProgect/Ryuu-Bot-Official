const axios = require('axios');

module.exports = {
    name: "baybayin",
    description: "Translate text to Baybayin.",
    prefixRequired: false,
    adminOnly: false,
    async execute(api, event, args) {
        const { threadID, messageID } = event;
        const query = args.join(" ");

        if (!query) {
            return api.sendMessage(global.convertToGothic("Please provide text to translate."), threadID, messageID);
        }

        try {
            const response = await axios.get(`https://deku-rest-api.gleeze.com/api/baybay?q=${encodeURIComponent(query)}`);
            const { result } = response.data;

            await api.sendMessage(global.convertToGothic(`Translation: ${result}`), threadID, messageID);
        } catch (error) {
            await api.sendMessage(global.convertToGothic("Failed to fetch translation."), threadID, messageID);
        }
    },
};