"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Card, {
        foreignKey: "project_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Project.init(
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "projects",
      modelName: "Project",
      timestamps: true,
    }
  );

  return Project;
};
