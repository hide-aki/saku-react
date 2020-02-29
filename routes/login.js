/**
 * @implements import express
 */
const express = require('express');

/**
 * @implements inisiasi router
 */
const router = express.Router();

/**
 * @implements config router
 */
const { userLogin } = require('../controllers/login');
router.route('/').post(userLogin);

module.exports = router;
