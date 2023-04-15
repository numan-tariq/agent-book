"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.belongsTo(models.Project, {
        foreignKey: "project_id",
        as: "project",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  /**
   * I have defined a relationship between projects and card, because one project has many cards whenevr the user will add a card its should always add against a project.
   * We can do more work relaed to card i.e card assignee, comments, change logs of card, subtasks
   */
  Card.init(
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      project_id: {
        type: DataTypes.UUID,
        references: {
          model: "projects",
          foreignKey: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "cards",
      modelName: "Card",
      timestamps: true,
    }
  );

  return Card;
};
