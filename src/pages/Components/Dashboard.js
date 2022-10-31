import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import { Grid } from "@mui/material";
const Dashboard = () => {
  return (
    <>
      {" "}
      <Typography variant="h5" ml={1} fontWeight="700" gutterBottom>
        DashBoard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 360,
            height: 120,
          },
        }}
      >
        <Paper elevation={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <DescriptionIcon sx={{ color: "orange", fontSize: "80px" }} />
            </Grid>
            <Grid item mt={2} xs={9}>
              <Typography
                variant="h6"
                color="gray"
                fontWeight="500"
                gutterBottom
              >
                Total Disclosures
              </Typography>
              <Typography
                variant="h4"
                color="#1d2327"
                fontWeight="600"
                gutterBottom
              >
                3456
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <DescriptionIcon sx={{ color: "green", fontSize: "80px" }} />
            </Grid>
            <Grid item mt={2} xs={9} justifyContent="flex-start">
              <Typography
                color="gray"
                variant="h6"
                fontWeight="500"
                gutterBottom
              >
                Completed Disclosures
              </Typography>
              <Typography variant="h4" fontWeight="600" gutterBottom>
                3000
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <DescriptionIcon sx={{ color: "red", fontSize: "80px" }} />
            </Grid>
            <Grid item mt={2} xs={9} justifyContent="flex-start">
              <Typography
                color="gray"
                variant="h6"
                fontWeight="500"
                gutterBottom
              >
                Pending Disclosures
              </Typography>
              <Typography variant="h4" fontWeight="600" gutterBottom>
                456
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
