import React, { useEffect } from "react";
import { TaxInfo as TaxInfoType } from "../../types";
import { Button } from "../ui/button";
import { EditTax } from "../Dashboard/ShadcnComps";
import { calculateTotalIncome, getCurrentUser } from "@/utils/storage";

export default function TaxInfo({ taxRate, taxableIncome }: TaxInfoType) {
  const [totalIncome, setTotalIncome] = React.useState(0);
  const totalTax = (totalIncome * taxRate) / 100;
  const userData = getCurrentUser();
  useEffect(() => {
    calculateTotalIncome(userData.email).then((res) => setTotalIncome(res));
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Tax Information
        </h2>
        <EditTax />
      </div>

      <div className="space-y-3 font-sora text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Tax Rate:</span>
          <span className="font-medium">{taxRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxable Income:</span>
          <span className="font-medium">${totalIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="text-gray-600 font-medium text-base">
            Total Tax:
          </span>
          <span className="font-bold">${totalTax.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
