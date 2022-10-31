import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import country_currency from "./country_currency.json";

export default function ComboBox() {
  const Country_data = country_currency.result._items;
  const [currency_value,setCurrencyValue]=React.useState('');


  

  return (
    <div>
    <div style={{display:'flex',flexDirection:'row',margin:10}}>
        <div style={{flexDirection:'column',margin:10}}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Country_data.length > 0 ? Country_data : []}
        value={
          Country_data.length > 0
            ? Country_data.filter(
                (item) => item.country === Country_data.country
              )[0]
            : []
        }
        getOptionLabel={(option) => (option.country ? option.country : "")}
        onChange={(e,v) => setCurrencyValue(v.currency_code)}
        sx={{ width: 200 }}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      </div>
      <div style={{flexDirection:'column',margin:10}}>
      <TextField
        id="outlined-multiline-static"
        label="currency"
        name="currency"
        // rows={3}
        // placeholder=""
        value={currency_value}
        // onChange={(e) => setNewCountry(e.target.value)}
        // style={{ padding: "10px" }}
      />
      </div>
      


{/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={currency_value.length > 0 ? currency_value : []}
        value={
   currency_value.length> 0 ? currency_value :[]
        }
        getOptionLabel={(option) => (option ? option : [])}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      /> */}

    </div>
    </div>
  );
}
