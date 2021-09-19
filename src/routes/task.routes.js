import { Router } from "express";

import * as taskController from "../controllers/task.controller";

const router = Router();

router.get("/", taskController.findAllTasks);

router.get("/done", taskController.findDoneTasks);

router.get("/:id", taskController.findTask);

router.post("/save", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

export default router;
