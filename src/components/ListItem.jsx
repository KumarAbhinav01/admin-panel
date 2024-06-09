import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';

export const mainListItems = (
  <React.Fragment>
    <Link href="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon sx={{color: 'white'}}/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      </Link>
      <Link href="/dashboard/reports">
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    </Link>
    <Link href="/dashboard/integration">
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);