import React from 'react';

import useStyles from '../../styles';
import { Typography } from '@material-ui/core';

function Header() {
    const classes = useStyles();
    return (
        <Typography className={classes.titlePaper} variant="h6">Purchase Form</Typography>
    )
}

export default Header;
