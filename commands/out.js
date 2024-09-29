module.exports = {
    name: 'out',
    description: 'oten kaba?',
    prefixRequired: false,
    adminOnly: true,
    execute: async (api, event, args) => {
        try {
            const threadID = event.threadID;
            await api.removeUserFromGroup(api.getCurrentUserID(), threadID);
            console.log(`Bot has left the group with ID: ${threadID}`);
        } catch (error) {
            console.error(`Failed to leave the group: ${error.message}`);
        }
    }
};