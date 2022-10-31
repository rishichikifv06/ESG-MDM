import React, { useEffect } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';

const NewESGReport = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [company_name, setCompanyName] = React.useState([]);
  const [cin, setCin] = React.useState("");
  const [city, setCity] = React.useState([]);
  const [state_value, setState_value] = React.useState();
  const [country, setCountry] = React.useState();
  const [inputList, setInputList] = React.useState([
    { city: "", state: "", country: "" },
  ]);
  const [cik, setCik] = React.useState("");
  const [location, setLocations] = React.useState([]);
  const [name_for_autocomplete, setName_for_autocomplete] = React.useState([]);
  const [LocationSize,setLocationSize]=React.useState();
  const [location_list,setLocation_list]=React.useState([]);
  const [newCity,setNewCity]=React.useState();
  const [newState,setNewState]=React.useState();
  const [newCountry,setNewCountry]=React.useState();
  const [newStreet,setNewStreet]=React.useState();
  const [newZip,setNewZip]=React.useState();
  const [newPk,setNewPk]=React.useState();


  const dummy_data = ["Bangalore", "Karnataka", "India", "Dickenson Road"];

  // console.log(name_for_autocomplete);

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  // const handleTextInputChange = (event) => {
  //   setNewCity(event.target.value);
  // };

  const handleInputChange = (e, index) => {

  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button

  // console.log(company_name);
  const defaultProps = {
    options: company_name,
    getOptionLabel: (option) => option.name,
  };
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // useEffect(() => {
  //   let url = "http://localhost:3000/organization/";
  //   let request = new XMLHttpRequest();
  //   request.onreadystatechange = function () {
  //     if (this.readyState === 4) {
  //       if (this.status === 200) {
  //         document.body.className = "ok";
  //         console.log(this.responseText);
  //         var json_resonse = JSON.parse(this.responseText);
  //         let main_array = json_resonse.organizations._items;
  //         var array_form = [];
  //         // eslint-disable-next-line array-callback-return
  //         main_array.map((value) => {
  //           var name = value["name"][0];
  //           var cin = value["cin"][0];
  //           array_form.push({ name, cin });
  //         });
  //         setCompanyName(array_form);
  //       } else if (this.response == null && this.status === 0) {
  //         document.body.className = "error offline";
  //         console.log("The computer appears to be offline.");
  //       } else {
  //         document.body.className = "error";
  //       }
  //     }
  //   };
  //   request.open("GET", url, true);
  //   request.send(null);
  // }, []);

  function get_address(value) {
    let url = "http://localhost:3000/location/org/" + value;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          document.body.className = "ok";
          console.log(this.responseText);
          var json_resonse_address = JSON.parse(this.responseText);
          let main_array_address = json_resonse_address.locations._items;
          // console.log(main_array_address);
          // var array_form_address = [];
          // eslint-disable-next-line array-callback-return
          main_array_address.map((value) => {
            var city = value["area"][0];
            var state = value["name"][0];
            var country = value["country"][0];
            location.push({ city, state, country });
          });
          setLocations(location);
          // console.log(location);
          // setCity(array_form_address[0].city);
          // setState_value(array_form_address[0].state);
          // setCountry(array_form_address[0].country);
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
  }

  const List_address = () => {
   
    // console.log(LocationSize,"asd");
    return (
      <div>
        <div className="row">
          {location_list.map((element)=>
          <div className="col-lg-7 offset-2">
            
            <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              options={element.value.length > 0 ?element.value:[]}
              getOptionLabel={(option) => option?option:""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="company Name"
                  variant="standard"
             
                />
              )}
            />

          </div>
          )}
          
        </div>
      </div>
    );

   
    // if (dummy_data.length === 1) {
    //   return (
    //     <div>
    //       <div>
    //         <TextField
    //           id="outlined-multiline-static"
    //           label="Address"
    //           value={city + " " + state_value + " " + country || ""}
    //           disabled
    //           style={{ padding: "10px" }}
    //         />
    //       </div>
    //     </div>
    //   );
    //   // });
    // } else {
    //   console.log("more than one");
    //   // inputList.map((x, i) => {
    //   return (
    //     <div>
    //       <div className="row">
    //         <div className="col-lg-7 offset-2">
    //           <Autocomplete
    //             options={dummy_data}
    //             getOptionLabel={(option) => option}
    //             // value={this.state.selectedproduct}
    //             onChange={(e, value) => console.log(value)}
    //             renderInput={(params) => (
    //               <TextField
    //                 fullWidth
    //                 {...params}
    //                 // error={this.state.productError}
    //                 // helperText={this.state.productErrorMsg}
    //                 label="Location"
    //                 variant="outlined"
    //               />
    //             )}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   );
    //   // })
    // }
  };

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


