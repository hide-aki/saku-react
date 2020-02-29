/**
 * @requires model UserSchema
 */
const Users = require('../models/user');

/**
 * @requires import bcrypt
 */
const bcrypt = require('bcrypt');

/**
 * @requires import {Op} untuk pengkondisian lebih dari 2
 */
const { Op } = require('sequelize');

/**
 * @description Register for users
 * @callback POST /api/v1/users
 * @access Public
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.addUsers = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    const cekUser = await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });
    if (!cekUser) {
      bcrypt.hash(password, 10, async (err, hash) => {
        try {
          password = hash;
          const newUser = new Users({ username, password, email });
          await newUser.save();
          return res.status(201).json({
            success: true,
            data: 'User berhasil terdaftar, silahkan login'
          });
        } catch (err) {
          return res.status(400).json({
            success: false,
            error: 'Bad Request'
          });
        }
      });
    } else {
      res.status(409).json({
        success: false,
        error: 'Duplicate data'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server dalam masalah'
    });
  }
};
