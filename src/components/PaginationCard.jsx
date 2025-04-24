import React from 'react'
import { FormSelect } from 'react-bootstrap'

const PaginationCard = ({fetchResults, currentPage, itemsPerPage, setItemsPerPage, totalPages,setCurrentPage }) => {

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
      disabled={currentPage === 0 }
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
      disabled={currentPage === totalPages - 1}
    >
      Next
    </button>

    <FormSelect style={{width: '200px'}}
      value={itemsPerPage}
      onChange={(e) => {
        console.log("items: ", e.target.value)
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(0)
      }}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={25}>25 per page</option>
    </FormSelect>
  </div>
  )
}

export default PaginationCard