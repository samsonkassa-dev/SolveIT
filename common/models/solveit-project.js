"use strict";
const e = require("cors");
const ValidateUtils = require("../utils/roleValidate");
module.exports = function (Solveitproject) {

  if (!!Solveitproject.prototype["find"]) {
    Solveitproject.disableRemoteMethodByName('prototype.' + "find");
  } else {
    Solveitproject.disableRemoteMethodByName("find");
  }

  const getUnAuthorizedError = () => {
    const error = new Error("Unauthorized");
    error.status = 401;
    return error;
  }

  Solveitproject.observe('access', async (ctx, next) => {
    console.log(ctx.Model.modelName, ctx.query.where)
    let { UserAccount, ProjectMember } = Solveitproject.app.models;
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    const projectId = ctx.query.where && ctx.query.where.id || null;
    if (!projectId) return
    if (!token || !userId) return getUnAuthorizedError();

    const user = await UserAccount.findOne({ where: { id: userId }, include: "role" })

    if (!user) next(getUnAuthorizedError());
    const allowedRoles = ["admin", "solve-it-mgt", "solve-it-team", "solve-it-mentor"];
    if (!allowedRoles.includes(user.toJSON().role.name)) {
      const membership = await ProjectMember.findOne({ where: { projectId, userId: user.id } });
      console.log(Boolean(membership));
      if (!Boolean(membership)) {
        throw getUnAuthorizedError()
      }
    }
  });


  //  disable delete end point
  Solveitproject.disableRemoteMethod("deleteById", true);
  Solveitproject.disableRemoteMethod("destroyById", true);
  Solveitproject.disableRemoteMethod("removeById", true);

  Solveitproject.observe("before save", async (ctx, next) => {
    let { UserAccount } = Solveitproject.app.models;
    let token = ctx.options && ctx.options.accessToken;
    if (
      ctx.currentInstance !== undefined &&
      ctx.data.level &&
      ctx.currentInstance.level &&
      ctx.data.level != ctx.currentInstance.level
    ) {
      try {
        let res = await ValidateUtils.roleValidate(UserAccount, token.userId);
      } catch (error) {
        next(new Error(error));
      }
    }
  });
  // search projects
  Solveitproject.search = function (keyword, cb) {
    // search code
  };

  Solveitproject.remoteMethod("search", {
    description: "Search projects",
    accepts: {
      arg: "keyword",
      type: "string",
      require: true,
    },
    http: {
      verb: "post",
      path: "/search",
    },
    returns: {
      type: "object",
      root: true,
    },
  });
};
