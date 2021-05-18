import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { API_BASE_URL} from '../../constants/apiContants';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  selectClass:{
    width:250,
  },
  buttonClass:{
    alignItems:"center",
    justifyContent:"center",
    marginLeft:430,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  error: {
    color:'#db2269',
  },
}));

export default function Recipient(props) {
  let {userId } = props;
  //alert("in recipientadd page:"+userId)
  const classes = useStyles();
  const history = useHistory();
  const [state , setState] = useState({
    email : "",
    sendingReason : "",
    recvAccountNumber: "",
    lastName:"",
    firstName:"",
    mobileNumber:"",
    city:"",
    recvstate:"",
    userId:"",
    successMessage: null,
    errors:{
      email : "",
      lastName:"",
      firstName:"",
      mobileNumber:"",
      recvAccountNumber:"",
      sendingReason:"",
      recvstate:"",
      city:"",
    }
})

let errors;
const sendDetailsToServer = () => {
    if(state.recvAccountNumber.length >0 && state.email.length >0) {
        //props.showError(null);
        const payload={
            "user": {"userId":userId},
            "email":state.email,
            "sendingReason":state.sendingReason,
            "lastName":state.lastName,
            "firstName":state.firstName,
            "mobileNumber":state.mobileNumber,
            "recvAccountNumber":state.recvAccountNumber,
            "city":state.city,
            "state":state.recvstate,
        }
        //alert(payload);
        axios.post(API_BASE_URL+"/recipients", payload)
            .then(function (response) { 
                //alert(response.data);
                if(response.data === 'CREATED'){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    history.push("/SuccessPage");
                } else{
                    console.log('Data not saved')  
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
       // props.showError('Please enter valid username and password')  
       console.log('Please enter valid username and password')  
    }
}

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer() 
  }
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
            : 'Only aplhabates!';
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
      case 'recvAccountNumber': 
        state.errors.recvAccountNumber = 
        (validNumberRegex.test(value) && value.length === 14)
          ? ''
          : 'Must contain atleast 14 numbers ';
      break;
      case 'sendingReason': 
        state.errors.sendingReason = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      case 'city': 
        state.errors.city = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      case 'recvstate': 
        state.errors.recvstate = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      default:
      break;
    }
}
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validNameRegex= RegExp(/^[a-zA-Z ]*$/);
const validMobileRegex= RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
const validNumberRegex=  RegExp(/^[0-9]*$/);
  return (
    <React.Fragment>
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
                autoComplete="lastName"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
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
              <TextField 
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                value={state.email}
                onChange={handleChange}
                noValidate
              />
              {state.errors.email.length > 0 && 
                <span className={classes.error}>{state.errors.email}</span>}
            </Grid>
             
              <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="recvAccountNumber"
                name="recvAccountNumber"
                variant="outlined"
                required
                fullWidth
                id="recvAccountNumber"
                label="Account Number"
                autoFocus
                value={state.recvAccountNumber}
                onChange={handleChange}
                noValidate
              />
              {state.errors.recvAccountNumber.length > 0 && 
                <span className={classes.error}>{state.errors.recvAccountNumber}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField 
                autoComplete="Sending Reason"
                name="sendingReason"
                variant="outlined"
                required
                fullWidth
                id="sendingReason"
                label="Sending Reason"
                autoFocus
                value={state.sendingReason}
                onChange={handleChange}
              />
              {state.errors.sendingReason.length > 0 && 
                <span className={classes.error}>{state.errors.sendingReason}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="State"
                name="recvstate"
                variant="outlined"
                required
                fullWidth
                id="recvstate"
                label="State"
                autoFocus
                value={state.recvstate}
                onChange={handleChange}
                noValidate
              />
              {state.errors.recvstate.length > 0 && 
                <span className={classes.error}>{state.errors.recvstate}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="City"
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                autoFocus
                value={state.city}
                onChange={handleChange}
                noValidate
              />
              {state.errors.city.length > 0 && 
                <span className={classes.error}>{state.errors.city}</span>}
            </Grid>
            
              <div className={classes.buttonClass}>
              <Button 
              type="submit"
              alignItems="center"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitClick}
              >
              Add
            </Button> 
            </div>
          </Grid>
          
         
      
    </React.Fragment>
  );
}