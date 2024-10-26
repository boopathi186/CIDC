import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Col, Row, Spinner } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/Login.css';
const Login = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/login', values);
            console.log(response.data);
            if (response.data) {
                sessionStorage.setItem('token', response.data);
                navigate('/dashboard');
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error(err.response);
            setError('Error logging in. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formFields = [
        { name: 'userName', label: 'Username', type: 'text' },
        { name: 'password', label: 'Password', type: showPassword ? 'text' : 'password' },
    ];

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    if (loading) {
        return (
            <h4 className="d-flex text-danger mt-5 justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
            </h4>
        );
    }

    return (
        <Row className="body row-cols-lg-2 m-0 vh-100">
            <Col lg={6} className="p-0 d-lg-block d-none text-center d-flex justify-content-center align-items-center">
                <div className="d-flex text-white justify-content-center
                align-items-center vh-100">
                    <h2 className='m-0 '>Welcome to the Login Page</h2>
                    {/* <p className='m-0'> Enter your credentials to access your account.</p> */}
                </div>
            </Col>
            <Col lg={6} sm={12}>
                <div className="login row m-0 d-flex align-items-center vh-100">
                    <div className="container bg-light col-12 form-control w-75 border border-0 rounded-3 shadow p-0">
                        <Formik
                            initialValues={{ userName: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form className="border-white shadow-sm p-3 rounded-3 bg-white">
                                    <Col className="col-12 mb-4 text-center">
                                        <h1>Login</h1>
                                    </Col>
                                    {formFields.map((field, index) => (
                                        <div key={index} className="mb-3 position-relative">
                                            <label className="text-secondary mb-2 fw-semibold" htmlFor={field.name}>
                                                {field.label}:
                                            </label>
                                            <Field
                                                className="input form-control fw-semibold bg-secondary bg-opacity-10 border border-0 shadow-sm p-3"
                                                type={field.type}
                                                id={field.name}
                                                name={field.name}
                                            />
                                            {field.name === 'password' && (
                                                <span
                                                    className="eye position-absolute end-0 top-50 translate-middle-y me-3 mt-2"
                                                    onClick={togglePasswordVisibility}>
                                                    {showPassword ? (
                                                        <i className="bi bi-eye-fill text-primary fs-5"></i>
                                                    ) : (
                                                        <i className="bi bi-eye-slash-fill text-primary fs-5"></i>
                                                    )}
                                                </span>
                                            )}
                                            <ErrorMessage name={field.name} component="div" style={{ color: 'red' }} />
                                        </div>
                                    ))}
                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                    <div>
                                        <button
                                            className="loginbutton w-100 border rounded-3 text-white mb-3 mt-3 p-2"
                                            type="submit"
                                            disabled={isSubmitting}
                                            style={{ backgroundColor: '#007bff', transition: 'background-color 0.3s' }}
                                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}>
                                            Login
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
