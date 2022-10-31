// import * as React from 'react';
// import { Button, Grid, TextField, Typography } from "@mui/material";
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Chip from '@mui/material/Chip';

// const MultipleSelectChip = (props) => {
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Full-Time',
//   'Part-Time',
//   'Temparory',
//   'Permenant',
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
// const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };
//   return (
//     <Grid container justifyContent="center">
//       <Grid item container xs={12} mt={3} ml={3} mb={3}>
//         <Grid item xs={10} ml={3}>
//         <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-chip-label">Select the options</InputLabel>
//         <Select
//           labelId="demo-multiple-chip-label"
//           id="demo-multiple-chip"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//           renderValue={(selected) => (
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} />
//               ))}
//             </Box>
//           )}
//           MenuProps={MenuProps}
//           ond
//         >
//           {names.map((name) => (
//             <MenuItem
//               key={name}
//               value={name}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
          
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default MultipleSelectChip;


import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import _without from "lodash/without";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) =>
  createStyles({
    redBackground: {
      // backgroundColor: "#C00",
      padding: 10
    },
    whiteBackground: {
      backgroundColor: "#FFF"
    },
    formControl: {
      margin: theme.spacing(1),
      Width: 300,
      // maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2,
      backgroundColor: "#FFF"
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  })
);

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

const initialSelected = ["April Tucker", "Ralph Hubbard"];

const MultipleSelectDemo = () => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState(initialSelected);

  const handleChange = (e ) => {
    setPersonName(e.target.value);
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    console.log("clicked delete");
    setPersonName((current) => _without(current, value));
  };

  return (
    <div>

      <div className={classes.redBackground}>
        <FormControl className={classes.formControl}>

          <Select
            labelId="demo-mutiple-chip-checkbox-label"
            id="demo-mutiple-chip-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            onOpen={() => console.log("select opened")}
            //input={<Input />}
            // MenuProps={MenuProps}
            IconComponent={KeyboardArrowDownIcon}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {(selected ).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    className={classes.chip}
                    onDelete={(e) => handleDelete(e, value)}
                    onClick={() => console.log("clicked chip")}
                  />
                ))}
              </div>
            )}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
    </div>
  );
};

export default MultipleSelectDemo;

