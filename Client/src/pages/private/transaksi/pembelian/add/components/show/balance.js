import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import axios from "axios";

import { Typography, Button } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { PurchaseContext } from "../../context/LocalState";

import { numberFormat } from "../../../../../../../utils/format/format";

import { useSnackbar } from "notistack";

import useStyles from "../../styles";

function Balance(props) {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();
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
      if (saveCart.status === 201) {
        enqueueSnackbar("Pembelian berhasil disimpan", { variant: "success" });
        history.push("/pembelian");
      }
    } catch (error) {
      if (error.response.status === 500) {
        enqueueSnackbar("Server sedang bermasalah", { variant: "error" });
      } else if (error.response.status === 501) {
        enqueueSnackbar("Database sedang bermasalah", { variant: "error" });
      }
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
Balance.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Balance);
