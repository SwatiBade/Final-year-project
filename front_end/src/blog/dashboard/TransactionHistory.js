import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import { API_BASE_URL} from '../../constants/apiContants';

let rows = [];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function TransactionHistory(props) {

  let {userId } = props;
  //alert("in txn add page:"+userId)
  const classes = useStyles();


axios.get(API_BASE_URL+"sendmoney/"+userId)
    .then(function (response) { 
      let data = response.data
      if(response.status === 200 && rows.length === 0){
        let i=0
        while(i<data.length){
          const item = data[i];
          rows.push([item.id,item.amount,item.sendingReason,item.exchangeRate])
            i++
        }
      } else{
          console.log('Data not saved')  
      }
  })
  .catch(function (error) {
      console.log(error);
  });

  return (
    <React.Fragment >
     
      <div align="left">
      <Title>Transaction History</Title></div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Number</TableCell>
            <TableCell>Transaction Amount</TableCell>
            <TableCell>Sending Reason</TableCell>
            <TableCell align="right">Exchange Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}