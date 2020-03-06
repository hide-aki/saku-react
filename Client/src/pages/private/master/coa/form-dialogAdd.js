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

const INITIAL_STATE = {
  no_coa: "",
  nama: ""
};

function FormDialogAdd({ config, open, handleClose, handleCloseWithAction }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  } = useFormValidationMaster(INITIAL_STATE, validateMasterCoa, addCoaSubmit);
  const [serverError, setServerError] = useState({ no_coa: "" });
  async function addCoaSubmit() {
    const { no_coa, nama } = values;
    try {
      const postCoa = await axios.post(
        "/api/v1/coa",
        {
          no_coa,
          nama
        },
        config
      );
      if (postCoa.status === 201) {
        handleCloseWithAction();
        enqueueSnackbar(postCoa.data.data, { variant: "success" });
      }
    } catch (error) {
      if (error.response.status === 401) {
        setServerError({
          no_coa: error.response.data.error
        });
      } else if (error.response.status === 409) {
        setServerError({
          no_coa: `COA ${no_coa} atau ${nama} sudah ada di sistem`
        });
      } else if (error.response.status === 500) {
        setServerError({ no_coa: error.response.data.error });
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
            autoFocus
            disabled={isSubmitting}
            error={errors.no_coa || serverError.no_coa ? true : false}
            helperText={errors.no_coa || serverError.no_coa}
            onChange={handleChange}
            value={values.no_coa}
            margin="dense"
            id="no_coa"
            name="no_coa"
            label="Coa Number"
            fullWidth
          />
          <TextField
            disabled={isSubmitting}
            error={errors.nama ? true : false}
            helperText={errors.nama}
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
  handleCloseWithAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

export default FormDialogAdd;
