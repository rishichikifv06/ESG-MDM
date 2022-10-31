import React from "react";
import { Grid, Typography } from "@mui/material";

const Form_Grid_Structure = (props) => {
  return (
    <Grid container justifyContent="center">
      {/* <Typography variant="h6" align="center" mb={3} px={5}>
      
        {props.data[0]}
      </Typography> */}

      <Grid item container xs={12} justifyContent="center" mb={3}>
        <Grid item xs={6}>
          {/* Grid Table */}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Form_Grid_Structure;
