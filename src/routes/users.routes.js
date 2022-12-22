import { Router } from "express";
import { postUsers } from "../controllers/users.controller.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.js";

const router = Router();

router.post("/signup", signUpBodyValidation, postUsers);

export default router;