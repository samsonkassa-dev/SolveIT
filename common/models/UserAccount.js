"use strict";
var Excel = require("exceljs");
let STATUS = require("../configs/config");
let template = require("../configs/emailTemplates");
let url = require("../configs/urlConfig");
const uniqueid = require("uniqid");

module.exports = function (Useraccount) {
  // remove username validation
  delete Useraccount.validations.username;

  //  disable delete end point
  Useraccount.disableRemoteMethodByName("deleteById", true);
  Useraccount.disableRemoteMethodByName("destroyById", true);
  Useraccount.disableRemoteMethodByName("removeById", true);

  // disable case insensetive email
  Useraccount.settings.caseSensitiveEmail = false;

  Useraccount.observe("after save", function (ctx, next) {
    if (ctx.instance !== undefined && !ctx.instance.emailVerified) {
      let { emailConfirmationId } = Useraccount.app.models;
      let { Email } = Useraccount.app.models;
      // let cId = uniqueid();
      let cId = "1234";
      let email = ctx.instance.email;
      let userId = ctx.instance.id;
      // let html = `<p>Hello <b>${ctx.instance.firstName}</b>, Welcome to SolveIT competition. Pleace confirm your email address by following the link below. </p>
      //               <a href="${url}/confirm/${userId}-${cId}">confirmation link</a>`;
      let action_url = `${url}/confirm/${userId}-${cId}`;
      //       let html = `
      //         <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      // <html xmlns="http://www.w3.org/1999/xhtml">
      // <head>
      //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      //   <title>Verify your email address</title>
      //   <style type="text/css" rel="stylesheet" media="all">
      //     /* Base ------------------------------ */
      //     *:not(br):not(tr):not(html) {
      //       font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      //       -webkit-box-sizing: border-box;
      //       box-sizing: border-box;
      //     }
      //     body {
      //       width: 100% !important;
      //       height: 100%;
      //       margin: 0;
      //       line-height: 1.4;
      //       background-color: #F5F7F9;
      //       color: #839197;
      //       -webkit-text-size-adjust: none;
      //     }
      //     a {
      //       color: #414EF9;
      //     }
      //     /* Layout ------------------------------ */
      //     .email-wrapper {
      //       width: 100%;
      //       margin: 0;
      //       padding: 0;
      //       background-color: #F5F7F9;
      //     }
      //     .email-content {
      //       width: 100%;
      //       margin: 0;
      //       padding: 0;
      //     }
      //     /* Masthead ----------------------- */
      //     .email-masthead {
      //       padding: 25px 0;
      //       text-align: center;
      //     }
      //     .email-masthead_logo {
      //       max-width: 400px;
      //       border: 0;
      //     }
      //     .email-masthead_name {
      //       font-size: 16px;
      //       font-weight: bold;
      //       color: #839197;
      //       text-decoration: none;
      //       text-shadow: 0 1px 0 white;
      //     }
      //     /* Body ------------------------------ */
      //     .email-body {
      //       width: 100%;
      //       margin: 0;
      //       padding: 0;
      //       border-top: 1px solid #E7EAEC;
      //       border-bottom: 1px solid #E7EAEC;
      //       background-color: #FFFFFF;
      //     }
      //     .email-body_inner {
      //       width: 570px;
      //       margin: 0 auto;
      //       padding: 0;
      //     }
      //     .email-footer {
      //       width: 570px;
      //       margin: 0 auto;
      //       padding: 0;
      //       text-align: center;
      //     }
      //     .email-footer p {
      //       color: #839197;
      //     }
      //     .body-action {
      //       width: 100%;
      //       margin: 30px auto;
      //       padding: 0;
      //       text-align: center;
      //     }
      //     .body-sub {
      //       margin-top: 25px;
      //       padding-top: 25px;
      //       border-top: 1px solid #E7EAEC;
      //     }
      //     .content-cell {
      //       padding: 35px;
      //     }
      //     .align-right {
      //       text-align: right;
      //     }
      //     /* Type ------------------------------ */
      //     h1 {
      //       margin-top: 0;
      //       color: #292E31;
      //       font-size: 19px;
      //       font-weight: bold;
      //       text-align: left;
      //     }
      //     h2 {
      //       margin-top: 0;
      //       color: #292E31;
      //       font-size: 16px;
      //       font-weight: bold;
      //       text-align: left;
      //     }
      //     h3 {
      //       margin-top: 0;
      //       color: #292E31;
      //       font-size: 14px;
      //       font-weight: bold;
      //       text-align: left;
      //     }
      //     p {
      //       margin-top: 0;
      //       color: #839197;
      //       font-size: 16px;
      //       line-height: 1.5em;
      //       text-align: left;
      //     }
      //     p.sub {
      //       font-size: 12px;
      //     }
      //     p.center {
      //       text-align: center;
      //     }
      //     /* Buttons ------------------------------ */
      //     .button {
      //       display: inline-block;
      //       width: 200px;
      //       background-color: #414EF9;
      //       border-radius: 3px;
      //       color: #ffffff;
      //       font-size: 15px;
      //       line-height: 45px;
      //       text-align: center;
      //       text-decoration: none;
      //       -webkit-text-size-adjust: none;
      //       mso-hide: all;
      //     }
      //     .button--green {
      //       background-color: #28DB67;
      //     }
      //     .button--red {
      //       background-color: #FF3665;
      //     }
      //     .button--blue {
      //       background-color: #414EF9;
      //       color:white !important;
      //     }
      //     /*Media Queries ------------------------------ */
      //     @media only screen and (max-width: 600px) {
      //       .email-body_inner,
      //       .email-footer {
      //         width: 100% !important;
      //       }
      //     }
      //     @media only screen and (max-width: 500px) {
      //       .button {
      //         width: 100% !important;
      //       }
      //     }
      //   </style>
      // </head>
      // <body>
      //   <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
      //     <tr>
      //       <td align="center">
      //         <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
      //           <!-- Logo -->
      //           <tr>
      //             <td class="email-masthead">
      //               <a class="email-masthead_name">Solve IT 2020</a>
      //             </td>
      //           </tr>
      //           <!-- Email Body -->
      //           <tr>
      //             <td class="email-body" width="100%">
      //               <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
      //                 <!-- Body content -->
      //                 <tr>
      //                   <td class="content-cell">
      //                     <h1 style='text-align:center'">Verify your email address</h1>
      //                     <p style='font-weight:600'>Dear ${ctx.instance.firstName}</p>
      //                     <p>You have successfully registered on the Solve IT website. We are so happy you joined our community. Now, you can sign in to your account using your email address and password both on the website and mobile application.</p>
      //                     <!-- Action -->
      //                     <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
      //                       <tr>
      //                         <td align="center">
      //                           <div>
      //                             <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${action_url}" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="7%" stroke="f" fill="t">
      //                             <v:fill type="tile" color="#414EF9" />
      //                             <w:anchorlock/>
      //                             <center style="color:#ffffff;font-family:sans-serif;font-size:15px;">Verify Email</center>
      //                           </v:roundrect><![endif]-->
      //                             <a href="${action_url}" class="button button--blue" >Verify Email</a>
      //                           </div>
      //                         </td>
      //                       </tr>
      //                     </table>
      //                     <p>Thanks,<br>The Solve IT Team</p>
      //                     <p>
      //                     We invite you to visit our social media platforms<br/>

      //                     <table>
      //                     <tr>
      //                     <td> <img  src="https://img.icons8.com/color/48/000000/telegram-app.png"></td>
      //                     <td><p> Telegram : <a href="https://t.me/iCogSolveIT"> iCog Solve IT</a></p></td>
      //                     </tr>
      //                     <tr>
      //                     <td> <img  src="https://img.icons8.com/color/48/000000/twitter.png"></td>
      //                     <td><p> Twitter : <a href="https://twitter.com/iCogSolveIT">iCogSolveIT</a></p></td>
      //                     </tr>
      //                     <tr>
      //                     <td>   <img  src="https://img.icons8.com/color/48/000000/instagram-new.png"></td>
      //                     <td><p> Instagram : <a href="https://www.instagram.com/icog_solveit/"> icog_solveit </a></p></td>
      //                     </tr>
      //                     <tr>
      //                     <td> <img  src="https://img.icons8.com/color/48/000000/linkedin.png"></td>
      //                     <td><p> LinkedIn : <a href="https://www.linkedin.com/company/icog-labs/">iCog Labs</a></p></td>
      //                     </tr>
      //                     <tr>
      //                     <td>  <img  src="https://img.icons8.com/color/48/000000/youtube.png"> </td>
      //                     <td><p>YouTube :<a href="https://www.youtube.com/channel/UCip0sTC3ncW06xXGuoeioWA"> @icoglabsofficial</a></p></td>
      //                     </tr>
      //                     </table>
      //                     </p>

      //                     <!-- Sub copy -->
      //                     <table class="body-sub">
      //                       <tr>
      //                         <td>
      //                           <p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.
      //                           </p>
      //                           <p class="sub"><a href="${action_url}">${action_url}</a></p>
      //                         </td>
      //                       </tr>
      //                     </table>
      //                   </td>
      //                 </tr>
      //               </table>
      //             </td>
      //           </tr>
      //           <tr>
      //             <td>
      //               <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
      //                 <tr>
      //                   <td class="content-cell">
      //                     <p class="sub center">
      //                       iCog Labs.
      //                       <br>Airport Road, Yeshi Building 10th floor
      //                     </p>
      //                   </td>
      //                 </tr>
      //               </table>
      //             </td>
      //           </tr>
      //         </table>
      //       </td>
      //     </tr>
      //   </table>
      // </body>
      // </html>

      //         `;
      let html = `${template.header} Dear ${ctx.instance.firstName} ${ctx.instance.middleName}, ${template.middle}${url}/confirm/${userId}-${cId}${template.footer}`;
      emailConfirmationId.create(
        {
          cId: cId,
          userId: userId,
        },
        function (err, data) {
          if (err) {
            next(err);
            return;
          }
          Email.send(
            {
              to: email,
              from: "dannyboy9917@gmail.com",
              subject: "Welcome to Solve IT",
              html: html,
            },
            function (err, mail) {
              if (err) {
                console.log("Error while sending email ", err);
                next(err);
              }
              console.log("email sent!");
              next();
            }
          );
        }
      );
    } else {
      next();
    }
  });

  // check password  request change is correct
  Useraccount.changePassword = function (key, cb) {
    let { forgotPasswordRequest } = Useraccount.app.models;
    console.log(key);
    const ids = key.split(",");
    const cid = ids[1];
    console.log(cid);
    forgotPasswordRequest.findOne(
      {
        where: {
          id: cid,
        },
      },
      function (err, data) {
        if (err) {
          cb(new Error("Error while checking request"));
          return;
        }

        if (data && !data.inactive && data.userId === ids[0]) {
          forgotPasswordRequest.updateAll(
            {
              id: ids[1],
            },
            {
              inactive: true,
            },
            function (err, response) {
              console.log("update", response);
              if (err) {
                console.log("error while updating");
                cb(err);
                return;
              }
              cb(null, true);
            }
          );
        } else {
          cb(null, false);
        }
      }
    );
  };

  Useraccount.remoteMethod("changePassword", {
    desctiption: "request password change",
    accepts: {
      arg: "key",
      type: "string",
      require: true,
    },
    http: {
      verb: "post",
      path: "/change-password",
    },
    returns: {
      type: "object",
      root: true,
      arg: "success",
    },
  });

  // check if email is verified before login
  Useraccount.beforeRemote("login", function (ctx, unused, next) {
    let email = ctx.args.credentials.email;
    let pass = ctx.args.credentials.password;
    Useraccount.findOne(
      {
        where: {
          email: { like: email, options: "i" },
        },
        include: ["role", "profile"],
      },
      function (err, data) {
        if (err) {
          next(err);
        } else if (data !== null) {
          if (data.emailVerified && data.status === "ACTIVE") {
            data = data.toJSON();
            if (
              data.role &&
              data.role.name == "solve-it-investor" &&
              data.profile &&
              !data.profile[0].approved
            ) {
              let error = new Error("Verify");
              next(error);
            } else {
              next();
            }
          } else {
            let error = new Error("Verify");
            next(error);
          }
        } else {
          let notForundError = new Error("User not found");
          next(notForundError);
        }
      }
    );
  });

  // TODO: send user info and role
  Useraccount.afterRemote("login", (ctx, output, next) => {
    Useraccount.findOne(
      { where: { id: output.userId }, include: ["role", "profile"] },
      (err, user) => {
        if (err) next(err);
        // output['user'] = user.toJSON();
        ctx.result = {
          ttl: output.ttl,
          userId: output.userId,
          created: output.created,
          id: output.id,
          user: user.toJSON(),
        };
        next();
      }
    );
  });

  // register SolveIT managment members
  Useraccount.registerSolveItMgt = async (
    firstName,
    middleName,
    lastName,
    email,
    password,
    phoneNumber,
    username
  ) => {
    let { IcogRole } = Useraccount.app.models;
    let userRole = await IcogRole.findOne({
      where: {
        name: "solve-it-mgt",
      },
    });
    let user = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: password,
      email: email,
      username: username,
      roleId: userRole.id,
      created: new Date().toISOString(),
    };

    user = await Useraccount.create(user);

    return user;
  };

  // register SolveIT teams
  Useraccount.registerSolveItTeam = async (
    firstName,
    middleName,
    lastName,
    email,
    password,
    phoneNumber,
    username
  ) => {
    let { IcogRole } = Useraccount.app.models;
    let userRole = await IcogRole.findOne({
      where: {
        name: "solve-it-team",
      },
    });

    let user = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: password,
      email: email,
      username: username,
      roleId: userRole.id,
      created: new Date().toISOString(),
    };

    user = await Useraccount.create(user);

    return user;
  };

  // register SolveIT Judge
  Useraccount.registerSolveItJudge = async (user) => {
    let { IcogRole, judge } = Useraccount.app.models;
    let userRole = await IcogRole.findOne({
      where: {
        name: "solve-it-judge",
      },
    });

    user["roleId"] = userRole.id;
    user["created"] = new Date().toISOString();
    user["password"] = user.password + "";
    user["phoneNumber"] = user.phoneNumber + "";

    let newUser = await Useraccount.create(user);
    let profile = judge.create({ judgeId: newUser.id, ...newUser });

    return newUser;
  };

  // register SolveIT participants
  Useraccount.registerParticipants = async (user) => {
    let { IcogRole } = Useraccount.app.models;
    let userRole = await IcogRole.findOne({
      where: {
        name: "solve-it-participants",
      },
    });

    user["roleId"] = userRole.id;
    user["created"] = new Date().toISOString();
    user["password"] = user.password + "";
    user["phoneNumber"] = user.phoneNumber + "";

    if (user.facebook && user.facebook.authResponse.userID) {
      user["facebookId"] = user.facebook.authResponse.userID;
      user["emailVerified"] = true;
    }

    user = await Useraccount.create(user);

    return user;
  };

  // register SolveIT investor
  Useraccount.registerInvestor = async (user) => {
    let { IcogRole, investorProfile } = Useraccount.app.models;
    let userRole = await IcogRole.findOne({
      where: {
        name: "solve-it-investor",
      },
    });

    user["roleId"] = userRole.id;
    user["created"] = new Date().toISOString();
    user["password"] = user.password + "";
    user["phoneNumber"] = user.phoneNumber + "";

    if (user.facebook && user.facebook.authResponse.userID) {
      user["facebookId"] = user.facebook.authResponse.userID;
      user["emailVerified"] = true;
    }

    user = await Useraccount.create(user);
    let profile = investorProfile.create({ investorId: user.id });

    return user;
  };

  // activate registered user
  Useraccount.activateUser = async (userId) => {
    let user = await Useraccount.updateAll(
      {
        id: userId,
      },
      { status: STATUS[1] }
    );

    return user;
  };

  // confirm email address
  Useraccount.confirmEmail = function (userId, cid, cb) {
    try {
      console.log("from link cid ", cid);
      console.log("from link userId ", userId);
      let { emailConfirmationId } = Useraccount.app.models;
      // var temp = await emailConfirmationId.findOne(
      //   {
      //     where: {
      //       // cId: cid,
      //       userId: userId
      //     },
      //   }
      // );
      // console.log("temp", temp);
        emailConfirmationId.findOne(
        {
          where: {
            cId: cid,
            // userId: userId
          },
        },
        function (err, record) {

          console.log("record ", record);


          // if (record !== null && userId === record.userId) {
            if (record !== null) {
            console.log("record ", record);
            Useraccount.updateAll(
              {
                id: userId,
              },
              {
                emailVerified: true,
              },
              function (err, data) {
                if (err) {
                  console.log("error");
                  cb(err);
                  return;
                } else {
                  console.log("updated ", data);
                  cb(null,true);
                  return;
                }
                console.log("after updated");
              }
            );
          } else {
            console.log("final error");
            let err = new Error();
            cb(err);
            return;
          }
        }
      );
      return;
    }
    catch (e) {
      console.log("caught error", e.toString());
      // let err = new Error(e.toString());
      // cb(err);
      // return;
    }
  };

  Useraccount.deactivateUser = async (userId) => {
    let user = await Useraccount.updateAll(
      {
        id: userId,
      },
      { status: STATUS[0] }
    );

    return user;
  };

  // request password change
  Useraccount.requestPasswordChange = function (email, cb) {
    var pattern = new RegExp(".*" + email + ".*", "i");
    Useraccount.findOne(
      {
        where: {
          email: {
            like: pattern,
          },
        },
      },
      function (err, data) {
        if (err) {
          cb(new Error("Error while searching user"));
        } else {
          if (data !== null) {
            let { forgotPasswordRequest } = Useraccount.app.models;
            const requestId = uniqueid();
            forgotPasswordRequest.create(
              {
                id: requestId,
                userId: data.id,
              },
              function (err, res) {
                if (err) {
                  cb(
                    new Error(
                      "Error while creating forgot password request recored."
                    ),
                    {
                      sucess: false,
                      error: "recored",
                    }
                  );
                } else {
                  //  Email
                  let { Email } = Useraccount.app.models;
                  let email = data.email;
                  let userId = data.id;
                  let html = `<p> <b>${data.firstName}</b>, You have request to change your account password. Please follow the given link.</p>
                            <a href="${url}/change-password/${userId}-${requestId}">password change confirmation link.</a>`;

                  Email.send(
                    {
                      to: email,
                      from: "dannyboy9917@gmail.com",
                      subject: "Confirmation for password change",
                      html: html,
                    },
                    function (err, mail) {
                      if (err) {
                        console.log("Error while sending email ", err);
                        cb(new Error("Error while sending email."), {
                          sucess: false,
                          error: "email",
                        });
                      }
                      console.log("email sent!");
                      cb(null, {
                        sucess: true,
                        error: null,
                      });
                    }
                  );
                }
              }
            );
          } else {
            cb({
              sucess: false,
              error: "notFound",
            });
          }
        }
      }
    );
  };

  // reset password
  Useraccount.updatePassword = function (id, token, password, cb) {
    const buildError = (code, error) => {
      const err = new Error(error);
      err.statusCode = 400;
      err.code = code;
      return err;
    };
    let key = token;
    let { forgotPasswordRequest } = Useraccount.app.models;
    console.log(key);
    const ids = key.split(",");
    const cid = ids[1];
    console.log("cid" + cid);
    forgotPasswordRequest.findOne(
      {
        where: {
          id: cid,
        },
      },
      function (err, data) {
        if (err) {
          console.log("ERr");
          cb(new Error("Error while checking request"));
          return;
        }
        console.log(ids[0]);
        console.log(data.userId);
        console.log(ids[0] == data.userId);
        console.log(!data.inactive);
        if (data && data.userId === ids[0]) {
          console.log("-------======Data Match ");
          forgotPasswordRequest.updateAll(
            {
              id: ids[1],
            },
            {
              inactive: true,
            },
            function (err, response) {
              console.log("update", response);
              if (err) {
                console.log("error while updating");
                cb(err);
                return;
              }
              console.log("No Error");
              Useraccount.findOne(
                {
                  where: {
                    id: id,
                  },
                },
                function (err, user) {
                  if (err) {
                    cb(buildError("INVALID_OPERATION", "unable to find user."));
                    return;
                  }
                  console.log("Foundnndn");
                  user.updateAttribute("password", password, function (
                    err,
                    user
                  ) {
                    if (err) {
                      cb(buildError("INVALID_OPERATION", err));
                      return;
                    } else {
                      console.log("Successful");
                    }

                    // successful,
                    // notify that everything is OK!
                    cb(null, true);
                  });
                }
              );
            }
          );
        } else {
          console.log("NO DATA MATCH");
          cb(null, false);
        }
      }
    );
  };

  // chek if email is unique
  Useraccount.isEmailUnique = function (email, cb) {
    var pattern = new RegExp(".*" + email + ".*", "i");
    Useraccount.findOne(
      {
        where: {
          email: {
            like: pattern,
          },
        },
      },
      function (err, user) {
        if (err) {
          cb(err);
          return;
        }
        if (user === null) {
          cb(null, true);
        } else {
          if (user.email.toLowerCase() === email.toLowerCase()) {
            cb(null, false);
            return;
          } else {
            cb(null, true);
            return;
          }
        }
      }
    );
  };

  // search password
  Useraccount.searchUser = function (keyword, userId, cb) {
    let trimedKeyword = keyword.trim();
    if (
      trimedKeyword.startsWith("+2519") ||
      trimedKeyword.startsWith("2519") ||
      trimedKeyword.startsWith("09")
    ) {
      trimedKeyword = trimedKeyword.slice(trimedKeyword.indexOf("9"));
    }
    let pattern = new RegExp(
      ".*" + trimedKeyword + ".*",
      "i"
    ); /* case-insensitive RegExp search */
    if (trimedKeyword !== "") {
      Useraccount.find(
        { where: { id: userId }, include: ["role", "city"] },
        (error, user) => {
          if (error) cb(new Error("Error while fetching user."));
          if (user.length > 0) {
            if (
              user[0].role().name === "admin" ||
              user[0].role().name === "solve-it-mgt"
            ) {
              Useraccount.find(
                {
                  where: {
                    and: [
                      {
                        or: [
                          {
                            email: {
                              like: pattern,
                            },
                          },
                          {
                            firstName: {
                              like: pattern,
                            },
                          },
                          {
                            middleName: {
                              like: pattern,
                            },
                          },
                          {
                            lastName: {
                              like: pattern,
                            },
                          },
                          {
                            username: {
                              like: pattern,
                            },
                          },
                          {
                            phoneNumber: {
                              like: pattern,
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
                function (err, users) {
                  users = users.map((user) => ({
                    id: user.id,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    username: user.username,
                  }));
                  cb(null, users);
                }
              );
            } else {
              console.log("Well Hello There");
              let { IcogRole } = Useraccount.app.models;
              IcogRole.findOne(
                {
                  where: {
                    or: [
                      { name: "solve-it-team" },
                      { name: "solve-it-participants" },
                    ],
                  },
                },
                function (err, role) {
                  let city = user[0].toJSON().city;
                  console.log(city.id);
                  Useraccount.find(
                    {
                      where: {
                        and: [
                          {
                            roleId: role.id,
                          },
                          {
                            cityId: city.id,
                          },
                          {
                            or: [
                              {
                                email: {
                                  like: pattern,
                                },
                              },
                              {
                                firstName: {
                                  like: pattern,
                                },
                              },
                              {
                                middleName: {
                                  like: pattern,
                                },
                              },
                              {
                                lastName: {
                                  like: pattern,
                                },
                              },
                              {
                                username: {
                                  like: pattern,
                                },
                              },
                              {
                                phoneNumber: {
                                  like: pattern,
                                },
                              },
                            ],
                          },
                        ],
                      },
                      include: "city",
                    },
                    function (err, users) {
                      users = users.map((user) => ({
                        id: user.id,
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        username: user.username,
                      }));
                      cb(null, users);
                    }
                  );
                }
              );
            }
          }
        }
      );
    } else {
      cb(null, []);
    }
  };

  // get users by role
  Useraccount.getUserListByRole = function (roleId, cb) {
    Useraccount.find(
      {
        where: {
          roleId: roleId,
        },
      },
      function (err, users) {
        cb(null, users);
      }
    );
  };

  // export user data
  Useraccount.exportData = async (selectionOptions, res) => {
    var workbook = new Excel.Workbook();
    var sheet = workbook.addWorksheet("report");

    const { IcogRole } = Useraccount.app.models;
    const City = Useraccount.app.models.City;

    const role = await IcogRole.findOne({
      where: { name: "solve-it-participants" },
    });

    var sex = selectionOptions.sex;
    var educationLevel = selectionOptions.educationLevel;
    var status = selectionOptions.selectedStatus;
    var age = selectionOptions.selectedAge;
    var cities = [];
    var users = [];

    if (selectionOptions.selectedCity.toString() === "0") {
      cities = await City.find({ include: "region" });
    } else {
      let city = await City.findOne({
        where: { id: selectionOptions.selectedCity },
        include: "region",
      });
      cities.push(city);
    }
    sheet.columns = [
      { header: "Region", key: "region", width: 10 },
      { header: "City", key: "city", width: 10 },
      { header: "First Name", key: "firstName", width: 10 },
      { header: "Middle Name", key: "middleName", width: 10 },
      { header: "Last Name", key: "lastName", width: 10 },
      { header: "Gender", key: "sex", width: 10 },
      { header: "Phone Number", key: "phoneNumber", width: 10 },
      { header: "Education Level", key: "educationLevel", width: 10 },
      { header: "Work Status", key: "workStatus", width: 10 },
      { header: "Birthdate", key: "birthDate", width: 10 },
      { header: "Emergency Name", key: "emergencyName", width: 10 },
      { header: "Emergency Contact", key: "emergencyContact", width: 10 },
    ];
    let genderQuery = {};
    let educationQuery = {};
    let statusQuery = {};
    let ageQuery = {};

    if (sex != "both") {
      genderQuery = { gender: sex };
    }
    if (educationLevel != "none") {
      educationQuery = { educationLevel: educationLevel };
    }
    if (status != 0) {
      statusQuery = { workStatus: status };
    }

    if (age != 0) {
      let now = new Date();
      let ageParam = now.setFullYear(now.getFullYear() - age);
      ageParam = new Date(ageParam);
      ageQuery = { birthDate: { gte: ageParam } };
    }

    for (const city of cities) {
      let now = new Date(2020, 0, 1);
      users = await Useraccount.find({
        where: {
          is_waiting: { neq: true },
          created: { gte: now },
          cityId: city.id,
          ...genderQuery,
          ...educationQuery,
          ...statusQuery,
          ...ageQuery,
        },
      });
      for (const user of users) {
        let date = new Date(user.birthDate);
        let now = new Date();
        let ageParam = now.setFullYear(now.getFullYear() - date.getFullYear());
        ageParam = new Date(ageParam);
        let yearDiff = ageParam.getFullYear();
        sheet.addRow({
          region: JSON.parse(JSON.stringify(city)).region.name,
          city: city.name,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          sex: user.gender,
          phoneNumber: user.phoneNumber,
          educationLevel: user.educationLevel,
          workStatus: user.workStatus,
          birthDate: yearDiff,
          emergencyName: user.address.emergencyContact.fullName,
          emergencyContact: user.address.emergencyContact.phoneNumber,
        });
      }
    }

    // if (sex == 'both' && educationLevel == 'none') {
    //   for (const city of cities) {
    //     users = await Useraccount.find({where: {cityId: city.id}});
    //     for (const user of users) {
    //       sheet.addRow({
    //         region: JSON.parse(JSON.stringify(city)).region.name,
    //         city: city.name,
    //         firstName: user.firstName,
    //         middleName: user.middleName,
    //         lastName: user.lastName,
    //         sex: user.gender,
    //         phoneNumber: user.phoneNumber,
    //         educationLevel: user.educationLevel,
    //         workStatus: user.workStatus,
    //         birthDate: user.birthDate.toString().substr(0, 10),
    //         emergencyName: user.address.emergencyContact.fullName,
    //         emergencyContact: user.address.emergencyContact.phoneNumber,
    //       });
    //     }
    //   }
    // } else if (sex == 'both' || educationLevel == 'none') {
    //   if (sex == 'both') {
    //     for (const city of cities) {
    //       users = await Useraccount.find({
    //         where: {cityId: city.id, educationLevel: educationLevel},
    //       });
    //       for (const user of users) {
    //         sheet.addRow({
    //           region: JSON.parse(JSON.stringify(city)).region.name,
    //           city: city.name,
    //           firstName: user.firstName,
    //           middleName: user.middleName,
    //           lastName: user.lastName,
    //           sex: user.gender,
    //           phoneNumber: user.phoneNumber,
    //           educationLevel: user.educationLevel,
    //           workStatus: user.workStatus,
    //           birthDate: user.birthDate.toString().substr(0, 10),
    //           emergencyName: user.address.emergencyContact.fullName,
    //           emergencyContact: user.address.emergencyContact.phoneNumber,
    //         });
    //       }
    //     }
    //   } else {
    //     for (const city of cities) {
    //       users = await Useraccount.find({
    //         where: {cityId: city.id, gender: sex},
    //       });
    //       for (const user of users) {
    //         sheet.addRow({
    //           region: JSON.parse(JSON.stringify(city)).region.name,
    //           city: city.name,
    //           firstName: user.firstName,
    //           middleName: user.middleName,
    //           lastName: user.lastName,
    //           sex: user.gender,
    //           phoneNumber: user.phoneNumber,
    //           educationLevel: user.educationLevel,
    //           workStatus: user.workStatus,
    //           birthDate: user.birthDate.toString().substr(0, 10),
    //           emergencyName: user.address.emergencyContact.fullName,
    //           emergencyContact: user.address.emergencyContact.phoneNumber,
    //         });
    //       }
    //     }
    //   }
    // } else {
    //   for (const city of cities) {
    //     users = await Useraccount.find({
    //       where: {cityId: city.id, educationLevel: educationLevel, gender: sex},
    //     });
    //     for (const user of users) {
    //       sheet.addRow({
    //         region: JSON.parse(JSON.stringify(city)).region.name,
    //         city: city.name,
    //         firstName: user.firstName,
    //         middleName: user.middleName,
    //         lastName: user.lastName,
    //         sex: user.gender,
    //         phoneNumber: user.phoneNumber,
    //         educationLevel: user.educationLevel,
    //         workStatus: user.workStatus,
    //         birthDate: user.birthDate.toString().substr(0, 10),
    //         emergencyName: user.address.emergencyContact.fullName,
    //         emergencyContact: user.address.emergencyContact.phoneNumber,
    //       });
    //     }
    //   }
    // }
    await sendWorkbook(workbook, res);
  };

  async function sendWorkbook(workbook, response) {
    var fileName = "ExportedData.xlsx";

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + fileName
    );

    await workbook.xlsx.write(response);

    response.end();
  }

  Useraccount.getAssignedCities = async function (id) {
    const { AssignedCity } = Useraccount.app.models;
    try {
      const cities = await AssignedCity.findOne({ where: { userId: id } });
      return cities;
    } catch (error) {
      return error;
    }
  };
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  Useraccount.exportMention = async (res) => {
    var workbook = new Excel.Workbook();
    var mediaResourcesSheet = workbook.addWorksheet("media-resource");
    var mediaNameSheet = workbook.addWorksheet("media-name");

    const { IcogRole } = Useraccount.app.models;
    const CompetitionProjects = Useraccount.app.models.CompetitionProject;

    mediaNameSheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Count", key: "count", width: 10 },
    ];
    mediaResourcesSheet.columns = [
      { header: "Media Resource", key: "name", width: 30 },
      { header: "Count", key: "count", width: 10 },
    ];
    let now = new Date(2020, 0, 1);
    let competitionProjects = await CompetitionProjects.find({});

    let mediaResources = [];
    let others = [];
    competitionProjects.forEach((project) => {
      if (project.questionnaireAnswers) {
        if (project.questionnaireAnswers.furtherInfo) {
          mediaResources = [
            ...mediaResources,
            ...project.questionnaireAnswers.furtherInfo.mediaResource,
          ];
          others = [
            ...others,
            project.questionnaireAnswers.furtherInfo.mediaName,
          ];
          // console.log(project.questionnaireAnswers.furtherInfo.mediaResource);
        }
      }
    });
    console.log("============Media Names ============");

    console.log(others.length);

    var occurences = {};
    for (var index = 0; index < others.length; index++) {
      var value = others[index].toLowerCase().trim();
      occurences[value] = occurences[value] ? occurences[value] + 1 : 1;
    }
    let keys = Object.keys(occurences);
    console.log("len " + keys.length);
    let reso = [];
    keys.forEach((key) => {
      if (occurences[key] > 1) {
        let temp = {};
        temp[key] = occurences[key];
        reso.push(temp);
      }
    });
    console.log(reso);

    reso.forEach((resoo) => {
      let key = Object.keys(resoo)[0];
      mediaNameSheet.addRow({
        name: key,
        count: resoo[key],
      });
    });
    console.log("Media Resources ==============");
    console.log(mediaResources.length);
    const grouped = groupBy(mediaResources, (media) => media.item_id);
    for (let i = 1; i <= 10; i++) {
      console.log(i);
      let group = grouped.get(i);
      if (group) {
        console.log(group.length);
        console.log(group[0]);
        mediaResourcesSheet.addRow({
          name: group[0].item_text,
          count: group.length,
        });
      }
    }
    console.log("Herer");
    await sendWorkbook(workbook, res);
  };
  Useraccount.remoteMethod("exportMention", {
    description: "return data.",
    accepts: [
      {
        arg: "res",
        type: "object",
        http: {
          source: "res",
        },
      },
    ],
    http: {
      verb: "post",
      path: "/exportMention",
    },
    returns: {
      type: "object",
      root: true,
    },
  });
  Useraccount.remoteMethod("exportData", {
    description: "return data.",
    accepts: [
      {
        arg: "selectionOptions",
        type: "object",
        required: true,
      },
      {
        arg: "res",
        type: "object",
        http: {
          source: "res",
        },
      },
    ],
    http: {
      verb: "post",
      path: "/exportData",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("searchUser", {
    http: {
      path: "/search/:keyword/:userId",
      verb: "get",
    },
    accepts: [
      {
        arg: "keyword",
        type: "string",
      },
      {
        arg: "userId",
        type: "string",
      },
    ],
    returns: {
      arg: "Result",
      type: "Object",
    },
  });

  Useraccount.remoteMethod("getUserListByRole", {
    http: {
      path: "/role/:roleId/users",
      verb: "get",
    },
    accepts: {
      arg: "roleId",
      type: "string",
    },
    returns: {
      arg: "Result",
      type: "Object",
    },
  });

  Useraccount.remoteMethod("requestPasswordChange", {
    http: {
      path: "/request-password-change",
      verb: "post",
    },
    accepts: {
      arg: "email",
      type: "string",
      required: true,
    },
    returns: {
      arg: "result",
      type: "object",
    },
  });

  Useraccount.remoteMethod("registerSolveItMgt", {
    desctiption: "Register SolveIT managment users",
    accepts: [
      {
        arg: "firstName",
        type: "string",
        required: true,
      },
      {
        arg: "middleName",
        type: "string",
        required: true,
      },
      {
        arg: "lastName",
        type: "string",
        required: true,
      },
      {
        arg: "email",
        type: "string",
        required: true,
      },
      {
        arg: "password",
        type: "string",
        required: true,
      },
      {
        arg: "phoneNumber",
        type: "string",
        required: true,
      },
      {
        arg: "username",
        type: "string",
        require: true,
      },
    ],
    http: {
      verb: "post",
      path: "/register-solveit-mgt",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("registerSolveItTeam", {
    desctiption: "Register SolveIT teams.",
    accepts: [
      {
        arg: "firstName",
        type: "string",
        required: true,
      },
      {
        arg: "middleName",
        type: "string",
        required: true,
      },
      {
        arg: "lastName",
        type: "string",
        required: true,
      },
      {
        arg: "email",
        type: "string",
        required: true,
      },
      {
        arg: "password",
        type: "string",
        required: true,
      },
      {
        arg: "phoneNumber",
        type: "string",
        required: true,
      },
      {
        arg: "username",
        type: "string",
        require: true,
      },
    ],
    http: {
      verb: "post",
      path: "/register-solveit-team",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("registerParticipants", {
    description: "Register SolveIT teams.",
    accepts: [
      {
        arg: "user",
        type: "object",
        required: true,
      },
    ],
    http: {
      verb: "post",
      path: "/register-participants",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("registerInvestor", {
    description: "Register SolveIT Investor.",
    accepts: [
      {
        arg: "user",
        type: "object",
        required: true,
      },
    ],
    http: {
      verb: "post",
      path: "/register-investor",
    },
    returns: {
      type: "object",
      root: true,
    },
  });
  Useraccount.remoteMethod("registerSolveItJudge", {
    description: "Register SolveIT Judge.",
    accepts: [
      {
        arg: "user",
        type: "object",
        required: true,
      },
    ],
    http: {
      verb: "post",
      path: "/register-judge",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("updatePassword", {
    desctiption: "update user password.",
    accepts: [
      {
        arg: "id",
        type: "string",
        required: true,
      },
      {
        arg: "token",
        type: "string",
        required: true,
      },
      {
        arg: "password",
        type: "string",
        required: true,
      },
    ],
    http: {
      verb: "post",
      path: "/update-password",
    },
    returns: {
      type: "object",
      root: true,
      arg: "success",
    },
  });

  Useraccount.remoteMethod("activateUser", {
    desctiption: "Activate registered user",
    accepts: {
      arg: "userId",
      type: "string",
      require: true,
    },
    http: {
      verb: "post",
      path: "/activate-user",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("deactivateUser", {
    description: "Deactivate registered user",
    accepts: {
      arg: "userId",
      type: "string",
      require: true,
    },
    http: {
      verb: "post",
      path: "/deactivate-user",
    },
    returns: {
      type: "object",
      root: true,
    },
  });

  Useraccount.remoteMethod("confirmEmail", {
    description: "Confirm email address",
    accepts: [
      {
        arg: "userId",
        type: "string",
        require: true,
      },
      {
        arg: "cid",
        type: "string",
        require: true,
      },
    ],
    http: {
      verb: "post",
      path: "/confirmEmail",
    },
    returns: {
      type: "boolean",
      arg: "result",
    },
  });

  Useraccount.remoteMethod("isEmailUnique", {
    http: {
      path: "/is-email-unique",
      verb: "post",
    },
    accepts: {
      arg: "email",
      type: "string",
      require: true,
    },
    returns: {
      arg: "result",
      type: "Object",
      root: true,
    },
  });

  Useraccount.remoteMethod("getAssignedCities", {
    http: {
      path: "/:id/get-assigned-cities",
      verb: "get",
    },
    accepts: {
      arg: "id",
      type: "string",
      require: true,
    },
    returns: {
      arg: "result",
      type: "Object",
      root: true,
    },
  });

  Useraccount.signInWithFB = function (user, cb) {
    const { AccessToken } = Useraccount.app.models;
    if (user.authResponse.userID && user.authResponse.userID === "") {
      return cb(new Error("Invalid user data."));
    } else {
      Useraccount.findOne(
        { where: { facebookId: user.authResponse.userID } },
        (error, data) => {
          if (error) {
            cb(error);
          } else {
            AccessToken.createAccessTokenId((err, token) => {
              if (err) {
                cb(err);
              } else {
                const accessToken = {
                  ttl: 1209600,
                  created: new Date(),
                  userId: data.id,
                  id: token,
                };

                AccessToken.create(accessToken, (err1, success) => {
                  if (err1) {
                    cb(err1);
                  } else {
                    cb(null, success);
                  }
                });
              }
            });
          }
        }
      );
    }
  };

  Useraccount.remoteMethod("signInWithFB", {
    http: {
      path: "/signInWithFB",
      verb: "post",
    },
    accepts: {
      arg: "user",
      type: "object",
      require: true,
    },
    returns: {
      arg: "result",
      type: "Object",
      root: true,
    },
  });

  Useraccount.logoutUser = async (tokenId) => {
    const { AccessToken } = Useraccount.app.models;
    if (!tokenId) return true;

    const token = await AccessToken.findOne({
      where: {
        id: tokenId,
      },
    });

    if (!token) return true;

    console.log("token");
    console.log(token);

    try {
      await Useraccount.logout(tokenId);
    } catch (err) {
      throw err;
    }
    return true;
  };
  Useraccount.remoteMethod("logoutUser", {
    accepts: [
      {
        arg: "tokenId",
        type: "string",
        required: true,
      },
    ],
    returns: { type: "object", root: true },
    http: { path: "/logout-user", verb: "post" },
  });
};
