import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetUsersQuery } from '../redux/ApiSlice';

const LeaveCard = ({ field, icon }) => {
    const { data } = useGetUsersQuery();
    const length = data?.length || 0;
    return (
       <div>{length}</div>
    );
}

export default LeaveCard;
