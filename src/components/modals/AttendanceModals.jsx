import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useGetAttendanceByIdQuery, useUpdateAttendanceMutation } from '../../redux/ApiSlice';

const AttendanceModals = ({ show, handleClose, attendanceId}) => {

  const [attendance, setAttendance] = useState(null);
  const { data, isLoading, error } = useGetAttendanceByIdQuery(attendanceId);

  console.log(data);

  useEffect(() => {
    if (data) {
      setAttendance(data);
    }
  }, [data]);


  return (
    <Modal  size="sm" show={show} onHide={handleClose} backdrop={false} style={{backdropFilter: 'blur(2px)', border: '1px solid #0d6efd'}}>
      <Modal.Header closeButton className="border-white ">
        <Modal.Title className="text-primary">Attendance Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : attendance ? (
          <div className="py-3">
            <div className="mb-4 p-3 rounded-3">
              <p className="mb-2"><strong className="text-secondary">Name:</strong> <span className="ms-2">{attendance.user?.name}</span></p>
              <p className="mb-2"><strong className="text-secondary">User ID:</strong> <span className="ms-2">{attendance.user?.userId}</span></p>
              <p className="mb-0"><strong className="text-secondary">Date:</strong> <span className="ms-2">{attendance.date}</span></p>
            </div>
          </div>
        ) : (
          <p className="text-center text-danger">No data found</p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-white">
        <Button variant="light" className="shadow-sm" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" className="shadow-sm">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  
  );
};

export default AttendanceModals;