'use strict';

module.exports = function(Weektopproject) {

    //  disable delete end point
  Weektopproject.disableRemoteMethodByName("deleteById", true);
  Weektopproject.disableRemoteMethodByName("destroyById", true);
  Weektopproject.disableRemoteMethodByName("removeById", true);

};
