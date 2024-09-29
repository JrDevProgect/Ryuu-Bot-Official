const { convertToGothic } = require('../utils/fontUtils');

module.exports = {
    name: 'join',
    description: 'Sends a greeting message to new users who join the group',
    async handle(api, event) {
        try {
            if (event.logMessageType === 'log:subscribe' && event.logMessageData.addedParticipants.length > 0) {
                const addedParticipants = event.logMessageData.addedParticipants;

                for (const participant of addedParticipants) {
                    const userName = participant.fullName || 'New User';
                    const greetingMessage = convertToGothic(`Welcome to the group, ${userName}! We're happy to have you here. 😊`);

                    await api.sendMessage(greetingMessage, event.threadID);
                }
            }
        } catch (error) {
            console.error('Error handling new user join event:', error);
        }
    }
};
