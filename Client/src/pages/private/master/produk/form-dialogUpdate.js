import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";

import PropTypes from "prop-types";

import { useSnackbar } from "notistack";

import useStyles from "./styles";

import useFormValidationMaster from "../../../../utils/hooks/useFormValidationMaster";
import validateMasterProduk from "../../../../utils/validate/validateMasterProduk";

function FormDialogUpdate({
  config,
  previousData,
  openEdit,
  handleClose,
  handleCloseWithAction
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [serverError, setServerError] = useState({ nama: "" });
  const INITIAL_STATE = {
    id_produk: previousData.id_produk,
    nama: previousData.nama,
    harga_jual: previousData.harga_jual,
    harga_beli: previousData.harga_beli,
    stok: previousData.stok,
    deskripsi: previousData.deskripsi
  };
  const {
    values,
    handleChange,
    handleSubmit,
    errors
  } = useFormValidationMaster(
    INITIAL_STATE,
    validateMasterProduk,
    editProdukSubmit
  );

  async function editProdukSubmit() {
    const { id_produk, nama, harga_jual, harga_beli, stok, deskripsi } = values;
    try {
      const updateProduk = await axios.put(
        `/api/v1/produk/${id_produk}`,
        {
          nama,
          harga_jual,
          harga_beli,
          stok,
          deskripsi
        },
        config
      );
      if (updateProduk.status === 202) {
        handleCloseWithAction();
        enqueueSnackbar(`Data produk ${id_produk} berhasil diupdate`, {
          variant: "success"
        });
      }
    } catch (error) {
      const code = error.message;
      const getCode = code.substr(32, 3);
      if (getCode === "401") {
        setServerError({
          nama: "User tidak terautentikasi, silahkan login kembali"
        });
      } else if (getCode === "500") {
        setServerError({ nama: "Server dalam masalah" });
      }
    }
  }

  return (
    <Dialog
      className={classes.dialogForm}
      open={openEdit}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <DialogContentText>
            To update product data, please fill out the following form
          </DialogContentText>
          <TextField
            helperText={errors.nama || serverError.nama}
            error={errors.nama || serverError.nama ? true : false}
            onChange={handleChange}
            value={values.nama}
            margin="dense"
            id="nama"
            name="nama"
            label="Product Name"
            fullWidth
          />
          <TextField
            helperText={errors.harga_beli}
            error={errors.harga_beli ? true : false}
            onChange={handleChange}
            value={values.harga_beli}
            margin="dense"
            id="harga_beli"
            name="harga_beli"
            label="Purchase Price"
            fullWidth
          />
          <TextField
            helperText={errors.harga_jual}
            error={errors.harga_jual ? true : false}
            onChange={handleChange}
            value={values.harga_jual}
            margin="dense"
            id="harga_jual"
            name="harga_jual"
            label="Selling Price"
            fullWidth
          />
          <TextField
            helperText={errors.stok}
            error={errors.stok ? true : false}
            onChange={handleChange}
            value={values.stok}
            margin="dense"
            id="stok"
            name="stok"
            label="Stock"
            fullWidth
          />
          <TextField
            helperText={errors.deskripsi}
            error={errors.deskripsi ? true : false}
            onChange={handleChange}
            value={values.deskripsi}
            margin="dense"
            id="deskripsi"
            name="deskripsi"
            label="Description"
            rowsMax="3"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
FormDialogUpdate.propTypes = {
  openEdit: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  previousData: PropTypes.object.isRequired,
  handleCloseWithAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

export default FormDialogUpdate;
