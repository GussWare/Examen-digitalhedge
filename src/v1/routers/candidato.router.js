import express from "express";
import * as CandidatoController from "../controllers/candidato.controller";
import * as candidatoValidation from "../validations/candidato.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/candidatos",
	[auth("candidatos_list"), validateMiddleware(candidatoValidation.getPaginate)],
	CandidatoController.getCandidatos
);

router.get(
	"/candidatos/:candidatoId",
	[auth("candidatos_get_by_id"), validateMiddleware(candidatoValidation.getCandidatoById)],
	CandidatoController.getCandidatoById
);

router.post(
	"/candidatos",
	[auth("candidatos_create"), validateMiddleware(candidatoValidation.createCandidato)],
	CandidatoController.createCandidato
);

router.put(
	"/candidatos/:candidatoId",
	[auth("candidatos_update"), validateMiddleware(candidatoValidation.updateCandidato)],
	CandidatoController.updateCandidato
);

router.delete(
	"/candidatos/:candidatoId",
	[auth("candidatos_delete"), validateMiddleware(candidatoValidation.deleteCandidato)],
	CandidatoController.deleteCandidato
);

router.patch(
	"/candidatos/:candidatoId",
	[auth("candidatos_patch"), validateMiddleware(candidatoValidation.getCandidatoById)],
	CandidatoController.updateCandidato
);

export default router;
