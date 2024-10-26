import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from './SideBar'
import Header from '../components/header/Header';
import StateCard from './StateCard';

const DashBoard = () => {
    const [states, setStates] = useState({
        totalEmployees: 0,
        lateRecords: 0,
        present: 0,
        absent: 0,
    });

    return (
        <>
            <Row className="m-0 p-0">
                <Col xl={12} lg={12} className='p-0 m-0'>
                    <Row className="border-bottom border-secondary border-opacity-25 text-end p-0 m-0 d-lg-block d-none">
                        <Header />
                    </Row>
                    <Col xl={1} lg={1} className="p-0 m-3 d-lg-block d-none border border-white">
                        <Sidebar />
                    </Col>
                    <Col xl={10} lg={10} className="p-3">
                        <Row className="g-4">
                            <StateCard title="Total Employees" value={states.totalEmployees} />
                            <StateCard title="Late Records" value={states.lateRecords} />
                            <StateCard title="Present" value={states.present} />
                            <StateCard title="Absent" value={states.absent} />
                        </Row>
                    </Col>
                </Col>
            </Row>
        </>
    );
};
export default DashBoard