const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const destinationData = require('./destinationData.json');
const expensesData = require('./expensesData.json');
const tripData = require('./tripData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Destination of destinationData) {
    await Destination.create({
      ...Destination,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const Expenses of expensesData) {
    await Expenses.create({
      ...expenses,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const Trip of tripData) {
    await Trip.create({
      ...trip,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
