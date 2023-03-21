'use strict';
const ValidateUtils = require("../utils/roleValidate");

module.exports = function (Blacklisteddiscussion) {

  Blacklisteddiscussion.observe("before save", async (ctx, next) => {
    if (ctx.instance) {

      let { UserAccount } = Blacklisteddiscussion.app.models;
      let token = ctx.options && ctx.options.accessToken;
      // console.log("temp: ", UserAccount);
      // console.log("token: ", token);
      // console.log("res: ");
      console.log("newres: ");

      try {
        let res = await ValidateUtils.roleValidate(UserAccount, token.userId);
        console.log("newres: ");
        if (res.role.name === 'admin') {
          console.log("in heres");
          ctx.instance.blacklistedByAdmin = true;
          console.log("newres: ", ctx.instance.blacklistedByAdmin);
        }
        console.log("newres: ", ctx.instance);
        // next();
      } catch (error) {
        next(new Error(error));
      }
    }

  });

  Blacklisteddiscussion.removeFromBlackList = async (discussionId) => {
    let res = Blacklisteddiscussion.destroyAll({ discussionId: discussionId });
    return res;
  }

  Blacklisteddiscussion.remoteMethod('removeFromBlackList', {
    accepts: [
      { arg: "discussionId", type: "string", required: true },
    ],
    http: {
      verb: "post",
      path: "/removeFromBlackList"
    },
    returns: {
      arg: "result",
      type: "object"
    }
  })

};
