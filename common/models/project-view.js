'use strict';

module.exports = function(Projectview) {

    // register project view
    Projectview.registerView = async function (req, projectViewObject) {
        const userId = req.accessToken.userId;
        if (userId == projectViewObject.userId) {
            let viewObjectsOfUser = await Projectview.find({where: {userId: userId, projectId: projectViewObject.projectId}});
            if (viewObjectsOfUser.length > 0) {
                let previousTime = new Date(viewObjectsOfUser[0].lastSeen);
                if ((new Date().getTime() - previousTime.getTime()) >= 28800) {
                    let response = await viewObjectsOfUser[0].updateAttributes({lastSeen: new Date(), viewCount: viewObjectsOfUser[0].viewCount+1});   
                    return response;
                }else {
                    return viewObjectsOfUser[0];
                }
            }else {
                let viewObject = {...projectViewObject, viewCount: 1};
                let response = await Projectview.create(viewObject);
                return response;
            }   
        } else {
            return {};
        }
    }

    Projectview.remoteMethod('registerView', {
        description: "register project view",
        accepts: [
            {
                arg: 'req', 
                type: 'object', 
                'http': {source: 'req'}
            },
            {
                arg: "projectViewObject",
                type: "object",
                require: true
            }
        ],
        http: {
            verb: "post",
            path: "/registerView"
        },
        returns: {
            type: "object",
            root: true
        }
    });

    // fetch most viewed projects
	Projectview.fetchMostViewed = function(cb) {
		// fetchMostViewed code
		Projectview.find({ order: 'viewCount DESC', limit: 10, include: ['project'] }, function(err, projects) {
            cb(null, projects);
        });

	}
  
	Projectview.remoteMethod('fetchMostViewed', {
		description: "fetch most viewed projects",
		http: {
		  verb: "get",
		  path: "/mostViewed"
		},
		returns: {
		  type: "object",
		  root: true
		}
	});

};
