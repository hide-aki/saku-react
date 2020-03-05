import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Material UI
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from "./config/Theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

//loading page
import AppLoading from "./pages/appLoading/appLoading";

//user context
import { UserContext } from "./config/UserContext";

//pages component
import PrivateRoute from "./config/PrivateRoute";
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const NotFound = lazy(() => import("./pages/404"));
const Private = lazy(() => import("./pages/private"));

function App() {
  const [user, setUser] = useState(sessionStorage.getItem("id"));

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <CssBaseline></CssBaseline>
      <ThemeProvider theme={Theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <UserContext.Provider value={providerUser}>
            <Router>
              <Suspense fallback={<AppLoading></AppLoading>}>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    component={Private}
                  ></PrivateRoute>
                  <PrivateRoute
                    path="/pembelian"
                    component={Private}
                  ></PrivateRoute>
                  <PrivateRoute
                    path="/penjualan"
                    component={Private}
                  ></PrivateRoute>
                  <PrivateRoute
                    path="/produk"
                    component={Private}
                  ></PrivateRoute>
                  <PrivateRoute path="/coa" component={Private}></PrivateRoute>
                  <PrivateRoute
                    path="/jurnal"
                    component={Private}
                  ></PrivateRoute>
                  <PrivateRoute
                    path="/bukbes"
                    component={Private}
                  ></PrivateRoute>
                  <Route path="/register" component={Register}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route component={NotFound}></Route>
                </Switch>
              </Suspense>
            </Router>
          </UserContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
