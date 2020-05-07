"use strict";
const OneSignal = require("onesignal-node");
const NotificationUtils = require("../utils/notificationUtil");

module.exports = function (Event) {
  //  disable delete end point
  Event.disableRemoteMethod("deleteById", true);
  Event.disableRemoteMethod("destroyById", true);
  Event.disableRemoteMethod("removeById", true);

  Event.observe("after save", async (ctx, next) => {
    let { UserAccount, Notfication } = Event.app.models;
    try {
      let users = await UserAccount.find({ include: ["city"] });

      users = users.filter(
        user =>
          user.oneSignalUserID &&
          user.toJSON().city &&
          user.toJSON().city.name.toLowerCase() ==
          ctx.instance.city.toLowerCase()
      );

      const userIds = [];
      users = users.map(user => {
        userIds.push(user.id);
        return user.oneSignalUserID;
      });
      const notificationText = `There is a new event, "${
        ctx.instance.title
        }", at ${ctx.instance.place}, ${
        ctx.instance.venue
        } on ${ctx.instance.startDate.toDateString()}`;
      const notification = NotificationUtils.createNotification(
        notificationText,
        { include_player_ids: users }
      );
      userIds.forEach(id => {
        Notfication.create({ content: notificationText, userId: id });
      });
      NotificationUtils.sendNotification(notification);
    } catch (error) {
      throw error;
    }
  });
};
