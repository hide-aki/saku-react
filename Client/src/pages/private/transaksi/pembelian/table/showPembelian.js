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
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

//material-table
import MaterialTable from "material-table";

import { useSnackbar } from "notistack";

import { numberFormat, formatDate } from "../../../../../utils/format/format";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
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
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function ShowPembelian(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState({
    columns: [
      { title: "Purchase ID", field: "id_transaksi" },
      { title: "Date", field: "tanggal" },
      { title: "Total (Rp)", field: "total" }
    ],
    data: [],
    detailPanel: [
      {
        tooltip: "Show Detail",
        render: rowData => {
          return <h1>Ini detail {rowData.id_transaksi}</h1>;
        }
      }
    ],
    actions: [
      {
        icon: () => <AddBox />,
        tooltip: "Add Purchase",
        isFreeAction: true,
        onClick: () => {
          history.push("/pembelian/tambah");
        }
      }
    ]
  });
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const res = await axios.get("/api/v1/pembelian", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("key")}`
          }
        });
        if (res.data.data.length > 0) {
          setTable(table => {
            return {
              ...table,
              data: res.data.data.map(purchase => {
                return {
                  id_transaksi: purchase.id_transaksi,
                  tanggal: formatDate(purchase.tanggal),
                  total: numberFormat(purchase.total)
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
          enqueueSnackbar("User tidak terautentikasi, silahkan login", {
            variant: "error"
          });
        } else if (error.response.status === 500) {
          enqueueSnackbar("Server dalam masalah", { variant: "error" });
        }
      }
    }
    getData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MaterialTable
        isLoading={loading}
        title="Purchase Table"
        icons={tableIcons}
        columns={table.columns}
        data={table.data}
        detailPanel={table.detailPanel}
        actions={table.actions}
      ></MaterialTable>
    </>
  );
}

export default ShowPembelian;
