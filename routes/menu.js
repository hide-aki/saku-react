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
const { getMenu } = require("../controllers/menu");

router
    .route("/:id")
    .get(passport.authenticate("jwt", { session: false }), getMenu);

module.exports = router;
