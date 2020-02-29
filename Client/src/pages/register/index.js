import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import komponen material-ui//
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Linked from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//Import styles (Registrasi)
import useStyles from './styles';

//import copyright
import Copyright from '../copyright';

//notistack
import { useSnackbar } from 'notistack';

//import custome hooks
import useFormValidateRegister from '../../utils/hooks/useFormValidateRegister';
import validateRegister from '../../utils/validate/validateRegister';

const INITIAL_STATE = {
  email: '',
  username: '',
  password: '',
  confirm: ''
};

function Register() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [serverError, setServerError] = useState({ username: '' });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting
  } = useFormValidateRegister(INITIAL_STATE, validateRegister, RegisterUser);

  async function RegisterUser() {
    const { email, username, password } = values;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      //aksi jangan lupa pake await karena async
      const postRegister = await axios.post(
        '/api/v1/register',
        {
          email,
          username,
          password
        },
        config
      );

      if (postRegister.status === 201) {
        enqueueSnackbar(postRegister.data.data, { variant: 'success' });
      }
    } catch (e) {
      //aksi kalo error
      const code = e.message;
      const getCode = code.substr(32, 3);
      if (getCode === '409') {
        setServerError({
          username: `Username ${username} atau email ${email} sudah terdaftar di sistem`
        });
      } else if (getCode === '400') {
        setServerError({ username: 'Terjadi kesalahan, silahkan coba lagi' });
      } else if (getCode === '500') {
        setServerError({ username: 'Server sedang dalam masalah' });
      }
    }
  }

  return (
    <Paper className={classes.paperForm}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled={isSubmitting}
                value={values.email}
                error={errors.email ? true : false}
                helperText={errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={isSubmitting}
                value={values.username}
                error={errors.username || serverError.username ? true : false}
                helperText={errors.username || serverError.username}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={isSubmitting}
                value={values.password}
                error={errors.password ? true : false}
                helperText={errors.password}
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
            <Grid item xs={12}>
              <TextField
                disabled={isSubmitting}
                value={values.confirm}
                error={errors.confirm ? true : false}
                helperText={errors.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
                fullWidth
                name="confirm"
                label="Confirm Password"
                type="password"
                id="confirm"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Linked component={Link} to="/login" variant="body2">
                Already have an account? Sign in
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
export default Register;
