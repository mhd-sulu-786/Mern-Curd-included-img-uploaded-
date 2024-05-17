import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EdithResume = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ref, setRef] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        photo: '',
        place: '',
        email: '',
        phone: '',
        education: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        skills: '',
        experiences: ''
    });

    useEffect(() => {
        axios.get(`https://resume-builder-server-z9k9.onrender.com/getdatasId/${id}`)
            .then((response) => {
                setRef(response.data);
                setFormData({
                    name: response.data.name,
                    photo: response.data.photo,
                    place: response.data.place,
                    email: response.data.email,
                    phone: response.data.phone,
                    education: response.data.education,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    zip: response.data.zip,
                    skills: response.data.skills,
                    experiences: response.data.experiences
                });
            })
            .catch((error) => {
                console.error('Error fetching resume data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            photo: file,
        });
    };

    const addDatas = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            const response = await axios.put(`https://resume-builder-server-z9k9.onrender.com/update/${id}`, formDataToSend);
            console.log('Response:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating resume data:', error);
        }
    };

    return (
        <Container fluid className='bg-dark d-flex justify-content-center align-items-center text-dark flex-column' style={{ height: '100vh' }}>
            <Container className='bg-white w-50 rounded mb-5'>
                <h1 className='text-center py-2'>Update Resume</h1>
                <hr />
                <form onSubmit={addDatas} className='d-flex justify-content-center align-items-center flex-column text-center'>
                    <input type="text" id='name' placeholder='Name' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.name} onChange={handleChange} />
                    <input type="file" id='photo' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleFileChange} />
                    <input type="email" id='email' placeholder='Email' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.email} onChange={handleChange} />
                    <input type="number" id='phone' placeholder='Phone Number' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.phone} onChange={handleChange} />
                    <input type="text" id='education' placeholder='Education' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.education} onChange={handleChange} />
                    <input type="text" id='address' placeholder='Address' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.address} onChange={handleChange} />
                    <input type="text" id='city' placeholder='City' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.city} onChange={handleChange} />
                    <input type="text" id='state' placeholder='State' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.state} onChange={handleChange} />
                    <input type="number" id='zip' placeholder='Zip' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.zip} onChange={handleChange} />
                    <input type="text" id='skills' placeholder='Skills' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.skills} onChange={handleChange} />
                    <input type="text" id='experiences' placeholder='Experiences' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.experiences} onChange={handleChange} />
                    <button type="submit" className='btn btn-primary my-3 w-50 border border-dark border-2'>Update</button>
                </form>
            </Container>
        </Container>
    );
};

export default EdithResume;
