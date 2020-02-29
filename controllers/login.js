/**
 * @requires model UserSchema
 */
const Users = require('../models/user');

/**
 * @requires import jsonwebtoken
 */
const jwt = require('jsonwebtoken');

/**
 * @requires import bcrypt
 */
const bcrypt = require('bcrypt');

/**
 * @requires import passport
 */
const passport = require('passport');

/**
 * @requires import passport-jwt
 */
const passportJWT = require('passport-jwt');

/**
 * @requires import dotenv
 * @implements import file config env
 */
const dotenv = require('dotenv');
dotenv.config({ path: '../config/config.env' });

/**
 * @implements menginisiasi passport jwt dan passport strategy
 * @var extraJWT variabel untuk menampung extraJWT
 * @var strategyJWT variabel untuk menampung strategy
 */
let extraJWT = passportJWT.ExtractJwt;
let strategyJWT = passportJWT.Strategy;

/**
 * @implements membuat objek untuk menampung jwt token
 * @var jwtOption objek untuk jwt
 * @var jwtOption.jwtFromRequest menginisiasi jika menggunakan bearer token
 * @var jwtOption.secretOrKey menentukan key untuk jwt/token
 */
let jwtOption = {};
jwtOption.jwtFromRequest = extraJWT.fromAuthHeaderAsBearerToken();
jwtOption.secretOrKey = process.env.SECRET_KEY;

/**
 * @function mengambil data user berdasarkan login
 * @param obj objek yang dikirim dari function loginUser
 */
const getUser = async obj => {
  return await Users.findOne({
    where: obj
  });
};

/**
 * @function menginisiasi strategy
 * @param jwt_payload return dari function
 * @param next middleware express
 */
let strategy = new strategyJWT(jwtOption, (jwt_payload, next) => {
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

/**
 * @implements mengimplementasikan strategy
 */
passport.use(strategy);

/**
 * @description Login for user
 * @callback POST /api/v1/login
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      let user = await getUser({ username });
      if (!user) {
        res.status(404).json({
          success: false,
          error: `Username ${username} tidak terdaftar di sistem`
        });
      }
      if (await bcrypt.compare(password, user.password)) {
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOption.secretOrKey);
        res.status(200).json({
          success: true,
          payload,
          token
        });
      } else {
        res.status(409).json({
          success: false,
          error: 'Password salah'
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: 'Server dalam masalah'
    });
  }
};
