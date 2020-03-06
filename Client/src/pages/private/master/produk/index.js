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

//material-table
import MaterialTable from "material-table";

import { useSnackbar } from "notistack";

//import dialog
import FormDialogAdd from "./form-dialogAdd";
import FormDialogUpdate from "./form-dialogUpdate";

import { numberFormat, removeFormat } from "../../../../utils/format/format";

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

function Produk() {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [openEdit, setOpenEdit] = useState(false);
  const [previousData, setPreviousData] = useState({
    id: "",
    nama: "",
    harga: "",
    stok: "",
    deskripsi: ""
  });

  const [table, setTable] = useState({
    columns: [
      { title: "Product Code", field: "id_produk" },
      { title: "Product Name", field: "nama" },
      { title: "Purchase Price (Rp)", field: "harga_beli" },
      { title: "Selling Price (Rp)", field: "harga_jual" },
      { title: "Stock", field: "stok" },
      { title: "Description", field: "deskripsi" }
    ],
    data: [],
    actions: [
      {
        icon: () => <AddBox />,
        tooltip: "Add Product",
        isFreeAction: true,
        onClick: () => {
          setOpen(true);
        }
      },
      {
        icon: () => <Edit />,
        tooltip: "Edit Product",
        onClick: (event, rowData) => {
          setOpenEdit(true);
          setPreviousData({
            id_produk: rowData.id_produk,
            nama: rowData.nama,
            harga_beli: removeFormat(rowData.harga_beli),
            harga_jual: removeFormat(rowData.harga_jual),
            stok: removeFormat(rowData.stok),
            deskripsi: rowData.deskripsi
          });
        }
      }
    ],
    localization: {
      header: {
        actions: "Actions"
      }
    }
  });
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const res = await axios.get("/api/v1/produk", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("key")}`
          }
        });
        if (res.data.data.length > 0) {
          setTable(table => {
            return {
              ...table,
              data: res.data.data.map(produk => {
                return {
                  id_produk: produk.id_produk,
                  nama: produk.nama,
                  harga_jual: numberFormat(produk.harga_jual),
                  harga_beli: numberFormat(produk.harga_beli),
                  stok: numberFormat(produk.stok),
                  deskripsi: produk.deskripsi
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
        title="Product Table"
        icons={tableIcons}
        columns={table.columns}
        data={table.data}
        actions={table.actions}
        localization={table.localization}
        editable={{
          onRowDelete: async oldData => {
            try {
              const deleteProduk = await axios.delete(
                `/api/v1/produk/${oldData.id_produk}`,
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("key")}`
                  }
                }
              );
              if (deleteProduk.status === 202) {
                enqueueSnackbar(deleteProduk.data.data, { variant: "success" });
                if (trigger === "") {
                  setTrigger("DeleteData");
                } else {
                  setTrigger("");
                }
              }
            } catch (error) {
              const code = error.message;
              const getCode = code.substr(32, 3);
              if (getCode === "401") {
                enqueueSnackbar(
                  "User tidak terautentikasi, silahkan login kembali",
                  { variant: "error" }
                );
              } else if (getCode === "500") {
                enqueueSnackbar("Server dalam masalah", { variant: "error" });
              }
            }
          }
        }}
      ></MaterialTable>

      {//conditional rendering jika open true
      open && (
        <FormDialogAdd
          config={config}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
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
      {//conditional rendering jika openedit true
      openEdit && (
        <FormDialogUpdate
          config={config}
          previousData={previousData}
          openEdit={openEdit}
          handleClose={() => {
            setOpenEdit(false);
          }}
          handleCloseWithAction={() => {
            setOpenEdit(false);
            if (trigger === "") {
              setTrigger("UpdateData");
            } else {
              setTrigger("");
            }
          }}
        ></FormDialogUpdate>
      )}
    </>
  );
}

export default Produk;
