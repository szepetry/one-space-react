import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            style={{height: '16px' }}
            color={'ice'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#c7ecee',
                py: 3, // padding top and bottom
                // mt: 'auto', // margin top auto to push to bottom
                // margin: 'top auto'
            }}
        >
            <Container maxWidth="lg" >
                <Typography variant="caption" align="center">
                    <span style={{ textAlign: 'center !important', display: 'flex', justifyContent: 'center' }}>
                        <span className='px-1' style={{ 'color': 'black', fontWeight: 'bold' }}>{"Powered by"}</span>
                        <a href='https://www.linkedin.com/in/aryanjalali' target="_blank" rel="noreferrer">Aryan</a>
                    </span>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;