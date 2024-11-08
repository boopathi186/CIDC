import React, { useEffect, useState } from 'react'
import { useGetUserByIdQuery, useDeleteUserMutation } from '../../redux/ApiSlice';
import { Button, Modal, Spinner } from 'react-bootstrap';

const UserModal = ({ show, handleClose, userId, onDelete }) => {

    const [user, setUser] = useState(null);
    const { data, isLoading, error } = useGetUserByIdQuery(userId);
    const [deleteUser] = useDeleteUserMutation();
  
    console.log(data);
  
    useEffect(() => {
      if (data) {
        setUser(data);
      }
    }, [data, userId]);

    const handleDelete = async () => {
      try {
          await deleteUser(userId).unwrap();
          handleClose();
      } catch (error) {
          if (error.originalStatus === 200 && typeof error.data === 'string') {
              console.warn("Non-JSON response:", error.data);
              // Show error message to user or handle accordingly
          } else {
              console.error("Failed to delete the user: ", error);
          }
      }
  };
  
  
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
          ) : user ? (
            <div className="py-3">
              <div className="mb-4 p-3 rounded-3">
                <p className="mb-2"><strong className="text-secondary">Name:</strong> <span className="ms-2">{user?.name}</span></p>
                <p className="mb-2"><strong className="text-secondary">User ID:</strong> <span className="ms-2">{user?.userId}</span></p>
                {/* <p className="mb-0"><strong className="text-secondary">Date:</strong> <span className="ms-2">{attendance.date}</span></p> */}
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
          <Button onClick={handleDelete} variant="danger" className="shadow-sm">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    
    );
  };
  
  export default UserModal;