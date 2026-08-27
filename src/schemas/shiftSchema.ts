import * as z from 'zod';

export const shiftSchema = z.object({
  employeeId: z
    .number('Valid employee ID is required')
    .positive('Valid employee ID is required'),
  startTime: z
    .number('Start time is required')
    .positive('Start time is required'),
  endTime: z.number('End time is required').positive('End time is required'),
  notes: z.string().trim().optional(),
});

export type ShiftSchema = z.infer<typeof shiftSchema>;
