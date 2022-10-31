/* eslint-disable react/jsx-pascal-case */
import * as React from "react";
import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
// import CardContent from "@mui/material/CardContent";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Stack } from "@mui/system";
import {  Divider, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
// web.cjs is required for IE11 support

//import OrganizationDetails from "../Forms/OrganizationDetails";

import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import IconButton from "@mui/material/IconButton";
import Tree from "./Components/Tree";
import Form_Text_input from "../Forms/Form_Text_input";
import Form_Autocomplete from "../Forms/Form_Autocomplete";
import Form_MultipleSelectChip from "../Forms/Form_MultipleSelectChip";
import Form_Checkbox from "../Forms/Form_Checkbox";
import Form_Multiline_TextInput from "../Forms/Form_Multiline_TextInput.js";
// import Form_Grid_Structure from "../Forms/Form_Grid_Structure";
import Form_Checkbox_Input from "../Forms/Form_Radio_Group";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";





import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const ViewReport = () => {
  const [state, setState] = useState("");
  const [form, setform] = useState("");
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState("Disclosure");
  const [Question, setQuestion] = useState();
  const [open, setOpen] = React.useState(false);
  const [helperText,sethelperText]=useState();



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let arr = [];
  let exparr = [];

  const handleToggle = (event, nodeIds) => {
    //console.log("toggle", exparr, expanded);
    setExpanded(nodeIds);
  };
  const handleSelect = (event, nodeIds) => {
    //console.log(nodeIds);
    setSelected(nodeIds);
  };
  const Toggle = (type) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === selected) {
        if (type === "next" && i !== arr.length - 1) {
          setSelected(() => arr[i + 1]);
          selectHandler(arr[i + 1]);
          return;
        } else if (type === "prev" && i !== 0) {
          setSelected(() => arr[i - 1]);
          selectHandler(arr[i - 1]);
          return;
        }
      }
    }
  };
  const fetchtree = async () => {
    const response = await fetch(`http://localhost:3000/tree/basetree`);
    const data = await response.json();
    setState(data.basetree._items[0]);
    //console.log(data.basetree._items[0]);
  };

  useEffect(() => {
    fetchtree();
  }, []);

  // useEffect(async() => {
  //   const response = await axios.get('http://localhost:3000/tree/dropdownvalues',{

  //     params: {
  //       questionId: '2.1.b.1',
  //     },
  //   });
  //   console.log(response)
  // }, []);

  const UpdateHandler = async (obj) => {
    const response = await axios.put(`http://localhost:3000/tree/question`, {
      params: {
        Key: "Organization",
        label: "organization",
        cik: "0001467373",
        body: { business_name: obj.business_name, legal_name: obj.legal_name },
      },
    });
    console.log(response);
  };

  const selectHandler = async (key) => {
    const response = await axios.get(`http://localhost:3000/tree/question`, {
      params: {
        key: key,
        label: "question",
        cik: "0001467373",
      },
    });
    // .then(function (response) {
    //   console.log(response.data);
    //   console.log(response.data.formProperties._items[0].business_name[0]);
    //   console.log(response.data.vertex._items[0]);
    // });
    const data = await response.data;
    console.log(data);

    const res = await axios.get(`http://localhost:3000/tree/helpertext`, {
      params: {
        questionId: key,
      },
    });
    const dat = await res.data;
    sethelperText(dat.helperText);


   


    setform("");
    const question = data.formProperties._items[0].Question[0];
    setQuestion(question);
    let Form;
    const FieldType = data.formProperties._items[0].FieldType[0];
    if (FieldType === "Text Field") {
      Form = <Form_Text_input qn={question} />;
    } else if (FieldType === "Drop Down") {
      const response_dropdown = await axios.get('http://localhost:3000/tree/dropdownvalues',{
        params: {
          questionId: key,
        },
      });
      let arr_value=(( response_dropdown['data']['values']));
      const FieldValues =(arr_value.join(','));
      // const FieldValues = data.formProperties._items[0].FieldValues[0];
      console.log(FieldValues);
      Form = <Form_Autocomplete qn={question} FieldValues={FieldValues}/>;
    }else if (FieldType === "Check Box(if other display text field to write)") {
      Form = <Form_MultipleSelectChip qn={question} />;
    }
    else if (FieldType === "Check Box") {

//       const response_dropdown = await axios.get('http://localhost:3000/tree/dropdownvalues',{
//         params: {
//           questionId: key,
//         },
//       });
// console.log(response_dropdown)
      const FieldValues = data.formProperties._items[0].FieldValues[0];
      Form = <Form_Checkbox qn={question} FieldValues={FieldValues}/>;
    } 

    setform(Form);
  };

  const getkeys = (state) => {
    // eslint-disable-next-line array-callback-return
    Object.entries(state).map((item) => {
      arr.push(item[1].key);
      if (Object.keys(item[1].value).length !== 0) {
        exparr.push(item[1].key);
        getkeys(item[1].value);
      }
    });
  };

  getkeys(state);


  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  
  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
    },
  });
  
  const longText = `
  Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
  Praesent non nunc mollis, fermentum neque at, semper arcu.
  Nullam eget est sed sem iaculis gravida eget vitae justo.
  `;


  //console.log(arr, exparr);

  return (
    <Box container>
      <Stack direction="row" height="600px" justifyContent="space-between">
        <Box flex={2}>
          <Tree
            data={state}
            selected={selected}
            handleSelect={handleSelect}
            selectHandler={selectHandler}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        {/* <Box flex={6} sx={{ overflowY: "scroll" }}> */}
        <Box flex={6} >
        <Grid
            container
            mt={0}
            backgroundColor="#F3F3F3"
            alignItems='center'
            p={0}
            position='fixed'
          
          >
            <Grid
              item
              md={6}
              justifyContent="flex-start"
              sx={{ padding: 2 }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                onClick={handleToggle}
                sx={{ color: "black" }}
              >
                <Link underline="hover" color="inherit" href="/">
                  Disclosure
                </Link>
                {selected === "Disclosure" ? (
                  ""
                ) : (
                  <Link
                    underline="hover"
                    color="inherit"
                    // href="/material-ui/getting-started/installation/"
                    aria-current="page"
                  >
                    {selected}
                  </Link>
                )}

                {/* <Link
                  underline="hover"
                  color="text.primary"
                  // href="/material-ui/react-breadcrumbs/"
                  aria-current="page"
                >
                  Breadcrumbs
                </Link> */}
              </Breadcrumbs>
            </Grid>
            <Grid  item display="flex" justifyContent="flex-end"  md={1.6}>
              <IconButton
                onClick={() => {
                  Toggle("prev");
                }}
                color="primary"
              >
                <ArrowCircleLeftRoundedIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  Toggle("next");
                }}
                color="primary"
              >
                <ArrowCircleRightRoundedIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                />
              </IconButton>
            </Grid>
            <Grid  item  display="flex" justifyContent="flex-end"  mr={1}>
            <Button
                variant="contained"
                color="grey"
                //startIcon={<FilterAltIcon />}
                sx={{textTransform:'none',borderRadius:1}}
                onClick={handleOpen}
                size='small'
              >
                <InfoRoundedIcon />
                Helper Text
              </Button>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              General Info
            </Typography>
            <Divider orientation="horizontal" flexItem color='gray'/>
            <Typography id="transition-modal-description" sx={{ mt: 2,mb:2 }}>
            {helperText}
            </Typography>
        
           
            <Grid
            container
    
          >
            <Grid
              item
              md={12}
              justifyContent="flex-end"
            >
             
                <Button size="small"  mt={1}  sx={{textTransform:'none',color:"black",backgroundColor:"aliceblue"}} onClick={handleClose}>close</Button>
            </Grid>
            </Grid>
          
          </Box>
        </Fade>
      </Modal>
            </Grid>
          </Grid>
          <Divider orientation="horizontal" flexItem />
          <Box m={3} height="80%" >
            {/* <Typography variant="h6" align="center" px={3} mb={3}>
              {Question}
            </Typography> */}

