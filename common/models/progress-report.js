"use strict";
const NotificationUtils = require("../utils/notificationUtil");

module.exports = function(Progressreport) {
  //  disable delete end point
  Progressreport.disableRemoteMethod("deleteById", true);
  Progressreport.disableRemoteMethod("destroyById", true);
  Progressreport.disableRemoteMethod("removeById", true);

  Progressreport.afterRemote("create", async (ctx, unused, next) => {
    const {
      IcogRole,
      UserAccount,
      AssignedCity,
      Solveitproject,
      projectMember,
      mentorNotification,
      Notification
    } = Progressreport.app.models;
    try {
      let userDeviceIds = [];
      let userIds = [];
      const reportUploader = await UserAccount.findOne({
        where: { id: ctx.args.data.userId }
      });

      const project = await Solveitproject.findOne({
        where: { id: ctx.args.data.projectId }
      });

      const assignedCities = await AssignedCity.find({ include: ["user"] });

      let projectCity = assignedCities.find(
        assigned => assigned.cities.indexOf(reportUploader.cityId + "") !== -1
      );
      projectCity = projectCity.toJSON();
      if (projectCity.user.oneSignalUserID) {
        userDeviceIds.push(projectCity.user.oneSignalUserID);
        userIds.push(projectCity.user.id);
      }

      const members = await projectMember.find({
        where: { projectId: ctx.args.data.projectId },
        include: ["userAccount"]
      });
      members.forEach(member => {
        if (member.toJSON().oneSignalUserID) {
          userDeviceIds.push(member.toJSON().oneSignalUserID);
          userIds.push(member.toJSON().id);
        }
      });
      const message = `Dear ${projectCity.user.firstName}, ${reportUploader.firstName} uploaded progress report on "${project.title}".`;

      let newNotification = {
        userId: assignedCities[0].userId,
        notificationMessage: message
      };
      if (userDeviceIds.length > 0) {
        const message = `Dear ${projectCity.user.firstName}, ${reportUploader.firstName} uploaded progress report on "${project.title}".`;
        const notification = NotificationUtils.createNotification(message, {
          include_player_ids: [...userDeviceIds]
        });
        userIds.forEach(id => {
          Notification.create({ content: message, userId: id });
        });
        NotificationUtils.sendNotification(notification);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    mentorNotification.create(newNotification, (err, succ) => {
      if (err) {
        console.log(err);
      } else {
        console.log(succ);
      }
    });
  });
};
