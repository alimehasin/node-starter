import { Router } from "express";
import users from "./users";
import examples from "./examples";

const router = Router();

router.use("/users", users);
router.use("/examples", examples);

export default router;
