import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehiclePlatesByCustomerId } from "../api/vehiclePlateApi";
import SearchInputResults from "../components/SearchInputResults";
import PaginationCard from "../components/PaginationCard";

const ViewCustomerPlatesPage = () => {
  const params = useParams();
  const customerId = params.id;
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllVehiclePlatesByCustomerId(page);
  }, [customerId, itemsPerPage]);

  const fetchAllVehiclePlatesByCustomerId = async (page) => {
    try {
      const response = await getVehiclePlatesByCustomerId(
        customerId,
        page,
        itemsPerPage
      );
      console.log("response: ", response.data);
      setArr(response.data.content);
      setTotalPages(response.data.page.totalPages);
      setPage(page);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>My plates</h3>
      {arr && arr.length > 0 ? (
        <>
          <SearchInputResults regArr={arr} />
          <PaginationCard
            fetchResults={fetchAllVehiclePlatesByCustomerId}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
            setCurrentPage={setPage}
          />
        </>
      ) : (
        <b>No plates found...</b>
      )}
    </div>
  );
};

export default ViewCustomerPlatesPage;
