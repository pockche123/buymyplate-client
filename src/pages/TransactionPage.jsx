import React, { useEffect, useState } from 'react'
import { getAllTransactions } from '../api/transactionApi';
import PaginationCard from '../components/PaginationCard';
import TransactionResults from '../components/TransactionResults';

const TransactionPage = () => {
  const [arr, setarr] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchResults(currentPage)
  }, [itemsPerPage])

  const fetchResults = async (page) => {
    try {
      setIsLoading(true); 
      const response = await getAllTransactions(page, itemsPerPage);
      setarr(response.data.content);
      setTotalPages(response.data.page.totalPages);
      setCurrentPage(page);
      console.log("page: ", page, "items: ", itemsPerPage, "Calling once")

    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };



  if (isLoading) return <div>Loading...</div>; // Show loader


  return (
    <div>
      {arr && arr.length > 0 && (
        <>
          <TransactionResults arr={arr} />
          <PaginationCard fetchResults={fetchResults} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

        </>
      )}
    </div>
  )
}

export default TransactionPage