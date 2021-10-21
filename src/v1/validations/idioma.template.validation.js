import Joi from "joi";
import { password, objectId } from "./custom.validation";

export const getPaginate = {
	query: Joi.object().keys({
		name:Joi.string(),
		idioma:Joi.string(),
		description:Joi.string(),
		default:Joi.boolean(),
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getIdiomaTemplateById = {
	params: Joi.object().keys({
		idiomaId: Joi.string().custom(objectId),
	}),
};

export const createIdiomaTemplate= {
	body: Joi.object().keys({
		name:Joi.string().required(),
		idioma:Joi.string().required(),
		description:Joi.string().required(),
		default:Joi.boolean().required(),
		tags:Joi.array().required()
	}),
};

export const updateIdiomaTemplate= {
	params: Joi.object().keys({
		actionId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name:Joi.string().required(),
			idioma:Joi.string().required(),
			description:Joi.string().required(),
			default:Joi.boolean().required(),
			tags:Joi.array().required()
		})
		.min(1),
};

export const deleteIdiomaTemplate= {
	params: Joi.object().keys({
		idiomaId: Joi.string().custom(objectId),
	}),
};
