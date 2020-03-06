import React, { useContext } from "react";

import axios from "axios";

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

  const handleSubmit = async () => {
    try {
      const saveCart = await axios.post(
        "/api/v1/pembelian",
        { purchase },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("key")}`,
            "Content-type": "application/json"
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          onClick={() => handleSubmit()}
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
