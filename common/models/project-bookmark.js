'use strict';

module.exports = function(Projectbookmark) {

    // fetch bookmarked projects
	Projectbookmark.fetchBookmarks = function(req, cb) {
        // fetchBookmarks code
        const userId = req.accessToken.userId;
        console.log(userId);
		Projectbookmark.find({ where: { userId: userId }, include: ['solveitproject'] }, function(err, projects) {
			cb(null, projects);
		});

	}
  
	Projectbookmark.remoteMethod('fetchBookmarks', {
		description: "fetch bookmarks of a user",
		accepts: [
            {
              arg: 'req', 
              type: 'object', 
              'http': {source: 'req'}
            }
        ],
		http: {
		  verb: "get",
		  path: "/userBookmarks"
		},
		returns: {
		  type: "object",
		  root: true
		}
	});

};
