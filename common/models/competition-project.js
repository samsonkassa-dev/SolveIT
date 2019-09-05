'use strict';

module.exports = function(Competitionproject) {
  //  disable delete end point
  Competitionproject.disableRemoteMethod('deleteById', true);
  Competitionproject.disableRemoteMethod('destroyById', true);
  Competitionproject.disableRemoteMethod('removeById', true);

  Competitionproject.enroll = function(
    competitionId,
    projectId,
    questionnaireAnswers,
    cb
  ) {
    const temp = {competitionId, projectId, questionnaireAnswers};
    Competitionproject.findOrCreate(
      {where: {and: [{competitionId: competitionId}, {projectId: projectId}]}},
      temp,
      (error, response) => {
        if (error) cb(error);
        cb(null, response);
      }
    );
  };

  Competitionproject.getProjectEnrollmentStatus = async projectId => {
    const status = await Competitionproject.find({
      where: {projectId: projectId},
    });

    return status.length > 0 ? true : false;
  };

  // make recommendation of projects for an investor
  Competitionproject.recommendation = async function(req) {
    let {
      projectView,
      productTypeView,
      sectorView,
      Solveitproject,
      investorProfile,
    } = Competitionproject.app.models;
    const userId = req.accessToken.userId;

    // to make sum of an attribute from array of objects
    Array.prototype.sum = function(prop) {
      var total = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop];
      }
      return total;
    };

    // to find index of an object by its property
    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    let productTypeMetrics = await productTypeView.find({
      where: {userId: userId},
    });
    let totalProductTypeViewCount = productTypeMetrics.sum('viewCount');
    productTypeMetrics = productTypeMetrics.map(object => ({
      ...object,
      percentage: (object.viewCount / totalProductTypeViewCount) * 100,
    }));

    let sectorMetrics = await sectorView.find({where: {userId: userId}});
    let totalSectorViewCount = sectorMetrics.sum('viewCount');
    sectorMetrics = sectorMetrics.map(object => ({
      ...object,
      percentage: (object.viewCount / totalSectorViewCount) * 100,
    }));

    let profile = await investorProfile.find({where: {investorId: userId}});

    let productTypes = productTypeMetrics.map(metrics => metrics.productTypeId);
    let sectors = sectorMetrics.map(metrics => metrics.sectorId);

    let competitionProjects = await Competitionproject.find({
      include: ['solveitproject'],
    });
    let recommendedProjects = competitionProjects.filter(item => {
      return (
        productTypes.indexOf(
          item.questionnaireAnswers.innovationInfo.productType
        ) > -1 ||
        sectors.indexOf(item.questionnaireAnswers.innovationInfo.sector) > -1
      );
    });

    recommendedProjects = recommendedProjects.map(object => ({
      ...object,
      percentage:
        productTypeMetrics[
          productTypeMetrics.indexOf(
            findWithAttr(
              productTypeMetrics,
              'productTypeId',
              object.questionnaireAnswers.innovationInfo.productType
            )
          )
        ].percentage /
          2 +
        sectorMetrics[
          sectorMetrics.indexOf(
            findWithAttr(
              sectorMetrics,
              'sectorId',
              object.questionnaireAnswers.innovationInfo.sector
            )
          )
        ].percentage /
          2,
    }));

    return recommendedProjects;
  };

  Competitionproject.getAssignedProjects = async userid => {
    const {
      solvieITCompetition,
      UserAccount,
      city,
    } = Competitionproject.app.models;

    let assignedProjects = [];

    const activeCompetition = await solvieITCompetition.findOne({
      where: {active: true},
    });
    try {
      const cities = await UserAccount.getAssignedCities(userid);

      const projects = await solvieITCompetition.getCompetitionProjectsWithCity(
        activeCompetition.id
      );

      if (projects.length === 0) return [];

      projects.forEach(project => {
        let mentoreCities = project.toJSON().cities;

        if (mentoreCities) {
          cities.cities.forEach(city => {
            if (city == mentoreCities[0]) {
              assignedProjects.push(project);
            }
          });
        }
      });
      return {assignedProjects, assignedCities: cities.cities};
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  Competitionproject.remoteMethod('enroll', {
    description: 'Enroll project to competition.',
    accepts: [
      {
        arg: 'competitionId',
        type: 'string',
        require: true,
      },
      {
        arg: 'projectId',
        type: 'string',
        require: true,
      },
      {
        arg: 'questionnaireAnswers',
        type: 'object',
        require: true,
      },
    ],
    http: {
      verb: 'post',
      path: '/enroll',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  Competitionproject.remoteMethod('getProjectEnrollmentStatus', {
    description: 'Get status of enrollment of a project.',
    accepts: [
      {
        arg: 'projectId',
        type: 'string',
        require: true,
      },
    ],
    http: {
      verb: 'get',
      path: '/getProjectEnrollmentStatus/:projectId',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  Competitionproject.remoteMethod('recommendation', {
    description: 'Recommend projects for the investor',
    accepts: [
      {
        arg: 'req',
        type: 'object',
        http: {source: 'req'},
      },
    ],
    http: {
      verb: 'get',
      path: '/recommendations',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  Competitionproject.remoteMethod('getAssignedProjects', {
    description: 'return assigned projects for mentors',
    accepts: [
      {
        arg: 'userId',
        type: 'string',
      },
    ],
    http: {
      verb: 'get',
      path: '/getAssignedProjects/:userId',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });
};
