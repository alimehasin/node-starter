import { Router } from "express";
import passport from "passport";
import Controller from "./controller";

const router = Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  Controller.profile
);

router.post("/refresh-tokens", Controller.refreshTokens);

export default router;
