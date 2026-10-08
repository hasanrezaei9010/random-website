import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const authorize = async () => {
      if (!token || !user) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_URL}/api/task/authorization`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authorize();
  }, []);


if (isLoading) {
   return <div style={{backgroundColor:"lightgreen",textAlign:"center",height:"100%",width:"window.innerWidth"}}>
    authorizing token</div>;
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/Login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
