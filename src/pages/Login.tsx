import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { getCurrentUser } from "@/utils/storage";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const userData = getCurrentUser();
  if (userData.email) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className="text-center">
        <div>
          <button
            onClick={() => setIsLogin((isLogin) => !isLogin)}
            className="text-black hover:text-blue-900"
          >
            {isLogin
              ? "Don't have an account? Register here"
              : "Already have an account? Login here"}
          </button>
        </div>
      </div>
    </div>
  );
}
