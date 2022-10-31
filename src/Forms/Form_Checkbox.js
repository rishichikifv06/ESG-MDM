import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function FormControlLabelPosition(props) {
const [checkbox_value,setCheckbox_value]=useState();
// const values=[
//     "Life Insurance","Health Care","Disability and Invalidity Coverage","Parental Leave",
//     "Retirement Provision", "Stock Ownership", "Others"
// ]
const values=(props.FieldValues)
var array_values=((values.split(',')));

// array_values.map((element)=>{
//     setCheckbox_value(element);
// })



  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Label placement</FormLabel>
      <FormGroup aria-label="position" row>

       
        <FormControlLabel
          value="Life Insurance"
          control={<Checkbox />}
          label="Life Insurance"
          labelPlacement="end"
        />
         <FormControlLabel
          value="Health Care"
          control={<Checkbox />}
          label="Health Care"
          labelPlacement="end"
        /> <FormControlLabel
        value="Disability and Invalidity Coverage"
        control={<Checkbox />}
        label="Disability and Invalidity Coverage"
        labelPlacement="end"
      /> <FormControlLabel
      value="Parental Leave"
      control={<Checkbox />}
      label="Parental Leave"
      labelPlacement="end"
    /> <FormControlLabel
    value="Retirement Provision, Stock Ownership"
    control={<Checkbox />}
    label="Retirement Provision, Stock Ownership"
    labelPlacement="end"
  />
  <FormControlLabel
    value=" Others"
    control={<Checkbox />}
    label=" Others"
    labelPlacement="end"
  />
      </FormGroup>
    </FormControl>
  );
}
