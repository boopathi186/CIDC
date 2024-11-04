// import React from 'react'
// import { useGetUsersQuery } from '../redux/ApiSlice';

// const TotalEmployees = ({value,icon}) => {
//     const { data } = useGetUsersQuery();
//     const length = data?.length || 0;
//     console.log(length);
    
//   return (
//     <div>{length}</div>
//   )
// }

// export default TotalEmployees

// LeaveCard.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const LeaveCard = ({ field, icon, value }) => (
    <div className="col-md-4 col-12 mb-3 px-lg-0 px-md-0 rounded-3 my-2 my-lg-0 p-1">
        <div className="card leave-card text-center bg-white py-1 mx-lg-1 mx-md-1 border-white shadow-sm">
            <Row className='mb-3'>
                <h6 className='text-start fs-5 ms-2 text-secondary text-opacity-50'>{field}</h6>
                <Col>
                    <div className="progress-circle mt-2 fs-4">{value}</div>
                </Col>
                <Col>
                    <i className={`bi ${icon} me-2 text-primary fs-2 text-opacity-75`}></i>
                </Col>
            </Row>
        </div>
    </div>
);

export default LeaveCard;
