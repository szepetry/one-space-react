import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Box, Typography, useMediaQuery, Container } from '@mui/material';
import '../css/search.css'
import TypingTextField from '../components/search/TypingTextField';
import SearchField from "../components/search/SearchField";
import TextFieldItems from "../components/search/TextFieldItems";

import '../css/search.css'

export default function Homepage() {

    return (

        <Container className="py-2" maxWidth='sm' style={{ textAlign: 'left' }}>
            <Box p={5}></Box>
            <Typography color={'white'} variant="h5">Speak your mind! 🍀</Typography>
            <Typography color={'white'} variant="caption">This is a private space and you're free to open up without worrying about anything.</Typography>
            <SearchField className="searchtext"/>
        </Container>
    );
}