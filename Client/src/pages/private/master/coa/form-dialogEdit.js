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

//custom hooks
import useFormValidationMaster from "../../../../utils/hooks/useFormValidationMaster";
import validateMasterCoa from "../../../../utils/validate/validateMasterCoa";

function FormDialogAdd({
  config,
  open,
  handleClose,
  handleCloseWithAction,
  previousData
}) {
  const INITIAL_STATE = {
    no_coa: previousData.no_coa,
    nama: previousData.nama
  };
  const { enqueueSnackbar } = useSnackbar();
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  } = useFormValidationMaster(INITIAL_STATE, validateMasterCoa, addCoaSubmit);
  const [serverError, setServerError] = useState({ nama: "" });
  async function addCoaSubmit() {
    const { no_coa, nama } = values;
    try {
      const postCoa = await axios.put(
        `/api/v1/coa/${no_coa}`,
        {
          nama
        },
        config
      );
      if (postCoa.status === 202) {
        handleCloseWithAction();
        enqueueSnackbar(postCoa.data.data, { variant: "success" });
      }
    } catch (e) {
      const code = e.message;
      const getCode = code.substr(32, 3);
      if (getCode === "401") {
        setServerError({
          nama: "User tidak terautentikasi, silahkan login kembali"
        });
      } else if (getCode === "409") {
        setServerError({
          nama: `COA ${nama} sudah ada di sistem`
        });
      } else if (getCode === "500") {
        setServerError({ nama: "Server dalam masalah" });
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Coa</DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <DialogContentText>
            To add coa data, please fill out the following form
          </DialogContentText>
          <TextField
            inputProps={{ readOnly: true }}
            disabled={isSubmitting}
            error={errors.no_coa ? true : false}
            helperText={errors.no_coa}
            onChange={handleChange}
            value={values.no_coa}
            margin="dense"
            id="no_coa"
            name="no_coa"
            label="Coa Number"
            fullWidth
          />
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
            label="Coa Name"
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
  previousData: PropTypes.object.isRequired,
  handleCloseWithAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

export default FormDialogAdd;
