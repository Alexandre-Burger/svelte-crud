import { prisma } from "../../index";
import { Request, Response } from "express";

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const editTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Task ID is required" });
    return;
  }

  try {
    const { title, description, completed } = req.body;

    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        completed,
      },
    });

    res.status(200).json(updatedTask);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Task ID is required" });
  }

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  }

  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Task ID is required" });
  }
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  createTask,
  getTasks,
  editTask,
  deleteTask,
  getTask,
};
