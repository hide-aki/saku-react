/**
 * @requires import sequelize
 */
const Sequelize = require('sequelize');

/**
 * @requires import database yang sudah diinisiasi
 */
const { connection } = require('../config/database');

/**
 * @module create schema model m_form
 */
const FormSchema = connection.define("m_form", {
    kode_form: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nama_form: { type: Sequelize.STRING },
    form: { type: Sequelize.STRING }
});

module.exports = FormSchema;