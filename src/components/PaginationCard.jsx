import React from 'react'
import { FormSelect } from 'react-bootstrap'

const PaginationCard = ({fetchResults, currentPage, itemsPerPage, setItemsPerPage, totalPages}) => {

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
          fetchResults(newPage);
        }
      };
  return (
    <div className="pagination-controls">
    <button 
      className="btn btn-primary"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 0 || isLoading}
    >
      Previous
    </button>

    <span>
      Page {currentPage + 1} of {totalPages}
    </span>

  &nbsp; &nbsp;

    <button 
      className="btn btn-primary"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1 || isLoading}
    >
      Next
    </button>

    <FormSelect style={{width: '200px'}}
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        fetchResults(0);
      }}
    >
      <option value={10}>10 per page</option>
      <option value={25}>25 per page</option>
      <option value={50}>50 per page</option>
    </FormSelect>
  </div>
  )
}

export default PaginationCard