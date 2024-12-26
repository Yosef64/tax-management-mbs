import { Landmark } from "lucide-react";
import Activities from "./Activities";

import { Toaster } from "@/components/ui/toaster";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeDashboard from "../Stats/Home";
import AddSalary, { AddOvertimeAllowance } from "./Addsalary";
import { getCurrentUser } from "@/utils/storage";
import { Navigate } from "react-router-dom";
import { LogoutDialog } from "./ShadcnComps";

export default function AdminDashboard() {
  const userData = getCurrentUser();
  if (!userData.email) return <Navigate to="/login" />;

  return (
    <div className="space-y-6">
    
      <nav className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Landmark className="text-blue-600" size={24} />
              <span className="ml-2 text-xl font-semibold">Tax Management</span>
            </div>
            <div className="flex items-center">
              <span
                style={{ fontFamily: "'Sora',san-serif" }}
                className="mr-4 text-gray-600"
              >
                Welcome,{userData.name}{" "}
              </span>
              <LogoutDialog />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Tabs defaultValue="home" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-3">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="o&a">Overtime & Allowance</TabsTrigger>
                <TabsTrigger value="activity">Activities</TabsTrigger>
                <TabsTrigger value="add">Add salary</TabsTrigger>
              </TabsList>
              <TabsContent value="o&a">
                <AddOvertimeAllowance />
              </TabsContent>
              <TabsContent value="activity">
                <Activities />
              </TabsContent>
              <TabsContent value="add">
                <AddSalary />
              </TabsContent>
              <TabsContent value="home">
                <EmployeeDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Toaster />
      </main>
    </div>
  );
}

