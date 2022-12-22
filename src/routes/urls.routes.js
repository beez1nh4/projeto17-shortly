import { Router } from "express";
import { getUrlById, openUrl, postUrl } from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlBodyValidation, urlExistanceValidation } from "../middlewares/urlBodyValidation.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, urlBodyValidation, postUrl);
router.get("/urls/:id", urlExistanceValidation, getUrlById);
router.get("/urls/open/:shortUrl", urlExistanceValidation2, openUrl);

export default router;