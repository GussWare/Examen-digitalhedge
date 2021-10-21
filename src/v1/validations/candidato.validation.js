import Joi from "joi";
import { password, objectId } from "./custom.validation";

export const getPaginate = {
	query: Joi.object().keys({
		skills:Joi.string()
	}),
};

export const getCandidatoById = {
	params: Joi.object().keys({
		candidatoId: Joi.string().custom(objectId),
	}),
};

export const createCandidato = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		skills: Joi.array().required()
	}),
};

export const updateCandidato = {
	params: Joi.object().keys({
		candidatoId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
		    skills: Joi.array().required()
		})
		.min(1),
};

export const deleteCandidato = {
	params: Joi.object().keys({
		candidatoId: Joi.string().required().custom(objectId),
	}),
};
