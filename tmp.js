{/* <List>
          <Route
            exact
            path="/"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push("/");
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
            path="/coa"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push("/coa");
                  }}
                >
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="COA"></ListItemText>
                </ListItem>
              );
            }}
          ></Route>
          <Route
            path="/produk"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push("/produk");
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
                    history.push("/pembelian");
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
                    history.push("/penjualan");
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
                    history.push("/jurnal");
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
                    history.push("/bukbes");
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
        </List> */}