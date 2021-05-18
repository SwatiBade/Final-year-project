import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AlertComponent from './AlertComponent';
import config from 'react-global-configuration';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: '1px solid ${theme.palette.divider}',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'flex-end',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let {loginStatus, title } = props;
  const [open, setOpen] = React.useState(false);
  const [openReg, setOpenReg] = React.useState(false);
  const [errorMessage, updateErrorMessage] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenReg = () => {
    setOpenReg(true);
  };

  const handleCloseReg = () => {
    setOpenReg(false);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    config.set({ loginStatus:false });
    window.location.href = '/'
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
      <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary">
              easyRemit
            </Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {!loginStatus ? (<div>
          <Button variant="outlined" size="small" onClick={handleClickOpen} >
          Sign in
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <SignIn showError={updateErrorMessage} />
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
      </Dialog>
        &nbsp;&nbsp;
        <Button variant="outlined" size="small" onClick={handleClickOpenReg}>
          Register now
        </Button>
        <Dialog open={openReg} onClose={handleCloseReg} aria-labelledby="form-dialog-title">
        <SignUp showError={updateErrorMessage}/>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
      </Dialog> </div>):  <div><Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            Sign out
          </Button></div>}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};