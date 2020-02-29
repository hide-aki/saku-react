import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

import useStyles from './styles';

function AddPembelian() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Typography className={classes.titlePaper} variant="h6">
              Purchase Details
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Typography className={classes.titlePaper} variant="h6">
              Purchase Form
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default AddPembelian;
