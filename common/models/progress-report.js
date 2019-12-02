"use strict";
const NotificationUtils = require("../utils/notificationUtil");

module.exports = function (Progressreport) {
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
      Solveitproject,
      projectMember,
      mentorNotification
    } = Progressreport.app.models;
    console.log("UPLOad")
    try {
      let userDeviceIds = [];
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
      if (projectCity.user.oneSignalUserID)
        userDeviceIds.push(projectCity.user.oneSignalUserID);

      const members = await projectMember.find({
        where: { projectId: ctx.args.data.projectId },
        include: ["userAccount"]
      });
      members.forEach(member => {
        if (member.toJSON().oneSignalUserID) {
          userDeviceIds.push(member.toJSON().oneSignalUserID);
        }
      });
      const message = `Dear ${projectCity.user.firstName}, ${reportUploader.firstName} uploaded progress report on "${project.title}".`;

      let newNotification = {
        userId: assignedCities[0].userId,
        notificationMessage : message
    }
      mentorNotification.create(newNotification, (err, succ)=>{
        if(err){
          console.log(err)
        }else{
          console.log(succ)
        }
      })

    // if (userDeviceIds.length > 0) {
    //   const notification = NotificationUtils.createNotification(message, {
    //     include_player_ids: [...userDeviceIds]
    //   });
    //   NotificationUtils.sendNotification(notification);
    // }
  } catch (error) {
    console.log(error);
  }
});
};
