'use strict';

module.exports = function(City) {
  City.validatesUniquenessOf('name', {ignoreCase: 'ignoreCase'});
  //  disable delete end point
  City.disableRemoteMethod("deleteById", true);
  City.disableRemoteMethod("destroyById", true);
  City.disableRemoteMethod("removeById", true);

};
