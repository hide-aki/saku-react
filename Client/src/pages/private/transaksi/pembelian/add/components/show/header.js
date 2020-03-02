import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from '../../styles';

function Header() {
    const classes = useStyles();
    return (
        <Typography className={classes.titlePaper} variant="h6">Purchase Details</Typography>
    )
}

export default Header;
