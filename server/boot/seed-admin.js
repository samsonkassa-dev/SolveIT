'use strict';

module.exports = function(app) {
  const { IcogRole } = app.models;
  const { UserAccount } = app.models;

  let createAdmin = async () =>  {
    let role = await IcogRole.findOne({"where": {"name": "admin"}});
    let admin ={
      "email": "admin@solveit.com",
      "password": "solveitadminpass",
      "roleId": role.id || "63d62f7dd0c8b38136777e4c",
      "username": "admin",
      "emailVerified": true
    }
    return UserAccount.findOrCreate({"where": {"email": "admin@solveit.com"}}, admin)
    .then(instance => Promise.resolve(instance))
    .catch(err => Promise.reject(err));
  };

  createAdmin();
};
