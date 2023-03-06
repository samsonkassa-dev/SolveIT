'use strict';

module.exports = function(Progresscomment) {

    //  disable delete end point
    Progresscomment.disableRemoteMethodByName("deleteById", true);
    Progresscomment.disableRemoteMethodByName("destroyById", true);
    Progresscomment.disableRemoteMethodByName("removeById", true);

};
