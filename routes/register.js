/**
 * @requires import express
 */
const express = require('express');

/**
 * @implements inisiasi router
 */
const router = express.Router();

/**
 * @implements config router
 */
const { addUsers } = require('../controllers/register');
router.route('/').post(addUsers);

module.exports = router;
