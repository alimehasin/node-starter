import { Router } from "express";
import { authenticate } from "../../middlewares";
import Controller from "./controller";

const router = Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.get("/profile", authenticate({ tolerant: false }), Controller.profile);
router.post("/refresh-tokens", Controller.refreshTokens);

export default router;
