import isNumeric from "validator/lib/isNumeric";
function ValidateMasterCoa(values) {
  let errors = {};

  if (!values.no_coa) {
    errors.no_coa = "Nomor COA tidak boleh kosong";
  } else if (!isNumeric(values.no_coa)) {
    errors.no_coa = "Nomor COA tidak valid";
  } else if (values.no_coa.length > 5) {
    errors.no_coa = "Nomor COA maksimal 5 karakter";
  }

  if (!values.nama) {
    errors.nama = "Nama COA tidak boleh kosong";
  }

  return errors;
}

export default ValidateMasterCoa;
