import React from 'react'
import { useGetAbsentQuery } from '../redux/ApiSlice';

const Absents = () => {
  const { data } = useGetAbsentQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default Absents;