import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, postUrl } from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlBodyValidation, urlExistanceValidation, urlExistanceValidation2 } from "../middlewares/urlBodyValidation.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, urlBodyValidation, postUrl);
router.get("/urls/:id", urlExistanceValidation, getUrlById);
router.get("/urls/open/:shorturl", urlExistanceValidation2, openUrl);
router.delete("/urls/:id", tokenValidation, urlExistanceValidation, deleteUrl);


export default router;
