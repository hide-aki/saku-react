import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StoreIcon from '@material-ui/icons/Store';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookIcon from '@material-ui/icons/Book';

import useStyles from './styles';
import Copyright from '../copyright';

//import private pages
import Beranda from '../private/beranda';
import Produk from '../private/master/produk';
import Penjualan from '../private/transaksi/penjualan';
import Pembelian from '../private/transaksi/pembelian';
import Jurnal from '../private/laporan/jurnal';
import Bukbes from '../private/laporan/bukubesar';

//user Context
import { UserContext } from '../../config/UserContext';

export default function Private() {
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    if (window.confirm('Apakah anda yakin ingin Sign-out?')) {
      window.sessionStorage.clear();
      setUser(null);
    }
  };

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
        <List>
          <Route
            exact
            path="/"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Master</ListSubheader>
          <Route
            path="/produk"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/produk');
                  }}
                >
                  <ListItemIcon>
                    <AddToQueueIcon />
                  </ListItemIcon>
                  <ListItemText primary="Produk"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Transaction</ListSubheader>
          <Route
            path="/pembelian"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/pembelian');
                  }}
                >
                  <ListItemIcon>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <ListItemText primary="Purchase"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
          <Route
            path="/penjualan"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/penjualan');
                  }}
                >
                  <ListItemIcon>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sale"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Report</ListSubheader>
          <Route
            path="/jurnal"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/jurnal');
                  }}
                >
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="General Journal"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
          <Route
            path="/bukbes"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/bukbes');
                  }}
                >
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ledger"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/produk" component={Produk}></Route>
            <Route path="/pembelian" component={Pembelian}></Route>
            <Route path="/penjualan" component={Penjualan}></Route>
            <Route path="/jurnal" component={Jurnal}></Route>
            <Route path="/bukbes" component={Bukbes}></Route>
            <Route component={Beranda}></Route>
          </Switch>
          <Box pt={9}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
