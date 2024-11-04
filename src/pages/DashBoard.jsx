import React from 'react';
import '../css/DashBoard.css';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import SideBar from '../pages/SideBar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Toggle from '../components/header/Toggle';

const Dashboard = () => {
    const leaveTypes = [
        { field: 'Total Employess', icon: 'bi-people-fill' },
        { field: 'Presents', icon: 'bi-check-lg' },
        { field: 'Absents', icon: 'bi-cloud-slash' },
        { field: 'OnTime', icon: ' bi-alarm' },
        { field: 'Late Entry', icon: ' bi-calendar-x' },
        { field: 'Leave Taken', icon: ' bi-clipboard2-check' }
    ];

    return (
        <>
            <Row className="p-0 m-0 mt-2 ">
                <Col className='col-12 mt-2 shadow-sm '>
                    <Col lg={12} className="border-bottom border-secondary border-opacity-25 text-end p-0 m-0 d-none d-lg-block ">
                        <Header />
                    </Col>
                    <Col className="d-lg-none p-0 m-0">
                        <Toggle />
                    </Col>
                </Col>
            </Row>

            <Row className="mt-5 mx-1">

                <Col lg={1} className="d-none d-lg-block">
                    <SideBar />
                </Col>

                <Col lg={11} className="p-0">
                    <Row className="m-0 row1 ">

                        <Col lg={3} md={12} className="mb-2">
                            <div className="card date-time-card text-center h-100 bg-white border-white shadow-sm ">
                                <Row className="h-50 row-cols-2 ms-2 mt-2">
                                    <Col lg={6} md={6} sm={6} className='fs-4 text-start mt-1 '>
                                        <p className="">Today</p>
                                    </Col>

                                    <Col lg={6} md={6} sm={6} className='text-end fs-1'>
                                        <i className="px-3 sun bi bi-brightness-high"></i>
                                    </Col>
                                </Row>
                                <Row>
                                    <h4 className="text-secondary text-opacity-50 mt-1 fs-6">{moment().format('LTS')}</h4>
                                    <h4 className="text-secondary text-opacity-50 text-center mb-4 ms-2">{moment().format("MMM Do YY")}</h4>
                                </Row>
                                <Link to="/attendance" className="text-decoration-none">
                                    <button className="btn btn-primary mb-2">View Attendance</button>
                                </Link>
                            </div>
                        </Col>  

                        <Col lg={9} md={12} className="d-flex flex-wrap justify-content-between">
                            <div className="dashboard-container d-flex flex-wrap w-100">
                                {leaveTypes.map((leaveType, index) => (
                                    <div className="col-md-4 col-12 mb-3 px-lg-0 px-md-0 rounded-3 my-2 my-lg-0 p-1" key={index}>
                                        <div className="card leave-card text-center bg-white py-1 mx-lg-1 mx-md-1 border-white shadow-sm ">
                                            <Row className='mb-3'>
                                                <h6 className='text-start fs-5 ms-2 text-secondary text-opacity-50'>{leaveType.field}</h6>
                                                <Col>
                                                    <div className="progress-circle mt-2 fs-4 ">45</div>
                                                </Col>
                                                <Col>
                                                    <i className={`bi ${leaveType.icon} me-2 text-primary fs-2 text-opacity-75`}></i>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
