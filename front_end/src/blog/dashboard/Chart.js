import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { API_BASE_URL} from '../../constants/apiContants';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    
    alignContent:'left',

  },
  buttonClass:{
    alignItems:"right",
    justifyContent:"right",
    marginLeft:430,
  },
  error: {
    color:'#db2269',
  }
}));

export default function Chart() {
  let receivingAmount;
  const classes = useStyles();
  const [state , setState] = useState({
    sendingAmount : "",
    receivingAmount : "",
    errors:{
      sendingAmount : "",
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
      case 'sendingAmount': 
        state.errors.sendingAmount = 
        validAmountRegex.test(value)
            ? ''
            : 'Should not start with 0, must be upto 2 decimal places!';
        break;
      default:
      break;
    }
}

const validAmountRegex= RegExp(/^[1-9]\d{0,9}(\.\d{1,2})?%?$/);


const handleSubmitClick = (e) => {
 e.preventDefault();
  sendDetailsToServer() 
}

const sendDetailsToServer = () => {
  if(state.sendingAmount >0 ) {
      //props.showError(null);
      const payload={
         "sendingAmount":state.sendingAmount,
      }
      axios.get(API_BASE_URL+"exchange-rate/from/USD/to/INR", payload)
          .then(function (response) { 
              if(response.data!= null){
                  setState(prevState => ({
                      ...prevState,
                      'successMessage' : 'Registration successful. Redirecting to home page..',
                      receivingAmount:  Number(state.sendingAmount) * Number(response.data)
                  }))
              } else{
                setState(prevState => ({
                  ...prevState,
                  'successMessage' : 'Registration successful. Redirecting to home page..',
                  
              }))
              
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

  return (
    <React.Fragment>
      <div align="left">
      <Title className={classes.textField}>Sending Amount</Title>
      </div>
      <form className={classes.form} noValidate>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="sendingAmount"
                name="sendingAmount"
                variant="outlined"
                required
                fullWidth
                id="sendingAmount"
                label="Sending Amount - USD"
                autoFocus
                value={state.sendingAmount}
                onChange={handleChange}
                noValidate
              />
              {state.errors.sendingAmount.length > 0 && 
                <span className={classes.error}>{state.errors.sendingAmount}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="receivingAmount"
                label="Receiving Amount - INR"
                name="receivingAmount"
                autoComplete="receivingAmount"
                value={state.receivingAmount}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className={classes.buttonClass}>
              <Button 
              type="submit"
              alignItems="center"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitClick}
              >
              Calculate
            </Button> 
            </div>
            </Grid>
      </Grid>
      </form> 
      
      
    </React.Fragment>
  );
}