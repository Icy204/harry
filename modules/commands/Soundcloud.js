module.exports.config = {
	name: "soudcloud",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "Unifalo",
	description: "Phát nhạc thông qua link Soundcloud hoặc từ khoá tìm kiếm",
	commandCategory: "media",
	usages: "[link or content need search]",
	cooldowns: 10,
	dependencies: {
		"axios": "",
		"fs-extra": ""
	}
};

module.exports.languages = {
	"vi": {
		"overSizeAllow": "Không thể gửi file vì dung lượng lớn hơn 25MB.",
		"returnError": "Đã xảy ra vấn đề khi đang xử lý request, lỗi: %1",
		"cantProcess": "Không thể xử lý yêu cầu của bạn!",
		"missingInput": "Phần tìm kiếm không được để trống!",
		"returnList": "🎼 Có %1 kết quả trùng với từ khoá tìm kiếm của bạn: \n%2\nHãy reply(phản hồi) chọn một trong những tìm kiếm trên"
	},
	"en": {
		"overSizeAllow": "Can't send fine because it's bigger than 25MB.",
		"returnError": "Have some problem when handling request, error: %1",
		"cantProcess": "Can't handle your request!",
		"missingInput": "Search section must not be blank!",
		"returnList": "🎼 Have %1 results with your imput: \n%2\nPlease reply choose 1 of these result"
	}
}

module.exports.handleReply = async function({ api, event, handleReply }) {
	const fs_extra_1 = global.nodemodule["fs-extra"];
	const axios_1 = global.nodemodule["axios"];
	try {
		let path = __dirname + `/cache/scl.mp3`
		api.unsendMessage(handleReply.messageID);
		var { data } = await axios_1.get(`https://unifalo.tech/soundcloud?url=${handleReply.link[event.body - 1]}`)
            fs_extra_1.writeFileSync(path, Buffer.from((await axios_1.get(data.link, { responseType: 'arraybuffer' })).data, 'utf-8'));
            if ( fs_extra_1.statSync(path).size > 26214400)
                api.sendMessage('Không thể gửi tệp vì dung lượng lớn hơn 25MB.', event.threadID, () => (0, fs_extra_1.unlinkSync)(path), event.messageID);
            else
                return api.sendMessage({ body: data.title + " | " + data.duration, attachment: fs_extra_1.createReadStream(path) }, event.threadID, () => fs_extra_1.unlinkSync(path), event.messageID)
	}
	catch (error) { api.sendMessage(getText("cantProcess"), event.threadID, event.messageID) }
	
}

module.exports.run = async function({ api, event, args, getText }) {
	const fs_extra_1 = global.nodemodule["fs-extra"];
	const axios_1 = global.nodemodule["axios"];
	
	
	if (args.length == 0 || !args) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	const keywordSearch = args.join(" ");
	const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(soundcloud\.com)\/.+$/gi;
	const urlValid = videoPattern.test(args[0]);
	
	if (urlValid) {
		try {
			let path = __dirname + `/cache/scl.mp3`
			var { data } = await axios_1.get(`https://unifalo.tech/soundcloud?url=${keywordSearch}`)
            fs_extra_1.writeFileSync(path, Buffer.from((await axios_1.get(data.link, { responseType: 'arraybuffer' })).data, 'utf-8'));
            if ( fs_extra_1.statSync(path).size > 26214400)
                api.sendMessage('Không thể gửi tệp vì dung lượng lớn hơn 25MB.', event.threadID, () => (0, fs_extra_1.unlinkSync)(path), event.messageID);
            else
                return api.sendMessage({ body: data.title + " | " + data.duration, attachment: fs_extra_1.createReadStream(path) }, event.threadID, () => fs_extra_1.unlinkSync(path), event.messageID)
		}
		catch { api.sendMessage(getText("cantProcess"), event.threadID, event.messageID) }
	}
	else {
		try {
			var link = [], msg = "", num = 1;
			let { data } = await axios_1.get(`https://unifalo.tech/soundcloud/search?q=${encodeURIComponent(keywordSearch)}`);
			
			for (const value of data.result) {
				if (typeof value.link !== 'undefined') {;
					link.push(value.link);
					msg += (`${num++}. ${value.title} - ${value.duration}\n\n`);
				}
			}
			return api.sendMessage(( link.length, msg), event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, link }), event.messageID);
		}
		catch (error) { return api.sendMessage(getText("returnError", JSON.stringify(error)), event.threadID, event.messageID) }
	}
}
