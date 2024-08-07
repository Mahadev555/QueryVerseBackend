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
import JobCenter from '../Job/JobCenter';
import Login from '../SignUp/Login';
import SignUp from '../SignUp/SignUp';
import Gpt from '../Gpt/Gpt';
import Ebook from '../EBook/Ebook';
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

const Body = ({ isModalOpen,isSignUpopen,setisSignUpopen,isLoginOpen,setisLoginOpen }) => {
  console.log("🚀 ~ Body ~ isModalOpen:", isModalOpen)
  const classes = customStyle();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isJob, setisJob] = useState(false);
  const [isQue, setIsQue] = useState(true);
  const [isGpt, setIsGpt] = useState(false);
  const [isEbook, setIsEbook] = useState(false);
  return (
    <><div>

      <Grid container spacing={5} >
        <Grid item className={`${classes.section} ${isDialogOpen ? 'blurred' : ''} ${isModalOpen ? 'blurred' : ''} ${classes.fixedLeft}`}>
          <LeftHome />
        </Grid>
        <Grid item xs={7} className={`${classes.section}  ${isDialogOpen ? 'blurred' : ''} ${isModalOpen ? 'blurred' : ''} ${classes.moveableCenter}`}>
          {isQue && <CenterHome isDialogOpen={isDialogOpen} />}
          {isJob && <JobCenter />}
          {isGpt && <Gpt />}
          {isEbook && <Ebook />}
        </Grid>
        <Grid item xs={2.5} className={`${classes.section}  ${isDialogOpen ? 'blurred' : ''} ${isModalOpen ? 'blurred' : ''} ${classes.fixedRight}`}>
          <RightHome
            setIsQue={setIsQue}
            isQue={isQue}
            isJob={isJob}
            setisJob={setisJob}
            isDialogOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
            setIsGpt={setIsGpt}
            setIsEbook={setIsEbook}
             />
            
        </Grid>
      </Grid>

    </div>
      <Dialog open={isDialogOpen}  >
        <DialogContent>
          <AddTopic setDialogOpen={setDialogOpen} isDialogOpen={isDialogOpen} />


        </DialogContent>
      </Dialog>
      <Dialog open={isLoginOpen}  >
        <DialogContent>
          <Login setisLoginOpen={setisLoginOpen}  setisSignUpopen={setisSignUpopen} isLoginOpen={isLoginOpen} />


        </DialogContent>
      </Dialog>
      <Dialog open={isSignUpopen}  >
        <DialogContent>
          <SignUp setisSignUpopen={setisSignUpopen} setisLoginOpen={setisLoginOpen} isLoginOpen={isLoginOpen} />


        </DialogContent>
      </Dialog></>

  );
};

export default Body;
