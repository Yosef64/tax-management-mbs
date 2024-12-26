import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import UserBalance from "../components/Dashboard/UserBalance";
import TransactionHistory from "../components/dashboard/TransactionHistory";
import { Transaction } from "../types";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      const transactionsRef = collection(db, "transactions");
      const q = query(transactionsRef, where("userId", "==", currentUser.uid));

      try {
        const querySnapshot = await getDocs(q);
        const transactionData: Transaction[] = [];
        let totalBalance = 0;

        querySnapshot.forEach((doc) => {
          const transaction = { id: doc.id, ...doc.data() } as Transaction;
          transactionData.push(transaction);
          totalBalance +=
            transaction.type === "credit"
              ? transaction.amount
              : -transaction.amount;
        });

        setTransactions(
          transactionData.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        setBalance(totalBalance);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Dashboard</h1>
      <div className="space-y-6">
        <UserBalance balance={balance} />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
}
