'use strict';

module.exports = function(Competitionwinner) {

  //  disable delete end point
  Competitionwinner.disableRemoteMethodByName("deleteById", true);
  Competitionwinner.disableRemoteMethodByName("destroyById", true);
  Competitionwinner.disableRemoteMethodByName("removeById", true);

};
