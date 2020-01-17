'use strict';

module.exports = function (Attendance) {
    Attendance.observe('before save', (ctx, next) =>{

        if(ctx.instance){
            let cityIds = ctx.instance.cityIds
            let Useraccount = Attendance.app.models.UserAccount
            let { IcogRole } = Useraccount.app.models;
            console.log(cityIds)
            IcogRole.findOne({
                where: { name: "solve-it-participants" }
            },(error, role) =>{
                if(error){
                    next(error)
                }else{
                    Useraccount.find({where : {cityId : {inq: cityIds}, roleId: role.id}}, (error, users) =>{
                        if(error){
                            next(error)
                        }else{
                            console.log(users.length)
                            let participants = []
                            users.forEach(user => {
                                participants.push({
                                    participant : user,
                                    is_present: false
                                })
                            });
                            ctx.instance.participants = participants
                            next()
                        }
                    })
                }
            })
            
        }else{
            next()
        }
        
        
    })
};