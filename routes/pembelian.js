/**
 * @implements import express
 */
const express = require("express");

/**
 * @implements config router
 */
const router = express.Router();

/**
 * @requires import passport
 */
const passport = require("passport");

/**
 * @implements config router
 * @param passport mengautentikasi jwt passport
 */
const { getListProduk, addPembelian } = require("../controllers/pembelian");
router
  .route("/list")
  .get(passport.authenticate("jwt", { session: false }), getListProduk);

router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), addPembelian);

module.exports = router;
