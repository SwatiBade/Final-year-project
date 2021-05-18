import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';


export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Exchange Rate</Title>
      <Typography component="p" variant="h5" >
        74.03 INR
        <br/>
        <div>
            &nbsp;
        </div>
      </Typography>
    
    </React.Fragment>
  );
}