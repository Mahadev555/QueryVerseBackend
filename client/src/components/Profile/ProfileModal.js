import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProfileModal = ({ onClose }) => {
    const style = {
        position: 'fixed',
        top: '33%',
        left: '80%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '3px',
        boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.5)',
        zIndex: 3,
        transition: ' 0.2s ease-in',
    };


    var storedUserObjectString = localStorage.getItem("user");

    // Convert the JSON string back to a JavaScript object
    var storedUserObject = JSON.parse(storedUserObjectString);


    const {
        name,
        email,
        yearOfAdmission,
        courseYear,
        currentStatus,
        role,
        questionsAsked,
        questionsAnswered,

    } = storedUserObject;
    return (
        <Card sx={style}>
            <CardContent >
                <Typography sx={{ 
                    padding: '2px',
                    marginBottom:"4px",
                }} variant="h5" component="div">
                    Profile Information
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Name:</strong> {name}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Email:</strong> {email}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Year of Admission:</strong> {yearOfAdmission}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Course Year:</strong> {courseYear}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Current Status:</strong> {currentStatus}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Role:</strong> {role}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Questions Asked:</strong> {questionsAsked.length}
                </Typography>
                <Typography sx={{fontSize:'15px',
                    paddingTop: '7px'
                }} variant="body2" color="text.secondary">
                    <strong>Questions Answered:</strong> {questionsAnswered}
                </Typography>
                {/* Add more fields as needed */}
                <Button  onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Close
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProfileModal;
