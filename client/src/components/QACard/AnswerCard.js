import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

// Creating custom styles
const customStyle = makeStyles({
    root: {
        width: "fillParent",
        height: 200,
        backgroundColor: '#ffffff',
    },
    internalCardLayout: {
        width: "fillParent",
        height: 150,
        backgroundColor: '#ffffff',
    },
    bottomCardLayout: {
        width: "fillParent",
        height: 40,
        backgroundColor: '#ffffff',
    }
})

// Main QACard function
export default function AnswerCard(props) {
    const classes = customStyle();
    const [isClick, setIsClick] = useState(false);

    

    return (
        <div>
            <Box
                sx={{
                    mt: -2,
                    p: 2.5,
                    pb: 0,
                    ml: 28,
                    mb: 3,
                    borderRadius: 5,
                    width: '600px',
                    height: 'auto',
                    boxShadow: 5
                }}
                className={classes.root}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={2}
                >
                    {/* The upvotes, downvotes, answer */}
                    <Grid item>
                        <Box
                            sx={{
                                borderRadius: 5
                            }}
                            className={classes.internalCardLayout}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={1.5}
                                    sx={{
                                        mr: 2
                                    }}
                                >
                                    <Stack
                                        direction="column"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{
                                            m: 2
                                        }}
                                    >
                                        <ArrowUpwardIcon size="large" sx={{
                                            color: "#6563ff"
                                        }} />
                                        <Typography
                                            style={{ fontWeight: 600 }}
                                            sx={{
                                                color: "#6563ff"
                                            }}
                                        >
                                            {props.upv}
                                        </Typography>
                                        <ArrowDownwardIcon size="large" />
                                    </Stack>
                                </Grid>

                                <Grid
                                    item
                                    xs
                                    textAlign="left"
                                    pt={2}

                                >
                                    <Stack spacing={3}>
                                        <Typography
                                            variant="h7"
                                            component="h7"
                                        >
                                            {props.ans}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* The Avatar, name, chat icon, number of comments */}
                    <Grid item>
                        <Box
                            sx={{
                                pl: 4.5,
                                mt: -5
                            }}
                            className={classes.bottomCardLayout}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs
                                    sx={{
                                        ml: -2
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Avatar alt='user' src={props.prof} />
                                        <Typography
                                            sx={{
                                                ml: 2,
                                                mr: 1,
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            Answered by
                                        </Typography>
                                        <Typography sx={{
                                            color: "#6563ff"
                                        }}>
                                            {props.usr}
                                        </Typography>
                                    </Stack>
                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
