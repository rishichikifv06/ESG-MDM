import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const Form_Radio_Group = (props) => {
  return (
    <Grid container justifyContent="center">
      {/* <Typography variant="h6" align="center" mb={3} px={5}>

        {props.data[0]}
      </Typography> */}

      <Grid item container xs={12} justifyContent="center" mb={3}>
        <Grid item xs={6}>
          {/* <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel value="male" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl> */}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Form_Radio_Group;
