import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages component
import registrasi from './pages/register';
import login from './pages/login';
import notfound from './pages/404';
import Private from './pages/private';
import PrivateRoute from './config/PrivateRoute';

//Material UI
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Theme from './config/Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

//loading page
import AppLoading from './pages/appLoading/appLoading';

//user context
import { UserContext } from './config/UserContext';

function App() {
  const [isLoading, setLoading] = useState(true);

  const [user, setUser] = useState(sessionStorage.getItem('id'))

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }, [])

  if (isLoading) {
    return (<AppLoading></AppLoading>)
  }

  return (
    <>
      <CssBaseline></CssBaseline>
      <ThemeProvider theme={Theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <UserContext.Provider value={providerUser}>
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Private}></PrivateRoute>
                <PrivateRoute path="/pembelian" component={Private}></PrivateRoute>
                <PrivateRoute path="/penjualan" component={Private}></PrivateRoute>
                <PrivateRoute path="/produk" component={Private}></PrivateRoute>
                <PrivateRoute path="/jurnal" component={Private}></PrivateRoute>
                <PrivateRoute path="/bukbes" component={Private}></PrivateRoute>
                <Route path="/register" component={registrasi}></Route>
                <Route path="/login" component={login}></Route>
                <Route component={notfound}></Route>
              </Switch>
            </Router>
          </UserContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
