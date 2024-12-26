import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { registerUser } from "../../utils/auth";
import { User as UserType } from "../../types/auth";
import { setCurrentUser, updateUserStat } from "@/utils/storage";
import { UserStat } from "@/types";

export default function RegisterForm() {
  const [userData, setUserData] = useState<UserType>({
    email: "",
    password: "",
    name: "",
    createdAt: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sanitizedEmail = userData.email.trim().toLowerCase();
      const useStat: UserStat = {
        totalSalary: 0,
        totalAllowance: 0,
        tax: {
          taxRate: 0,
          taxableIncome: 0,
          totalTax: 0,
        },
        overtime: {
          hours: 0,
          rate: 0,
        },
        nightShift: {
          hours: 0,
          rate: 0,
        },
      };
      await registerUser(userData);

      await updateUserStat(sanitizedEmail, useStat);
      setCurrentUser({ name: userData.name, email: sanitizedEmail });
      window.location.href = "/login";
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ borderRadius: 10 }}
      className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <User className="absolute top-4 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                placeholder="Full name"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="relative">
              <Mail className="absolute top-4 left-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                placeholder="Email address"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-4 left-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-[#6a9567] rounded-lg focus:ring-2  focus:ring-[#6a9567]!important focus:border-transparent mb-3"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{ backgroundColor: isLoading ? "#A7B2A7FF" : "#6a9567" }}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {!isLoading ? "Create Account" : "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
