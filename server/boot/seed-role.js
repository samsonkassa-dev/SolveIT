'use strict';

module.exports = function(app) {
  const { IcogRole } = app.models;

    //  Seed iCog admin role
  	const createIcogAminRole = /**async**/ () => {

	    const role = { name: "admin", description: "Icog admin role" };

	    return IcogRole.findOrCreate({ where: { name: "admin" } }, role)
	      .then(createdRole => {})
	      .then(instance => Promise.resolve(instance))
	      .catch(err => Promise.reject(err));
	  };

	  //  Seed SolveIT mentor role
  	const createSolveItMentorRole = /**async**/ () => {

	    const role = { name: "solve-it-mentor", description: "SolveIt mentor role" };

	    return IcogRole.findOrCreate({ where: { name: "solve-it-mentor" } }, role)
	      .then(createdRole => {})
	      .then(instance => Promise.resolve(instance))
	      .catch(err => Promise.reject(err));
	  };
  	// Seed SolveIT managment team role
  	const createSolveItMgtRole = async () => {
	    const role = { name: "solve-it-mgt", description: "SolveIT managment team role." };

	    return IcogRole.findOrCreate({ where: { name: "solve-it-mgt" } }, role)
	      .then(createdRole => {})
	      .then(instance => Promise.resolve(instance))
	      .catch(err => Promise.reject(err));
	  };

    // Seed SolveIT team role
  	const createSolveItTeamRole = async () => {
	    const role = { name: "solve-it-team", description: "SolveIT team role." };

	    return IcogRole.findOrCreate({ where: { name: "solve-it-team" } }, role)
	      .then(createdRole => {})
	      .then(instance => Promise.resolve(instance))
	      .catch(err => Promise.reject(err));
	};

    // Seed SolveIT participants role
  	const createSolveItParticipantsRole = async () => {
	    const role = { name: "solve-it-participants", description: "SolveIT participants role." };

	    return IcogRole.findOrCreate({ where: { name: "solve-it-participants" } }, role)
	      .then(createdRole => {})
	      .then(instance => Promise.resolve(instance))
	      .catch(err => Promise.reject(err));
	};

	// Seed SolveIT investor role
	const createSolveItInvestorRole = async () => {
			const role = { name: "solve-it-investor", description: "SolveIT investor role." };

			return IcogRole.findOrCreate({ where: { name: "solve-it-investor" } }, role)
				.then(createdRole => {})
				.then(instance => Promise.resolve(instance))
				.catch(err => Promise.reject(err));
	};
// Seed SolveIT Judge role
const createSolveItJudgeRole = async () => {
	const role = { name: "solve-it-judge", description: "SolveIT Judge role." };

	return IcogRole.findOrCreate({ where: { name: "solve-it-judge" } }, role)
		.then(createdRole => {})
		.then(instance => Promise.resolve(instance))
		.catch(err => Promise.reject(err));
};


  createIcogAminRole();
	createSolveItMgtRole();
	createSolveItTeamRole();
	createSolveItMentorRole();
	createSolveItParticipantsRole();
	createSolveItInvestorRole();
	createSolveItJudgeRole();

};
