import { Router } from "express";
import { postUrl } from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlBodyValidation } from "../middlewares/urlBodyValidation.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, urlBodyValidation, postUrl);


export default router;