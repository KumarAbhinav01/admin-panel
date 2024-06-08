import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

import UpdateTime from './modal/updatetime';




export default function Deposits() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Title>Time Sprint</Title>
      <Typography component="p" variant="h4">
        00:00 PM
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Updated By Chinmay
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={handleOpen}>
          Update Time
        </Link>
      </div>
      <UpdateTime open={open} handleClose={handleClose}/>
    </React.Fragment>
  );
}