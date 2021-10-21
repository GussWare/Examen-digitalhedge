import httpStatus from "http-status";
import CandidatoModel from "../../models/candidatos.model";
import ApiError from "../../libraries/api.error.library";
import loggerHelper from "../../helpers/logger.helper";

export const getPaginate = async (filter, options) => {
	const pagination = await CandidatoModel.paginate(filter, options);
	return pagination;
};

export const getCandidatos = async (skills) => {
	loggerHelper.debug(skills);
	const skillSearch = skills.split(",");
	loggerHelper.debug(JSON.stringify(skillSearch));
	const candidatos = await CandidatoModel.find({skills: {$all: skillSearch}});

	return candidatos;
};

export const getCandidatoById = async (id) => {
	const candidato = await CandidatoModel.findById(id);
	return candidato;
};

export const createCandidato = async (createBody) => {
	let user = await CandidatoModel.create(createBody);

	return user;
};

export const updateCandidato = async (id, updateBody) => {
	const candidato = await getCandidatoById(id);

	Object.assign(candidato, updateBody);

	const candidatoUpdated = await candidato.save();
	return candidatoUpdated;
};

export const deleteCandidato = async (id) => {
	const candidato = await getCandidatoById(id);

	if (!candidato) {
		return null;
	}

	await CandidatoModel.remove({
		_id: id
	});

	return candidato;
};
