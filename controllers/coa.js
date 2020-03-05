/**
 * @requires coa models
 */
const Coa = require("../models/coa");

/**
 * @requires import {Op} untuk pengkondisian lebih dari 2
 */
const { Op } = require("sequelize");

/**
 * @description get Coa Data
 * @callback GET /api/v1/coa
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */

exports.getCoa = async (req, res, next) => {
  try {
    const getCoa = await Coa.findAll();
    return res.status(200).json({
      success: true,
      data: getCoa
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};

/**
 * @description add Coa Data
 * @callback POST /api/v1/coa
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */

exports.addCoa = async (req, res, next) => {
  try {
    const { no_coa, nama } = req.body;
    const cekCoa = await Coa.findOne({
      where: { [Op.or]: [{ no_coa }, { nama }] }
    });
    if (!cekCoa) {
      const newCoa = new Coa({ no_coa, nama });
      await newCoa.save();
      return res.status(201).json({
        success: true,
        data: `COA ${nama} berhasil disimpan`
      });
    } else {
      res.status(409).json({
        success: false,
        error: "Duplicate Data"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};

/**
 * @description edit Coa Data
 * @callback PUT /api/v1/coa
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */

exports.updateCoa = async (req, res, next) => {
  try {
    const { nama } = req.body;
    const cekCoa = await Coa.findOne({
      where: { nama }
    });
    if (!cekCoa) {
      const id = req.params.id;
      await Coa.update({ nama }, { where: { no_coa: id } });
      return res.status(202).json({
        success: true,
        data: `COA ${id} berhasil diubah`
      });
    } else {
      return res.status(409).json({ success: false, error: "Duplicate data" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};
