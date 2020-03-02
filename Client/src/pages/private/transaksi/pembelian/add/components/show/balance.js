import React, { useContext } from 'react'
import { Typography } from '@material-ui/core'
import useStyles from '../../styles';

import { PurchaseContext } from '../../context/LocalState';

import { numberFormat } from '../../../../../../../utils/format/format'

function Balance() {
    const { purchase } = useContext(PurchaseContext);
    const classes = useStyles();

    const subtotal = purchase.map(purchase => (purchase.qty * purchase.harga));
    const total = subtotal.reduce((acc, item) => (acc += item), 0);

    return (<>
        <Typography className={classes.titlePaper} variant="h5">
            Total Purchase :
        <Typography className={classes.balance}>Rp. {numberFormat(total)}</Typography>
        </Typography>
    </>)
}

export default Balance;