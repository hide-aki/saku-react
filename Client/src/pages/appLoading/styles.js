import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  circular: {
    marginLeft: theme.spacing(80),
    marginTop: theme.spacing(35),
    color: '#42a5f5'
  },
  loadingText: {
    color: '#42a5f5',
    marginLeft: theme.spacing(72)
  },
  linear: {
    marginLeft: theme.spacing(62),
    marginTop: theme.spacing(30),
    width: theme.spacing(40),
    color: '#42a5f5'
  }
}));

export default useStyles;
