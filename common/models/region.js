'use strict';

module.exports = function(Region) {

    //  disable delete end point
  Region.disableRemoteMethodByName("deleteById", true);
  Region.disableRemoteMethodByName("destroyById", true);
  Region.disableRemoteMethodByName("removeById", true);

};
