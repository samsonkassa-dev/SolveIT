"use strict";
const ValidateUtils = require("../utils/roleValidate");
module.exports = function (Solveitproject) {
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
