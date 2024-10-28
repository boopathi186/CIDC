import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css'

const SideBar = () => {
    const [activeIndex, setActiveIndex] = useState(0); 

    const navItems = [
        { icon: 'bi-columns-gap', label: 'Dashboard', path: '/dashboard' },
        { icon: 'bi-chat-left-dots', label: 'Chat', path: '/chat' },
        { icon: 'bi-clock-history', label: 'Attendance', path: '/attendance' },
    ];

    return (
        <div className="sidebar bg-white m-0 p-0">
            <div className="nav flex-column shadow rounded-2">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`navbars  nav-link mt-4 text-primary fw-semibold d-flex align-items-center justify-content-center fs-3 ${
                            activeIndex === index ? 'active' : ''
                        }`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <i className={`bi ${item.icon} me-2`}></i> 
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
