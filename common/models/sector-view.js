'use strict';

module.exports = function(Sectorview) {

    Sectorview.beforeRemote('create', function(context, unused, next) {
	    Sectorview.find({where: {userId: context.args.data.userId, sectorId: context.args.data.sectorId}}, function(err, object) {
            if (object.length > 0) {
				object[0].updateAttributes({viewCount: object[0].viewCount+1}, function(err, old) {
					
                });
	    		next("view updated!");
	    	} else {
	    		next();	
	    	}
	    });
	});

};
