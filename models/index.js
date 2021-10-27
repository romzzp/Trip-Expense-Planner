const User = require('./User');
const Destination = require('./Destination');
const Expenses = require('./Expenses');
const Trip = require('./Trip');

Destination.hasOne(Trip, {
  foreignKey: 'destination_id',
  onDelete: 'CASCADE',
});

Trip.belongsTo(Destination, {
  foreignKey: 'destination_id',
});

User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Trip.belongsTo(User, {
  foreignKey: 'user_id'
});

Trip.hasMany(Expenses, {
  foreignKey: 'trip_id',
  onDelete: 'CASCADE'
});

Expenses.belongsTo(Trip, {
  foreignKey: 'trip_id'
});

module.exports = { User, Destination, Expenses, Trip };
