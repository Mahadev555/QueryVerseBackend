import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';  // Import axios

import QACard from '../../QACard/QACard';

export default function HomeCenterContainer() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get('api/v1/questions/');
                setQuestions(response.data.data.questions); // Assuming your API response structure has a "data" field with a "questions" array
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <Stack>
                {questions.map((ele) => (
                    <QACard
                        key={ele._id} // Make sure to use a unique key for each item in the list
                        title={ele.questionTitle}
                        desc={ele.questionDescription}
                        upv={ele.upvotes}
                        downv={ele.downvotes}
                        ans={ele.answers}
                        usr={ele.userQuestioner}
                    />
                ))}
            </Stack>
        </div>
    );
}
