import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'date-fns';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import { API_BASE_URL} from '../../constants/apiContants';
import { useHistory } from "react-router-dom";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  selectClass:{
    width:400,
  },
  buttonClass:{
    alignItems:"center",
    justifyContent:"center",
    marginLeft:50,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  error: {
    color:'#db2269',
  },
}));

export default function PaymentMethod(props) {
  let {userId } = props;
  const classes = useStyles();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-05-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [paymentType, setPaymentType] = React.useState('');
  
  const handleChangePayType = (event) => {
    setPaymentType(event.target.value);
  };

  const [state , setState] = useState({
    paymentType : "",
    cardHolderName : "",
    cardNumber: "",
    cvvNumber:"",
    selectedDate:"",
    errors:{
    cardHolderName : "",
    cardNumber: "",
    cvvNumber:"",
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
      case 'cardNumber': 
        state.errors.cardNumber = 
       ( validNumberRegex.test(value)&& value.length === 16)
          ? ''
          : 'Must contain  16 digits ';
      break;
      case 'cvvNumber': 
        state.errors.cvvNumber = 
        (validNumberRegex.test(value) && value.length === 3)
          ? ''
          : 'Must contain only 3 digits ';
      break;
      case 'cardHolderName': 
        state.errors.cardHolderName = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      default:
      break;
    }
}

const validNameRegex= RegExp(/^[a-zA-Z ]*$/);
const validNumberRegex=  RegExp(/^[0-9]*$/);

const handleSubmitClick = (e) => {
  e.preventDefault();
  sendDetailsToServer() 
}

const sendDetailsToServer = () => {
  if(state.cvvNumber.length >0 ) {
      const payload={
          "user": {"userId":userId},
          "paymentType":"Card",
          "cardType":state.paymentType,
          "cardNumber":state.cardNumber,
          "cvvNumber":state.cvvNumber,
          "cardExpiryDate":state.selectedDate,
          "cardHolderName":state.cardHolderName
      }
      axios.post(API_BASE_URL+"/paymentmethods", payload)
          .then(function (response) { 
              if(response.data === 'CREATED'){
                  setState(prevState => ({
                      ...prevState,
                      'successMessage' : 'Registration successful. Redirecting to home page..'
                  }))
                  history.push("/SuccessPagePay");
              } else{
                  console.log('Data not saved')  
              }
          })
          .catch(function (error) {
              console.log(error);
          });    
  } else {
     console.log('Please enter valid username and password')  
  }
}
  return (
    <React.Fragment>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Payment Type</InputLabel>
              <Select variant="outlined" className={classes.selectClass}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={paymentType}
                onChange={handleChangePayType}
                label="Payment Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Debit">Debit Card</MenuItem>
                <MenuItem value="Credit">Credit Card</MenuItem>
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="cardHolderName"
                name="cardHolderName"
                variant="outlined"
                required
                fullWidth
                id="cardHolderName"
                label="Card Holder's Name"
                autoFocus
                value={state.cardHolderName}
                onChange={handleChange}
                noValidate
              />
              {state.errors.cardHolderName.length > 0 && 
                <span className={classes.error}>{state.errors.cardHolderName}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="cardNumber"
                name="cardNumber"
                variant="outlined"
                required
                fullWidth
                id="cardNumber"
                label="Card Number"
                autoFocus
                value={state.cardNumber}
                onChange={handleChange}
                noValidate
              />
              {state.errors.cardNumber.length > 0 && 
                <span className={classes.error}>{state.errors.cardNumber}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="cvvNumber"
                name="cvvNumber"
                variant="outlined"
                required
                fullWidth
                id="cvvNumber"
                label="cvv Number"
                autoFocus
                value={state.cvvNumber}
                onChange={handleChange}
                noValidate
              />
              {state.errors.cvvNumber.length > 0 && 
                <span className={classes.error}>{state.errors.cvvNumber}</span>}
            </Grid>
             
            <Grid item xs={12} sm={6} >
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker className={classes.selectClass}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Card Expiry Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                name="cardExpiryDate"

            />
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6} >
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
          
            </Grid>
              </Grid>
    
    </React.Fragment>
  );
}