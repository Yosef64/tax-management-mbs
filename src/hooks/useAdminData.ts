import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Employee, Transaction } from '../types';

export function useAdminData() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesSnap, transactionsSnap] = await Promise.all([
          getDocs(collection(db, 'employees')),
          getDocs(collection(db, 'transactions'))
        ]);

        setEmployees(
          employeesSnap.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
          } as Employee))
        );

        setTransactions(
          transactionsSnap.docs
            .map(doc => ({ 
              id: doc.id, 
              ...doc.data() 
            } as Transaction))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  return { employees, transactions };
}