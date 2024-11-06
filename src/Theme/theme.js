import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: '#D22B2B', // Replace with your desired color
                },
            },
        },
        // MuiBox: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#DDDDD', // Apply default color
        //         },
        //     },
        // },
    },
});

export default theme;
