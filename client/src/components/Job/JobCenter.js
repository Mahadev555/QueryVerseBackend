import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import JobCardSkeleton from './JobCardSkeleton';
import JobCard from './JobCard';

export default function JobCenter() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
console.log(jobs)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.cuvette.tech/api/v1/externaljobs?search=');
                setJobs(response.data.data.slice(0, 50));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Stack>
                {loading ? (
                    // Render the SkeletonJobCard while data is being fetched
                    Array.from({ length: 3 }).map((_, index) => (
                        <JobCardSkeleton key={index} />
                    ))
                ) : (
                    // Render JobCard components once data is fetched
                    jobs.map((job) => (
                        <JobCard
                            key={job._id}
                            logo={job.imageUrl}
                            company={job.companyName}
                            position={job.title}
                            location={job.location}
                            skills={job.skills}
                            jobType={job.type}
                            salary={job.salary}
                            experience={job.requiredExperience}
                            applicationLink={job.redirectLink}
                        />
                    ))
                )}
            </Stack>
        </div>
    );
}
