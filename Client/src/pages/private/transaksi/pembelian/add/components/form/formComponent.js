import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

//material UI
import { forwardRef } from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

//material-table
import MaterialTable from 'material-table';

import { useSnackbar } from 'notistack';

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
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
  AddToCart: forwardRef((props, ref) => (
    <AddShoppingCartIcon {...props} ref={ref} />
  ))
};

function FormComponent(props) {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState({
    columns: [
      { title: 'Product ID', field: 'id_produk' },
      { title: 'Product Name', field: 'nama' }
    ],
    data: [],
    actions: [
      {
        icon: () => <AddShoppingCartIcon />,
        tooltip: 'Add to cart',
        onClick: (event, rowData) => {
          alert('Add to cart');
        }
      }
    ],
    localization: {
      header: {
        actions: ''
      }
    }
  });

  useEffect(() => {
    setLoading(true);
    async function getList() {
      try {
        const res = await axios.get('/api/v1/pembelian/list', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('key')}`
          }
        });
        if (res.data.data.length > 0) {
          setTable(table => {
            return {
              ...table,
              data: res.data.data.map(produk => {
                return {
                  id_produk: produk.id_produk,
                  nama: produk.nama
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
        const code = error.message;
        const getCode = code.substr(32, 3);
        if (getCode === '401') {
          enqueueSnackbar('User tidak terautentikasi, silahkan login kembali', {
            variant: 'error'
          });
        } else if (getCode === '500') {
          enqueueSnackbar('Server dalam masalah', { variant: 'error' });
        }
      }
    }
    getList();
  }, []);

  return (
    <>
      <MaterialTable
        isLoading={loading}
        title="Product List"
        icons={tableIcons}
        columns={table.columns}
        data={table.data}
        actions={table.actions}
        localization={table.localization}
      ></MaterialTable>
    </>
  );
}

export default FormComponent;
