import { z } from 'zod';

export default class TodoSchema {
  static readonly CREATE = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    dueDate: z.string().pipe(z.coerce.date()).optional(),
  });

  static readonly UPDATE = z
    .object({
      title: z.string().min(1).optional(),
      content: z.string().optional().nullable(),
      dueDate: z.string().pipe(z.coerce.date()).nullable().optional(),
      done: z.boolean().optional(),
    })
    .partial()
    .refine(
      (data) => !!data.title || !!data.content || !!data.dueDate || !!data.done,
      'Either value is required'
    );
}
