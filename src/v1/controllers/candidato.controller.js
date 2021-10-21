import httpStatus from "http-status";
import * as candidatoService from "../services/candidatos/candidato.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";
import loggerHelper from "../helpers/logger.helper";
import catchAsyncHelper from "../helpers/catch.async.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, ["skill"]);
	const options = pickHelper(req.query, ["search", "sortBy", "limit", "page"]);

	const response = await candidatoService.getPaginate(filter, options);

	res.send(response);
});

export const getCandidatos = catchAsyncHelper(async (req, res) => {
	const skills = req.query.skills || "";
	const candidatos = await candidatoService.getCandidatos(skills);
	res.send({ candidatos });
});

export const getCandidatoById = catchAsyncHelper(async (req, res) => {
	const candidato = await candidatoService.getCandidatoById(req.params.userId);

	if (!candidato) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("USERS_ERROR_USER_NOT_FOUND"));
	}

	res.send({ candidato });
});

export const createCandidato = catchAsyncHelper(async (req, res) => {
	const candidato = await candidatoService.createCandidato(req.body);
	res.send({ candidato });
});

export const updateCandidato = catchAsyncHelper(async (req, res) => {
	const candidato = await candidatoService.updateCandidato(req.params.userId, req.body);

	if (!candidato) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("USERS_ERROR_USER_NOT_FOUND"));
	}

	res.send({ candidato });
});

export const deleteCandidato = catchAsyncHelper(async (req, res) => {
	const candidato = await candidatoService.deleteCandidato(req.params.userId);

	if (!candidato) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ candidato });
});