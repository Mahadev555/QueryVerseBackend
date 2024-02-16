import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

export default function JobCardSkeleton() {
    return (
        <Box
            sx={{
                p: 2.5,
                borderRadius: 5,
                boxShadow: 5,
                mb: 3
            }}
        >
            <Grid container spacing={2}>
                {/* Company Logo, Details, and Skills Skeleton */}
                <Grid item xs={8}>
                    <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Grid>

                {/* Job Information and Apply Button Skeleton */}
                <Grid item xs={4}>
                    <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Grid>
            </Grid>

            {/* Share and Earn Skeleton */}
            <Skeleton variant="text" animation="wave" />
        </Box>
    );
}
