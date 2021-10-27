const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expenses extends Model {}

Expenses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'trip',
          key: 'id',
        },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    spent: {
      type: DataTypes.FLOAT,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'expenses',
  }
);

module.exports = Expenses;
