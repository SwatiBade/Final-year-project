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


export default function ReferMe(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
      <Paper className={fixedHeightPaper}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom >
      Learn how the referral works!
      </Typography>
      <br/>
      <br/>
      <Typography component="h2" variant="h6" color="black"  align="left" gutterBottom>
      You will earn when you refer your friends or family through our service.
      <div> When you refer someone, a link will be sent to their email. When they register using this link, on their first successfull transaction you will get $1000 coupon and your friend will receive $500 coupon.</div>
      </Typography>
    
    </Paper>
    </Grid>
    </Grid>
  );
}

ReferMe.propTypes = {
  children: PropTypes.node,
};