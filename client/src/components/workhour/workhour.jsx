import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
// import { Toast,ToastContainer } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkhourForm = () => {
    const [workhourData, setWorkhourData] = useState({
        nom: '',
        total_hour:'1',
        delay_tolerance: ''
    });
    const [selectedDays, setSelectedDays] = useState([]);
    const [showWorkhourLineInputs, setShowWorkhourLineInputs] = useState(false);
    const [createdWorkhour, setCreatedWorkhour] = useState(null);

    const handleInputChange = (e) => {
        setWorkhourData({ ...workhourData, [e.target.name]: e.target.value });
    };

    const handleDaySelect = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/workhours', workhourData);
            setCreatedWorkhour(response.data.id);

            setShowWorkhourLineInputs(true);

            alert('Workhour created successfully!');
        } catch (error) {
            console.error('Error creating workhour:', error);
            alert('An error occurred while creating workhour.');
        }
    };

    const handleCreateWorkhourLines = async () => {
        try {
            if (!createdWorkhour) {
                alert('Please create a workhour first.');
                return;
            }
    
            for (const day of selectedDays) {
                const checkin_am = workhourData[`checkin_am_${day}`];
                const checkout_am = workhourData[`checkout_am_${day}`];
                const checkin_pm = workhourData[`checkin_pm_${day}`];
                const checkout_pm = workhourData[`checkout_pm_${day}`];
    
                if (!checkin_am || !checkout_am || !checkin_pm || !checkout_pm) {
                    alert('Please fill in all check-in and check-out times for each selected day.');
                    return;
                }
    
                console.log('Workhourline data:', {
                    jour: day,
                    checkin_am: workhourData[`checkin_am_${day}`],
                    checkout_am: workhourData[`checkout_am_${day}`],
                    checkin_pm: workhourData[`checkin_pm_${day}`],
                    checkout_pm: workhourData[`checkout_pm_${day}`],
                    id_work_hours: createdWorkhour
                });
    
                await axios.post('http://localhost:8000/api/workhourlines', {
                    jour: day,
                    checkin_am,
                    checkout_am,
                    checkin_pm,
                    checkout_pm,
                    id_work_hours: createdWorkhour
                });
            }
    
            const response = await axios.get(`http://localhost:8000/api/workhours/${createdWorkhour}`);
        const existingWorkhourData = response.data;
            console.log(existingWorkhourData)
        let totalMinutes = selectedDays.reduce((total, day) => total + calculateTotalMinutes(day), 0);
        let totalHours = totalMinutes / 60; 
        console.log('Total Hours:', totalHours);

        existingWorkhourData.total_hour = totalHours;
        await axios.put(`http://localhost:8000/api/workhours/${createdWorkhour}`, existingWorkhourData);

        toast.info('workhour lines created succesfully');
        } catch (error) {
            console.error('Error creating workhourlines:', error);
            alert('An error occurred while creating workhourlines.');
        }
        setCreatedWorkhour(null);
        setSelectedDays([]);
        setWorkhourData({
            nom: '',
            total_hour: '1',
            delay_tolerance: ''
        });
    };
    
    const calculateTotalMinutes = (day) => {
        const checkin_am = workhourData[`checkin_am_${day}`];
        const checkout_am = workhourData[`checkout_am_${day}`];
        const checkin_pm = workhourData[`checkin_pm_${day}`];
        const checkout_pm = workhourData[`checkout_pm_${day}`];
    
        if (!checkin_am || !checkout_am || !checkin_pm || !checkout_pm) {
            console.log('Missing values for day:', day);
            return 0; 
        }
    
        // mcalcul an le totalhour
        const totalMinutes = (parseInt(checkout_am.split(':')[0]) * 60 + parseInt(checkout_am.split(':')[1])) -
            (parseInt(checkin_am.split(':')[0]) * 60 + parseInt(checkin_am.split(':')[1])) +
            (parseInt(checkout_pm.split(':')[0]) * 60 + parseInt(checkout_pm.split(':')[1])) -
            (parseInt(checkin_pm.split(':')[0]) * 60 + parseInt(checkin_pm.split(':')[1]));
    
        return totalMinutes;
    };
    

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel>Nom:</FormLabel>
                    <FormControl type="text" name="nom" value={workhourData.nom} onChange={handleInputChange} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Delay Tolerance:</FormLabel>
                    <FormControl type="text" name="delay_tolerance" value={workhourData.delay_tolerance} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Select Days:</FormLabel>
                    <Row>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday'].map((day) => (
                            <Col key={day}>
                                <Form.Check
                                    type="checkbox"
                                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDaySelect(day)}
                                />
                            </Col>
                        ))}
                    </Row>
                    
                </FormGroup>
                <Button type="submit">Create Workhour</Button>
            </Form>
            {showWorkhourLineInputs && (
                <>
                    <h2>Workhourlines</h2>
                    <Container>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={9}>
                            <Row>
                                <Col><FormLabel>Check-in AM</FormLabel></Col>
                                <Col><FormLabel>Check-out AM</FormLabel></Col>
                                <Col><FormLabel>Check-in PM</FormLabel></Col>
                                <Col><FormLabel>Check-out PM</FormLabel></Col>
                            </Row>
                        </Col>
                    </Row>
                    {selectedDays.map((day) => (
                        <Row key={day} className="mb-3">
                            <Col xs={3} className="text-end">
                                {day.charAt(0).toUpperCase() + day.slice(1)}:
                            </Col>
                            <Col xs={9}>
                                <Row>
                                    <Col>
                                        <FormControl
                                            type="time"
                                            name={`checkin_am_${day}`}
                                            value={workhourData[`checkin_am_${day}`]}
                                            onChange={handleInputChange}
                                            className="w-100"
                                        />
                                    </Col>
                                    <Col>
                                        <FormControl
                                            type="time"
                                            name={`checkout_am_${day}`}
                                            value={workhourData[`checkout_am_${day}`]}
                                            onChange={handleInputChange}
                                            className="w-100"
                                        />
                                    </Col>
                                    <Col>
                                        <FormControl
                                            type="time"
                                            name={`checkin_pm_${day}`}
                                            value={workhourData[`checkin_pm_${day}`]}
                                            onChange={handleInputChange}
                                            className="w-100"
                                        />
                                    </Col>
                                    <Col>
                                        <FormControl
                                            type="time"
                                            name={`checkout_pm_${day}`}
                                            value={workhourData[`checkout_pm_${day}`]}
                                            onChange={handleInputChange}
                                            className="w-100"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ))}
                </Container>    
                    <Button onClick={handleCreateWorkhourLines}>Create Workhourlines</Button>
                </>
            )}
            <ToastContainer />
        </Container>
    );
};

export default WorkhourForm;
