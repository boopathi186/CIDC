import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import SideBar from '../../pages/SideBar';
import Header from './Header';

const Toggle = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='row m-0 p-0'>
            <div className='col-12 d-md-none p-0'>
                <Button variant="white border-end" onClick={handleShow}>Menu Bar</Button>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <SideBar />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <div className='col text-end d-none d-md-block p-0 '>
                <Header />
            </div>
        </div>
    );
};

export default Toggle;
