import React, { useEffect, useState } from 'react';
import { useDeleteUserMutation, UseDeleteUserMutation, useGetUsersQuery } from '../redux/ApiSlice';
import Header from '../components/header/Header';
import SideBar from '../components/sidebar/SideBar';
import { Button, Col, Pagination, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/GetUsers.css'
import Swal from 'sweetalert2';

const GetUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const recordsPerPage = 10;
    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

 
    const records = filteredData && filteredData.length > 0 ? filteredData.slice(firstIndex, lastIndex) : [];
    const TotalPages = Math.ceil((filteredData ? filteredData.length : 0) / recordsPerPage);

    const { data, isLoading, refetch } = useGetUsersQuery([]);
    const [deleteUser] = useDeleteUserMutation();

    useEffect(() => {
        refetch();
        if (data) {
            setFilteredData(data);
            console.log(data);
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
                deleteUser(id);
                setFilteredData(filteredData.filter((user) => user.id !== id));
                Swal.fire("Deleted!", "User has been deleted.", "success");
            }
        });
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (data) {
            const filtered = data.filter((user) =>
                user.id.includes(value) ||
                user.userName.toLowerCase().includes(value.toLowerCase()) ||
                user.roll.toString().includes(value)
            );
            setFilteredData(filtered);
            setCurrentPage(0);
        }
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <div>
            {isLoading ? (
                <h4 className="d-flex text-danger mt-5 justify-content-center align-items-center vh-100">
                    <Spinner animation="border" />
                </h4>
            ) : (
                <Row className="m-0 p-0">
                    <Col lg={2} className="p-0 m-0 vh-100 shadow d-lg-block d-none">
                        <SideBar />
                    </Col>
                    <Col lg={10} className="p-0 m-0">
                        <Row className="border-bottom border-secondary border-opacity-25 text-end p-0 m-0">
                            <Header />
                        </Row>
                        <div className="text-end container-fluid">
                            <Row className="mt-3">
                                <Col md={6}>
                                    <div className="w-100 p-3 position-relative">
                                        <i className="search bi bi-search text-secondary fs-3"></i>
                                        <input
                                            className="searchbar w-100 ps-5 shadow-sm rounded-4 border-0 p-3"
                                            onChange={handleSearch}
                                            type="text"
                                            value={searchTerm}
                                            placeholder="Search for names..."
                                            title="Type in a name"
                                        />
                                    </div>
                                </Col>
                                <Col md={6} className="text-end">
                                    <Link to="/userprofile/create">
                                        <Button className="createButton border border-none shadow-sm mt-4 fw-semibold rounded-3 py-3" variant="none">
                                            + Create Product
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Table responsive bordered className="shadow mt-3">
                                <thead className="sticky-top shadow-sm text-center">
                                    <tr>
                                        {['S.No', 'Users', 'Department', 'Roll', 'Status', 'Actions'].map((field) => (
                                            <th key={field} className="text-danger bg-light fs-6 p-2">{field}</th>
                                        ))}
                                    </tr>
                                </thead>
                               
                            </Table>
                            <Pagination pageCount={TotalPages} onPageChange={handlePageClick} />
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default GetUsers;

