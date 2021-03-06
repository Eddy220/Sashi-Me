'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashed_password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      about_me: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be left empty.");
            }
          },
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashed_password", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashed_password"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Business, { foreignKey: 'owner_id'})
    User.hasMany(models.Review, { foreignKey: 'user_id'})
  };

  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };
  // this returns an object with only the user instance information that is safe to save to JWT

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashed_password.toString());
  };
  // this will return true if there is a match with user instance's hashedpassword

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  // this will use currentUser scope to return a User with that id

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  // searches for one User with params, if user is found, validates password, then returns user

  User.signup = async function ({ username, email, password }) {
    const hashed_password = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashed_password,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  // hashes password using bcrpyt and creates a user with user,email,hashpass, returning created user

  return User;
};
