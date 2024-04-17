import { useState, useEffect } from 'react'
import { CircularProgress, InputAdornment, IconButton, TextField, Box } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CustomizedDialogs from './CustomDialog'


function TypingTextField({ idx, message = '', className = '', typingEnabled = false, vectorMode = false, vectors, setVectors, queryLangchain }) {
    const [typedText, setTypedText] = useState("");
    const [index, setIndex] = useState(0);
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDialog, setDialogOpen] = useState(false);

    useEffect(() => {
        if (index < message.length && typingEnabled) {
            const timeoutId = setTimeout(() => {
                setTypedText(typedText + message.charAt(index));
                setIndex(index + 1);
            }, 0);
            // }, 25);
            return () => clearTimeout(timeoutId);
        }
        else {
            setTypedText(message)
        }
    }, [index, typedText, message, typingEnabled]);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleSubmit = async (idx) => {
        try {
            setLoading(true);
            // queryVectors(newInputValue)
            setDialogOpen(false)
            let new_vector = [vectors[idx]]
            console.log(new_vector)
            setVectors(new_vector)
            setTypedText("")
            queryLangchain(new_vector[0])
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Fetch error:', error);
        }
    }

    return (
        <Box className={`${className} my-2`}>
            {vectorMode && !loading && <CustomizedDialogs setDialogOpen={setDialogOpen} openDialog={openDialog} vector={vectors[idx]} />}
            <TextField
                variant="outlined"
                fullWidth
                multiline
                value={typedText}
                onClick={() => { if (vectorMode && queryLangchain) handleDialogOpen() }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                // color='white-button'
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                            color: 'white',
                        },
                        '&:hover fieldset': {
                            transition: 'border-color 0.3s',
                            borderColor: vectorMode ? '#f9ca24' : '',
                            backgroundColor: vectorMode ? 'action.hover' : '',
                        },
                        '& fieldset': {
                            transition: 'border-color 0.3s',
                            borderColor: 'transparent',
                        }
                    },
                    '& .MuiInputBase-input': {
                        color: 'white',
                        cursor: vectorMode ? 'pointer' : 'default'
                    }
                }}
                InputProps={{
                    readOnly: true,
                    endAdornment: vectorMode && vectors?.length > 1 ? (
                        <InputAdornment position='end'>
                            <IconButton onClick={() => handleSubmit(idx)}><DoneIcon color='ice' /></IconButton>
                        </InputAdornment>
                    ) : (<></>)
                }}
            />
        </Box>
    );
}

export default TypingTextField;