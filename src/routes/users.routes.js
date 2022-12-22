import { Router } from "express";
import { postUsersSignIn, postUsersSignUp } from "../controllers/users.controller.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.js";

const router = Router();

router.post("/signup", signUpBodyValidation, postUsersSignUp);
router.post("/signup", signInBodyValidation, postUsersSignIn);

export default router;