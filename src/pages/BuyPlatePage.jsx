import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { 
  getVehiclePlatesById,
  updateVehiclePlate 
} from '../api/vehiclePlateApi';
import { 
  getBalanceByCustomerId,
  updateBalance 
} from '../api/balanceApi';
import { createTransaction } from '../api/transactionApi';

const BuyPlatePage = () => {
  const [plateData, setPlateData] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { id: vehicleId } = useParams();
  const { user } = useAuth();
  const customerId = user?.userId;
  const navigate = useNavigate();

  const fetchPlate = useCallback(async () => {
    try {
      const response = await getVehiclePlatesById(vehicleId);
      setPlateData(response.data);
    } catch (error) {
      toast.error('Failed to load plate details');
    }
  }, [vehicleId]);

  const fetchBalance = useCallback(async () => {
    if (!customerId) return;
    try {
      const response = await getBalanceByCustomerId(customerId);
      setBalanceData(response.data);
    } catch (error) {
      toast.error('Failed to load balance information');
    }
  }, [customerId]);

  const handlePurchase = useCallback(async () => {
    if (isProcessing) return;
    
    // Validate data before confirmation
    if (!balanceData?.balanceId || !plateData?.price || !customerId) {
      toast.error('Invalid purchase data');
      return;
    }

    if (balanceData.amount < plateData.price) {
      toast.error('Insufficient balance');
      return;
    }

    const isConfirmed = window.confirm(
      'Please confirm that you want to make the purchase:'
    );
    if (!isConfirmed) return;

    setIsProcessing(true);
    
    try {
      // Update balance
      const balanceResponse = await updateBalance(balanceData.balanceId, {
        amount: balanceData.amount - plateData.price,
      });
      
      if (balanceResponse?.error) {
        throw new Error('Failed to update balance');
      }

      // Update vehicle plate
      const plateResponse = await updateVehiclePlate(vehicleId, {
        available: false,
        userId: customerId
      });

      if (plateResponse?.error) {
        throw new Error('Failed to update plate status');
      }
      const transactionResponse = await createTransaction({
        userId: customerId, 
        vehiclePlateId: vehicleId,
        pricePaid: plateData.price,
        transactionDate: new Date().toISOString().split('T')[0]
      })

      if(!transactionResponse){
        throw new Error("Failed to create transaction")
      }



      toast.success('Registration plate purchased successfully');
      navigate('/my-plates/' + customerId);
    } catch (error) {
      toast.error(`Purchase failed: ${error.message || 'Please try again'}`);
      
      // Attempt rollback if balance was updated but plate wasn't
      if (balanceData?.balanceId) {
        await updateBalance(balanceData.balanceId, {
          amount: balanceData.amount,
        }).catch(() => {
          console.error('Rollback failed');
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [balanceData, plateData, customerId, vehicleId, isProcessing]);

  useEffect(() => {
    fetchPlate();
    fetchBalance();
  }, [fetchPlate, fetchBalance]);

  return (
    <div className="container mt-4">
      <div className="card">
    <div className="card-header position-relative"> {/* Needed for absolute positioning */}
      <button className="btn btn-warning position-absolute start-0 ms-3" onClick={() =>navigate(-1)}>Go Back</button>
      <h3 className="text-center mb-0">Buy Plate</h3> {/* Center the title */}
    </div>
      <div className="card my-3">
        <div className="card-body">
          <h2 className="card-title">{plateData?.plateNumber}</h2>
          <p className="card-text">
            Price: £{plateData?.price?.toFixed(2)}
          </p>
          <p className="card-text">
            Current Balance: £{balanceData?.amount?.toFixed(2)}
          </p>
          
          <div className="d-grid gap-2">
            <button 
              className="btn btn-primary"
              onClick={handlePurchase}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Use Balance'}
            </button>
            
            <div className="mt-3 text-muted">
              <p>Google Pay coming soon...</p>
              <p>Apple Pay coming soon...</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BuyPlatePage;