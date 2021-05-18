import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import SendMoney from './SendMoney';
import PaymentMethod from './PaymentMethod';
import Recipient from './Recipient';
import Deposits from './Deposits';
import TransactionHistory from './TransactionHistory';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
import ReferMe from './ReferMe';
import MyProfile from './MyProfile';
import SuccessPage from './SuccessPage';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ViewRecipients from './ViewRecipients';
import ViewPaymentMethods from './ViewPaymentMethods';
import SendMoneyPreConf from './SendMoneyPreConf';
import TransactionConfPage from './TransactionConfPage';
import SuccessPagePay from './SuccessPagePay';


import { Switch, Route,Link, BrowserRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
    marginTop:65,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    padding: '0 8px',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  selectClass:{
    width:250,
  },
  buttonClass:{
    alignItems:"center",
    justifyContent:"center",
    marginLeft:430,
  },
}));

export default function Dashboard(props) {

  let {userId } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
      <BrowserRouter>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Switch>
        <Route exact path="/" render={() => <div>
          <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                  <ListItem button component={Link} to={"/ViewRecipients"}>
                    <ListItemText primary="View Recipients" />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                  <ListItem button component={Link} to={"/ViewPaymentMethods"}>
                    <ListItemText primary="View Payment Methods" />
                    </ListItem>
                  </Paper>
                </Grid>
              </Grid>
        </div>} />
        <Route path="/Dashboard" render={() => <div> 
              <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                  <ListItem button component={Link} to={"/ViewRecipients"}>
                    <ListItemText primary="View Recipients" />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                  <ListItem button component={Link} to={"/ViewPaymentMethods"}>
                    <ListItemText primary="View Payment Methods" />
                    </ListItem>
                  </Paper>
                </Grid>
              </Grid></div>
          } />
            <Route path="/SendMoney" render={
              () => <div> 
              <Paper className={fixedHeightPaper}>
              <SendMoney  userId={userId}/>
              </Paper>

              </div>
          } />
          <Route path="/Recipient" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
              <Recipient userId={userId}/>
              </Paper>
              </div>
              } />

          <Route path="/PaymentMethod" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
              <PaymentMethod userId={userId}/>
              </Paper>
              </div>
              } />

          <Route path="/TransactionHistory" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
              <TransactionHistory userId={userId}/>
              </Paper>
              </div>
              } />
          <Route path="/FAQ" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
              <FAQ />
              </Paper>
              </div>
              } />
          <Route path="/ContactUs" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
              <ContactUs />
              </Paper>
              </div>
              } />
            <Route path="/ReferMe" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
              <ReferMe />
              </Paper>
              </div>
              } />
            <Route path="/MyProfile" render={
              () => <div>
                <Paper className={fixedHeightPaper}>
                  <MyProfile userId={userId}/>
              </Paper>
              </div>
              } />
             <Route path="/SuccessPage" render={() => <div> 
              <Paper className={fixedHeightPaper}>
             <SuccessPage />
             </Paper>
             </div>} />

             <Route path="/SuccessPagePay" render={() => <div> 
              <Paper className={fixedHeightPaper}>
             <SuccessPagePay />
             </Paper>
             </div>} />

             <Route path="/SendMoneyPreConf" render={() => <div> 
              <Paper className={fixedHeightPaper}>
              <SendMoneyPreConf userId={userId}/>
             </Paper>
             </div>} />
             <Route path="/TransactionConfPage" render={() => <div> 
              <Paper className={fixedHeightPaper}>
              <TransactionConfPage />
             </Paper>
             </div>} />

             <Route path="/ViewRecipients" render={() => <div> 
             <ViewRecipients userId={userId}/>
             </div>} />
             <Route path="/ViewPaymentMethods" render={() => <div> 
             <ViewPaymentMethods userId={userId}/>
             </div>} />

          </Switch>
        </Container>
      </main>
      </BrowserRouter>
    </div>
  );
}