{/* <Grid container item md={2}  margin= "auto 0 auto auto" >
              <IconButton
                onClick={() => {
                  Toggle("prev");
                }}
                color="primary"
              >
                <ArrowCircleLeftRoundedIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  Toggle("next");
                }}
                color="primary"
              >
                <ArrowCircleRightRoundedIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                />
              </IconButton>
            </Grid> */}



            <Grid container item md={12} spacing={1} mt={15}>
              <Grid item md={7}>
                {Question ? (
                  <Paper elevation={3}  sx={{
                    width: '112%',
                    p: 1,
                    bgcolor:'white',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    // textAlign: 'center',
                  }}>
                    <Typography
                      fontWeight="regular"
                      fontSize={15}
                      color={"black"}
                      p={2}
                    >
                      {Question}
                    </Typography>
                  </Paper>
                ) : (
                  ""
                )}
              </Grid>
              {/* <br /> */}
              <Grid item >
                {Question && (
                  <Paper elevation={3} sx={{
                    width: '100%',
                    p: 1,
                    bgcolor:  'white' ,
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                    borderRadius: 1,
                    // fontSize: '0.875rem',
                    // fontWeight: '500',
                    // textAlign: 'center',
                  }}>
                    {form}
                    <Typography
                      // fontWeight="bold"
                      textAlign={'left'}
                      fontSize={16}
                      // color={"black"}
                      pl={0}
                      pb={2}
                      // ml={1}
                    >
                      Description:
                    </Typography>
                    <Form_Multiline_TextInput />
                    {/* <Form_Checkbox_Input /> */}
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Divider orientation="vertical" flexItem /> */}
        {/* <Box flex={3} sx={{height:'70%'}}>
                        <CustomWidthTooltip title={longText}>
        <Button sx={{ m: 1 }}>i</Button>
      </CustomWidthTooltip>

        </Box> */}
      </Stack>
    </Box>
  );
};

export default ViewReport;
