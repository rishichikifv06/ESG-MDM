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
// const myTheme = createTheme({
//   // Set up your custom MUI theme here
//   fontSize:1
// });




const myTheme = createTheme()

Object.assign(myTheme, {
   overrides: {
      MuiIconButton: {
         root: {
            size:"small",
            // icon:"18px",
         },
      },
      MUIRichTextEditor: {
         root: {
            '& pre': {
                size:"small",
            },
            icon:"10px",
         },
         editor: {
            padding: '20px',
            height: '100px',
            maxHeight: '200px',
            overflow: 'auto',
            border: 1 ,
            borderColor: 'red'
         },
         placeHolder: {
            paddingLeft: 20,
            width: 'inherit',
            position: 'static',
            color:'#C4C4C4'
         },
         icon:{
            size:'small'
         }
       
      },
   },
})






const CustomInlineToolbar = (props) => {
    return (
        <div style={
            {
             border: '1px solid #D3D3D3'
            }
          }>
                {/* <Grid item xs={10} ml={3}>
                <TextField
                id="outlined-basic"
                label={props.qn}
                variant="outlined"
                fullWidth
                // defaultValue={data.legal_name[0]}
                // inputRef={legal_name}
                // size="small"
                />
            </Grid> */}
      <ThemeProvider theme={myTheme}>

        <MUIRichTextEditor
            label="Provide your Answer"
            inlineToolbar={true}
            inlineToolbarControls={["bold", "italic", "my-style", "link"]}
            onSave={save}
            controls={[ "title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "media", "numberList", "bulletList", "code", "clear", "save"]}
            customControls={[
                {
                    name: "my-style",
                    icon: {size:'1px'},
                    type: "inline",
                    inlineStyle: {
                        backgroundColor: "black",
                        color: "white",
                        fontSize:8
                    },
                    // size:'small'
                }
            ]}
            sx={{border:1}}
        />
        </ThemeProvider>
        </div>
    )
}

export default CustomInlineToolbar