'use strict';

module.exports = function (Notfication) {

    Notfication.fetchUserNotfications = async (userId) => {
        try {
            const notifications = await Notfication.find({ where: { userId } });

            return notifications.reverse();
        } catch (error) {
            return new Error(error);
        }
    }

    Notfication.remoteMethod('fetchUserNotfications', {
        description: 'Fetch notfications for a specific user',
        accepts: {
            arg: 'userId',
            type: 'string',
            required: true
        },
        http: {
            path: '/fetchUserNotfications/:userId',
            verb: 'get'
        },
        returns: {
            arg: "result",
            root: true
        }
    });

};
