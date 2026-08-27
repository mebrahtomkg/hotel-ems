import * as z from 'zod';

export const attendanceSchema = z.object({
  employeeId: z
    .number('Valid employee ID is required')
    .positive('Valid employee ID is required'),
  clockInTime: z
    .number('Clock-in time is required')
    .positive('Clock-in time is required'),
  clockOutTime: z
    .number('Clock-out time is required')
    .positive('Clock-out time is required')
    .nullable()
    .optional(),
  status: z.string().trim().optional(),
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;
