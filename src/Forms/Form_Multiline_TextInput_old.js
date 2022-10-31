// import React from "react";
// import { Grid, TextField, Typography } from "@mui/material";

// const Form6 = (props) => {
//   return (
//     <Grid container justifyContent="center">
//       {/* <Typography variant="h6" align="center">
     
//         {props.data[0]}
//       </Typography> */}

//       <Grid item container xs={12} ml={3} mb={4}>
//         <Grid item xs={10} ml={3}>
//           <TextField
//             id="outlined-multiline-static"
//             label="Description"
//             multiline
//             fullWidth
//             rows={3}
//           />
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };
// export default Form6;


import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import Divider from '@mui/material/Divider';
import { Grid, TextField, Typography } from "@mui/material";



import InvertColorsIcon from '@mui/icons-material/InvertColors'

const save = (data) => {
    console.log(data)
}
const myTheme = createTheme({
  // Set up your custom MUI theme here
});

const CustomInlineToolbar = () => {
    return (
      <ThemeProvider theme={myTheme}>

        <MUIRichTextEditor
            label="Try selecting some text to show the inline toolbar..."
            inlineToolbar={true}
            inlineToolbarControls={["bold", "italic", "my-style", "link"]}
            onSave={save}
            customControls={[
                {
                    name: "my-style",
                    icon: <InvertColorsIcon />,
                    type: "inline",
                    inlineStyle: {
                        backgroundColor: "black",
                        color: "white"
                    }
                }
            ]}
        />
        </ThemeProvider>
    )
}

export default CustomInlineToolbar