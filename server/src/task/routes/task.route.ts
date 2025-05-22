import express from "express";

import taskController from "../controllers/controller";

const TaskRouter = express.Router();

TaskRouter.post("/", taskController.createTask);
TaskRouter.get("/", taskController.getTasks);
TaskRouter.patch("/:id", taskController.editTask);
TaskRouter.delete("/:id", taskController.deleteTask);
TaskRouter.get("/:id", taskController.getTask);

export default TaskRouter;
