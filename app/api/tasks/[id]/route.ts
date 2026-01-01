import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params; // ✅ unwrap dulu
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();

    const dataToUpdate: any = {
      title: body.title,
      priority: body.priority,
      category: body.category ?? null,
    };

    if (body.dueDate) dataToUpdate.dueDate = new Date(body.dueDate);
    if (body.status !== undefined) dataToUpdate.status = body.status;

    const task = await prisma.task.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("PUT /tasks/:id error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const task = await prisma.task.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("DELETE /tasks/:id error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}