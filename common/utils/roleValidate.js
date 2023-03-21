/* eslint-disable strict */
const roleValidate = (UserAccount, userId) => {
  return new Promise((resolve, reject) => {
    UserAccount.findOne({
      where: { id: userId },
      include: "role",
    }).then((user) => {
      console.log("zuser: ",user);
      user = user.toJSON();
      let role = user.role.name;
      if (role != "admin" && role != "solve-it-team"  && role != "solve-it-mentor" && role != "solve-it-participants" && role != "solve-it-judge") {
        reject("Unauthorized");
      } else {
        resolve(user);
      }
    });
  });
};

let Validate = {
  roleValidate,
};
module.exports = Validate;
