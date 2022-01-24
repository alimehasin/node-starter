import Router from "express";
import Controller from "./controller";
import { getObject } from "./middlewares";

const router = Router();
const controller = new Controller();

// Define your routes here
router.get("/", controller.list);
router.post("/", controller.create);

router.get("/:id", getObject, controller.retrieve);
router.patch("/:id", getObject, controller.update);
router.delete("/:id", getObject, controller.delete);

export default router;
