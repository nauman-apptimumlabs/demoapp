import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Exercise = () => {
    const [userYogas, setUserYogas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:3000/api/v1/exercises/user_yoga', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserYogas(response.data);
                console.log(response)
            })
            .catch((error) => {
                console.error('Error fetching user yoga exercises:', error);
            });
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handleRemoveExercise = async (exerciseId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/api/v1/exercises/${exerciseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserYogas((prevState) => prevState.filter((exercise) => exercise.id !== exerciseId));
            toast.warn('Exercise removed gracefully.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            navigate('/exercise');
        } catch (error) {
            console.error('Error removing exercise:', error);
        }
    };


    return (
        <div className='container'>
            {userYogas.map((exercise) => (
                <div className='text-center work_main_div' key={exercise.id}>
                    <iframe width={600} height={400}
                            src={`https://www.youtube.com/embed/${exercise.video_url}`}
                    >
                    </iframe>
                    <h2>{exercise.youga.name}</h2>
                    <p className='text-start py-2'>{exercise.youga.description}</p>
                    <div className='d-flex justify-content-between'>
                        <h5 className='text-start'>Duration {exercise.youga.duration}</h5>
                        <p className="time">{formatDate(exercise.created_at)}</p>
                    </div>
                    <button
                        className='button-50'
                        onClick={() => handleRemoveExercise(exercise.id)}
                    >
                        Remove From Exercise
                    </button>
                    <hr/>
                </div>
            ))}
        </div>
    );
};

export default Exercise;
