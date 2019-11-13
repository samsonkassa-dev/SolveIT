"use strict";
const OneSignal = require("onesignal-node");

const sendNotification = notification => {
  const notificationClient = new OneSignal.Client({
    userAuthKey: "NjgwZjhiMTctZjUyMi00Y2RlLWI1YmEtNTgzODNjZTE4Njhl",
    app: {
      appId: "2f059ca8-1f35-4aa3-ae91-7d21043a5dbc",
      appAuthKey: "NjgwZjhiMTctZjUyMi00Y2RlLWI1YmEtNTgzODNjZTE4Njhl"
    }
  });

  notificationClient.sendNotification(notification, (err, resp, data) => {
    if (err) {
      console.log("error while sending notification ---DBG**", err);
    } else {
      console.log("Notification sent successfylly---DBG**");
    }
  });
};

const createNotification = (text, icludedPlayers) => {
  return new OneSignal.Notification({
    ...icludedPlayers,
    contents: { en: text }
  });
};

module.exports = {
  sendNotification,
  createNotification
};
