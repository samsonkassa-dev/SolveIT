'use strict';

module.exports = function(News) {


    //  disable delete end point
  News.disableRemoteMethodByName("deleteById", true);
  News.disableRemoteMethodByName("destroyById", true);
  News.disableRemoteMethodByName("removeById", true);
    

};
