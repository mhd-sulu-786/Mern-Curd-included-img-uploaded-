import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EdithResume = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ref, setref] = useState({})

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
        axios.get(`http://localhost:10000/getdatasId/` + id)
            .then((response) => {
                setref(response.data);
            })
            .catch((error) => {
                console.error('Error fetching resume data:', error);
            });
    }, []);

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
            const response = await axios.put(`http://localhost:10000/update/` + id, formDataToSend);
            console.log('Response:', response.data);
            navigate('/show');
        } catch (error) {
            console.error('Error updating resume data:', error);
        }
    };

    return (
        <Container fluid className='bg-dark d-flex justify-content-center align-items-center text-dark flex-column' style={{ height: '100vh' }}>
            <p className='bg-secondary  py-3 text-warning text-center'>

                <p>{"name:" + ref.name + ", photo:" + ref.photo + ", Email:" + ref.email + ", Phone:" +
                    ref.phone + ", Education:" + ref.education + ", Address:" + ref.addres + ", City:" + ref.city + "\n" +
                    ", State:" + ref.state + ", Zip:" + ref.zip + ", Skills:" + ref.skills + ", Experiences:" + ref.experiences}</p>
            </p>
            <Container className='bg-white w-50 rounded mb-5 ' >
                <h1 className='text-center py-2'>Update Resume</h1>
                <hr />
                <form onSubmit={addDatas} className='d-flex justify-content-center align-items-center flex-column text-center'>
                    <input type="text" id='name' placeholder='Name' className='form-control w-75 me-3 text-center border border-2 border-dark' value={formData.name} onChange={handleChange} />
                    <input type="file" id='photo' placeholder={'Add Your Photo' + formData.photo} className='form-control w-75 me-3 text-center border border-2 border-dark' onChange={handleFileChange} />
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
