import * as z from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.email({
    error: (iss) =>
      !iss.input ? 'Email address is required' : 'Invalid email address',
  }),
  phone: z.string().trim().optional(),
  departmentId: z.number().optional(),
  roleId: z.number().optional(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;
