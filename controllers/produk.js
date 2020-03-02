/**
 * @requires model schema
 */
const Produk = require('../models/produk');

/**
 * @description make unicue product code
 * @callback none
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.createCode = async (req, res, next) => {
  try {
    const getCodeproduct = await Produk.findAll({
      attributes: ['id_produk'],
      limit: 1,
      order: [
        ['id_produk', 'DESC']
      ]
    });
    const convertToJson = JSON.stringify(getCodeproduct);
    const parseJson = JSON.parse(convertToJson);
    const result = Object.assign({}, parseJson);
    console.log(result);
  } catch (e) {

  }
}

/**
 * @description Get all produk
 * @callback GET /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.getProduk = async (req, res, next) => {
  try {
    const getProduk = await Produk.findAll();
    return res.status(200).json({
      success: true,
      data: getProduk
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server dalam masalah'
    });
  }
};

/**
 * @description Add produk
 * @callback POST /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.AddProduk = async (req, res, next) => {
  try {
    const { nama, harga, stok, deskripsi } = req.body;
    const newProduk = new Produk({ nama, harga, stok, deskripsi });
    await newProduk.save();
    return res.status(201).json({
      success: true,
      data: `Produk ${nama} berhasil disimpan`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server dalam masalah'
    });
  }
};

/**
 * @description Update produk
 * @callback PUT /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.UpdateProduk = async (req, res, next) => {
  try {
    const { nama, harga, stok, deskripsi } = req.body;
    const id = req.params.id;
    await Produk.update(
      {
        nama,
        harga,
        stok,
        deskripsi
      },
      {
        where: {
          id: id
        }
      }
    );
    return res.status(202).json({
      success: true,
      data: `Produk ${id} berhasil diubah`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server dalam masalah'
    });
  }
};

/**
 * @description Delete produk
 * @callback Delete /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.deleteProduk = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Produk.destroy({ where: { id: id } });
    return res.status(202).json({
      success: true,
      data: 'Produk berhasil dihapus'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server dalam masalah'
    });
  }
};
