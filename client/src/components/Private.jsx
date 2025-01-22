import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
  const [isAuthorized, setisAuthorized] = useState(true);
  const [waiting,setWaiting]=useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:8000/verify-auth', { withCredentials: true })
      .then((res) => {
        setisAuthorized(res.data.credentials);
        setWaiting(false)
      })
      .catch((err) => {
        setisAuthorized(false);
        setWaiting(false)
      });
  }, []);
  
  return !waiting && isAuthorized ? <Outlet /> : <Navigate to='/login' />;
  
};

export default Private;
