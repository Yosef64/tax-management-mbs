import TaxInfo from "./TaxInfo";
import OvertimeAllowance from "./OvertimeAllowance";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import UserBalance from "../Dashboard/UserBalance";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserStat } from "@/utils/storage";
import { Navigate } from "react-router-dom";
import { UserStat } from "@/types";

export default function EmployeeDashboard() {
  // const { balance, transactions, taxInfo, overtime } = useEmployeeData();
  const [userStat, setUserStat] = useState<UserStat | null>(null);
  const user = getCurrentUser();
  if (!user.email) return <Navigate to="/login" />;

  useEffect(() => {
    const getUserData = async () => {
      const user = getCurrentUser();
      const userData = await getUserStat(user.email);
      setUserStat(userData);
    };
    getUserData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserBalance balance={userStat?.totalSalary ?? 0} />
        <TaxInfo
          {...(userStat?.tax ?? {
            taxRate: 0,
            taxableIncome: 0,
            totalTax: 0,
          })}
        />
      </div>
      <OvertimeAllowance
        overtimeHours={userStat?.overtime?.hours ?? 0}
        overtimeRate={userStat?.overtime?.rate ?? 0}
        nightShiftHours={userStat?.nightShift?.hours ?? 0}
        nightShiftRate={userStat?.nightShift?.rate ?? 0}
        totalAllowance={
          (userStat?.overtime?.hours ?? 0) * (userStat?.overtime?.rate ?? 0) +
          (userStat?.nightShift?.hours ?? 0) * (userStat?.nightShift?.rate ?? 0)
        }
      />{" "}
    </div>
  );
}
