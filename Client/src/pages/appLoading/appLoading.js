import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

function AppLoading() {
    const classes = useStyles();
    return <>
        <CircularProgress size={60} className={classes.circular} />
        <Typography variant="h5" className={classes.loadingText}>Memuat halaman...</Typography>
    </>
}

export default AppLoading;
