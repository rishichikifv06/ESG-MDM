import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const defaultValues = {
  entityname: "",
  entitysheellcompany: "",
};

const Form = () => {
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
    if (!Form.error)
      window.location.replace("./RegistrationResult");
    // Send data to the backend via POST
    /*DEEPAK - Uncomment after server side code is implemented */
    /* fetch("http://localhost:5050/register", {  // Enter your IP address here
    method: 'POST', 
    mode: 'cors', 
    href: '/RegistrationResult',
    body: JSON.stringify(formValues) // body data type must match "Content-Type" header
    }) */
  };

  return (
    <form onSubmit={handleSubmit}>
      <br/>
      <br/>
      <Grid container alignItems="left" justify="left" direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="companyname"
            name="companyname"
            label="Company Name"
            type="text"
            required
            value={formValues.companyname}
            style={{minWidth: 300}}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lastname-input"
            name="lastname"
            label="Last Name"
            type="text"
            required
            value={formValues.lastname}
            style={{minWidth: 300}}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="email"
            required
            style={{minWidth: 300}}
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password-input"
            name="password"
            label="Password"
            type="password"
            required
            style={{minWidth: 300}}
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="re-password-input"
            name="repassword"
            label="Re-enter Password"
            type="password"
            required
            style={{minWidth: 300}}
            value={formValues.repassword}
            onChange={handleInputChange}
            error={formValues.password!==formValues.repassword}
          />
        </Grid>
        <Grid item>
          <TextField
            id="passphrase-input"
            name="passphrase"
            label="Recovery Pass Phrase"
            type="password"
            value={formValues.passphrase}
            required
            style={{minWidth: 300}}
            onChange={handleInputChange}
          />
        </Grid>
        <br/>
        <br/>
        <Grid item>
          <em>By creating a Ledger Document © profile you agree to the <a href="https://www.ledgerdocument.com/terms">Terms Of Service</a> and <a href="https://www.ledgerdocument.com/privacy">Privacy Policy.</a></em>
        </Grid>
        <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
      </Grid>
    </form>
  );
};

export default Form;