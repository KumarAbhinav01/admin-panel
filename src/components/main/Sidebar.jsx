import React from 'react'
import List from '@mui/material/List';
import { Drawer, IconButton, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { mainListItems } from '@/components/ListItem';

const Sidebar = (props) => {
    const {toggleDrawer,open}=props
    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer} color='white'>
                    <ChevronLeftIcon sx={{color: 'white'}}/>
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {mainListItems}
            </List>
        </Drawer>
    )
}

export default Sidebar