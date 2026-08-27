import * as z from 'zod';

export const roleSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().optional(),
  hourlyRate: z
    .number()
    .positive('Hourly rate must be a positive number')
    .optional(),
});

export type RoleSchema = z.infer<typeof roleSchema>;
