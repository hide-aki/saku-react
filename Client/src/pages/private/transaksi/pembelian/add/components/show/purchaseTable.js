import React, { useContext } from 'react'
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';

import PurchaseTableContent from './purchaseTableContent';

import { PurchaseContext } from '../../context/LocalState';

import useStyles from '../../styles';

function PurchaseTable() {
    const classes = useStyles();
    const { purchase } = useContext(PurchaseContext);
    return (
        <TableContainer className={classes.tablePurchase} component={Paper}>
            <Table aria-label="purchase table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">ID Product</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Price (Rp)</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="center">Subtotal (Rp)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchase.map(purchase => (<PurchaseTableContent key={purchase.id} purchase={purchase} />))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PurchaseTable;