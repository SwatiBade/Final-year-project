import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { API_BASE_URL} from '../../constants/apiContants';
import axios from 'axios';


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

export default function MyProfile(props) {
  let {userId} = props;
  const [state , setState] = useState({
    firstName:"",
    email:"",
    lastName:"",
    mobileNumber:"",
})

axios.get(API_BASE_URL+"users/"+userId)
.then(function (response) { 
  let data = response.data
  //alert(response.status)
  if(response.status === 200){
    //alert(response.data[0].firstName)
    state.firstName = response.data[0].firstName
    state.lastName = response.data[0].lastName
    state.email = response.data[0].email
    state.mobileNumber = response.data[0].mobileNumber
    
  } else{
      console.log('Data not saved')  
  }
})
.catch(function (error) {
  console.log(error);
});

  const classes = useStyles();
  //alert(state.firstName)
  return (
    <React.Fragment>
      <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                name="firstName"
                variant="outlined"
                fullWidth
                readonly
                id="firstName"
                label="First Name"
                //value="Swati"
                value={state.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                name="lastName"
                variant="outlined"
                fullWidth
                id="lastName"
                readonly
                label="Last Name"
                //value="Bade"
                value={state.lastName}
                //onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                name="mobileNumber"
                variant="outlined"
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                readonly
                //value="7149890505"
                value={state.mobileNumber}
                //onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.selectClass}
                name="email"
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                readonly
                //value="swatibade@csu.fullerton.edu"
                value={state.email}
                //onChange={handleChange}
              />
            </Grid>
            
              </Grid>
    
    </React.Fragment>
  );
}