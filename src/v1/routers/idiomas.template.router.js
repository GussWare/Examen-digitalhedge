import express from "express";
import * as IdiomaTemplateController from "../controllers/idioma.template.controller";
import * as IdiomaTemplateValidation from "../validations/idioma.template.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/idiomas-template/",
	[auth("idiomas_template_list"), validateMiddleware(IdiomaTemplateValidation.getPaginate)],
	IdiomaTemplateController.getPaginate
);

router.get(
	"/idiomas-template/",
	[auth("idiomas_template_get_by_id"), validateMiddleware(IdiomaTemplateValidation.getIdiomaTemplateById)],
	IdiomaTemplateController.getIdiomaTemplateById
);

router.post(
	"/idiomas-template/",
	[auth("idiomas_template_create"), validateMiddleware(IdiomaTemplateValidation.createIdiomaTemplate)],
	IdiomaTemplateController.createIdiomaTemplate
);

router.put(
	"/idiomas-template/",
	[auth("idiomas_template_update"), validateMiddleware(IdiomaTemplateValidation.updateIdiomaTemplate)],
	IdiomaTemplateController.updateIdiomaTemplate
);

router.delete(
	"/idiomas-template/",
	[auth("idiomas_template_delete"), validateMiddleware(IdiomaTemplateValidation.deleteIdiomaTemplate)],
	IdiomaTemplateController.deleteIdiomaTemplate
);


export default router;