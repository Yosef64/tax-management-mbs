
import {Wallet } from "lucide-react";

interface UserBalanceProps {
  balance: number;
}

export default function UserBalance({ balance }: UserBalanceProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Current Balance</h2>
          <p
            style={{ color: "#6a9567" }}
            className="text-3xl font-bold text-gray-900 mt-2"
          >
            ${balance.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-full">
          <Wallet className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
