'use strict';

module.exports = function(Solveitproject) {
  //  disable delete end point
  Solveitproject.disableRemoteMethod('deleteById', true);
  Solveitproject.disableRemoteMethod('destroyById', true);
  Solveitproject.disableRemoteMethod('removeById', true);

  // search projects
  Solveitproject.search = function(keyword, cb) {
    // search code
  };

  Solveitproject.remoteMethod('search', {
    description: 'Search projects',
    accepts: {
      arg: 'keyword',
      type: 'string',
      require: true,
    },
    http: {
      verb: 'post',
      path: '/search',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });
};
