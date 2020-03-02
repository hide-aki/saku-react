import React, { useContext } from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { PurchaseContext } from '../../context/LocalState';

import { numberFormat } from '../../../../../../../utils/format/format';

function PurchaseTableContent({ purchase }) {
    const { deletePurchase } = useContext(PurchaseContext);

    return (
        <TableRow key={purchase.id}>
            <TableCell align="center">
                <IconButton onClick={() => deletePurchase(purchase.id)} size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell align="center">{purchase.id}</TableCell>
            <TableCell align="center">{purchase.nama}</TableCell>
            <TableCell align="left">{numberFormat(purchase.harga)}</TableCell>
            <TableCell align="center">{numberFormat(purchase.qty)}</TableCell>
            <TableCell align="left">{numberFormat(purchase.harga * purchase.qty)}</TableCell>
        </TableRow>
    )
}

export default PurchaseTableContent;

