import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import { API_BASE_URL} from '../../constants/apiContants';
import axios from 'axios';

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
    marginLeft:430,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
  error: {
    color:'#db2269',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function SendMoney(props) {
  const classes = useStyles();
  let rows = [];
  let rowsPay = [];
  let {userId } = props;
  const [receiver, setReceiver] = React.useState('');
  
  const handleChangeReceiver = (event) => {
    setReceiver(event.target.value);
    state.receiver= event.target.value
  };
  const [paymode, setPaymode] = React.useState('');

  const handleChangePaymode = (event) => {
    setPaymode(event.target.value);
    state.paymode= event.target.value
  };
  const [receiverBank, setReceiverBank] = React.useState('');

  const handleChangeReceiverBank = (event) => {
    setReceiverBank(event.target.value);
    state.receiverBank= event.target.value
  };

  const [state , setState] = useState({
    paymode : "",
    receiver : "",
    sendAmount: "",
    receiverBank:"",
    sendingReason:"",
    exchangeAmt:"74.03",
    rows : [],
    rowsPay:[],
    errors:{
      sendAmount:"",
      sendingReason:"",
    }
})

axios.get(API_BASE_URL+"paymentmethods/"+userId)
    .then(function (response) { 
      let data = response.data
      if(response.status === 200 && rows.length === 0){
        let i=0
        while(i<data.length){
          const item = data[i];
          if(item.cardHolderName != null)
          
          var newCardN = "************"+(item.cardNumber).slice((item.cardNumber).length - 4)
          rowsPay.push([item.cardHolderName,newCardN])
            i++
        }
        state.rowsPay = rowsPay
      } else{
          console.log('Data not saved')  
      }
  })
  .catch(function (error) {
      console.log(error);
  });


axios.get(API_BASE_URL+"recipients/"+userId)
    .then(function (response) { 
      let data = response.data
      if(response.status === 200 && rows.length === 0){
        let i=0
        while(i<data.length){
          const item = data[i];
         
          rows.push([item.firstName,item.lastName,item.email])
            i++
        }
        state.rows = rows
        
      } else{
          console.log('Data not saved')  
      }
  })
  .catch(function (error) {
      console.log(error);
  });

let errors;
const handleChange = (e) => {
    const {id ,name, value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))

    errors = state.errors;
    switch (name) {
      case 'sendAmount': 
        state.errors.sendAmount = 
        (validAmountRegex.test(value) && value >= 1000)
            ? ''
            : 'Must be > 1000,upto 2 decimal';
        break;
      case 'sendingReason': 
        state.errors.sendingReason = 
        validNameRegex.test(value)
            ? ''
            : 'Only characters!';
        break;
      default:
      break;
    }
}

const validNameRegex= RegExp(/^[a-zA-Z ]*$/);
const validAmountRegex= RegExp(/^[1-9]\d{0,9}(\.\d{1,2})?%?$/);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md">
    <div className={classes.paper}>         
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-customized-select-label">Payment Method</InputLabel>
              <Select variant="outlined" className={classes.selectClass}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name="paymode"
                value={paymode}
                onChange={handleChangePaymode}
                label="Paymode"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {state.rowsPay.map((row,i) => (
                  <MenuItem value={row[1]}>{row[1]}</MenuItem>
                ))}
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Receiver</InputLabel>
              <Select variant="outlined" className={classes.selectClass}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={state.receiver}
                name="receiver"
                onChange={handleChangeReceiver}
                label="Receiver"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {state.rows.map((row,i) => (
                  <MenuItem value={row[0]+" "+row[1]}>{row[0]} &nbsp; {row[1]}</MenuItem>
                ))}
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Receiver Bank</InputLabel>
              <Select variant="outlined" className={classes.selectClass}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={state.receiverBank}
                name="receiverBank"
                onChange={handleChangeReceiverBank}
                label="Receiver Bank"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="SBI Bank">SBI Bank</MenuItem>
                <MenuItem value="Axis Bank">Axis Bank</MenuItem>
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="sendAmount"
                name="sendAmount"
                variant="outlined"
                required
                fullWidth
                id="sendAmount"
                label="Sending Amount - USD"
                autoFocus
                value={state.sendAmount}
                onChange={handleChange}
                noValidate
              />
              {state.errors.sendAmount.length > 0 && 
                <span className={classes.error}>{state.errors.sendAmount}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="sendingReason"
                name="sendingReason"
                variant="outlined"
                required
                fullWidth
                id="sendingReason"
                label="Sending Reason"
                autoFocus
                value={state.sendingReason}
                onChange={handleChange}
                noValidate
              />
              {state.errors.sendingReason.length > 0 && 
                <span className={classes.error}>{state.errors.sendingReason}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                autoComplete="exchangeAmt"
                name="exchangeAmt"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="exchangeAmt"
                label="Exchange Rate"
                //autoFocus
                value="74.03"
                //onChange={handleChange}
              />
              </Grid>
              <div className={classes.buttonClass}>
              <ListItem button component={Link} to={
                {
                  pathname:'/SendMoneyPreConf',
                  state: state
              }}
              >
              Send
              </ListItem>
            </div>
              </Grid>
    </form>
    </div> 
    </Container>
    </React.Fragment>
  );
}