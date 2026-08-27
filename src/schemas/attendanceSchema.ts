import * as z from 'zod';

export const attendanceSchema = z.object({
  employeeId: z.number().positive('Valid employee ID is required'),
  clockInTime: z.number().positive('Clock-in time is required'),
  clockOutTime: z
    .number()
    .positive('Clock-out time is required')
    .nullable()
    .optional(),
  status: z.string().trim().optional(),
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;
