'use strict';

module.exports = function(Projectview) {
  // register project view
  Projectview.registerView = async (req, projectViewObject) => {
    const userId = req.accessToken.userId;

    // register project view
    Projectview.registerView = async function(req, projectViewObject) {
      const userId = req.accessToken.userId;
      console.log(projectViewObject.projectViewObject.userId);
      if (userId == projectViewObject.projectViewObject.userId) {
        let viewObjectsOfUser = await Projectview.find({
          where: {
            userId: userId,
            projectId: projectViewObject.projectViewObject.projectId,
          },
        });
        if (viewObjectsOfUser.length > 0) {
          let previousTime = new Date(viewObjectsOfUser[0].lastSeen);
          if (new Date().getTime() - previousTime.getTime() >= 28800) {
            let response = await viewObjectsOfUser[0].updateAttributes({
              lastSeen: new Date(),
              viewCount: viewObjectsOfUser[0].viewCount + 1,
            });
            return response;
          } else {
            return viewObjectsOfUser[0];
          }
        } else {
          let viewObject = projectViewObject.projectViewObject;
          viewObject = {...viewObject, viewCount: 1};
          let response = await Projectview.create(viewObject);
          return response;
        }
      } else {
        return {};
      }
    };
  };

  Projectview.remoteMethod('registerView', {
    description: 'register project view',
    accepts: [
      {
        arg: 'req',
        type: 'object',
        http: {source: 'req'},
      },
      {
        arg: 'projectViewObject',
        type: 'object',
        require: true,
      },
    ],
    http: {
      verb: 'post',
      path: '/registerView',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  // fetch most viewed projects
  Projectview.fetchMostViewed = async function() {
    // fetchMostViewed code

    Array.prototype.sum = function(prop) {
      var total = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop];
      }
      return total;
    };

    function getUniqueValuesOfKey(array, key) {
      return array.reduce(function(carry, item) {
        if (item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
        return carry;
      }, []);
    }

    let projects = await Projectview.find({include: ['solveitproject']});
    let projectIds = getUniqueValuesOfKey(projects, 'projectId');
    let response = [];
    for (const id of projectIds) {
      let temp = projects.filter(item => {
        return item.projectId == id;
      });
      let view = temp.sum('viewCount');
      response.push({viewCount: view, solveitproject: temp[0].solveitproject});
    }

    return response;
  };

  Projectview.remoteMethod('fetchMostViewed', {
    description: 'fetch most viewed projects',
    http: {
      verb: 'post',
      path: '/registerView',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  // fetch most viewed projects
  Projectview.fetchMostViewed = function(cb) {
    // fetchMostViewed code
    Projectview.find(
      {order: 'viewCount DESC', limit: 10, include: ['solveitproject']},
      function(err, projects) {
        cb(null, projects);
      }
    );

    Projectview.remoteMethod('fetchMostViewed', {
      description: 'fetch most viewed projects',
      http: {
        verb: 'get',
        path: '/mostViewed',
      },
      returns: {
        type: 'object',
        root: true,
      },
    });
  };
};
