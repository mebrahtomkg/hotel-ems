import * as z from 'zod';

export const departmentSchema = z.object({
  name: z.string().trim().min(1, 'First name is required'),
  description: z.string().trim().optional(),
});

export type DepartmentSchema = z.infer<typeof departmentSchema>;
