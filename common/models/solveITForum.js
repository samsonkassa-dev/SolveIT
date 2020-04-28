"use strict";

module.exports = function (Solveitforum) {
  //  disable delete end point
  Solveitforum.disableRemoteMethod("deleteById", true);
  Solveitforum.disableRemoteMethod("destroyById", true);
  Solveitforum.disableRemoteMethod("removeById", true);

  Solveitforum.getBySlung = function (slung, cb) {
    Solveitforum.find({ where: { slung: slung } }, function (err, forum) {
      cb(null, forum);
    });
  };

  Solveitforum.getForumList = function (cb) {
    var count = 0;
    var forumList = [];
    const Category = Solveitforum.app.models.forumCategory;
    Category.find(function (err, categories) {
      if (categories.length == 0) {
        cb(null, forumList);
      } else {
        for (const category of categories) {
          Solveitforum.find(
            {
              where: { categoryId: category.id },
              order: "discussionCount DESC",
              limit: 4,
            },
            function (err, forums) {
              forumList = forumList.concat(forums);
              count += 1;
              if (count == categories.length) {
                cb(null, forumList);
              }
            }
          );
        }
      }
    });
  };

  Solveitforum.addCityMemebers = function (forum_id, city_id, cb) {
    const { UserAccount, forum_member } = Solveitforum.app.models;
    if (forum_id && city_id) {
      let now = new Date(2020, 0, 1);
      UserAccount.find(
        { where: { created: { gte: now }, cityId: city_id } },
        async function (err, records) {
          if (err) {
            cb(err);
          } else {
            try {
              let forum = await Solveitforum.findOne({
                where: { _id: forum_id },
              });
              let res = records.map((record) => {
                return {
                  userId: record.id,
                  forumId: forum.id,
                };
              });
              forum_member.create(res, (err, result) => {
                console.log(result);
                if (err) {
                  console.log(err);
                }
                console.log(records.length);
                cb(null, res);
              });
            } catch (error) {
              cb(error);
            }
          }
        }
      );
    } else {
      let error = new Error("Required city id");
      cb(error);
    }
  };

  Solveitforum.remoteMethod("addCityMemebers", {
    http: { path: "/add-city-members", verb: "post" },
    accepts: [
      { arg: "forum_id", type: "string" },
      { arg: "city_id", type: "string" },
    ],
    returns: { arg: "Result", type: "Object" },
  });

  Solveitforum.remoteMethod("getForumList", {
    http: { path: "/forumList", verb: "get" },
    accepts: [],
    returns: { arg: "Result", type: "Object" },
  });

  Solveitforum.remoteMethod("getBySlung", {
    http: { path: "/:slung/forum", verb: "get" },
    accepts: { arg: "slung", type: "string" },
    returns: { arg: "Result", type: "Object" },
  });
};
