import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card,CardHeader, Table } from 'react-bootstrap';

const WorkhourMapping = () => {
    const [data, setData] = useState({ workhours: [], workhourlines: [] });

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

    return (
        <div>
            <h2>Workhour Mapping</h2>
           
                
            {data.workhours.length > 0 && data.workhours.map((workhour) => (
                 
                <div key={workhour.id}>
                   <Card className='mt-5'>
                <CardHeader className='bg-success text-light'> <h4>{workhour.nom}</h4>
                    <h4>total hour: {workhour.total_hour} hours </h4></CardHeader>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Check-in AM</th>
                                <th>Check-out AM</th>
                                <th>Check-in PM</th>
                                <th>Check-out PM</th>
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
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    </Card>
                </div>             
            ))}
             </div>
    );
};

export default WorkhourMapping;
