import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function SuccessPage(props) {
  return (
    <Typography component="h2" variant="h6" color="black" gutterBottom>
      Transaction is booked successfully. You will receive transaction summary soon on your email.
      If you wish to Cancel the transaction, you can now do it within 30 minutes of transaction booking time!
      
    </Typography>
  );
}

SuccessPage.propTypes = {
  children: PropTypes.node,
};