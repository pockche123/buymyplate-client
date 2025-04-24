import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const BalancePage = () => {
    const[balanceData, setBalanceData] = useState(null); 
    const params = useParams();
    const id = params.id;

    const getBalanceByCustomerId = async() => {
        
    }


  return (
    <div>BalancePage</div>
  )
}

export default BalancePage