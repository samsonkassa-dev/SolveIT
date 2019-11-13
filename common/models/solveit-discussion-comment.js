"use strict";
let url = require("../configs/urlConfig");
const NotificationUtils = require("../utils/notificationUtil");

module.exports = function(Solveitdiscussioncomment) {
  //  disable delete end point
  Solveitdiscussioncomment.disableRemoteMethod("deleteById", true);
  Solveitdiscussioncomment.disableRemoteMethod("destroyById", true);
  Solveitdiscussioncomment.disableRemoteMethod("removeById", true);

  Solveitdiscussioncomment.seedReplyCount = async () => {
    let { Reply } = Solveitdiscussioncomment.app.models;
    const comments = await Solveitdiscussioncomment.find({});
    comments.forEach(async comment => {
      console.log(comment.id);
      const replies = await Reply.find({
        where: { "solveIT-Discussion-CommentId": comment.id }
      });
      console.log(replies, " - replies");
      if (replies.error) return replies.error;
      comment.replyCount = replies.length;
      const change = await Solveitdiscussioncomment.updateAll(
        { id: comment.id },
        comment
      );
      if (change.error) return change.error;
    });
  };

  Solveitdiscussioncomment.afterRemote("create", function(
    context,
    unused,
    next
  ) {
    const {
      Solveitdiscussion,
      UserAccount
    } = Solveitdiscussioncomment.app.models;
    var commentCount = 0;

    Solveitdiscussion.findOne(
      {
        where: {
          id: context.args.data.solveitdiscussionId
        },
        include: ["user"]
      },
      function(err, discussion) {
        discussion = discussion.toJSON();
        commentCount = discussion.commentCount + 1;
        Solveitdiscussion.updateAll(
          {
            id: context.args.data.solveitdiscussionId
          },
          {
            commentCount
          },
          function(err, count) {
            if (err) {
              console.error(err);
              next(err);
            }
            if (discussion.user.oneSignalUserID) {
              const reciverPlayerId = discussion.user.oneSignalUserID;
              const reciverFirstName = discussion.user.firstName;
              UserAccount.findOne(
                { where: { id: context.args.data.userId } },
                function(err1, user) {
                  if (err1) {
                    const err1 = new Error();
                    console.log(err1);
                  } else {
                    const commenter =
                      discussion.user.username === user.username
                        ? "You"
                        : user.firstName + " " + user.middleName;
                    const message = `Dear ${reciverFirstName}, ${commenter} added a comment on your discussion.`;
                    const notification = NotificationUtils.createNotification(
                      message,
                      { include_player_ids: [reciverPlayerId] }
                    );
                    NotificationUtils.sendNotification(notification);
                  }
                }
              );
            }
            next();
          }
        );
      }
    );
  });

  Solveitdiscussioncomment.remoteMethod("seedReplyCount", {
    description: "seed reply counts",
    http: {
      verb: "post",
      path: "/seedReplyCount"
    },
    returns: {
      arg: "result",
      type: "Object",
      root: true
    }
  });
};
