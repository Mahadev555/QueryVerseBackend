import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';  // Import axios

import AnswerCard from './AnswerCard';
import instance from '../../axiosInstance';

export default function AnsContainer(id) {
    const [Answers, setAnswers] = useState([]);
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await instance.get(`/api/v1/questions/ans/${id.id}`);
                setAnswers(response.data.data.answers.reverse()); // Assuming your API response structure has a "data" field with a "questions" array
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts



    return (
        <div >
            <Stack >
                {Answers.map((ele) => (
                    <AnswerCard key={ele._id}
                        answerId={ele._id}// Make sure to use a unique key for each item in the list
                        upv={ele.upvotes}
                        downv={ele.downvotes}
                        ans={ele.answer}
                        prof={ele.profileImage}
                        usr={ele.userAnswerer} />

                ))}


            </Stack>
        </div>
    );
}
