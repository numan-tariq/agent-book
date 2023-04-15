"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }

  User.init(
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
    }
  );

  User.beforeCreate(async (user) => {
    console.log("before create hook");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.beforeUpdate(async (user) => {
    console.log("before update hook");
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.beforeBulkUpdate(async (user) => {
    console.log("before bulk update hook");
    if (user.attributes.password) {
      const salt = await bcrypt.genSalt(10);
      user.attributes.password = await bcrypt.hash(
        user.attributes.password,
        salt
      );
    }
  });

  User.prototype.validPassword = async function (password) {
    const passwordsMatch = await bcrypt.compare(password, this.password);
    return passwordsMatch;
  };

  return User;
};
