'use strict';

module.exports = function(City) {
  City.validatesUniquenessOf('name', {ignoreCase: 'ignoreCase'});
  //  disable delete end point
  City.disableRemoteMethodByName("deleteById", true);
  City.disableRemoteMethodByName("destroyById", true);
  City.disableRemoteMethodByName("removeById", true);

};
