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
const { getListProduk } = require("../controllers/pembelian");
router
  .route("/list")
  .get(passport.authenticate("jwt", { session: false }), getListProduk);

module.exports = router;
