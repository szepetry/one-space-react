import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(2),
        backgroundColor: '#30336b'
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: '#30336b'
    },
}));

export default function CustomizedDialogs({ vector, openDialog, setDialogOpen }) {


    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openDialog}

        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Transcript
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white',
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent id="customized-dialog-context" dividers>
                <Typography color='#badc58' variant='body2' gutterBottom>Prompt: {vector['prompt']}</Typography>
                <Typography color='#6ab04c' variant='subtitle2' gutterBottom>High Quality Response 1: {vector['hq1']}</Typography>
                <Typography color='#6ab04c' variant='subtitle2' gutterBottom>High Quality Response 2: {vector['hq2']}</Typography>
                <Typography color='#f9ca24' variant='subtitle2' gutterBottom>Medium Quality Response 1: {vector['mq1']}</Typography>
                <Typography color='#eb4d4b' variant='subtitle2' gutterBottom>Low Quality Response 1: {vector['lq1']}</Typography>
                <Typography color='#eb4d4b' variant='subtitle2' gutterBottom>Low Quality Response 2: {vector['lq2']}</Typography>
                <Typography color='#eb4d4b' variant='subtitle2' gutterBottom>Low Quality Response 3: {vector['lq3']}</Typography>
                <Typography color='#eb4d4b' variant='subtitle2' gutterBottom>Low Quality Response 4: {vector['lq4']}</Typography>
                <Typography color='#eb4d4b' variant='subtitle2' gutterBottom>Low Quality Response 5: {vector['lq5']}</Typography>
            </DialogContent>
        </BootstrapDialog>
    );
}