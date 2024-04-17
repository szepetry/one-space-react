import { useState, useEffect } from 'react'
import { CircularProgress, IconButton, TextField, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { httpCall } from '../../helpers/HttpCall'
import { useLocation, useNavigate } from 'react-router-dom'
import TypingTextField from '../../components/search/TypingTextField';



function TextFieldItems({ conversations }) {
    return (<div>
        {conversations.map((conversation, index) => {
            const { className, typingEnabled, message, color } = conversation;

            return <TypingTextField className={className} typingEnabled={typingEnabled} message={message} color={color} />;
        })}
    </div>)


}

export default TextFieldItems;