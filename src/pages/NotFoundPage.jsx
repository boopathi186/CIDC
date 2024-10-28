import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/');
    }
    return (
        <div>
       <h1 on>Something went wrong...</h1>
       
        </div>
    );
};

export default NotFound;
