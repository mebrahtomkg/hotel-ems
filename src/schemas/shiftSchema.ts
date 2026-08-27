import * as z from 'zod';

export const shiftSchema = z.object({
  employeeId: z.number().positive('Valid employee ID is required'),
  startTime: z.number().positive('Start time is required'),
  endTime: z.number().positive('End time is required'),
  notes: z.string().trim().optional(),
});

export type ShiftSchema = z.infer<typeof shiftSchema>;
