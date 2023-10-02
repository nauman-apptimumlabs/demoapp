import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';


function YogaList() {
    const navigate = useNavigate();
    const [yogas, setYogas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:3000/api/v1/yougas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setYogas(response.data);
                console.log(response)
            })
            .catch((error) => {
                console.error('Error fetching yogas:', error);
            });
    }, []);

    const handleYogaClick = (id) => {
        navigate(`/yoga/${id}`);
    };

    return (
        <div className='list_container'>
            <br/>
            <Carousel
                showThumbs={false}
                showArrows={true}
                autoPlay={true}
                interval={3000}
            >
                {yogas.map((yoga) => (
                    <div key={yoga.id} className='main_yoga_list'>
                        <div className="yoga-card list_image">
                            <Link to={`/yoga/${yoga.id}`}>
                                <img src={yoga.image_url} alt="Yoga"/>
                                <div className="yoga-card-details py-5">
                                    <h5>{yoga.name}</h5>
                                    <quote>”{yoga.description.substring(0, 150)}...”</quote>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default YogaList;
