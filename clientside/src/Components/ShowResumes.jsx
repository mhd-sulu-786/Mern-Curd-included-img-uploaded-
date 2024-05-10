import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShowResumes = () => {
    const [resumes, setResumes] = useState([]);
    const navigater = useNavigate();

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get('https://resumeserver-git-master-mhd-sulu-786s-projects.vercel.app/getdatas');
                setResumes(response.data);
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        };
        fetchResumes();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://resumeserver-git-master-mhd-sulu-786s-projects.vercel.app/deletedata/${id}`)
            .then(() => {
                console.log('Resume deleted successfully');
             
                setResumes(resumes.filter(resume => resume._id !== id));
            })
            .catch((error) => {
                console.error('Error deleting resume:', error);
            });
    };

    return (
        <Container fluid className='bg-dark d-flex justify-content-center p-3 flex-row w-100' style={{ minHeight: '100vh', display: 'flex' }}>
            <Row xs={1} md={2} lg={3} xl={4} className="w-100 g-4 p-2 d-flex justify-content-center align-items-center gap-3">
                {resumes.map((resume, index) => (
                    <Card key={index} className='col-xs-12 col-md-4 col-xl-3  p-2 d-flex text-center  justify-content-center align-items-center ' style={{textTransform:'uppercase'}}>
                        <Card.Img variant="top" style={{ width: '100px', height: '100px', borderRadius: '50%',border:'2px solid green' }} src={'http://localhost:10000/image/' + resume.photo} />
                        <Card.Body>
                            <Card.Title>Name: {resume.name}</Card.Title>
                            <h2>Contact</h2>
                            <Card.Text>
                                Email: {resume.email}
                            </Card.Text>
                            <Card.Text>
                                {resume.phone}
                            </Card.Text>
                            <Card.Text>
                                {resume.address}, {resume.city}, {resume.state}, {resume.zip}
                            </Card.Text>
                            <h2>Education</h2>
                            <Card.Text>
                                {resume.education}
                            </Card.Text>
                            <Card.Text>
                                {resume.skill}
                            </Card.Text>
                            <h2>Experience</h2>
                            <Card.Text>
                                {resume.experiences}
                            </Card.Text>
                        </Card.Body>
                        <div className='d-flex justify-content-between gap-3 p-2'>
                            <Button onClick={() => navigater('/edit/' + resume._id)}>Edit Now</Button>
                            <Button className='bg-danger p-2' onClick={() => handleDelete(resume._id)}>Delete Now</Button>
                        </div>
                    </Card>
                ))}
            </Row>
        </Container>
    );
};

export default ShowResumes;
