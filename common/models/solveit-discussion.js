'use strict';

module.exports = function(Solveitdiscussion) {

  Solveitdiscussion.getBySlung = function(slung, cb) {
    Solveitdiscussion.findOne({ where: { slung: slung } }, function(err, discussion) {
      let { UserAccount } = Solveitdiscussion.app.models;
      let userId = discussion.userAccountId;
      UserAccount.findOne({ where: { id: userId } }, function(err, user) {
          cb(null, { discussion: discussion, user: user });
      });
    });
  }

  Solveitdiscussion.remoteMethod(
    'getBySlung', {
      http: { path: '/:slung/discussion', verb: 'get' },
      accepts: { arg: 'slung', type: 'string' },
      returns: { arg: 'Result', type: 'Object' }
    }
  );

  Solveitdiscussion.afterRemote('create', function(context, unused, next) {
    var discussionCount = 0;
    const Forum = Solveitdiscussion.app.models.SolveITForum;

    Forum.find({ where: { id: context.args.data.forumId } }, function(err, forum) {
      discussionCount = forum[0].discussionCount + 1;
      Forum.updateAll({ id: context.args.data.forumId }, { discussionCount: discussionCount }, function(err, count) {
        if (err) {
            console.error(err);
            next();
        }
        next();
      })
    })
  });
};