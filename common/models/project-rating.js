'use strict';

module.exports = function(Projectrating) {
  Projectrating.beforeRemote('create', function(context, unused, next) {
    let data = context.args.data;
    Projectrating.find(
      {
        where: {
          ratorId: context.args.data.ratorId,
          projectId: context.args.data.projectId,
        },
      },
      function(err, account) {
        if (account.length > 0) {
          Projectrating.updateAll(
            {id: account[0].id},
            context.args.data,
            function(err, old) {}
          );
          next('previous rating updated!');
        } else {
          next();
        }
      }
    );
  });

  // fetch top tated projects
  Projectrating.fetchTopRated = async function() {
    // fetchTopRated code

    // to make sum of an attribute from array of objects
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

    let projects = await Projectrating.find({include: ['project']});
    let projectIds = getUniqueValuesOfKey(projects, 'projectId');
    let response = [];
    for (const id of projectIds) {
      let temp = projects.filter(item => {
        return item.projectId == id;
      });
      let rating = temp.sum('rating') / temp.length;
      response.push({rating: rating, project: temp[0].toJSON().project});
    }

    return response;
  };

  Projectrating.remoteMethod('fetchTopRated', {
    description: 'fetch top rated projects',
    http: {
      verb: 'get',
      path: '/topRated',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  // fetch project ratings
  Projectrating.fetchProjectRatings = function(projectId, cb) {
    // fetchProjectRatings code
    Projectrating.find(
      {where: {projectId: projectId}, include: ['project', 'rator']},
      function(err, projects) {
        cb(null, projects);
      }
    );
  };

  Projectrating.remoteMethod('fetchProjectRatings', {
    description: 'fetch project ratings',
    accepts: {
      arg: 'projectId',
      type: 'string',
    },
    http: {
      verb: 'get',
      path: '/:projectId/ratings',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });
};
