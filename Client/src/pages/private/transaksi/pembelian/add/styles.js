import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  titlePaper: {
    padding: theme.spacing(2)
  },
  balance: {
    display: "inline",
    paddingLeft: theme.spacing(2),
    fontSize: 24
  },
  tablePurchase: {
    paddingBottom: theme.spacing(3)
  },
  textFieldQty: {
    width: theme.spacing(4)
  },
  buttonSave: {
    position: "relative",
    left: theme.spacing(55),
    bottom: theme.spacing(6)
  },
  upIconButton: {
    position: "relative",
    left: theme.spacing(1)
  },
  upIcon: {
    position: "relative"
  },
  downIconButton: {
    position: "relative",
    right: theme.spacing(1)
  },
  downIcon: {
    position: "relative"
  }
}));

export default useStyles;
