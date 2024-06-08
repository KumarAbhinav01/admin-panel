import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateTime = (props) => {
    const { open, handleClose } = props;
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    TIME
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" alignItems="center">
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Choose Time" />
                        </DemoContainer>
                        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                            <SendIcon />
                        </Button>
                    </Box>
                </LocalizationProvider>
            </Box>
        </Modal>
    )
}

export default UpdateTime