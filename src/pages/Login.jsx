import React,{useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

function Login() {
    function HandleSignin() {
        window.location.replace('http://localhost:3000/auth/signin')
      }
    const defaultValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repassword: "",
        passphrase: ""
      };
    const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formValues.password !==formValues.repassword) {
          return;
        }
        sessionStorage.setItem("reg", JSON.stringify(formValues));
        if (!Login.error)
console.log("Error");
        // Send data to the backend via POST
        /*DEEPAK - Uncomment after server side code is implemented */
        /* fetch("http://localhost:5050/register", {  // Enter your IP address here
        method: 'POST', 
        mode: 'cors', 
        href: '/RegistrationResult',
        body: JSON.stringify(formValues) // body data type must match "Content-Type" header
        }) */
      };
        return  (
            <div >
            <form onSubmit={handleSubmit}>
                  <br/>
      <br/>
      <Typography variant="h5" component="h2"sx={{padding:5,textAlign:"center",justifyContent:"center"}}>
  Ledger Document Login
</Typography>
                <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
        <Grid item>
          {/* <TextField
            id="firstname-input"
            name="firstname"
            label="First Name"
            type="text"
            required
            value={formValues.firstname}
            style={{minWidth: 300}}
            onChange={handleInputChange}
          /> */}
          <TextField id="outlined-basic" label="User Name" variant="outlined" required />


        </Grid>
        <Grid item>
        <TextField 
    hintText="Password"
    floatingLabelText="Password"
    type="password"
    variant="outlined"
    label="password "
    required
    >
</TextField>
          

        </Grid>
                {/* <Button color="inherit">Login</Button> */}
                <Grid item>
                <Button variant="outlined" onClick={HandleSignin}>Login</Button>
                </Grid>
                </Grid>
            </form>
            </div>
        );
}

export default Login;