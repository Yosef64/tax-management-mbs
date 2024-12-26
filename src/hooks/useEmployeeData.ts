import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Transaction, TaxInfo, OvertimeAllowance } from '../types';

export function useEmployeeData() {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [taxInfo, setTaxInfo] = useState<TaxInfo>({
    taxRate: 0,
    taxableIncome: 0,
    totalTax: 0
  });
  const [overtime, setOvertime] = useState<OvertimeAllowance>({
    overtimeHours: 0,
    overtimeRate: 0,
    nightShiftHours: 0,
    nightShiftRate: 0,
    totalAllowance: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      // Fetch transactions
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef, 
        where('userId', '==', currentUser.id)
      );
      
      // Fetch employee details including tax and overtime
      const employeesRef = collection(db, 'employees');
      const employeeQuery = query(
        employeesRef, 
        where('userId', '==', currentUser.id)
      );

      try {
        const [transactionsSnap, employeeSnap] = await Promise.all([
          getDocs(transactionsQuery),
          getDocs(employeeQuery)
        ]);

        // Process transactions
        const transactionData: Transaction[] = [];
        let totalBalance = 0;

        transactionsSnap.forEach((doc) => {
          const transaction = { id: doc.id, ...doc.data() } as Transaction;
          transactionData.push(transaction);
          totalBalance += transaction.type === 'credit' 
            ? transaction.amount 
            : -transaction.amount;
        });

        setTransactions(transactionData.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
        setBalance(totalBalance);

        // Process employee data
        if (!employeeSnap.empty) {
          const employeeData = employeeSnap.docs[0].data();
          setTaxInfo({
            taxRate: employeeData.taxRate || 0,
            taxableIncome: employeeData.taxableIncome || 0,
            totalTax: employeeData.totalTax || 0
          });
          setOvertime({
            overtimeHours: employeeData.overtimeHours || 0,
            overtimeRate: employeeData.overtimeRate || 0,
            nightShiftHours: employeeData.nightShiftHours || 0,
            nightShiftRate: employeeData.nightShiftRate || 0,
            totalAllowance: employeeData.totalAllowance || 0
          });
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  return { balance, transactions, taxInfo, overtime };
}