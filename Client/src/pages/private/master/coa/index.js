import React, { useState, useEffect } from "react";
import axios from "axios";

//material UI
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//material-table
import MaterialTable from "material-table";

//custom hooks
import useFormValidationMaster from "../../../../utils/hooks/useFormValidationMaster";
import validateMasterCoa from "../../../../utils/validate/validateMasterCoa";

//import Dialog
// import AddDialog from "./form-dialogAdd";
import EditDialog from "./form-dialogEdit";

import { useSnackbar } from "notistack";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />)
};

const config = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("key")}`,
    "Content-type": "application/json"
  }
};

const INITIAL_STATE_ADD = { //inisiasi variabel untuk menampung global objek
  no_coa: "",
  nama: ""
};

//Form Add Coa (Children component)
function FormDialogAdd({ config, open, handleClose, handleCloseWithAction }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  } = useFormValidationMaster(INITIAL_STATE_ADD, validateMasterCoa, addCoaSubmit);
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

//Parent component 
function Coa() {
  const { enqueueSnackbar } = useSnackbar();
  const [trigger, setTrigger] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [previousData, setPreviousData] = useState({
    no_coa: "",
    nama: ""
  });
  const [table, setTable] = useState({
    columns: [
      { title: "Coa Number", field: "no_coa" },
      { title: "Coa Name", field: "nama" }
    ],
    data: [],
    actions: [
      {
        icon: () => <AddBox />,
        tooltip: "Add Coa",
        isFreeAction: true,
        onClick: () => setOpen(true)
      },
      {
        icon: () => <Edit />,
        tooltip: "Edit COA",
        onClick: (event, rowData) => {
          setOpenEdit(true);
          setPreviousData({
            no_coa: rowData.no_coa,
            nama: rowData.nama
          });
        }
      }
    ]
  });
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const res = await axios.get("/api/v1/coa", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("key")}`
          }
        });
        if (res.data.data.length > 0) {
          setTable(table => {
            return {
              ...table,
              data: res.data.data.map(coa => {
                return {
                  no_coa: coa.no_coa,
                  nama: coa.nama
                };
              })
            };
          });
        } else {
          setTable(table => {
            return {
              ...table,
              data: []
            };
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response.status === 401) {
          enqueueSnackbar("User tidak terautentikasi, silahkan login kembali", {
            variant: "error"
          });
        } else if (error.response.status === 500) {
          enqueueSnackbar("Server dalam masalah", { variant: "error" });
        }
      }
    }
    getData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return (
    <>
      <MaterialTable
        isLoading={isLoading}
        title="COA Table"
        icons={tableIcons}
        columns={table.columns}
        data={table.data}
        actions={table.actions}
      />
      {open && (
        <FormDialogAdd
          config={config}
          open={open}
          handleClose={() => setOpen(false)}
          handleCloseWithAction={() => {
            setOpen(false);
            if (trigger === "") {
              setTrigger("AddData");
            } else {
              setTrigger("");
            }
          }}
        ></FormDialogAdd>
      )}
      {openEdit && (
        <EditDialog
          config={config}
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          handleCloseWithAction={() => {
            setOpenEdit(false);
            if (trigger === "") {
              setTrigger("EditData");
            } else {
              setTrigger("");
            }
          }}
          previousData={previousData}
        ></EditDialog>
      )}
    </>
  );
}

export default Coa;
