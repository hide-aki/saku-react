import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';

//custom hooks
import useFormValidationMaster from '../../../../utils/hooks/useFormValidationMaster';
import validateMasterProduk from '../../../../utils/validate/validateMasterProduk';

const INITIAL_STATE = {
  nama: '',
  harga: '',
  stok: '',
  deskripsi: ''
};

function FormDialogAdd({ config, open, handleClose, handleCloseWithAction }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  } = useFormValidationMaster(
    INITIAL_STATE,
    validateMasterProduk,
    addProdukSubmit
  );
  const [serverError, setServerError] = useState({ nama: '' });
  async function addProdukSubmit() {
    const { nama, harga, stok, deskripsi } = values;
    try {
      const postProduk = await axios.post(
        '/api/v1/produk',
        {
          nama,
          harga,
          stok,
          deskripsi
        },
        config
      );
      if (postProduk.status === 201) {
        handleCloseWithAction();
        enqueueSnackbar(postProduk.data.data, { variant: 'success' });
      }
    } catch (e) {
      const code = e.message;
      const getCode = code.substr(32, 3);
      if (getCode === '401') {
        setServerError({
          nama: 'User tidak terautentikasi, silahkan login kembali'
        });
      } else if (getCode === '500') {
        setServerError({ nama: 'Server dalam masalah' });
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <DialogContentText>
            To add product data, please fill out the following form
          </DialogContentText>
          <TextField
            autoFocus
            disabled={isSubmitting}
            error={errors.nama || serverError.nama ? true : false}
            helperText={errors.nama || serverError.nama}
            onChange={handleChange}
            value={values.nama}
            margin="dense"
            id="nama"
            name="nama"
            label="Product Name"
            fullWidth
          />
          <TextField
            disabled={isSubmitting}
            error={errors.harga ? true : false}
            helperText={errors.harga}
            onChange={handleChange}
            value={values.harga}
            margin="dense"
            id="harga"
            name="harga"
            label="Price"
            fullWidth
          />
          <TextField
            disabled={isSubmitting}
            error={errors.stok ? true : false}
            helperText={errors.stok}
            onChange={handleChange}
            value={values.stok}
            margin="dense"
            id="stok"
            name="stok"
            label="Stock"
            fullWidth
          />
          <TextField
            disabled={isSubmitting}
            error={errors.deskripsi ? true : false}
            helperText={errors.deskripsi}
            onChange={handleChange}
            value={values.deskripsi}
            margin="dense"
            id="deskripsi"
            name="deskripsi"
            label="Description"
            multiline
            rowsMax="3"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
FormDialogAdd.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseWithAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

export default FormDialogAdd;
