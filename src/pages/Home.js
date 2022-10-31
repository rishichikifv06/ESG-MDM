import React from "react";
import { useNavigate } from "react-router-dom";
import StickyHeadTable from "../UI/Table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { Grid, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
import ViewListSharpIcon from "@mui/icons-material/ViewListSharp";
import { styled } from "@mui/material/styles";
import Dashboard from "./Components/Dashboard";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Home = () => {
  const history = useNavigate();

  const clickHandler = () => {
    history("/addnewreport");
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container>
      <Grid container mt={2}>
        <Dashboard />

        <Typography variant="h5" ml={1} mt={5} fontWeight="700" gutterBottom>
          Assigned Disclosures
        </Typography>

        <Grid
          container
          borderTop="1px solid lightGrey"
          borderBottom="1px solid lightGrey"
          item
          py={1}
          lg={12}
        >
          <Grid item lg={3}>
            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small">Select Type</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={10}>All Disclosures</MenuItem>
                <MenuItem value={20}>Pending Disclosures</MenuItem>
                <MenuItem value={30}>Completed Disclosures</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3}></Grid>
          <Grid container spacing={2} alignItems="center" item lg={6}>
            <Grid item lg={6}>
              <TextField
                id="standard-basic"
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="large" />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid item lg={3}>
              <Button
                variant="contained"
                color="grey"
                startIcon={<FilterAltIcon />}
              >
                Filter
              </Button>
            </Grid>
            <Grid item lg={1}>
              <IconButton aria-label="search" size="large" variant="filled">
                <WindowSharpIcon
                  style={{ color: "black", border: "1px solid black" }}
                  fontSize="large"
                />
              </IconButton>
            </Grid>
            <Grid item lg={1}>
              {" "}
              <IconButton aria-label="search" size="large" variant="filled">
                <ViewListSharpIcon
                  style={{ color: "black", border: "1px solid black" }}
                  fontSize="large"
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 360,
              height: 160,
            },
          }}
          mt={3}
        >
          <Paper elevation={3}>
            <Grid container spacing={2} p={2} alignItems="center">
              <Grid item lg={3} pb={0}>
                <DescriptionIcon sx={{ fontSize: "60px" }} />
              </Grid>
              <Grid item lg={9} pb={0}>
                <Typography
                  variant="h6"
                  color="#1d2327"
                  fontWeight="600"
                  gutterBottom
                >
                  Disclosure 1
                </Typography>
              </Grid>
              <Grid item lg={8} ml={2} pt={0}>
                <Typography
                  fontSize="16px"
                  color="gray"
                  fontWeight="500"
                  gutterBottom
                >
                  Progress Completed (50%)
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </Grid>
              <Grid item lg={2} pt={0}>
                <Button
                  style={{ backgroundColor: "black" }}
                  variant="contained"
                  onClick={() => history("/ViewReport")}
                >
                  View
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3}>
            <Grid container spacing={2} p={2} alignItems="center">
              <Grid item lg={3}>
                <DescriptionIcon sx={{ fontSize: "60px" }} />
              </Grid>
              <Grid item lg={9}>
                <Typography
                  variant="h6"
                  color="#1d2327"
                  fontWeight="600"
                  gutterBottom
                >
                  Disclosure 2
                </Typography>
              </Grid>
              <Grid item lg={8} ml={2}>
                <Typography
                  fontSize="16px"
                  color="gray"
                  fontWeight="500"
                  gutterBottom
                >
                  Progress Completed (50%)
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </Grid>
              <Grid item lg={2}>
                <Button
                  style={{ backgroundColor: "black" }}
                  variant="contained"
                  onClick={() => history("/ViewReport")}
                >
                  View
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* <Grid item md={11}>
          <StickyHeadTable />
        </Grid>
        <Grid item md={1}>
          <IconButton
            onClick={() => clickHandler()}
            color="primary"
            aria-label="delete"
            size="large"
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Home;
