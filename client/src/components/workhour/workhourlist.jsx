import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, Row, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './workhour.css'

const WorkhourMapping = () => {
    const [data, setData] = useState({ workhours: [], workhourlines: null }); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/workhours-with-lines');
                console.log('API Response:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const convertDecimalToHoursAndMinutes = (decimalHours) => {
        const hours = Math.floor(decimalHours);
        const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours} hours ${minutes} minutes`;
    };

    return (
        <div className='workhour'>
            <h2>Workhour Mapping</h2>

            {data.workhours.slice().reverse().map((workhour) => (
                <div key={workhour.id}>
                    <Card className='mt-5'>
                        <CardHeader className='text-light' style={{ backgroundColor: '#50b64a' }}>
                            <h4>{workhour.nom}</h4>
                            <h4>Total hour: {convertDecimalToHoursAndMinutes(workhour.total_hour)} per week</h4>
                            <h5>Delay Tolerance: {workhour.delay_tolerance} minutes</h5>
                        </CardHeader>
                        <table style={{ textAlign: 'center'}}>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Check-in AM</th>
                                    <th>Check-out AM</th>
                                    <th>Check-in PM</th>
                                    <th>Check-out PM</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.workhourlines
                                    .filter((line) => line.id_work_hours === workhour.id)
                                    .map((line) => (
                                        <tr key={line.id}>
                                            <td>{line.jour}</td>
                                            <td>{line.checkin_am}</td>
                                            <td>{line.checkout_am}</td>
                                            <td>{line.checkin_pm}</td>
                                            <td>{line.checkout_pm}</td>
                                            <td className='col-md-1'>
                                                <Button style={{ width: '50px' }} className='btn btn-success'><FontAwesomeIcon icon={faEdit} /></Button>
                                                <span>&nbsp;</span>
                                                <Button style={{ width: '50px' }} className='btn btn-danger'><FontAwesomeIcon icon={faTrash} /></Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default WorkhourMapping;
