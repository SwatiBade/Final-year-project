import React, {useState}  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { API_BASE_URL} from '../constants/apiContants';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import config from 'react-global-configuration';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  error: {
    color:'#db2269',
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [state , setState] = useState({
    email : "",
    password : "",
    confirmPassword: "",
    lastName:"",
    firstName:"",
    mobileNumber:"",
    sendCountry:"",
    successMessage: null,
    errors:{
      email : "",
      password : "",
      confirmPassword: "",
      lastName:"",
      firstName:"",
      mobileNumber:"",
    }
})

let errors;

const handleChange = (e) => {
    const {id ,name, value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))

    errors = state.errors;
    switch (name) {
      case 'firstName': 
        state.errors.firstName = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      case 'lastName': 
        state.errors.lastName = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      case 'mobileNumber': 
        state.errors.mobileNumber = 
        validMobileRegex.test(value)
            ? ''
            : 'Mobile is not valid!';
        break;
      case 'email': 
        state.errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
        case 'password': 
        state.errors.password = 
        validPassRegex.test(value)
          ? ''
          : 'Password must contain 8 characters, 1 number, upper case, lower case character ';
      break;
      case 'confirmPassword': 
        state.errors.confirmPassword = 
        (state.password === value)
          ? ''
          : 'Password must match! ';
      break;
      default:
      break;
    }
}

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validPassRegex= RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const validNameRegex= RegExp(/^[A-Za-z]+$/);
const validMobileRegex= RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);

const [sendCountry, setSendCountry] = React.useState('');

const handleChangeCountry = (event) => {
    setSendCountry(event.target.value);
  };

const sendDetailsToServer = () => {
    if(state.email.length && state.password.length) {
        props.showError(null);
        const payload={
            "email":state.email,
            "password":state.password,
            "lastName":state.lastName,
            "firstName":state.firstName,
            "mobileNumber":state.mobileNumber,
        }
        axios.post(API_BASE_URL+"users/", payload)
            .then(function (response) {
               // alert(response.status+"="+response.data);
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    config.set({ loginStatus:true });
                    config.set({ userId:response.data });
                    window.location.href = '/?login=true&userid='+response.data
                    props.showError(null)
                } else{
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
        props.showError('Please enter valid username and password')    
    }
}

const handleSubmitClick = (e) => {
  e.preventDefault();
  if(state.password === state.confirmPassword) {
      sendDetailsToServer()    
  } else {
      props.showError('Passwords do not match');
  }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={state.firstName}
                onChange={handleChange}
                noValidate
              />
               {state.errors.firstName.length > 0 && 
                <span className={classes.error}>{state.errors.firstName}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={state.lastName}
                onChange={handleChange}
                noValidate
              />
              {state.errors.lastName.length > 0 && 
                <span className={classes.error}>{state.errors.lastName}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mobileNumber"
                name="mobileNumber"
                variant="outlined"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                autoFocus
                value={state.mobileNumber}
                onChange={handleChange}
                noValidate
              />
              {state.errors.mobileNumber.length > 0 && 
                <span className={classes.error}>{state.errors.mobileNumber}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Send To</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sendCountry}
                onChange={handleChangeCountry}
                label="Send To"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>India</MenuItem>
              </Select>
              </FormControl>
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                //autoComplete="email"
                value={state.email}
                onChange={handleChange}
                noValidate
              />
              {state.errors.email.length > 0 && 
                <span className={classes.error}>{state.errors.email}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={handleChange}
                noValidate
              />
              {state.errors.password.length > 0 && 
                <span className={classes.error}>{state.errors.password}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={state.confirmPassword}
                onChange={handleChange}
                noValidate
              />
              {state.errors.confirmPassword.length > 0 && 
                <span className={classes.error}>{state.errors.confirmPassword}</span>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}