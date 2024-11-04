import React, { useEffect, useState } from 'react';
import { useDeleteAttendanceMutation, useGetAttendanceQuery } from '../redux/ApiSlice';
import Header from '../components/header/Header';
import SideBar from './SideBar';
import { Col, Pagination, Row, Spinner } from 'react-bootstrap';
import Toggle from '../components/header/Toggle';
import AttendanceTable from './AttendanceTable';
import '../css/GetAttendance.css';
import Swal from 'sweetalert2';

const GetAttendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const recordsPerPage = 5;
    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

    const { data, isLoading, refetch } = useGetAttendanceQuery([]);
    const [deleteAttendance] = useDeleteAttendanceMutation();

    useEffect(() => {
        refetch();
        if (data) {
            setFilteredData(data);
        }
    }, [data, refetch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAttendance(id);
                setFilteredData(filteredData.filter((user) => user.id !== id));
                Swal.fire("Deleted!", "User has been deleted.", "success");
            }
        });
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (data) {
            const filtered = data.filter((attendance) =>
                attendance.attendance_id.includes(value) ||
                attendance.status.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filtered);
            setCurrentPage(0);
        }
    };

    const handlePageClick = (selected) => {
        const selectedPage = selected;
        setCurrentPage(selectedPage);
    };

    const records = filteredData && filteredData.length > 0 ? filteredData.slice(firstIndex, lastIndex) : [];
    const TotalPages = Math.ceil((filteredData ? filteredData.length : 0) / recordsPerPage);

    return (
        <div>
            <Row className="p-0 m-0 mt-2 ">
                <Col className='col-12 mt-2 shadow-sm '>
                    <Col lg={12} className="border-bottom border-secondary border-opacity-25 text-end p-0 m-0 d-none d-lg-block ">
                        <Header />
                    </Col>
                    <Col className="d-lg-none p-0 m-0">
                        <Toggle />
                    </Col>
                </Col>
            </Row>

            <Row className="mt-5 mx-1 justify-content-center">
                <Col lg={1} className="d-none d-lg-block">
                    <SideBar />
                </Col>
                <Col lg={11} className="p-0">
                    <AttendanceTable
                        records={records}
                        handleDelete={handleDelete}
                        firstIndex={firstIndex}
                        searchTerm={searchTerm}
                        handleSearch={handleSearch}
                        isLoading={isLoading}
                    />
                </Col>
                <Col lg={11} className="d-flex justify-content-end mt-3 mb-3">
                    <Pagination pageCount={TotalPages} handlePageClick={handlePageClick} />
                </Col>
            </Row>
        </div>
    );
};

export default GetAttendance;
