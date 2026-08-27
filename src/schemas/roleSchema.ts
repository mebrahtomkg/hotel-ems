import * as z from 'zod';

const ERR_HOURLY_RATE = 'Hourly rate must be a positive number';
const ERR_NAME = 'Name is required';

export const roleSchema = z.object({
  name: z.string(ERR_NAME).trim().min(1, ERR_NAME),
  description: z.string().trim().optional(),
  hourlyRate: z.number(ERR_HOURLY_RATE).positive(ERR_HOURLY_RATE).optional(),
});

export type RoleSchema = z.infer<typeof roleSchema>;
