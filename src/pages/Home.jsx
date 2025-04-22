import React, { useEffect, useState } from 'react'
import { getVehiclePlatesByInput } from '../api/vehiclePlateApi'
import SearchPlateForm from '../components/SearchPlateForm'
import SearchInputResults from '../components/SearchInputResults'
import PaginationCard from '../components/PaginationCard'

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

 



  return (
    <>
    <h3>Search for a reg plate</h3>
    <SearchPlateForm handleSubmit={handleSubmit} regInput={regInput} setRegInput={setRegInput}/>
    {isLoading && <p>Loading results...</p>}
    
    {/* Fixed rendering section */}
    {regArr && regArr.length > 0 && (
      <>
        <SearchInputResults regArr={regArr}/>
        <PaginationCard fetchResults={fetchResults} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} totalPages={totalPages}/>
     
      </>
    )}
  </>
  
  )
}

export default Home