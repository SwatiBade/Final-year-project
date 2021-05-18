import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { API_BASE_URL} from '../constants/apiContants';
import config from 'react-global-configuration';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(5)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  error: {
    color:'#db2269',
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [state , setState] = useState({
    email : "",
    password : "",
    successMessage: null,
    errors : {
        email: "",
        password: "",
    }
})
let errors;
const handleChange = (e) => {
    e.preventDefault();
    const {id,name, value} = e.target  
    setState(prevState => ({
      ...prevState,
      [id] : value
  })) 
    errors = state.errors;
    switch (name) {
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
      default:
      break;
    }
}

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const validPassRegex= RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
  
  const handleSubmitClick = (e) => {
    e.preventDefault()
    sendDetailsToServer();    
  }
  const sendDetailsToServer = () => {
    if(state.email.length>0 && state.password.length>0) {
        props.showError(null);
        
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+"users/getByEmail", payload)
            .then(function (response) {
                if(response.data != null){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Loggedin successful. Redirecting to your account..'
                    }))
                    config.set({ loginStatus:true });
                    config.set({ userId:response.data });
                    window.location.href = '/?login=true&userid='+response.data
                    props.showError(null)
                } else{
                    props.showError("Oops...Invalid credentials. Please try again!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
        props.showError('Invalid email or password')    
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
        <Grid container spacing={1}>
            <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            //autoComplete="email"
            value={state.email}
            onChange={handleChange}
            autoFocus
            noValidate
          />
          {state.errors.email.length > 0 && 
                <span className={classes.error}>{state.errors.email}</span>}
          </Grid>
          <Grid item xs={12}>      
          <TextField
            variant="outlined"
            margin="normal"
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
        </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            Sign In
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SingIn" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}