import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useCreateUserMutation } from '../../redux/ApiSlice';
import Swal from 'sweetalert2';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        roll: '',
        department: ''
    });
    const [show, setShow] = useState(false);
    const [createUser] = useCreateUserMutation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.userId || !formData.roll || !formData.department) {
            console.error('All fields are required.');
            return;
        }
        createUser(formData)
            .unwrap()
            .then(() => {
                handleClose();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormData({
                    name: '',
                    userId: '',
                    roll: '',
                    department: ''
                });
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div>
            <Button onClick={handleShow}>
                <i className="mx-2 bi bi-person-plus-fill"></i>Add User
            </Button>

            <Modal
                size="sm"
                show={show}
                onHide={handleClose}
                backdrop={false}
                style={{ backdropFilter: 'blur(2px)', border: '1px solid #0d6efd' }}
            >
                <Modal.Header closeButton className="border-white">
                    <Modal.Title className="text-primary">Add New User</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form className="d-flex flex-column gap-2">
                        {[
                            { id: 'name', label: 'Name', placeholder: 'Enter name' },
                            { id: 'userId', label: 'User ID', placeholder: 'Enter user ID' },
                            { id: 'roll', label: 'Roll', placeholder: 'Enter roll' },
                            { id: 'department', label: 'Department', placeholder: 'Enter department' }
                        ].map((field) => (
                            <div key={field.id} className="form-group">
                                <label htmlFor={field.id}>{field.label}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={field.id}
                                    name={field.id}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </form>
                </ModalBody>
                <Modal.Footer className="border-white">
                    <Button variant="light" className="shadow-sm" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" className="shadow-sm" onClick={handleSubmit}>
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddUser;
