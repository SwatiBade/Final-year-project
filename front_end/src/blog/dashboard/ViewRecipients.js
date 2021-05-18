import React, {useState, useEffect}  from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { API_BASE_URL} from '../../constants/apiContants';
import axios from 'axios';
import { useHistory , useLocation} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


let rows = [];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 650,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  buttonClass:{
    alignItems:"right",
    justifyContent:"right",
    marginLeft:250,
  },
}));

export default function ViewRecipients(props) {
  let {userId } = props;
  const classes = useStyles();
  const [state , setState] = useState({
    rows : [],
    emailStr:""
})
const deleteItem =(i)=> {
  const { items } = rows
  state.emailStr = (rows[i])[2]
  rows.splice(i, 1)
  setState({ rows })
}

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

  return (
    <React.Fragment>
     <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Recipient Name</b></TableCell>
            <TableCell align="left"><b>Email</b></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row[0]} &nbsp; {row[1]} 
              </TableCell>
              <TableCell align="left">{row[2]}  </TableCell>
              <TableCell align="left">
                <Button
                      onClick={deleteItem.bind(this, i)}
                      color="secondary" > Delete </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}