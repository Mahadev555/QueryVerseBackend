import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import LeftHome from './HomeLeftContainer/HomeLeftContainer';
import CenterHome from './HomeCenterContainer/HomeCenterContainer';
import RightHome from './HomeRightContainer/HomeRightContainer';
import './Home.css';
import AddTopic from '../AddTopic/AddTopic';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
const customStyle = makeStyles({
  section: {
    textAlign: 'center',
  },
  fixedLeft: {
    position: 'fixed',
    left: 0,
    zIndex: 1,
  },
  fixedRight: {
    position: 'fixed',
    right: 20,
    zIndex: 1,

  },
  moveableCenter: {
    marginLeft: '330px',
    marginRight: '170px',
  },
});

const Body = ({ isModalOpen }) => {
  console.log("🚀 ~ Body ~ isModalOpen:", isModalOpen)
  const classes = customStyle();
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <><div>

      <Grid container spacing={5} >
        <Grid item className={`${classes.section} ${isDialogOpen ? 'blurred' : ''} ${isModalOpen ? 'blurred' : ''} ${classes.fixedLeft}`}>
          <LeftHome />
        </Grid>
        <Grid item xs={7} className={`${classes.section}  ${isDialogOpen ? 'blurred' : ''} ${isModalOpen ? 'blurred' : ''} ${classes.moveableCenter}`}>
          <CenterHome isDialogOpen={isDialogOpen} />
        </Grid>
        <Grid item xs={2.5} className={`${classes.section}  ${isDialogOpen ? 'blurred' : ''} ${isModalOpen ? 'blurred' : ''} ${classes.fixedRight}`}>
          <RightHome isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
        </Grid>
      </Grid>

    </div>
      <Dialog open={isDialogOpen}  >
        <DialogContent>
          <AddTopic setDialogOpen={setDialogOpen} isDialogOpen={isDialogOpen} />
        </DialogContent>
      </Dialog></>
  );
};

export default Body;
