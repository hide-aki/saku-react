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
 * @param passport mengautentikasi jwt token
 */
const { getCoa, addCoa, updateCoa } = require("../controllers/coa");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getCoa)
  .post(passport.authenticate("jwt", { session: false }), addCoa);

router
  .route("/:id")
  .put(passport.authenticate("jwt", { session: false }), updateCoa);

module.exports = router;
