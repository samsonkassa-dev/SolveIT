/* eslint-disable strict */
const roleValidate = (UserAccount, userId) => {
  return new Promise((resolve, reject) => {
    UserAccount.findOne({
      where: { id: userId },
      include: "role",
    }).then((user) => {
      user = user.toJSON();
      let role = user.role.name;
      if (role != "admin" && role != "solve-it-team") {
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
