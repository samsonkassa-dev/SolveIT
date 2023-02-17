// 'use strict';

// module.exports = function(app) {
//   const { IcogRole } = app.models;
//   const { UserAccount } = app.models;

//   let createAdmin = async () =>  {
//     let role = await IcogRole.findOne({"where": {"name": "admin"}});
//     let admin ={
//       "email": "admin@solveit.com",
//       "password": "solveitadminpass",
//       "roleId": role.id || "63d687749ad27704efae59c3",
//       "username": "admin",
//       "emailVerified": true
//     }
//     return UserAccount.findOrCreate({"where": {"email": "admin@solveit.com"}}, admin)
//     .then(instance => Promise.resolve(instance))
//     .catch(err => Promise.reject(err));
//   };

//   createAdmin();
// };
