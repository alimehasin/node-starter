import Router from "express";
import * as controllers from "./controllers";
import { getObject } from "./middlewares";

const router = Router();

// Define your routes here
router.get("/", controllers.list);
router.post("/", controllers.create);

router.get("/:id", getObject, controllers.retrieve);
router.patch("/:id", getObject, controllers.update);
router.delete("/:id", getObject, controllers.destroy);

export default router;
