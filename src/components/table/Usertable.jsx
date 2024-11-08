import React, { useState } from 'react';
import UserModal from '../modals/UserModal';
import { Button, Card, CardBody, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/UserTable.css';

const UserTable = ({ records, firstIndex, isLoading, onDeleteUser }) => {
    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {isLoading ? (
                <h4 className="d-flex text-danger mt-5 justify-content-center align-items-center vh-100">
                    <Spinner animation="border" />
                </h4>
            ) : (
                <div className="table-container shadow rounded-2 bg-white p-0 m-0">
                    <Card className="p-0 m-0 border border-white">
                        <CardBody className="p-0 m-0">
                            <Table bordered variant="border border-white" className="text-center mb-0">
                                <thead className="sticky-top shadow-sm">
                                    <tr className="table-header text-center">
                                        {['S.No', 'Name', 'UserId', 'Roll', 'Department', 'isActive', 'Actions'].map((field) => (
                                            <th key={field} className="text-info text-opacity-75 bg-opacity-100 rounded fs-6 fw-semibold p-2">
                                                {field}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.length > 0 ? (
                                        records.map((user, index) => (
                                            <tr key={index} className="table-data border-bottom">
                                                <td className="text-center text-secondary text-nowrap">{firstIndex + index + 1}</td>
                                                <td className="text-center text-secondary text-nowrap">
                                                    {user.name}
                                                </td>
                                                <td className="text-center text-secondary text-nowrap">{user.userId}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.roll}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.department}</td>
                                                <td className="text-center text-secondary text-nowrap">
                                                    <h6 className="active p-1 rounded-3 text-white">Active</h6>
                                                </td>
                                                <td className="text-center">
                                                    <Button
                                                        onClick={() => {
                                                            handleShow();
                                                            setSelectedUserId(user.userId);
                                                        }}
                                                        variant="none px-sm-1 px-0"
                                                    >
                                                        <h6 className="text-primary bg-light rounded-2 px-2 py-1 shadow-sm">view</h6>
                                                    </Button>
                                                    <UserModal
                                                        show={show}
                                                        handleClose={handleClose}
                                                        userId={selectedUserId}
                                                        onDelete={(userId) => onDeleteUser(userId)} 
                                                    />
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

export default UserTable;
