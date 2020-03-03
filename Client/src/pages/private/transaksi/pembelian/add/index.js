import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";

import { PurchaseProvider } from "./context/LocalState";

//komponen show
import HeaderShow from "./components/show/header";
import Balance from "./components/show/balance";
import PurchaseTable from "./components/show/purchaseTable";

//komponen form
import HeaderForm from "./components/form/header";
import FormComponent from "./components/form/formComponent";

function AddPembelian() {
  return (
    <>
      <PurchaseProvider>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <HeaderShow />
              <Balance />
              <PurchaseTable />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <HeaderForm />
              <FormComponent />
            </Paper>
          </Grid>
        </Grid>
      </PurchaseProvider>
    </>
  );
}

export default AddPembelian;
