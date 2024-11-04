
import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AttendanceTable = ({ records, handleDelete, firstIndex, searchTerm, handleSearch, isLoading }) => {
    return (
        <>
            {isLoading ? (
                <h4 className="d-flex text-danger mt-5 justify-content-center align-items-center vh-100">
                    <Spinner animation="border" />
                </h4>
            ) : (
                <div className="t1 table-responsive shadow mx-3 rounded-2">
                    <Card className='p-0 m-0 border border-white'>
                        <CardHeader className='bg-white'>
                            <Row className="p-0 m-0 row-cols-2 mb-3">
                                <Col className="p-0 m-0">
                                    <h5 className='m-0 p-0 d-flex align-items-center h-100'>Attendance Overview</h5>
                                </Col>
                                <Col className="p-0 m-0">
                                    <div className="w-100 position-relative">
                                        <i className="search bi bi-search text-secondary fs-3"></i>
                                        <input
                                            className='searchbar w-100 ps-5 border border-light shadow-sm rounded-4 p-3'
                                            onChange={handleSearch}
                                            type="text"
                                            value={searchTerm}
                                            placeholder="Search for names..."
                                            title="Type in a name"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table bordered variant='border border-white' className="text-center">
                                <thead className='sticky-top shadow-sm'>
                                    <tr>
                                        {['S.No', 'Name', 'UserId', 'Date', 'Record_In', 'Record_Out', 'Status', 'Working Hours', 'Actions'].map((field) => (
                                            <th key={field} className='text-primary text-opacity-75 bg-opacity-100 rounded border border-white fs-6 p-2'>{field}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.length > 0 ? (
                                        records.map((user, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td className="text-center text-secondary">{firstIndex + index + 1}</td>
                                                <td className="text-center text-secondary">
                                                    <Link className="text-decoration-none text-secondary" to={`/userProfile/${user.attendanceId}`}>
                                                        {user.user.name}
                                                    </Link>
                                                </td>
                                                <td className="text-center text-secondary">{user.user.userId}</td>
                                                <td className="text-center text-secondary">{user.date}</td>
                                                <td className="text-center text-secondary">{(user.user.record_in) === "-" ? "-" : user.recordIn}</td>
                                                <td className="text-center text-secondary">{(user.user.record_out) === "-" ? "-" : user.recordOut}</td>
                                                <td className="text-center">
                                                    {(user.status) === "absent" ? "A" : "P"}
                                                </td>
                                                <td className="text-center text-secondary">8</td>
                                                <td className="text-center">
                                                    <Button onClick={() => handleDelete(user.id)} variant="none px-sm-1 px-0">
                                                        <i className="bi bi-trash3-fill text-primary px-1"></i>
                                                    </Button>
                                                    <Link to={`/userProfile/update/${user.id}`} className="px-1">
                                                        <i className="edit bi bi-pencil-square"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center text-danger">
                                                No matches found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    );
};

export default AttendanceTable;
