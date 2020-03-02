import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titlePaper: {
    padding: theme.spacing(2)
  },
  balance: {
    display: 'inline',
    paddingLeft: theme.spacing(2),
    fontSize: 24
  },
  tablePurchase: {
    paddingBottom: theme.spacing(3)
  }
}));

export default useStyles;
