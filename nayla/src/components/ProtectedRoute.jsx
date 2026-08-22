import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authtoken");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const authorize = async () => {
      if (!token) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:5000/api/task/authorization",
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
          localStorage.removeItem("authtoken");
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error,"athorizing login token failed");
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
