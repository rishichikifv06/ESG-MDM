import React from "react";

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 650,
    boxShadow: "none"
  }
});

function RegistrationResult () {
  const classes = useStyles();

 var formValues = JSON.parse(sessionStorage.getItem("reg"))

  console.log(formValues)
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <p>Thank you for registering.  Your registration details are below.  You should have recieved an email with a link.  please click on it to complete your registration process.</p>
      <Table size="small" aria-label="registration details">
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">First Name:</TableCell>
        <TableCell align="left">{formValues.firstname}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">last Name:</TableCell>
        <TableCell align="left">{formValues.lastname}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">email:</TableCell>
        <TableCell align="left">{formValues.email}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">residence:</TableCell>
        <TableCell align="left">{formValues.residence}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">passphrase:</TableCell>
        <TableCell align="left">{formValues.passphrase}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">private key:</TableCell>
        <TableCell align="left">{formValues.privatekey}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell sx={{ backgroundColor: "#7dcec6" }} align="right">public key:</TableCell>
        <TableCell align="left">{formValues.publickey}</TableCell>
        </TableRow>
      </Table>
      </TableContainer>
  );
};

export default RegistrationResult;