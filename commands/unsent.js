module.exports = {
    name: "unsent",
    description: "Unsend a replied message.",
    prefixRequired: false,
    adminOnly: false,
    
    async execute(api, event, args, getText) {
        if (!event.messageReply) {
            return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
        }

        if (event.messageReply.senderID !== api.getCurrentUserID()) {
            return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
        }

        try {
            await api.unsendMessage(event.messageReply.messageID);
            api.sendMessage(getText("messageUnsent"), event.threadID); 
        } catch (error) {
            console.error("Error unsending message:", error);
            api.sendMessage(getText("errorUnsend"), event.threadID); 
        }
    },
};
