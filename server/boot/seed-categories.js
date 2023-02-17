'use strict';
var fs = require('fs');

module.exports = function (app) {
  const { forumCategory } = app.models;
  const { tag } = app.models;
  const { Region } = app.models;

  const categories = [
    "Python",
    "Java",
    "Web",
    "AI",
    "Robotics",
    "Others"
  ];

  const regions = [
    "Addis Ababa",
    "Dire Dawa",
    "Tigray",
    "Afar",
    "Amhara",
    "Oromia",
    "Somali",
    "Benishangul-Gumuz",
    "SNNPR",
    "Gambella",
    "Harari",
  ];

  const directories = [
    "proposals",
    "resources",
    "reports",
    "news",
    "discussions",
    "winner-thumbinals",
    "solveit-team"

  ]

  const tags = [
    "PHP",
    "OOP",
    "Node",
    "Machine Learning",
    "Deep Learning"
  ];

  const populateCategories = async () => {
    for (let i = 0; i < categories.length; i++) {
      forumCategory.findOrCreate({ where: { category: categories[i] } }, { category: categories[i] })
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        })

    }
    console.log("Categories added.");

  };

  const populateTags = async () => {
    for (let i = 0; i < tags.length; i++) {
      tag.findOrCreate({ where: { name: tags[i] } }, { name: tags[i] })
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        })
    }
    console.log("Tags added.");

  }

  const populateRegions = async () => {
    for (let i = 0; i < regions.length; i++) {
      await Region.findOrCreate({ where: { name: regions[i] } }, { name: regions[i] })
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        })
    }
    console.log("Regions added.");
  }

  const createDirectories = async () => {
    for (let index = 0; index < directories.length; index++) {
      var dir = __dirname + '/../files/' + directories[index];
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    console.log("Directories Created.");

  }

  async function createConstants() {
    await populateCategories();
    await populateTags();
    await populateRegions();
    await createDirectories();
  }

  createConstants();
};
