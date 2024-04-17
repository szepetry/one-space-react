import { CircularProgress, Box, TextField, InputAdornment } from '@mui/material'


function LoadingField({ className = '' }) {

    return (
        <Box className={`${className} my-2 center-load`}>
            <CircularProgress color='ice' size={20} />
        </Box>
    );
}

export default LoadingField;