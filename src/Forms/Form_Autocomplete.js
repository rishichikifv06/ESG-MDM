import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

const Form_Autocomplete = (props) => {
  const data = props.FieldValues;
 console.log(props);

//  const arr = data.split(",");
 const arr = data.split(",");
 console.log(arr);
 let dropValues = []; 
 for (let element of arr) {
 let childObj = {};
 childObj.label = element;
 dropValues.push(childObj); 
 console.log(dropValues);
 }
  

  return (
    <Grid container justifyContent="center">
      {/* <Typography variant="h6" align="center" mb={3}>
      
      {props.data[0]}
      </Typography> */}

      <Grid item container xs={12} mt={3} ml={3} mb={3}>
        <Grid item xs={10} ml={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropValues}
            renderInput={(params) => <TextField {...params} label={props.qn} />}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form_Autocomplete;
