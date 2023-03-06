'use strict';

module.exports = function(Resourcecategory) {

    //  disable delete end point
  Resourcecategory.disableRemoteMethodByName("deleteById", true);
  Resourcecategory.disableRemoteMethodByName("destroyById", true);
  Resourcecategory.disableRemoteMethodByName("removeById", true);

};
