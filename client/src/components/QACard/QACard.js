//Importing external files/modules
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useState } from 'react';
import AnswerCard from './AnswerCard';
import AnsContainer from './AnsContainer';
import AddIcon from '@mui/icons-material/Add';


//Creating custom styles
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

//Main QACard function
export default function QACard(props) {
    const classes = customStyle();
    const upv = props.upv
    const downv = props.downv
    const id = props.id
    console.log("🚀 ~ QACard ~ id:", id)
    const [isClick, setIsClick] = useState(false)
    console.log("🚀 ~ QACard ~ isClick:", isClick)


    const handleClick = () => {
        setIsClick(!isClick);
    }
    return (
        <div>

            <Box
                sx={{
                    p: 2.5,
                    borderRadius: 5,
                    boxShadow: 5,
                    mb: 3
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
                    {/*The upvotes, downvotes, question, description*/}
                    <Grid
                        item
                    >
                        <Box
                            sx={{
                                borderRadius: 5
                            }}
                            className={classes.internalCardLayout}
                        >
                            <Grid
                                container
                            >
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
                                    pt={4}
                                >
                                    <Stack
                                        spacing={3}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="h5"
                                        >
                                            {props.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            {props.desc}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/*The Avatar, name, chat icon, number of comments*/}
                    <Grid
                        item
                    >
                        <Box
                            sx={{
                                pl: 4.5
                            }}
                            className={classes.bottomCardLayout}
                        >
                            <Grid
                                container
                            >
                                <Grid
                                    item
                                    xs
                                    sx={{
                                        mr: 2
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Avatar />
                                        <Typography
                                            sx={{
                                                ml: 2,
                                                mr: 1,
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            Published by
                                        </Typography>
                                        <Typography sx={{
                                            color: "#6563ff"
                                        }}>
                                            {props.usr}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Button
                                    startIcon={<AddIcon size="mediam" style={{ fontSize: 30, color: 'white' }} />}
                                    sx={{
                                        width: 220,
                                        height: 50,
                                        mr: 1.5,
                                         
                                        backgroundColor: 'secondary.main',
                                        borderRadius: 5
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{
                                            
                                            mr: 5,
                                            ml: 3,
                                            fontSize: '15px'
                                        }}
                                        color="#ffffff"
                                    >
                                        Add Answer
                                    </Typography>
                                </Button>
                                <Grid
                                    item
                                    xs={2}
                                >
                                    <Button
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                        p={1}
                                        onClick={handleClick}

                                    >
                                        <ChatBubbleOutlineIcon sx={{ color: "#9e9e9e", marginRight: "5px" }} />
                                        <Typography
                                            sx={{
                                                color: "#9e9e9e"
                                            }}
                                        >
                                            {props.ans.length}
                                        </Typography>
                                    </Button>
                                </Grid>

                            </Grid>

                        </Box>
                    </Grid>

                </Grid>

            </Box>
            {isClick && <AnsContainer id={id} />}
        </div>
    )
}