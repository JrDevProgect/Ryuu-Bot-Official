module.exports = {
    name: "help",
    description: "Lists all available commands.",
    prefixRequired: true,
    adminOnly: false,
    async execute(api, event, args, commands) {
        const { threadID, messageID } = event;

        let helpMessage = `📜 | ${global.convertToGothic('Command List')}\n\n`;

        let commandList = Array.from(commands.keys()).map((name, index) => {
            return `${index + 1}. ${global.convertToGothic(name)}`;
        }).join('\n');

        helpMessage += commandList + `\n\n`;
        helpMessage += `Total Commands: [ ${commands.size} ]\n`;
        helpMessage += `Prefix: [ ${global.convertToGothic(global.config.prefix)} ]\n`;
        helpMessage += `Created By: ${global.convertToGothic(global.owner || 'Unknown')}\n`;

        await api.sendMessage(helpMessage, threadID, messageID);
    },
};
