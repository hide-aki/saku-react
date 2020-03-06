import React, { useContext } from "react";

import { Typography, Button } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { PurchaseContext } from "../../context/LocalState";

import { numberFormat } from "../../../../../../../utils/format/format";

import useStyles from "../../styles";

function Balance() {
  const { purchase } = useContext(PurchaseContext);
  const classes = useStyles();
  const subtotal = purchase.map(purchase => purchase.qty * purchase.harga);
  const total = subtotal.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <Typography className={classes.titlePaper} variant="h5">
        Total Purchase :
        <Typography className={classes.balance}>
          Rp. {numberFormat(total)}
        </Typography>
      </Typography>
      {total > 0 && (
        <Button
          onClick={() => alert("Save")}
          className={classes.buttonSave}
          size="small"
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      )}
    </>
  );
}

export default Balance;
