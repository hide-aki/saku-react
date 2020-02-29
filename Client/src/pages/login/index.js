import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

//Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Linked from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//styles
import useStyles from './styles';

//copyright
import Copyright from '../copyright';

//custome hooks
import useFormValidateLogin from '../../utils/hooks/useFormValidateLogin';
import validateAuthLogin from '../../utils/validate/validateLogin';

//user Context
import { UserContext } from '../../config/UserContext';

const INITIAL_STATE = {
  //menentukan objek
  username: '',
  password: ''
};

function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const { location } = props;
  const classes = useStyles();
  const [serverError, setServerError] = useState({
    username: '',
    password: ''
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting
  } = useFormValidateLogin(
    INITIAL_STATE,
    validateAuthLogin,
    AuthenticationUser
  );

  async function AuthenticationUser() {
    const { username, password } = values; //inisiasi objek dari values
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      //aksi jangan lupa pake await karena async
      const postLogin = await axios.post(
        '/api/v1/login',
        {
          username,
          password
        },
        config
      );
      if (postLogin.status === 200) {
        await sessionStorage.setItem('key', postLogin.data.token);
        await sessionStorage.setItem('id', postLogin.data.payload.id);
        const id = sessionStorage.getItem('id');
        setUser(id);
      }
    } catch (e) {
      // setServerError(e.message)
      const code = e.message;
      const getCode = code.substr(32, 3);
      if (getCode === '404') {
        setServerError({
          username: `Username ${username} tidak terdaftar di sistem, silahkan register terlebih dahulu`
        });
      } else if (getCode === '409') {
        setServerError({ password: 'Password salah' });
      } else if (getCode === '500') {
        setServerError({ username: 'Server sedang dalam masalah' });
      }
    }
  }
  if (user) {
    const redirectTo =
      location.state && location.state.from && location.state.from.pathname
        ? location.state.from.pathname
        : '/';

    return <Redirect to={redirectTo}></Redirect>;
  }

  return (
    <Paper className={classes.paperForm}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled={isSubmitting}
                error={errors.username || serverError.username ? true : false}
                helperText={errors.username || serverError.username}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={isSubmitting}
                error={errors.password || serverError.password ? true : false}
                helperText={errors.password || serverError.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Linked component={Link} to="/register" variant="body2">
                Don't have an account? Sign up
              </Linked>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Paper>
  );
}

export default Login;
