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
        } catch (error) {
            console.log(error)
        }
    }




  return (
    <div className="container mt-4">
    <h3>My Balance</h3>
    {
        balanceData && ( 
            <div className="card my-3">
                <b>Amount(in £): </b>
                <input className="form-control" value={balanceData.amount} disabled />
            </div>
        )
    }
    </div>
  )
}

export default BalancePage