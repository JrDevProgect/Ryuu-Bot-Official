const os = require('os');

const gothicFont = {
  A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱",
  S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹", 
  a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",
  j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",
  s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
  0: "𝟢", 1: "𝟣", 2: "𝟤", 3: "𝟥", 4: "𝟦", 5: "𝟧", 6: "𝟨", 7: "𝟩", 8: "𝟪", 9: "𝟫"
};

const applyGothicFont = (text) => {
    return text.split('').map(char => gothicFont[char] || char).join('');
};

const formatUptime = (uptime) => {
    const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
    uptime %= 24 * 60 * 60 * 1000;
    const hours = Math.floor(uptime / (60 * 60 * 1000));
    uptime %= 60 * 60 * 1000;
    const minutes = Math.floor(uptime / (60 * 1000));
    uptime %= 60 * 1000;
    const seconds = Math.floor(uptime / 1000);

    return `${days}day(s) ${hours}hour(s) ${minutes}minute(s) ${seconds} second(s)`;
};

const getSystemStats = () => {
    const cpuUsage = (process.cpuUsage().user / 1000000).toFixed(1) + '%';
    const totalMemory = 150;
    const memoryUsage = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2) + ' MB';
    const cores = os.cpus().length;
    const platform = os.platform();
    const arch = os.arch();
    const ping = '1ms';

    return {
        cpuUsage,
        memoryUsage,
        totalMemory: `${totalMemory} GB`,
        cores,
        platform,
        arch,
        ping,
    };
};

module.exports = {
    name: "uptime",
    description: "information and uptime.",
    prefixRequired: false,
    adminOnly: false,
    async execute(api, event, args) {
        const uptime = process.uptime() * 1000;
        const formattedUptime = formatUptime(uptime);

        const { cpuUsage, memoryUsage, totalMemory, cores, platform, arch, ping } = getSystemStats();

        const uptimeMessage = `
${applyGothicFont('Running for')} ${applyGothicFont(formattedUptime)}.

❖ ${applyGothicFont('Cpu usage:')} ${applyGothicFont(cpuUsage)}
❖ ${applyGothicFont('Ram usage:')} ${applyGothicFont(memoryUsage)} / ${applyGothicFont(totalMemory)}
❖ ${applyGothicFont('Cores:')} ${applyGothicFont(cores.toString())}
❖ ${applyGothicFont('Ping:')} ${applyGothicFont(ping)}
❖ ${applyGothicFont('Operating System Platform:')} ${applyGothicFont(platform)}
❖ ${applyGothicFont('System CPU Architecture:')} ${applyGothicFont(arch)}
`;

        await api.sendMessage(uptimeMessage, event.threadID, event.messageID);
    },
};