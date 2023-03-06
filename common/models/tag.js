'use strict';

module.exports = function(Tag) {

    //  disable delete end point
  Tag.disableRemoteMethodByName("deleteById", true);
  Tag.disableRemoteMethodByName("destroyById", true);
  Tag.disableRemoteMethodByName("removeById", true);

};
