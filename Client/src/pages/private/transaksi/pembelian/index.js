import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//komponen pembelian
import ShowPembelian from './table/showPembelian';
import AddPembelian from './add/add';

function Pembelian() {
  return (
    <Switch>
      <Route exact path="/pembelian" component={ShowPembelian}></Route>
      <Route path="/pembelian/tambah" component={AddPembelian}></Route>
      <Redirect to="/pembelian"></Redirect>
    </Switch>
  );
}

export default Pembelian;
