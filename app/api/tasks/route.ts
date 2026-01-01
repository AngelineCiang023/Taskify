import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().nullable().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().nullable().optional(),
  status: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const priority = searchParams.get("priority");
  const selectedDate = searchParams.get("date");

  const where: any = { deleted_at: null };

  if (priority && priority !== "all") {
    where.priority = priority;
  }

  if (selectedDate) {
    where.dueDate = {
      gte: new Date(selectedDate + "T00:00:00"),
      lt: new Date(selectedDate + "T23:59:59"),
    };
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(tasks);
}


export async function POST(req: NextRequest) {
  try {
    const body = taskSchema.parse(await req.json());

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        category: body.category ?? null,
        priority: body.priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        status: body.status ?? false,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("POST /tasks error:", error);
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
