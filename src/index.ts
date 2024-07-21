import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
  const { title, isCompleted } = req.body;
  const createTodo = await prisma.todo.create({
    data: {
      title,
      isCompleted,
    },
  });
  return res.json(createTodo);
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  try {
    const editTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(editTodo);
  }
  catch (err) {
    return res.status(400).json(err);
  }
});


app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(deleteTodo);
  } catch (err) {
    return res.status(400).json(err);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
