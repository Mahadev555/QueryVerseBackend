import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const SkeletonQACard = () => {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 5,
        boxShadow: 5,
        mb: 3,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <Box
            sx={{
              borderRadius: 5,
            }}
          >
            <Grid container>
              <Grid item xs={1.5}>
                <Stack
                  direction="column"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    m: 2,
                  }}
                >
                  {/* Skeleton for upvote icon */}
                  <Skeleton variant="circular" width={40} height={40} />
                  {/* Skeleton for upvote count */}
                  <Skeleton width={40} />
                  {/* Skeleton for downvote icon */}
                  <Skeleton variant="circular" width={40} height={40} />
                </Stack>
              </Grid>

              <Grid item xs textAlign="left" pt={4}>
                <Stack spacing={3}>
                  {/* Skeleton for question title */}
                  <Skeleton variant="text" width={200} height={30} />
                  {/* Skeleton for question description */}
                  <Skeleton variant="text" width={300} height={60} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ pl: 4.5 }}>
            <Grid container>
              <Grid item xs sx={{ mr: 2 }}>
                <Stack direction="row" alignItems="center">
                  {/* Skeleton for user avatar */}
                  <Skeleton variant="circular" width={40} height={40} />
                  {/* Skeleton for "Published by" text */}
                  <Skeleton width={100} />
                  {/* Skeleton for username */}
                  <Skeleton width={80} />
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack direction="row" alignItems="center">
                  {/* Skeleton for Add Answer button */}
                  <Skeleton variant="rectangular" width={170} height={40} />
                  {/* Skeleton for comment count */}
                  
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonQACard;
