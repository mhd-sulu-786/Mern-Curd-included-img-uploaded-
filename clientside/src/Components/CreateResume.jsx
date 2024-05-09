import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateResume = () => {
    const navigater = useNavigate();

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
            const response = await axios.post('http://localhost:10000/postdatas', formDataToSend);
            console.log('Response:', response.data);
            navigater('/show');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Container fluid className='bg-dark d-flex justify-content-center align-items-center text-dark' style={{ height: '100vh' }}>
            <Container className='bg-white w-50  rounded' >
                <h1 className='text-center py-2'>Create Resume</h1>
                <hr />
                <form onSubmit={addDatas} className='d-flex justify-content-center align-items-center flex-column text-center'>
                    <input type="text" id='name' placeholder='Name' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="file" id='photo' placeholder='Add Your Photo' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleFileChange} />
                    <input type="email" id='email' placeholder='Email' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="number" id='phone' placeholder='Phone Number' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="text" id='education' placeholder='Education' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="text" id='address' placeholder='Address' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="text" id='city' placeholder='City' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="text" id='state' placeholder='State' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="number" id='zip' placeholder='Zip' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="text" id='skills' placeholder='Skills' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <input type="text" id='experiences' placeholder='Experiences' className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleChange} />
                    <button type="submit" className='btn btn-primary my-3 w-50 border border-dark border-2'>Submit</button>
                </form>
            </Container>
        </Container>
    );
};

export default CreateResume;
