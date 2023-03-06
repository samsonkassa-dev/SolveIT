'use strict';

module.exports = function(Almuniproject) {

      //  disable delete end point
  Almuniproject.disableRemoteMethodByName("deleteById", true);
  Almuniproject.disableRemoteMethodByName("destroyById", true);
  Almuniproject.disableRemoteMethodByName("removeById", true);

};
