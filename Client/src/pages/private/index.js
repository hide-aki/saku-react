import React, { useContext, lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListSubheader from "@material-ui/core/ListSubheader";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StoreIcon from "@material-ui/icons/Store";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BookIcon from "@material-ui/icons/Book";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

import useStyles from "./styles";
import Copyright from "../copyright";

//user Context
import { UserContext } from "../../config/UserContext";

//loading page
import ContentLoading from "../appLoading/contentLoading";

//axios
import axios from 'axios';

//import private pages
const Beranda = lazy(() => import("../private/beranda"));
const Produk = lazy(() => import("../private/master/produk"));
const Coa = lazy(() => import("../private/master/coa"));
const Penjualan = lazy(() => import("../private/transaksi/penjualan"));
const Pembelian = lazy(() => import("../private/transaksi/pembelian"));
const Jurnal = lazy(() => import("../private/laporan/jurnal"));
const Bukbes = lazy(() => import("../private/laporan/bukubesar"));

export default function Private() {
  const klp_menu = sessionStorage.getItem('kode_klp_menu');
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    if (window.confirm("Apakah anda yakin ingin Sign-out?")) {
      window.sessionStorage.clear();
      setUser(null);
    }
  };
  useEffect(() => {
    async function getMenu() {
      try {
        const getMenu = await axios.get(`/api/v1/menu/${klp_menu}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("key")}`
          }
        });
        if (getMenu.data.data.length > 0) {
          const listImport = getMenu.data.data.map(listImp => ({
            nama: listImp.nama,
            url: listImp.form
          }))

          for (let i = 0)

        }
      } catch (error) {
        console.log(error)
      }
    }
    getMenu();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Switch>
              <Route path="/produk" children="Product"></Route>
              <Route path="/coa" children="Coa"></Route>
              <Route path="/pembelian" children="Purchase"></Route>
              <Route path="/penjualan" children="Sale"></Route>
              <Route path="/jurnal" children="General Journal"></Route>
              <Route path="/bukbes" children="Ledger"></Route>
              <Route children="Dashboard"></Route>
            </Switch>
          </Typography>
          <IconButton onClick={handleSignOut} color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {

        }
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Suspense fallback={<ContentLoading></ContentLoading>}>
            <Switch>
              <Route path="/produk" component={Produk}></Route>
              <Route path="/coa" component={Coa}></Route>
              <Route path="/pembelian" component={Pembelian}></Route>
              <Route path="/penjualan" component={Penjualan}></Route>
              <Route path="/jurnal" component={Jurnal}></Route>
              <Route path="/bukbes" component={Bukbes}></Route>
              <Route component={Beranda}></Route>
            </Switch>
          </Suspense>
          <Box pt={9}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
