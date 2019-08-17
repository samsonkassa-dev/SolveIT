'use strict';

module.exports = function(Reply) {
  //  disable delete end point
  Reply.disableRemoteMethod('deleteById', true);
  Reply.disableRemoteMethod('destroyById', true);
  Reply.disableRemoteMethod('removeById', true);

  Reply.afterRemote('create', function(context, unused, next) {
    var replyCount = 0;
    const discussionComment = Reply.app.models['SolveIT-Discussion-Comment'];
    discussionComment.find(
      {
        where: {
          id: context.args.data.commentId,
        },
      },
      function(err, comment) {
        replyCount = comment[0].replyCount + 1;
        discussionComment.updateAll(
          {
            id: context.args.data.commentId,
          },
          {
            replyCount: replyCount,
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
};
