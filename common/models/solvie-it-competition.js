"use strict";

module.exports = function (Solvieitcompetition) {
  //  disable delete end point
  Solvieitcompetition.disableRemoteMethodByName("deleteById", true);
  Solvieitcompetition.disableRemoteMethodByName("destroyById", true);
  Solvieitcompetition.disableRemoteMethodByName("removeById", true);

  Solvieitcompetition.getActiveCompetition = function (cb) {
    Solvieitcompetition.find({ where: { active: true } }, function (
      err,
      competition
    ) {
      cb(null, competition);
    });
  };

  Solvieitcompetition.getCompetitionProjectsWithCity = async (
    competitionId
  ) => {
    const {
      ProjectMember,
      CompetitionProject,
    } = Solvieitcompetition.app.models;

    let competitionProjects = await CompetitionProject.find({
      where: { competitionId: competitionId },
      include: {
        relation: "solveitproject",
        scope: {
          include: [
            {
              relation: "reports",
              scope: {
                fields: { id: true, title: true },
                where: { type: "activity" },
              },
            },
            { relation: "members" },
          ],
        },
      },
    });

    for (let i = 0; i < competitionProjects.length; i++) {
      const element = competitionProjects[i];

      let members = await ProjectMember.find({
        where: { projectId: element.projectId },
        include: ["userAccount"],
      });
      element.members = members;
      if (members.length > 0) {
        let member = members[0];

        let project = await element.solveitproject.getAsync({});
        if (project) {
          if (project.cities || project.cities != undefined) {
            element["cities"] = project.cities;
          } else {
            if (member.userAccount()) {
              element["cities"] = [member.userAccount().cityId];
            }
          }
        }
      }
    }
    return competitionProjects;
  };

  Solvieitcompetition.getCompetitionAllProjects = async () => {
    const activeCompetition = await Solvieitcompetition.find({
      where: { active: true },
    });
    const { CompetitionProject } = Solvieitcompetition.app.models;

    let competitionProjects = await CompetitionProject.find({
      where: { competitionId: activeCompetition[0].id },
      include: ["solveitproject"],
    });

    return competitionProjects;
  };

  Solvieitcompetition.remoteMethod("getCompetitionAllProjects", {
    desctiption: "get all projects in competition",
    http: {
      verb: "get",
      path: "/all-projects",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Solvieitcompetition.remoteMethod("getCompetitionProjectsWithCity", {
    desctiption: "get the city of project",
    accepts: [
      {
        arg: "competitionId",
        type: "string",
        required: true,
      },
    ],
    http: {
      verb: "post",
      path: "/competition-projects",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Solvieitcompetition.remoteMethod("getActiveCompetition", {
    http: { path: "/active", verb: "get" },
    returns: { arg: "Result", type: "Object" },
  });
};
