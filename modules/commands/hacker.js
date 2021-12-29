module.exports.config = {
	name: "hacker",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Gin",
	description: "art mặt hacker",
	commandCategory: "art",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 10
	}
};

module.exports.run = function ({ api, event, args, getText }) {
    const data = ["▇◤▔▔▔▔▔▔▔◥▇\n▇▏◥▇◣┊◢▇◤▕▇\n▇▏▃▆▅▎▅▆▃▕▇\n▇▏╱▔▕▎▔▔╲▕▇\n▇◣◣▃▅▎▅▃◢◢▇\n▇▇◣◥▅▅▅◤◢▇▇\n▇▇▇◣╲▇╱◢▇▇▇"
    ];
 return api.sendMessage(`${data[Math.floor(Math.random() * data.length)]}`, event.threadID, event.messageID);
 return api.sendMessage(msg + getText("hacker", commands.size, prefix), threadID, async (error, info) =>{
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
}