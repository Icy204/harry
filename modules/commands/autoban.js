const fs = global.nodemodule['fs-extra'];
module.exports.config = {
  name: "fix-spam",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "fix-spam chửi bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = function({ api, event}) {
  var { threadID, messageID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
 
  var userID = `${event.senderID}`;

  if ((event.body.toLowerCase() == "bot ngu") || (event.body.toLowerCase() == "Bot ngu") || (event.body.toLowerCase() == "Bot lồn") ||  (event.body.toLowerCase() == "bot lồn") || (event.body.toLowerCase() == "Bot như lồn") || (event.body.toLowerCase() == "Bot ngu lồn")) {
    data.banned = 1;
    data.dateAdded = time;
    global.data.userBanned.set(userID, { dateAdded: data.dateAdded });
    return api.sendMessage(`Bạn đã bị ban Khỏi Hệ Thống Vào Lúc ${time} Vì Lí Do: Chửi bot !\nLiên hệ ADMIN bot qua FB để được mở ban:\nhttps://www.facebook.com/ginza1502`, threadID)
  };
}

module.exports.run = function({ api, event }) { }