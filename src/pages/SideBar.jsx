import React from 'react'

const SideBar = () => {
  return (
    <div className="sidebar bg-white  m-0 p-0  mt-5">
    <div className="nav flex-column  shadow rounded-2">
      <div className="navbars  nav-link mt-4 text-primary fw-semibold d-flex align-items-center justify-content-center">
        <i className="bi bi-columns-gap me-2"></i>
      </div>
      <div className="navbars  nav-link mt-4 text-primary fw-semibold d-flex align-items-center justify-content-center">
        <i className="bi bi-chat-left-dots me-2"></i> 
      </div>
      <div className="navbars   nav-link mt-4 mb-4 text-primary fw-semibold d-flex align-items-center justify-content-center">
        <i className="bi bi-clock-history me-2"></i>
      </div>
    </div>
  </div>
  )
}

export default SideBar