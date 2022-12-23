import { Router } from "express";
import { getRanking, getUserInfo, postUsersSignIn, postUsersSignUp } from "../controllers/users.controller.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const router = Router();

router.post("/signup", signUpBodyValidation, postUsersSignUp);
router.post("/signup", signInBodyValidation, postUsersSignIn);
router.get("/users/me", tokenValidation, getUserInfo);
router.get("/ranking", getRanking);

export default router;