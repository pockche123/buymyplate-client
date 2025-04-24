import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBalanceByCustomerId } from '../api/balanceApi';

const BalancePage = () => {
    const[balanceData, setBalanceData] = useState(null); 
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetchCustomerBalance()
    }, [id])

    const fetchCustomerBalance = async() => {
        try {
          const response = await getBalanceByCustomerId(id)
          setBalanceData(response.data)
          console.log("response: ", response)
        // const response = await fetch("http://localhost:8080/v1/balance/customerId/" + id )
        // console.log("balance response: " , response)
        } catch (error) {
            console.log(error)
        }
    }




  return (
    <>
    <h3>My Balance</h3>
    {
        balanceData && ( 
            <>
                <b>Amount: </b>
                <h5>{balanceData.amount}</h5>

            </>
        )
    }
    </>
  )
}

export default BalancePage