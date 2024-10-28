import React from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

const Paginate = ({ pageCount,handlePageClick }) => {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        breakClassName='text-danger fw-bold mt-2 d-none d-md-inline-block'
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={pageCount} // Adjusted here

        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName='pagination  justify-content-md-center justify-content-between'
        pageClassName='page-item '
        pageLinkClassName='page-link text-danger border-0 rounded-2 m-1 shadow-sm d-md-block d-none'
        previousLinkClassName='page-link text-danger border-white rounded-3 fw-bold shadow bg-light mx-2'
        previousClassName='page-item text-danger'
        nextClassName='page-item text-danger'
        nextLinkClassName='page-link text-danger border-white rounded-3 fw-bold shadow bg-light mx-2'
        activeClassName='active'
        activeLinkClassName='page-link bg-info bg-opacity-75 text-white text-primary border-0 shadow-none'
      />
    </div>
  );
};


export default Paginate;
