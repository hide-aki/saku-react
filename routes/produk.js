/**
 * @implements import express
 */
const express = require('express');

/**
 * @implements config router
 */
const router = express.Router();

/**
 * @requires import passport
 */
const passport = require('passport');

/**
 * @implements config router
 * @param passport mengautentikasi jwt token
 */
const {
  createCode,
  getProduk,
  AddProduk,
  UpdateProduk,
  deleteProduk
} = require('../controllers/produk');

router.route('/code').get(createCode);

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), getProduk)
  .post(passport.authenticate('jwt', { session: false }), AddProduk);

router
  .route('/:id')
  .put(passport.authenticate('jwt', { session: false }), UpdateProduk)
  .delete(passport.authenticate('jwt', { session: false }), deleteProduk);

module.exports = router;
