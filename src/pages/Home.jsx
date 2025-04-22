import React, { useEffect, useState } from 'react'
import { getVehiclePlatesByInput } from '../api/vehiclePlateApi'
import SearchPlateForm from '../components/SearchPlateForm'
import SearchInputResults from '../components/SearchInputResults'
import { FormSelect } from 'react-bootstrap'

const Home = () => {

  const [regInput, setRegInput] = useState('')
  const [regArr, setRegArr]  = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const handleSubmit = async(e) => {
    e.preventDefault()
    fetchResults(0)

  }
  const fetchResults = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await getVehiclePlatesByInput(regInput, page, itemsPerPage )
      console.log(response)
      setRegArr(response.data.content);
      setTotalPages(response.data.page.totalPages);
      console.log("totalPages: " , totalPages)
      setCurrentPage(response.data.page.number);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchResults(newPage);
    }
  };



  return (
    <>
    <h3>Search for a reg plate</h3>
    <SearchPlateForm handleSubmit={handleSubmit} regInput={regInput} setRegInput={setRegInput}/>
    {isLoading && <p>Loading results...</p>}
    
    {/* Fixed rendering section */}
    {regArr && regArr.length > 0 && (
      <>
        <SearchInputResults regArr={regArr}/>
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
      </>
    )}
  </>
  
  )
}

export default Home