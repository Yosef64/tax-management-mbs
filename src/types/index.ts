export interface Employee {
  id: string;
  userId: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  taxRate: number;
  taxableIncome: number;
  totalTax: number;
  overtimeHours: number;
  overtimeRate: number;
  nightShiftHours: number;
  nightShiftRate: number;
  totalAllowance: number;
}

export interface TaxInfo {
  taxRate: number;
  taxableIncome: number;
  totalTax: number;
  totalSalary?: number;
}
export interface SessionType {
  email:string,
  name:string
}

export interface UserActivity {
  id: string; 
  type: "overtime" | "allowance" | "salary";
  period: string; 
  rate?: number;
  salary: number; 
  hours?: number; 
  createdAt: string; 
  tax?:number
}
export interface UserStat{
  totalSalary:number;
  totalAllowance:number;
  tax:{
    taxRate:number;
    taxableIncome:number;
    totalTax:number;
  },
  overtime:{
    hours:number;
    rate:number;
  },
  nightShift:{
    hours:number;
    rate:number;
  },
}
