import React from 'react'
import { useGetLeaveQuery } from '../redux/ApiSlice';

const LeaveTaken = () => {
  const { data } = useGetLeaveQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default LeaveTaken