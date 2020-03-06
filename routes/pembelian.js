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
const {
  getListProduk,
  addPembelian,
  getPembelian
} = require("../controllers/pembelian");
router
  .route("/list")
  .get(passport.authenticate("jwt", { session: false }), getListProduk);

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getPembelian)
  .post(passport.authenticate("jwt", { session: false }), addPembelian);

module.exports = router;
