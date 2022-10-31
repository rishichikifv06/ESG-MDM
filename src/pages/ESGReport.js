import * as React from 'react';
import { Card, CardContent, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";


import axios from 'axios';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const [cik, setCik] = React.useState("");
    const [name_for_autocomplete, setName_for_autocomplete] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const [location_list,setLocation_list]=React.useState([]);
    const [inputList, setInputList] = React.useState([
        { city: "", state: "", country: "" },
      ]);
      const [newCity,setNewCity]=React.useState();
      const [newState,setNewState]=React.useState();
      const [newCountry,setNewCountry]=React.useState();
      const [newStreet,setNewStreet]=React.useState();
      const [newZip,setNewZip]=React.useState();  



    const get_company_on_search = () => {
        console.log(cik);
        // let url = "http://localhost:3000/organization/0001067491";
        let url = "http://localhost:3000/organization/" + cik;
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              document.body.className = "ok";
              console.log(this.responseText);
              var json_resonse = JSON.parse(this.responseText);
              // console.log(json_resonse.organization.company._items[0])
              let main_array = json_resonse.organization.company._items[0];
              let location_main_array = json_resonse.organization.location._items;
              // var array_form = [];
              var Location_array_form = [];
              var name = main_array.name[0];
              var cin = main_array.cik[0];
              let name1_for_autocomplete=[]
               name1_for_autocomplete.push({ name, cin });
    
              setName_for_autocomplete(name1_for_autocomplete);
              var city_from_cik=[];
    location_main_array.map((value)=>{
      
       city_from_cik.push(value["city"][0]);
    
    })
    // dummyFunction(city_from_cik);
            } else if (this.response == null && this.status === 0) {
              document.body.className = "error offline";
              console.log("The computer appears to be offline.");
            } else {
              document.body.className = "error";
            }
          }
        };
        request.open("GET", url, true);
        request.send(null);
        console.log(city);
      };



      function arrToStr(obj){
        let newFormat=(Object.values(obj)).map((item)=>item[0])
        return newFormat;
      }

      function dummyFunction(){
        // console.log("call")
        axios.get("http://localhost:3000/organization/"+cik)
        .then(response => {
          const posts = response.data;
          
          // var json_resonse = JSON.parse(posts);
          let location_main_array =((posts.organization.location._items));
          console.log(location_main_array);
      
          let list=[];
          location_main_array.forEach((item,index)=>{
            let obj={};
            obj['id']=index;
            obj['value']=arrToStr(item);
            list.push(obj)
        })
        setLocation_list(list);
      console.log(location_list);
      
          // let location_main_array = json_resonse.organization.location._items;
      //     setLocationSize(location_main_array.length)
      //     var city_from_cik=[];
      //     location_main_array.map((value)=>{
      //       city_from_cik.push(value["city"][0]);
      // console.log(city_from_cik);    
      //     })
      // setCity(city_from_cik);
      
        })
      }

      const renderHTML=()=>{
        let html=[];
        location_list.forEach((element)=>{
            html.push(
                <div className="col-lg-2" style={{padding:"10px"}}>
                   
<Card sx={{ width: 275,height:200,borderWidth:1 }} variant="outlined">
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {(element.value).length > 0 ?(element.value)[0]+" "+(element.value)[1]:""}
        </Typography> */}
        <Typography variant="h5" component="div" gutterBottom
        //   variant="h5"
          backgroundColor="lightblue"
          align="center"
          padding="10px 0px">
        {(element.value).length > 0 ?(element.value)[1]:""}
        </Typography>
         {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2">
          <br />
          {(element.value).length > 0 ?(element.value)[2]+" "+(element.value)[1]+" "+(element.value)[4]:""}

        </Typography>
        <Typography variant="body2">
          <br />
          {(element.value).length > 0 ?(element.value)[0]:""}

        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>



                </div>
            )
        })
      
        return html;
      }

      const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };


      const handleAddClick = () => {
        console.log("button click");
        let newArr=location_list;
        let obj={
          id:location_list.length,
          value:[newCity,newState,newCountry,newStreet,newZip]
        }
        newArr.push(obj);
        setLocation_list(newArr);  
        axios.post("http://localhost:3000/location/"+cik, {
          country : newCountry,
          street : newStreet,
          city : newCity,
          state : newState,
          zip : newZip
         
        }, {
          headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
          console.log(response);
        }).catch(function(error) {
          console.log(error);
        })
      
      
        setOpen(!open);
        console.log("after")
      };




  return (
    <div>
        <div className='row' style={{display:'flex', flexDirection:'row',margin:'10px'}}>
        <div className="col offset-2 " style={{flexDirection:'column',width:'350px'}}>
            <form>
              <TextField
                id="standard-basic"
                label="CIK"
                variant="standard"
                onChange={(e) => setCik(e.target.value)}
              />

              <IconButton
                // type="submit"
                color="primary"
                aria-label="search"
                size="large"
                variant="filled"
                onClick={(event)=>{get_company_on_search(event);dummyFunction(event)}}
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </form>
      

</div>

<div className="col offset-2 " style={{flexDirection:'column',width:200}}>
          {/* <div  style={{width:200}}> */}
            <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              options={name_for_autocomplete.length > 0 ?name_for_autocomplete:[]}
              value={
                name_for_autocomplete.length > 0 ? name_for_autocomplete.filter((item)=>item.name === name_for_autocomplete[0].name)[0]:[] }
              getOptionLabel={(option) => option.name?option.name:""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="company Name"
                  variant="standard"
                  value={
                    name_for_autocomplete.length > 0 ? name_for_autocomplete.filter((item)=>item.name === name_for_autocomplete[0].name)[0]:"" }
                />
              )}
            />
          
          {/* </div> */}
        </div>
        </div>
        <div className="row" style={{display:'flex', flexDirection:'row',}}>

        {
          location_list.length > 0 && renderHTML()
        }

