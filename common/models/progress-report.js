"use strict";
const NotificationUtils = require("../utils/notificationUtil");

module.exports = function(Progressreport) {
  //  disable delete end point
  Progressreport.disableRemoteMethod("deleteById", true);
  Progressreport.disableRemoteMethod("destroyById", true);
  Progressreport.disableRemoteMethod("removeById", true);

  Progressreport.afterRemote("create", async (ctx, unused, next) => {
    console.log(ctx.args.data, "----");
    const {
      IcogRole,
      UserAccount,
      AssignedCity,
      Solveitproject
    } = Progressreport.app.models;

    try {
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
      console.log(projectCity);

      if (projectCity.user.oneSignalUserID) {
        const message = `Dear ${projectCity.user.firstName}, ${reportUploader.firstName} uploaded progress report on "${project.title}".`;
        const notification = NotificationUtils.createNotification(message, {
          include_player_ids: [projectCity.user.oneSignalUserID]
        });
        NotificationUtils.sendNotification(notification);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
