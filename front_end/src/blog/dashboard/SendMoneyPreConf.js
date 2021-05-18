import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { API_BASE_URL} from '../../constants/apiContants';
import { useHistory , useLocation} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';



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
}));

export default function SendMoneyPreConf(props) {

  let {userId } = props;
  //alert("in pre conf page:"+userId)
  const classes = useStyles();
  const history = useHistory();
  
  const [state , setState] = useState({
    paymode : "",
    receiver : "",
    sendAmount: "",
    receiverBank:"",
    exchangeRate:"74.03"
})
  

const handleSubmitClick = (e) => {
 // alert("in submit click");
  e.preventDefault();
  sendDetailsToServer() 
}

const sendDetailsToServer = () => {
 
      const payload={
          "user": {"userId":userId},
          "recipient":{"id":"4",
            "user":{
                "userId":userId
                }
          },
          "paymentmethod":{
            "id":"1",
            "user":{
                "userId":userId
                }
          },
          "sendCountry":"USA",
          "recvCountry":"IND",
          "recvBankName":location.state.receiverBank,
          "amount":location.state.sendAmount,
          "sendingReason":location.state.sendingReason,
          "exchangeRate":"73.03"
      }
      axios.post(API_BASE_URL+"/sendmoney", payload)
          .then(function (response) { 
              //alert(response.data);
              if(response.data === 'CREATED'){
                  setState(prevState => ({
                      ...prevState,
                      'successMessage' : 'Registration successful. Redirecting to home page..'
                  }))
                  history.push("/TransactionConfPage");
              } else{
                  console.log('Data not saved')  
              }
          })
          .catch(function (error) {
              console.log(error);
          });    
}
const location = useLocation() 
//alert(location.state.receiver)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                autoComplete="paymode"
                name="paymode"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="paymode"
                label="Paymode"
                value={location.state.paymode}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                autoComplete="receiver"
                name="receiver"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="receiver"
                label="Receiver"
                value={location.state.receiver}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                autoComplete="receiverBank"
                name="receiverBank"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="receiverBank"
                label="Receiver Bank"
                value={location.state.receiverBank}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                autoComplete="sendAmount"
                name="sendAmount"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="sendAmount"
                label="Sending Amount - USD"
                value={location.state.sendAmount}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                autoComplete="sendingReason"
                name="sendingReason"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="sendingReason"
                label="Sending Reason"
                value={location.state.sendingReason}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                autoComplete="exchangeAmt"
                name="exchangeAmt"
                variant="outlined"
                readonly
                disabled
                fullWidth
                id="exchangeAmt"
                label="Exchange Rate"
                value="74.03"
              />
              </Grid>
              <div className={classes.buttonClass}>
              <Button 
              type="submit"
              alignItems="center"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitClick}>
              Send
            </Button> 
            </div> &nbsp; 
            <div className={classes.buttonClass}>
              <ListItem button component={Link} to='/Dashboard'>
              Cancel
              </ListItem>
            </div>
              </Grid>
    
    </React.Fragment>
  );
}