import React from "react";
// import { OvertimeAllowance as OvertimeAllowanceType } from '../../types';
import { Clock, Moon } from "lucide-react";

export default function OvertimeAllowance({
  overtimeHours,
  overtimeRate,
  nightShiftHours,
  nightShiftRate,
  totalAllowance,
}: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Overtime & Allowances
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-7 h-7 text-blue-500" />
            <span className="text-gray-600 font-medium font-sora text-base">Overtime</span>
          </div>
          <div className="pl-7 space-y-2 font-sora">
            <div className="flex justify-between">
              <span>Hours:</span>
              <span className="font-semibold font-sora text-base">{overtimeHours}hr</span>
            </div>
            <div className="flex justify-between ">
              <span>Rate:</span>
              <span className="font-semibold text-base ">${overtimeRate}/hr</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Moon className="w-7 h-7 text-blue-500" />
            <span className="text-gray-600 font-medium font-sora text-base">Night Shift</span>
          </div>
          <div className="pl-7 space-y-2 font-sora">
            <div className="flex justify-between">
              <span>Hours:</span>
              <span className="font-medium">{nightShiftHours}h</span>
            </div>
            <div className="flex justify-between">
              <span>Rate:</span>
              <span className="font-medium">${nightShiftRate}/hr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-900">Total Allowance:</span>
          <span className="font-bold text-blue-600">
            ${totalAllowance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
