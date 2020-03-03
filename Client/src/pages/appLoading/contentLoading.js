import React from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import { LinearProgress } from '@material-ui/core';

function ContentLoading() {
  const classes = useStyles();
  return (
    <>
      <LinearProgress className={classes.linear} variant="query" />
      <Typography variant="h5" className={classes.loadingText}>
        Memuat konten...
      </Typography>
    </>
  );
}

export default ContentLoading;
