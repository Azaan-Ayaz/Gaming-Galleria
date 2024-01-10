import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false)
  // const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async() => {
      const res = await axios.get("http://localhost:8080/admin-auth",          // hit API which was created [user-auth]
      {
        headers: {
          "Authorization": auth?.token
        }
      }) // http://localhost:8080/
      if (res.data.ok){
        setOk(true)
      }
      else{
        setOk(false)
      }
    }
    if (auth?.token) authCheck()  
  }, [auth?.token]);

  // Show loading spinner while checking authentication
  return ok ? <Outlet /> : <Spinner path= "" />;
}
