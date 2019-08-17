'use strict';
let url = require('../configs/urlConfig');

module.exports = function(Solveitdiscussioncomment) {
  //  disable delete end point
  Solveitdiscussioncomment.disableRemoteMethod('deleteById', true);
  Solveitdiscussioncomment.disableRemoteMethod('destroyById', true);
  Solveitdiscussioncomment.disableRemoteMethod('removeById', true);

  Solveitdiscussioncomment.observe('after save', function(ctx, next) {
    let {
      Email,
      Solveitdiscussion,
      UserAccount,
    } = Solveitdiscussioncomment.app.models;
    if (ctx.instance) {
      Solveitdiscussion.findOne(
        {where: {id: ctx.instance.discussionId}, include: 'user'},
        function(err, data) {
          if (err) {
            const err = new Error();
            next(err);
          } else {
            const discussion = data.toJSON();
            const reciverEmail = discussion.user.email;
            const reciverFirstName = discussion.user.firstName;
            UserAccount.findOne({where: {id: ctx.instance.userId}}, function(
              err1,
              user
            ) {
              if (err1) {
                const err1 = new Error();
                next(err1);
              } else {
                const commenter =
                  discussion.user.username === user.username
                    ? 'you'
                    : user.username;
                const html = `<p>Hey <b>${reciverFirstName}</b>, <em>${commenter}</em> commented on your discussion.</p>
                           <a href="${url}/forums/discussions/${
                  discussion.slung
                }">check it here.</a>`;
                Email.send({
                  to: reciverEmail,
                  from: 'email@icog-labs.com',
                  subject: 'New comment on your discussion',
                  html: html,
                });
                next();
              }
            });
          }
        }
      );
    } else {
      next();
    }
  });

  Solveitdiscussioncomment.seedReplyCount = async () => {
    let {Reply} = Solveitdiscussioncomment.app.models;
    const comments = await Solveitdiscussioncomment.find({});
    comments.forEach(async comment => {
      console.log(comment.id);
      const replies = await Reply.find({
        where: {'solveIT-Discussion-CommentId': comment.id},
      });
      console.log(replies, ' - replies');
      if (replies.error) return replies.error;
      comment.replyCount = replies.length;
      const change = await Solveitdiscussioncomment.updateAll(
        {id: comment.id},
        comment
      );
      if (change.error) return change.error;
    });
  };

  Solveitdiscussioncomment.afterRemote('create', function(
    context,
    unused,
    next
  ) {
    var commentCount = 0;
    const discussion = Solveitdiscussioncomment.app.models.Solveitdiscussion;

    discussion.find(
      {
        where: {
          id: context.args.data.discussionId,
        },
      },
      function(err, discussions) {
        commentCount = discussions[0].commentCount + 1;

        Solveitdiscussioncomment.updateAll(
          {
            id: context.args.data.solveitdiscussionId,
          },
          {
            commentCount: commentCount,
          },
          function(err, count) {
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

  Solveitdiscussioncomment.remoteMethod('seedReplyCount', {
    description: 'seed reply counts',
    http: {
      verb: 'post',
      path: '/seedReplyCount',
    },
    returns: {
      arg: 'result',
      type: 'Object',
      root: true,
    },
  });
};
