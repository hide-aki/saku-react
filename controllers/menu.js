/**
 * @requires import sequelize
 */
const { QueryTypes } = require('sequelize');

/**
 * @requires import db config
 */
const { connection } = require('../config/database');

/**
 * @description get menu
 * @callback GET /api/v1/menu
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.getMenu = async (req, res, next) => {
    try {
        const getMenu = await connection.query(
            `SELECT kode_menu, nama, m_form.kode_form, IFNULL(REPLACE(form,'_','/'),'-') AS form, level,rowindex
            FROM menu LEFT JOIN m_form ON menu.kode_form=m_form.kode_form
            WHERE kode_klp = :kode_klp`,
            {
                replacements: { kode_klp: req.params.id },
                type: QueryTypes.SELECT
            }
        );
        res.status(200).json({ success: true, data: getMenu });
    } catch (error) {
        res.status(500).json({ success: true, error: 'Server error' })
    }
}