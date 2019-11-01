import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import PieChartIcon from '@material-ui/icons/PieChart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SignOutButton from '../SignOut';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  mlAuto: {
    marginLeft: 'auto',
  }
}));

export default  function Navigation() {
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
  <div className={classes.root}>
  <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          <SupervisedUserCircleIcon /> MoneyManagment
        </Typography>
        <AuthUserContext.Consumer>
          { authUser =>
            authUser ?
              <SignOutButton />
            : 
              ''
            }
        </AuthUserContext.Consumer>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />

      <List>
        <AuthUserContext.Consumer>
          { authUser =>
            authUser ?
              <ListItem component={Link} to={ROUTES.DASHBOARD} >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </ListItem>
            : 
            <ListItem component={Link} to={ROUTES.SIGN_IN} >
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Log In"/>
            </ListItem>
            }
        </AuthUserContext.Consumer>
      </List>
      <Divider />
      <List>
      <AuthUserContext.Consumer>
          { authUser =>
            authUser ?
              <div>
                <ListItem component={Link} to={ROUTES.TRANSACTIONS} >
                  <ListItemIcon><SwapHorizIcon /></ListItemIcon>
                  <ListItemText primary="Transactions"/>
                </ListItem>
                <ListItem component={Link} to={ROUTES.ACCOUNTS} >
                  <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                  <ListItemText primary="Accounts"/>
                </ListItem>
                <ListItem component={Link} to={ROUTES.BUDGETS} >
                  <ListItemIcon><PieChartIcon /></ListItemIcon>
                  <ListItemText primary="Budgets"/>
                </ListItem>
              </div>
            :
            <ListItem component={Link} to={ROUTES.SIGN_UP} >
              <ListItemIcon><GroupAddIcon /></ListItemIcon>
              <ListItemText primary="Registration"/>
            </ListItem>
            }
        </AuthUserContext.Consumer>
      </List>
    </Drawer>
    </div>
  );
}