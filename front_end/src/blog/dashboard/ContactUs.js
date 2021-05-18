import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function ContactUs(props) {
  return (
    <Typography component="h2" variant="h6" color="black" gutterBottom>
      Please get in touch and our expert support team will answer  all your questions.
      <br/>
      Email us at <Typography component="h2" variant="h6" color="primary" gutterBottom>
      support@easyremit.com
        </Typography>
    </Typography>
  );
}

ContactUs.propTypes = {
  children: PropTypes.node,
};