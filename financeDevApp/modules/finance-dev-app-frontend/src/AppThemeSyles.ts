import { createTheme } from '@mui/material/styles';

export const customMuiTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#ffffff',
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#000000', // Color del label (InputLabel)
                    '&.Mui-focused': {
                        color: '#000000', // Evita que cambie a azul cuando el input está enfocado
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000', // Color del borde del input
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000', // Color al hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000', // Color al focus
                    },
                    color: '#000000', // Color del texto del input
                },
            },
        },
    },
});
