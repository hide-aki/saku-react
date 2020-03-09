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
const MenuSchema = connection.define("menu", {
    kode_menu: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nama: { type: Sequelize.STRING },
    kode_klp: { type: Sequelize.STRING },
    kode_form: { type: Sequelize.STRING },
    level: { type: Sequelize.INTEGER },
    rowIndex: { type: Sequelize.INTEGER }
});

module.exports = FormSchema;