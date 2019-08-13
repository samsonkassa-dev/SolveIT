'use strict';

module.exports = function(Projectrating) {

  Projectrating.beforeRemote('create', function(context, unused, next) {
		let data = context.args.data;
		Projectrating.find({where: {ratorId: context.args.data.ratorId, projectId: context.args.data.projectId}}, function(err, account) {
			if (account.length > 0) {
			Projectrating.updateAll({ id: account[0].id }, context.args.data, function(err, old) {
	
			});
				next("previous rating updated!")
			} else {
				next();	
			}
		});
	});

	// fetch top tated projects
	Projectrating.fetchTopRated = function(cb) {
		// fetchTopRated code
		Projectrating.find({ where: { rating: {gt: 3.5} }, limit: 10, include: ['project'] }, function(err, projects) {
				cb(null, projects);
		});

	}
  
	Projectrating.remoteMethod('fetchTopRated', {
		description: "fetch top rated projects",
		http: {
		  verb: "get",
		  path: "/topRated"
		},
		returns: {
		  type: "object",
		  root: true
		}
	});

	// fetch project ratings
	Projectrating.fetchProjectRatings = function(projectId, cb) {
		// fetchProjectRatings code
		Projectrating.find({ where: { projectId: projectId }, include: ['project', 'rator'] }, function(err, projects) {
				cb(null, projects);
		});

	}
  
	Projectrating.remoteMethod('fetchProjectRatings', {
		description: "fetch project ratings",
		accepts: {
			arg: 'projectId',
			type: 'string'
		},
		http: {
		  verb: "get",
		  path: "/:projectId/ratings"
		},
		returns: {
		  type: "object",
		  root: true
		}
	});

};
