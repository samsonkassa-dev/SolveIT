"use strict";

module.exports = function (Solveitdiscussion) {
  //  disable delete end point
  Solveitdiscussion.disableRemoteMethod("deleteById", true);
  Solveitdiscussion.disableRemoteMethod("destroyById", true);
  Solveitdiscussion.disableRemoteMethod("removeById", true);

  Solveitdiscussion.getBySlung = function (slung, cb) {
    Solveitdiscussion.findOne(
      {
        where: {
          slung: slung,
        },
      },
      function (err, discussion) {
        if (err) cb(err);
        if (!discussion) {
          const notFoundError = new Error("Discussion not found");
          cb(null, null);
        } else {
          let { UserAccount } = Solveitdiscussion.app.models;
          let userId = discussion.userAccountId;
          UserAccount.findOne(
            {
              where: {
                id: userId,
              },
            },
            function (err, user) {
              cb(null, {
                discussion: discussion,
                user: user,
              });
            }
          );
        }
      }
    );
  };

  Solveitdiscussion.remoteMethod("getBySlung", {
    http: {
      path: "/:slung/discussion",
      verb: "get",
    },
    accepts: {
      arg: "slung",
      type: "string",
    },
    returns: {
      arg: "Result",
      type: "Object",
    },
  });

  Solveitdiscussion.afterRemote("create", function (context, unused, next) {
    var discussionCount = 0;
    const Forum = Solveitdiscussion.app.models.SolveITForum;

    Forum.find(
      {
        where: {
          id: context.args.data.forumId,
        },
      },
      function (err, forum) {
        discussionCount = forum[0].discussionCount + 1;
        Forum.updateAll(
          {
            id: context.args.data.forumId,
          },
          {
            discussionCount: discussionCount,
          },
          function (err, count) {
            if (err) {
              console.error(err);
              next(err);
            }
            next();
          }
        );
      }
    );
  });

  Solveitdiscussion.seedCommentCount = async () => {
    let { Reply } = Solveitdiscussion.app.models;
    const discussions = await Solveitdiscussion.find({});
    for (let discussion of discussions) {
      const comments = await Solveitdiscussion.app.models[
        "SolveIT-Discussion-Comment"
      ].find({
        where: { solveitdiscussionId: discussion.id },
      });
      if (comments.error) return comments.error;
      discussion.commentCount = comments.length;
      const change = await Solveitdiscussion.updateAll(
        { id: discussion.id },
        discussion.toJSON()
      );
      if (change.error) return change.error;
    }
  };
  Solveitdiscussion.remoteMethod("seedCommentCount", {
    description: "seed comment counts",
    http: {
      verb: "post",
      path: "/seedCommentCount",
    },
    returns: {
      arg: "result",
      type: "Object",
      root: true,
    },
  });
};
