import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import QACard from '../../QACard/QACard';
import SkeletonQACard from '../../QACard/SkeletonQACard';

export default function HomeCenterContainer(isDialogOpen) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://query-z4fe.onrender.com/api/v1/questions/');
                setQuestions(response.data.data.questions.reverse());
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isDialogOpen]);

    return (
        <div>
            <Stack>
                {loading ? (
                    // Render the QASkeleton while data is being fetched
                    Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonQACard key={index} />
                    ))
                ) : (
                    // Render QACard components once data is fetched
                    questions.map((ele) => (
                        <QACard
                            key={ele._id}
                            id={ele._id}
                            title={ele.questionTitle}
                            desc={ele.questionDescription}
                            upv={ele.upvotes}
                            downv={ele.downvotes}
                            ans={ele.answers}
                            usr={ele.userQuestioner}
                            prof={ele.profileImage}
                        />
                    ))
                )}
            </Stack>
        </div>
    );
}
