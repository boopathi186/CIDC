import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Header from '../components/header/Header';
import Toggle from '../components/header/Toggle';
import SideBar from '../components/sidebar/SideBar';
import { useGetLeaveRecordQuery } from '../redux/ApiSlice';
import PaginationComponent from '../components/pagination/Pagination';
import LeaveTable from '../components/table/LeaveTable';
import PlannedTable from '../components/table/PlannedTable';
import SickLeaveTable from '../components/table/SickLeaveTable';


const LeavePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const recordsPerPage = 8;
    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

    const { data, isLoading, refetch } = useGetLeaveRecordQuery([]);


    useEffect(() => {
        refetch();
        if (data) {
            setFilteredData(data);
        }
    }, [data],refetch);
    data && console.log(data);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (data) {
            const filtered = data.filter((attendance) => (
                (attendance.user && attendance.user.name && attendance.user.name.toLowerCase().includes(value)) ||
                (attendance.attendanceId && attendance.attendanceId.toString().includes(value)) ||
                (attendance.user && attendance.user.status && attendance.user.status.toLowerCase().includes(value))
            ));
            setFilteredData(filtered);
            setCurrentPage(0);
        }
    };


    const handlePageClick = (selected) => {
        setCurrentPage(selected.selected);
    };

    const records = filteredData && filteredData.length > 0 ? filteredData.slice(firstIndex, lastIndex) : [];
    const TotalPages = Math.ceil((filteredData ? filteredData.length : 0) / recordsPerPage);
    return (
        <>
            <Row className=" header-container p-0 m-0 mt-2">
                <Col className='col-12 mt-2 p-0 sticky-top'>
                    <Col lg={12} className="header border-bottom border-secondary shadow border-opacity-25 text-end p-0 bg-white d-none d-lg-block">
                        <Header />
                    </Col>
                    <Col sm={12} className="d-lg-none d-block p-0 m-0">
                        <Toggle />
                    </Col>
                </Col>
            </Row>
            <div className="dashboard-scrollable">
                <Row className="mt-4 mx-2">
                    <Col lg={1} className="d-none d-lg-block rounded-3">
                        <SideBar />
                    </Col>

                    <Col lg={11} className=" p-0 ">
                        <Row className="mx-1 justify-content-center m-0 p-0">
                            <Col lg={12} className="p-0 m-0 ">

                                <Row className='p-0 mx-2 mb-3'>
                                    <Col lg={8} md={12} className='p-0 m-0 mb-lg-0 mb-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-lg-start justify-content-center gap-2'>
                                            {[ 'Sick Leave', 'Planned Leave', 'UnPlanned Leave'].map((leave) => (
                                                <button
                                                    key={leave}
                                                    className="btn btn-primary flex-grow-1 flex-sm-grow-0 flex-basis-0 min-width-150"
                                                    style={{minWidth: '150px'}}
                                                    onClick={() => document.getElementById(leave).scrollIntoView({ behavior: 'smooth' })}
                                                >
                                                    {leave}
                                                </button>
                                            ))}
                                        </div>
                                    </Col>

                                    <Col lg={4} className='p-0 m-0 '>
                                        <div className="w-100 position-relative text-end ">
                                            <i className="search bi bi-search text-secondary fs-3 position-absolute top-50 translate-middle-y"></i>
                                            <input
                                                className='searchbar  ps-5 border border-light shadow-sm rounded-4 p-3 '
                                                onChange={handleSearch}
                                                type="text"
                                                value={searchTerm}
                                                placeholder="Search for names..."
                                                title="Type in a name"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                            </Col>
                            <Row className='p-0 m-0 mx-2'>
                                <Col lg={12} className=" p-0 m-0">
                                    <LeaveTable
                                        records={records}
                                        firstIndex={firstIndex}
                                        searchTerm={searchTerm}
                                        handleSearch={handleSearch}
                                        isLoading={isLoading}
                                    />
                                </Col>
                            </Row>

                            {/* Pagination */}
                            <Row className='p-0 m-0 mx-2'>
                                <Col lg={12} className="d-flex justify-content-end mt-3 mb-3">
                                    <PaginationComponent
                                        pageCount={TotalPages}
                                        handlePageClick={handlePageClick}
                                    />
                                </Col>
                            </Row>

                            <Row className='m-0 p-0 h-25'>
                                <Col lg={6}  className="m-0 p-0 col-12 mb-lg-0 mb-3" id='Planned Leave'>
                                <PlannedTable/>
                                </Col>

                                <Col lg={6} className="p-0 px-lg-2 px-0 mb-3" id='Sick Leave'>
                                <SickLeaveTable/>
                                </Col>
                            </Row>
                                <Row>
                                    <Col lg={12} className="p-0 m-0">
                                    <PlannedTable/>
                                    </Col>
                                </Row>
                            

                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default LeavePage;
