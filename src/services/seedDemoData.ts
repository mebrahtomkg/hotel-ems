import sequelize from '@/config/db';
import { demoEmployees } from '@/config/demoData';
import { Employee } from '@/models';

const seedDemoData = async () => {
  console.log('Starting demo data seeding...');
  const startTime = Date.now();

  const transaction = await sequelize.transaction();

  try {
    for (const demoEmployee of demoEmployees) {
      await Employee.create(demoEmployee, { transaction });
    }

    await transaction.commit();

    console.log(
      `Seeded demo employees successfully in ${Date.now() - startTime}ms.`,
    );
  } catch (error) {
    await transaction.rollback();
    console.error('Demo data seeding failed: ', error);
  }
};

export default seedDemoData;
