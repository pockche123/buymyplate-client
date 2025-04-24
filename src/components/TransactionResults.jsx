import React, { useState, useMemo } from 'react'
import '../assets/table.css'


const TransactionResults = ({ arr }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const sortedTransactions = useMemo(() => {
    if (!sortConfig.key) return arr;
    
    return [...arr].sort((a, b) => {
      const valueA = sortConfig.key === 'transactionDate' 
        ? new Date(a[sortConfig.key]) 
        : a[sortConfig.key];
        
      const valueB = sortConfig.key === 'transactionDate'
        ? new Date(b[sortConfig.key])
        : b[sortConfig.key];

      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [arr, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Plate ID</th>
          <th onClick={() => handleSort('pricePaid')} className="sortable">
            Amount (£) {sortConfig.key === 'pricePaid' && (
              sortConfig.direction === 'asc' ? '↑' : '↓'
            )}
          </th>
          <th onClick={() => handleSort('transactionDate')} className="sortable">
            Date {sortConfig.key === 'transactionDate' && (
              sortConfig.direction === 'asc' ? '↑' : '↓'
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map((t) => (
          <tr key={t.transactionId}>
            <td>{t.customerId}</td>
            <td>{t.vehiclePlateId}</td>
            <td>£{t.pricePaid}</td>
            <td>
              {new Date(t.transactionDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionResults