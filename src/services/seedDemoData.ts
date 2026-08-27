import sequelize from '@/config/db';
import { Department, Role, Employee, Shift, Attendance } from '@/models';

const seedDemoData = async () => {
  console.log('Starting Hotel Management data seeding...');
  const startTime = Date.now();
  const transaction = await sequelize.transaction();

  try {
    // Create Realistic Hotel Departments
    const frontOffice = await Department.create(
      {
        name: 'Front Office',
        description: 'Guest services, check-in/out, and reservations',
      },
      { transaction },
    );

    const housekeeping = await Department.create(
      {
        name: 'Housekeeping',
        description: 'Room cleaning and public area maintenance',
      },
      { transaction },
    );

    const foodAndBev = await Department.create(
      {
        name: 'Food & Beverage',
        description: 'Restaurant, bar, and room service operations',
      },
      { transaction },
    );

    const maintenance = await Department.create(
      {
        name: 'Maintenance',
        description: 'Facility upkeep and emergency repairs',
      },
      { transaction },
    );

    // Create Realistic Hotel Roles
    const frontDeskRole = await Role.create(
      { name: 'Front Desk Agent', hourlyRate: 45.0 },
      { transaction },
    );

    const nightAuditRole = await Role.create(
      { name: 'Night Auditor', hourlyRate: 55.0 },
      { transaction },
    );

    const housekeeperRole = await Role.create(
      { name: 'Housekeeper', hourlyRate: 35.0 },
      { transaction },
    );

    const serverRole = await Role.create(
      { name: 'Restaurant Server', hourlyRate: 30.0 },
      { transaction },
    );

    const techRole = await Role.create(
      { name: 'Maintenance Technician', hourlyRate: 50.0 },
      { transaction },
    );

    // Create 5 Employees
    const employees = await Employee.bulkCreate(
      [
        {
          firstName: 'Dawit',
          lastName: 'Tadesse',
          email: 'dawit.t@email.com',
          phone: '+251911000001',
          departmentId: frontOffice.id,
          roleId: frontDeskRole.id,
        },
        {
          firstName: 'Kidist',
          lastName: 'Bekele',
          email: 'kidist.b@email.com',
          phone: '+251911000002',
          departmentId: housekeeping.id,
          roleId: housekeeperRole.id,
        },
        {
          firstName: 'Samuel',
          lastName: 'Alemu',
          email: 'samuel.a@email.com',
          phone: '+251911000003',
          departmentId: foodAndBev.id,
          roleId: serverRole.id,
        },
        {
          firstName: 'Mahlet',
          lastName: 'Tesfaye',
          email: 'mahlet.t@email.com',
          phone: '+251911000004',
          departmentId: maintenance.id,
          roleId: techRole.id,
        },
        {
          firstName: 'Biniam',
          lastName: 'Gebre',
          email: 'biniam.g@email.com',
          phone: '+251911000005',
          departmentId: frontOffice.id,
          roleId: nightAuditRole.id,
        },
      ],
      { transaction, individualHooks: true },
    );

    // Generate 3 Days of Shifts and Attendance
    const MS_PER_HOUR = 60 * 60 * 1000;
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0); // Start at midnight today

    for (let day = 0; day < 3; day++) {
      const dayOffset = day * 24 * MS_PER_HOUR;

      for (const emp of employees) {
        let shiftStartHour = 0;
        let shiftNotes = '';
        let status = 'PRESENT';
        let clockInDelay = 0; // Simulate being late

        // Assign standard hotel shift times based on roles
        if (emp.roleId === nightAuditRole.id) {
          shiftStartHour = 23; // 11 PM - 7 AM (Night Audit)
          shiftNotes = 'Night Audit shift';
        } else if (
          emp.roleId === frontDeskRole.id ||
          emp.roleId === housekeeperRole.id
        ) {
          shiftStartHour = 7; // 7 AM - 3 PM (Morning Shift)
          shiftNotes = 'Morning check-out rush';
          // Randomly make the morning shift late 1 out of 3 days
          if (day === 1) {
            status = 'LATE';
            clockInDelay = 0.5 * MS_PER_HOUR; // 30 mins late
          }
        } else {
          shiftStartHour = 15; // 3 PM - 11 PM (Evening Shift)
          shiftNotes = 'Evening dinner/check-in shift';
        }

        const shiftStartMs =
          baseDate.getTime() + dayOffset + shiftStartHour * MS_PER_HOUR;
        const shiftEndMs = shiftStartMs + 8 * MS_PER_HOUR;

        // Create the Shift
        await Shift.create(
          {
            employeeId: emp.id,
            startTime: shiftStartMs,
            endTime: shiftEndMs,
            notes: shiftNotes,
          },
          { transaction },
        );

        // Create the corresponding Attendance record
        await Attendance.create(
          {
            employeeId: emp.id,
            clockInTime: shiftStartMs + clockInDelay, // Add delay if they are late
            clockOutTime: shiftEndMs,
            status: status,
          },
          { transaction },
        );
      }
    }

    await transaction.commit();
    console.log(
      `Hotel data seeded successfully in ${Date.now() - startTime}ms.`,
    );
  } catch (error) {
    await transaction.rollback();
    console.error('Data seeding failed: ', error);
  }
};

export default seedDemoData;
