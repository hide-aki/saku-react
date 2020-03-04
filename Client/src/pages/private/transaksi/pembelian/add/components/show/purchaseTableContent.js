import React, { useContext } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Tooltip
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import { PurchaseContext } from "../../context/LocalState";

import { numberFormat } from "../../../../../../../utils/format/format";

import useStyles from "../../styles";

function PurchaseTableContent({ purchase }) {
  const { deletePurchase } = useContext(PurchaseContext);
  const classes = useStyles();
  return (
    <TableRow key={purchase.id_produk}>
      <TableCell align="center">
        <Tooltip title="Remove Item">
          <IconButton
            onClick={() => deletePurchase(purchase.id_produk)}
            size="small"
            aria-label="Remove Item"
          >
            <RemoveShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="center">{purchase.id_produk}</TableCell>
      <TableCell align="center">{purchase.nama}</TableCell>
      <TableCell align="left">
        <TextField
          className={classes.textFieldPrice}
          value={numberFormat(purchase.harga)}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          type="number"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          className={classes.textFieldQty}
          value={numberFormat(purchase.qty)}
        />
      </TableCell>
      <TableCell align="left">
        {numberFormat(purchase.harga * purchase.qty)}
      </TableCell>
    </TableRow>
  );
}

export default PurchaseTableContent;
