import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import first from '../EBook/first.png';
import Second from '../EBook/Second.png';
import Third from '../EBook/Third.png';
import Fourth from '../EBook/Fourth.png';

function Ebook() {
  const imageNames = [first, Second, Third, Fourth];
  const cardTitles = ['First Year', 'Second Year', 'Third Year', 'Final Year'];
  const bookLinks = [
    'https://drive.google.com/drive/folders/1AjLSIq4FmcmBenkjPxTuUVa27qLjgaog?usp=drive_link',

    'https://drive.google.com/drive/folders/1_tX55xNP9dzk_sC7Br-SiDhfyj4OzEty?usp=drive_link',
    'https://drive.google.com/drive/folders/1UoWgFFsRGmNzq9kY-5KLQRwifbIVsNig?usp=drive_link',

    'https://drive.google.com/drive/folders/1SEnOgL_xhCxQiNAtgLZy3p_Zk7vLREPx?usp=drive_link',
  ];

  const descriptions = [
    "All subject SPPU books are available for First year engineering students.",
    "All subject SPPU books are available for Second year engineering students.",
    "All subject SPPU books are available for Third year engineering students.",
    "All subject SPPU books are available for Final year engineering students."
  ];

  const handleViewBooks = (link) => {
    window.open(link, '_blank'); 
  };

  return (
    <Grid container spacing={4}>
      {imageNames.map((imageName, index) => (
        <Grid item key={index} xs={12} sm={6} md={6}>
          <Card style={{ height: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',borderRadius:7 }}>
            {/* You can use CardMedia for the image */}
            <img
              src={imageName}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '160px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px' }}>
              <Typography variant="h5">{cardTitles[index]}</Typography>
              <Typography variant="body2" color="textSecondary">
                {descriptions[index]}
              </Typography>
              <Button  sx={{marginTop :2,alignItems:'flex-end',justifyContent:'flex-end'}} variant="contained" color="secondary" onClick={() => handleViewBooks(bookLinks[index])}>
                View Books
              </Button>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Ebook;
