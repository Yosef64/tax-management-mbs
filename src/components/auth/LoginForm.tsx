import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { loginUser } from "../../utils/auth";
import { LoginCredentials } from "../../types/auth";
import { setCurrentUser } from "@/utils/storage";

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(credentials);
      console.log(user);
      if (!user) {
        setError("Invalid email or password");
        return;
      }
      if (user.password !== credentials.password) {
        setError("Invalid password");
        return;
      }
      setCurrentUser({ name: user.name, email: user.email });
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ borderRadius: 10 }}
      className=" flex w-fullitems-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 "
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <User
                className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full mb-3 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative ">
              <Lock
                className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{ backgroundColor: loading?"#A8B1A7FF": "#6a9567" }}

              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