// useEffect(()=>{
//   axios.get("http://localhost:3000/organization/0001067491")
//   .then(response => {
//     const posts = response.data;
//     console.log(posts);
//   })
// },[]);



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



function arrToStr(obj){
  let newFormat=(Object.values(obj)).map((item)=>item[0])
  return newFormat;
}

const handleAddClick = () => {
  // setInputList([...inputList, { city: "", state: "", country: "" }]);
  console.log("button click");
  let newArr=location_list;
  let obj={
    id:location_list.length,
    value:[newCity,newState,newCountry,newStreet,newZip,newPk]
  }
  newArr.push(obj);
  setLocation_list(newArr);



  // const userData = JSON.stringify({
  //    street : newStreet,
  //    city : newCity,
  //    zip : newZip,
  //    state : newState
  // });
  // console.log(userData);
  // axios.post("http://localhost:3000/location/"+cik, userData).then((response) => {
  //   console.log(response.status);
  //   console.log(response.data);
  // });

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

const renderHTML=()=>{
  let html=[];
  location_list.forEach((element)=>{
      html.push(
          <div className="col-12" style={{padding:"10px"}}>
              <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              options={element.value.length > 0 ?element.value:[]}
              value={(element.value).length > 0 ?(element.value)[2]:""}
              getOptionLabel={(option) => option?option:""}
              // readOnly
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Address"
                  variant="outlined"
                />
              )}
            />
          </div>
      )
  })

  return html;
}
// console.log("cities",city);

  return (
   
    <Card
      style={{
        maxWidth: 550,
        margin: "30px auto",
        padding: "5px 3px 50px 3px",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          backgroundColor="lightblue"
          align="center"
          padding="10px 0px"
        >
          New ESG Report
        </Typography>
        <br />
        <div className="row">
          <div className="col offset-2 ">
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
        </div>
        <br />
        <div className="row">
          <div className="col-lg-7 offset-1">
            {/* {
              name_for_autocomplete.length > 0 && */}
          
            <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              options={name_for_autocomplete.length > 0 ?name_for_autocomplete:[]}
              value={
                name_for_autocomplete.length > 0 ? name_for_autocomplete.filter((item)=>item.name === name_for_autocomplete[0].name)[0]:[] }
              getOptionLabel={(option) => option.name?option.name:""}
              // getOptionLabel={option => option.name || ""}
              // isOptionEqualToValue={(option, value) =>
              //   option.name === value
              // }
              // onChange={(event, value) =>  get_address(value['cin'])}
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
          
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          
                    {/* {console.log("render")} */}
        {
          location_list.length > 0 && renderHTML()
        }



          
          {/* <List_address /> */}
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
                          
                          
                          {/* <div className="row mt-2">
                            <div className="col ">
                              <TextField
                                id="outlined-multiline-static"
                                label="Pk"
                                name="Pk"
                                // rows={3}
                                placeholder="Enter country"
                                value={inputList.pk}
                                onChange={(e) => setNewPk(e.target.value)}
                                style={{ padding: "10px" }}
                              />
                            </div>
                          </div> */}
                        </div>
                        {/* <div className="row mt-2">
                              <div className="col"> */}
                        <Button
                          size="small"
                          onClick={() => setOpen(!open)}
                          variant="contained"
                        >
                          cancel
                        </Button>
                        {/* </div>
                              <div className="col"> */}
                        <span> &emsp;</span>{" "}
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleAddClick}
                        >
                          add
                        </Button>
                        {/* </div>
                            </div> */}
                      </form>
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewESGReport;

// import React, { useState } from "react";

// function App() {
//   const [inputList, setInputList] = useState([{ city: "", state: "" ,country:""}]);

//   // handle input change
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };

//   // handle click event of the Remove button
//   const handleRemoveClick = index => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };

//   // handle click event of the Add button
//   const handleAddClick = () => {
//     setInputList([...inputList, { city: "", state: "" ,country:"" }]);
//   };

//   return (
//     <div className="App">
//       <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
//       {inputList.map((x, i) => {
//         return (
//           <div className="box">
//             <input
//               name="city"
//               placeholder="Enter City"
//               value={x.city}
//               onChange={e => handleInputChange(e, i)}
//             />
//             <input
//               className="ml10"
//               name="state"
//               placeholder="Enter State"
//               value={x.state}
//               onChange={e => handleInputChange(e, i)}
//             />
//              <input
//               className="ml10"
//               name="country"
//               placeholder="Enter Counter"
//               value={x.country}
//               onChange={e => handleInputChange(e, i)}
//             />
//             <div className="btn-box">
//               {inputList.length !== 1 && <button
//                 className="mr10"
//                 onClick={() => handleRemoveClick(i)}>Remove</button>}
//               {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
//             </div>
//           </div>
//         );
//       })}
//       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//     </div>
//   );
// }

// export default App;
