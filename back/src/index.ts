import { Elysia, t } from "elysia";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { auth } from "./auth";
import { db } from "./db";

const TaskSchema = z.object({
  title: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      done: z.boolean(),
    })
  ),
});

const openai = createOpenAI({
  apiKey: process.env.OPEN_API_KEY
})
const authMiddleware = new Elysia({ name: "auth" }).derive(
  { as: "scoped" },
  async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) throw new Error("Unauthorized");
    return { user: session.user, session: session.session };
  }
);

const app = new Elysia()
  // Better Auth routes
  .all("/api/auth/*", ({ request }) => auth.handler(request))

  // Rotas protegidas
  .use(authMiddleware)

  // Criar task com IA
  .post(
    "/tasks",
    async ({ body, user, set }) => {
      const { prompt } = body;

      const { output } = await generateText({
        model: openai("gpt-4o-mini"),
        output: Output.object({ schema: TaskSchema }),
        prompt: `Dada a seguinte tarefa, gere um título curto e objetivo para ela e quebre em etapas claras (3 a 8 etapas). Todos os steps devem ter done como false. Tarefa: "${prompt}"`,
      });

      if (!output) {
        set.status = 500;
        return { message: "Failed to generate task" };
      }

      const task = await db.task.create({
        data: {
          userId: user.id,
          title: output.title,
          prompt,
          steps: {
            create: output.steps.map((s) => ({
              title: s.title,
              description: s.description,
              done: false,
            })),
          },
        },
        include: { steps: true },
      });

      return task;
    },
    {
      body: t.Object({ prompt: t.String({ minLength: 3 }) }),
    }
  )

  // Calendário - tasks de um dia
  .get(
    "/tasks/calendar",
    async ({ query, user }) => {
      const date = query.date ? new Date(query.date) : new Date();
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      return db.task.findMany({
        where: {
          userId: user.id,
          date: { gte: start, lte: end },
        },
        include: { steps: true },
        orderBy: { date: "asc" },
      });
    },
    {
      query: t.Object({ date: t.Optional(t.String()) }),
    }
  )

  // Calendário - resumo do mês (dias que têm tasks)
  .get(
    "/tasks/calendar/month",
    async ({ query, user }) => {
      const year = Number(query.year ?? new Date().getFullYear());
      const month = Number(query.month ?? new Date().getMonth() + 1);

      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59, 999);

      const tasks = await db.task.findMany({
        where: {
          userId: user.id,
          date: { gte: start, lte: end },
        },
        select: { date: true, id: true },
      });

      const days: Record<string, number> = {};
      tasks.forEach((t) => {
        const key = t.date.toISOString().split("T")[0];
        days[key] = (days[key] || 0) + 1;
      });

      return { year, month, days };
    },
    {
      query: t.Object({
        year: t.Optional(t.String()),
        month: t.Optional(t.String()),
      }),
    }
  )

  // Histórico paginado
  .get(
    "/tasks/history",
    async ({ query, user }) => {
      const page = Number(query.page ?? 1);
      const limit = Number(query.limit ?? 10);
      const skip = (page - 1) * limit;

      const [tasks, total] = await Promise.all([
        db.task.findMany({
          where: { userId: user.id },
          include: { steps: true },
          orderBy: { date: "desc" },
          skip,
          take: limit,
        }),
        db.task.count({ where: { userId: user.id } }),
      ]);

      return { tasks, total, page, totalPages: Math.ceil(total / limit) };
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
      }),
    }
  )

  // Detalhes de uma task
  .get("/tasks/:id", async ({ params, user }) => {
    const task = await db.task.findFirst({
      where: { id: params.id, userId: user.id },
      include: { steps: true },
    });

    return task;
  })

  // Toggle step done
  .patch(
    "/tasks/:id/steps/:stepId",
    async ({ params, body, user }) => {
      const task = await db.task.findFirst({
        where: { id: params.id, userId: user.id },
      });

      if (!task) throw new Error("Task not found");

      return db.step.update({
        where: { id: params.stepId },
        data: { done: body.done },
      });
    },
    {
      body: t.Object({ done: t.Boolean() }),
    }
  )

  // Deletar task
  .delete("/tasks/:id", async ({ params, user }) => {
    const task = await db.task.findFirst({
      where: { id: params.id, userId: user.id },
    });
    if (!task) throw new Error("Task not found");

    await db.task.delete({ where: { id: params.id } });
    return { message: "Task deleted" };
  })

  .listen(3000);

console.log("🦊 API rodando em http://localhost:3000");