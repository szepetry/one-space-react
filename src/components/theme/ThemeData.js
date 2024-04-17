import { createTheme } from "@mui/material/styles";

function ThemeData() {
    return createTheme({
        palette: {
            secondary: {
                light: "#000",
                main: "#000",
                dark: "#000",
                contrastText: "#fff",
            },
            success: {
                main: "#3fbf4c",
                contrastText: "#fff",
            },
            // white: {
            //     main: 'white'
            // },
            navbar: {
                main: '#16148b',
            },
            junebud: {
                main: '#badc58'
            },
            pureapple: {
                main: '#6ab04c'
            },
            exodus: {
                main: '#686de0'
            },
            deepkoamaru: {
                main: '#30336b'
            },
            deepcove: {
                main: '#130f40'
            },
            ice: {
                main: '#c7ecee'
            },
            turbo: {
                main: '#f9ca24'
            },
            carminepink:{
                main: '#eb4d4b'
            }

        },
    });


}

export default ThemeData;