<div className="col-lg-2">
            <IconButton
              onClick={handleClick("right-start")}
              color="primary"
              aria-label="delete"
              size="large"
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement={"right"}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                  <Paper>
                    <div
                      className="container p-3"
                      style={{ width: "275px", height: "450px" }}
                    >
                      <form>
                        <Typography
                          variant="h5"
                          backgroundColor="lightblue"
                          align="center"
                        >
                          Address
                        </Typography>
                        {/* {inputList.map((x, i) => {
                        return ( */}
                        <div>

                        <div className="row mt-2">
                            <div className="col ">
                              <TextField
                                id="outlined-multiline-static"
                                label="street"
                                name="street"
                                // rows={3}
                                placeholder="Enter country"
                                value={inputList.street}
                                onChange={(e) => setNewStreet(e.target.value)}
                                style={{ padding: "10px" }}
                              />
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-12 ">
                              <TextField
                                id="outlined-multiline-static"
                                label="city"
                                name="city"
                                style={{ padding: "10px" }}
                                placeholder="Enter City"
                                value={inputList.city}
                                onChange={(e) => setNewCity(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col ">
                              <TextField
                                id="outlined-multiline-static"
                                label="Zip"
                                name="Zip"
                                // rows={3}
                                placeholder="Enter country"
                                value={inputList.zip}
                                onChange={(e) => setNewZip(e.target.value)}
                                style={{ padding: "10px" }}
                              />
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col">
                              <TextField
                                id="outlined-multiline-static"
                                label="State"
                                name="state"
                                // rows={3}
                                placeholder="Enter state"
                                value={inputList.state}
                                onChange={(e) =>setNewState(e.target.value)}
                                style={{ padding: "10px" }}
                              />
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col ">
                              <TextField
                                id="outlined-multiline-static"
                                label="country"
                                name="country"
                                // rows={3}
                                placeholder="Enter country"
                                value={inputList.country}
                                onChange={(e) => setNewCountry(e.target.value)}
                                style={{ padding: "10px" }}
                              />
                            </div>
                          </div>
                          
                        </div>
                       <div style={{display:'flex', flexDirection:'row',}}>
                       <div style={{ flexDirection:'column',}}>
                        <Button
                          size="small"
                          onClick={() => setOpen(!open)}
                          variant="contained"
                        >
                          cancel
                        </Button>
                        </div>
                        <span> &emsp;</span>{" "}
                        <div style={{ flexDirection:'column'}}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleAddClick}
                        >
                          add
                        </Button>
                        </div> 
                        </div>
                      </form>
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
          </div>
    </div>
  );
}
