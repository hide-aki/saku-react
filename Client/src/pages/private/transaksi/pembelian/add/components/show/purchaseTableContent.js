import React, { useContext } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Tooltip
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { PurchaseContext } from "../../context/LocalState";

import { numberFormat } from "../../../../../../../utils/format/format";

import useStyles from "../../styles";

function PurchaseTableContent({ purchase }) {
  const classes = useStyles();
  const { deletePurchase } = useContext(PurchaseContext);

  return (
    <TableRow key={purchase.id_produk}>
      <TableCell align="center">
        <Tooltip title="Remove Item">
          <IconButton
            onClick={() => deletePurchase(purchase.id_produk)}
            size="small"
          >
            <RemoveShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="center">{purchase.nama}</TableCell>
      <TableCell align="left">{numberFormat(purchase.harga)}</TableCell>
      <TableCell align="center">
        <Tooltip title="Increase">
          <IconButton className={classes.upIconButton} size="small">
            <KeyboardArrowUpIcon size={20} className={classes.upIcon} />
          </IconButton>
        </Tooltip>
        <TextField
          inputProps={{ readOnly: true, style: { textAlign: "center" } }}
          className={classes.textFieldQty}
          value={purchase.qty}
        />
        <Tooltip title="Decrease">
          <IconButton size="small" className={classes.downIconButton}>
            <KeyboardArrowDownIcon size={20} className={classes.downIcon} />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="left">
        {numberFormat(purchase.harga * purchase.qty)}
      </TableCell>
    </TableRow>
  );
}

export default PurchaseTableContent;
