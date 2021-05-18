import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));



export default function FAQ(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);
  return (
    <div>
      <Grid container spacing={1}>
      <Grid item xs={12}>
      <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="black" gutterBottom align="left">
            Q. Can I get notification when the fund is successfully remitted to receiver?
            <br/>
            <Typography component="h2" variant="h6" color="black" gutterBottom>
            A. Yes. Notification will be sent on the registered email.
              </Typography>
          </Typography>
          </Paper>
    </Grid>
    <Grid item xs={12}>
    <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="black" gutterBottom align="left">
            Q. What is the service charge of remittance?
            <br/>
            <Typography component="h2" variant="h6" color="black" gutterBottom>
            A. Service charge is $3.
              </Typography>
          </Typography>
    </Paper>
    </Grid>

    <Grid item xs={12}>
    <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="black" gutterBottom align="left">
            Q. Which receiving banks are supported to remit?
            <br/>
            <Typography component="h2" variant="h6" color="black" gutterBottom>
            A. We are trying to partner with as many banks as possible for your ease. 
            Currently, we are &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            partenered with SBI Bank, Axis Bank, ICICI Bank
              </Typography>
          </Typography>
    </Paper>
    </Grid>

    <Grid item xs={12}>
    <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="black" gutterBottom align="left">
            Q. How many days it takes to transfer the money to the receiver?
            <br/>
            <Typography component="h2" variant="h6" color="black" gutterBottom>
            A. We trasnfer your money safely to your family, friends on the same day the transaction is done.  
              </Typography>
          </Typography>
    </Paper>
    </Grid> 

    </Grid>

    </div>
    
  );
}

FAQ.propTypes = {
  children: PropTypes.node,
};