'use strict';

module.exports = function (Icogrole) {

  //  disable delete end point
  Icogrole.disableRemoteMethodByName("deleteById", true);
  Icogrole.disableRemoteMethodByName("destroyById", true);
  Icogrole.disableRemoteMethodByName("removeById", true);

};
