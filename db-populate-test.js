// populate-dummy-data.js

const { sequelize } = require('./database/connectdb'); // Adjust the path to your Sequelize instance

// Sync models with the database
(async () => {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } to recreate tables

    // Create schools
    const school1 = await School.create({
      school_name: 'Dummy High School 1',
      location: 'City A',
      phone_no: '9343',
      email: 'ab@cd.ef'
    });

    // Create teachers
    const teacher1 = await Teacher.create({
      teacher_name: 'John Doe',
      subjects: 'Math',
      school_id: school1.id,
    });

    // Create students
    const student1 = await Student.create({
        student_name: 'Alice Smith',
        school_id: school1.id,
	gender: 'Male',
	grade: 5,
	age: 13,
	roll: 2,
    });

    // Create subjects
    const subject1 = await Subject.create({
        subject_name: 'History',
    });

    // Create grades
    const grade1 = await Grade.create({
        grade: 'A',
        term: 'Fall',
        class: 5,
        year: 2022,
        student_id: student1.id,
        subject_id: subject1.id,
    });

    console.log('Dummy data inserted successfully.');
  } catch (error) {
      console.error('Error populating dummy data:', error);
  } finally {
      // Close the Sequelize connection
      await sequelize.close();
  }
})();
