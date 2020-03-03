import React, { lazy, Suspense } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

import { PurchaseProvider } from './context/LocalState';

import ContentLoading from '../../../../appLoading/contentLoading';

//komponen show
const HeaderShow = lazy(() => import('./components/show/header'));
const Balance = lazy(() => import('./components/show/balance'));
const PurchaseTable = lazy(() => import('./components/show/purchaseTable'));

//komponen form
const HeaderForm = lazy(() => import('./components/form/header'));
const FormComponent = lazy(() => import('./components/form/formComponent'));

function AddPembelian() {
  return (
    <>
      <PurchaseProvider>
        <Grid container spacing={3}>
          <Suspense fallback={<ContentLoading></ContentLoading>}>
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
          </Suspense>
        </Grid>
      </PurchaseProvider>
    </>
  );
}

export default AddPembelian;
