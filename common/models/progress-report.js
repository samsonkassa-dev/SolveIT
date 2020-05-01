"use strict";
const NotificationUtils = require("../utils/notificationUtil");
const ValidateUtils = require("../utils/roleValidate");

module.exports = function (Progressreport) {
  //  disable delete end point
  // Progressreport.disableRemoteMethod("deleteById", true);
  // Progressreport.disableRemoteMethod("destroyById", true);
  // Progressreport.disableRemoteMethod("removeById", true);
  Progressreport.observe("before save", async (ctx, next) => {
    let { UserAccount, Activity, Solveitproject } = Progressreport.app.models;
    let token = ctx.options && ctx.options.accessToken;
    if (
      ctx.currentInstance !== undefined &&
      ctx.data.activity_score != ctx.currentInstance.activity_score
    ) {
      try {
        let res = await ValidateUtils.roleValidate(UserAccount, token.userId);
        const project = await Solveitproject.findOne({
          where: { id: ctx.data.projectId },
          include: {
            relation: "reports",
            scope: {
              where: { type: "activity" },
              include: ["activity"],
            },
          },
        });
        let proj = project.toJSON();
        const activities = await Activity.find({
          where: { level: project.level },
        });
        const current_activity = await Activity.findOne({
          where: { id: ctx.data.activityId },
        });
        //update the project level only when the score of the activity at the project level is updated
        if (activities.length > 0 && current_activity.level == project.level) {
          const reports = proj.reports;
          //check if the have all activity have been submitted
          let levelActivityIds = activities.map((activity) =>
            JSON.stringify(activity.id.toString())
          );
          let projectActivityIds = reports.map((report) =>
            JSON.stringify(report.activityId)
          );
          let allFound = true;
          levelActivityIds.forEach((activity) => {
            if (projectActivityIds.indexOf(activity) < 0) {
              allFound = false;
            }
          });
          console.log("All Activities Submitted " + allFound);
          if (allFound) {
            let allPass = true;
            reports.forEach((report) => {
              let act_score = report.activity_score;
              let passing_grade = report.activity.passing_grade;
              if (act_score < passing_grade) {
                allPass = false;
              }
            });
            console.log("Passed All" + allPass);
            if (allPass) {
              project.updateAttributes({ level: project.level + 1 }, function (
                err,
                old
              ) {
                if (err) {
                  console.log("eErrrrrrrr");
                  console.log(err);
                } else {
                  console.log("Updated OLD");
                }
              });
            }
          }
        } else {
          console.log("lese");
        }
      } catch (error) {
        next(new Error(error));
      }
    } else {
      console.log("They Want ");
    }
  });

  Progressreport.afterRemote("create", async (ctx, unused, next) => {
    const {
      IcogRole,
      UserAccount,
      AssignedCity,
      Solveitproject,
      projectMember,
      mentorNotification,
      Notfication,
    } = Progressreport.app.models;
    try {
      let userDeviceIds = [];
      let userIds = [];
      const reportUploader = await UserAccount.findOne({
        where: { id: ctx.args.data.userId },
        include: ["city"],
      });

      const project = await Solveitproject.findOne({
        where: { id: ctx.args.data.projectId },
      });

      const assignedCities = await AssignedCity.find({ include: ["user"] });

      let projectCitys = assignedCities.filter(
        (assigned) => assigned.cities.indexOf(reportUploader.cityId + "") !== -1
      );
      projectCitys.forEach(async (projectCity) => {
        projectCity = projectCity.toJSON();

        if (projectCity.user.oneSignalUserID) {
          userDeviceIds.push(projectCity.user.oneSignalUserID);
          userIds.push(projectCity.user.id);
        }

        const members = await projectMember.find({
          where: { projectId: ctx.args.data.projectId },
          include: ["userAccount"],
        });
        members.forEach((member) => {
          if (member.toJSON().oneSignalUserID) {
            userDeviceIds.push(member.toJSON().oneSignalUserID);
            userIds.push(member.toJSON().id);
          }
        });
        const message = `Dear ${projectCity.user.firstName}, ${reportUploader.firstName} uploaded progress report on "${project.title}".`;
        let newNotification = {
          projectId: project.id,
          userId: projectCity.userId,
          notificationMessage: message,
        };
        if (newNotification) {
          mentorNotification.create(newNotification, (err, succ) => {
            if (err) {
              console.log(err);
            } else {
              console.log(succ);
            }
          });
        }
        if (userDeviceIds.length > 0) {
          const message = `Dear ${projectCity.user.firstName}, ${reportUploader.firstName} uploaded progress report on "${project.title} in city ".`;
          const notification = NotificationUtils.createNotification(message, {
            include_player_ids: [...userDeviceIds],
          });
          userIds.forEach((id) => {
            Notfication.create({ content: message, userId: id });
          });
          NotificationUtils.sendNotification(notification);
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
};
