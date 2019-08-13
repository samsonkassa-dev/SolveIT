'use strict';

module.exports = function(Producttypeview) {

    Producttypeview.beforeRemote('create', function(context, unused, next) {
	    Producttypeview.find({where: {userId: context.args.data.userId, productTypeId: context.args.data.productTypeId}}, function(err, object) {
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
