import isNumeric from "validator/lib/isNumeric";
function ValidateMasterProduk(values) {
  let errors = {};

  if (!values.nama) {
    errors.nama = "Nama produk tidak boleh kosong";
  }

  if (!values.harga_jual) {
    errors.harga_jual = "Harga Jual produk tidak boleh kosong";
  } else if (!isNumeric(values.harga_jual)) {
    errors.harga_jual = "Harga Jual produk tidak valid";
  }

  if (!values.harga_beli) {
    errors.harga_beli = "Harga Beli produk tidak boleh kosong";
  } else if (!isNumeric(values.harga_beli)) {
    errors.harga_beli = "Harga Beli produk tidak valid";
  }

  if (!values.stok) {
    errors.stok = "Stok produk tidak boleh kosong";
  } else if (!isNumeric(values.stok)) {
    errors.stok = "Stok produk tidak valid";
  }

  if (!values.deskripsi) {
    errors.deskripsi = "Deskripsi produk tidak boleh kosong";
  }

  return errors;
}

export default ValidateMasterProduk;
