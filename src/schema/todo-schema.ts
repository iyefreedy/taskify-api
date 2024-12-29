import { z } from "zod";

export class TodoSchema {
  static readonly CREATE = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    dueDate: z.date().optional(),
    done: z.boolean().optional(),
  });

  static readonly UPDATE = z
    .object({
      title: z.string().min(1).optional(),
      content: z.string().optional(),
      dueDate: z.date().optional(),
      done: z.boolean().optional(),
    })
    .partial()
    .refine(
      (data) => !!data.title || !!data.content || !!data.dueDate || !!data.done,
      "Either value is required"
    );
}
