const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    destination_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'destination',
          key: 'id',
        },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'P',
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip',
  }
);

module.exports = Trip;
