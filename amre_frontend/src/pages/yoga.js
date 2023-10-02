import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from '../components/Auth/AuthContext';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Yoga = () => {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: '',
        picture: null,
        video_url: '',
    });

    const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            console.error('User is not logged in.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const formDataForApi = new FormData();
            formDataForApi.append('youga[name]', formData.name);
            formDataForApi.append('youga[description]', formData.description);
            formDataForApi.append('youga[duration]', formData.duration);
            formDataForApi.append('youga[video_url]', formData.video_url);
            formDataForApi.append('youga[picture]', formData.picture);

            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/yougas',
                formDataForApi,
                config
            );

            if (response.data) {
                toast.success('Yoga created successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                navigate('/');
            } else {
                console.error('Failed to create yoga.');
            }
        } catch (error) {
            console.error('API request error', error);
        }
    };

    return (
        <div>
            <h1>Create Yoga</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="picture" className="form-label">
                        Picture
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="picture"
                        name="picture"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">
                        Duration
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        min="30"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="video_url" className="form-label">
                        Video URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="video_url"
                        name="video_url"
                        value={formData.video_url}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Yoga
                </button>
            </form>
        </div>
    );
};

export default Yoga;
