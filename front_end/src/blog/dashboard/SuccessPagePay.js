import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function SuccessPage(props) {
  return (
    <Typography component="h2" variant="h6" color="black" gutterBottom>
      Payment Method has been added successfully.
      
    </Typography>
  );
}

SuccessPage.propTypes = {
  children: PropTypes.node,
};