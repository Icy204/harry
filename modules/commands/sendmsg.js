module.exports.config = {
	name: "sendmsg",
	version: "1",
	hasPermssion: 2,
	credits: "QuangKhoongGay",
	description: "sendmsg",
	commandCategory: "admin",
	usages: "sendmsg [user]/[thread] id text",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, utils }) {
    const moment = require("moment-timezone");

    var msg = args.splice(2).join(" ");
    if (args[0]=='user') {
        return api.sendMessage(`Admin đã nhắn đến bạn !!!\nNội dung: ` + msg, args[1]).then(
            api.sendMessage('Đã gửi tin nhắn đến thành viên ' + args[1] + ' thành công', event.threadID, event.messageID));
    } else {
            if (args[0]=='thread') { return api.sendMessage(`Thông báo từ admin\nNội dung: ` + msg, args[1]).then(
            api.sendMessage('Đã gửi tin nhắn đến nhóm ' + args[1] + ' thành công', event.threadID, event.messageID))
            }
                else return utils.throwError("sendmsg", event.threadID, event.messageID);
        }
    }
