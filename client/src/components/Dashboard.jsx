// frontend/src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const cTime = new Date().getTime()
  const eTime = ((cTime+5000)-cTime);

  useEffect(()=>{
    setTimeout(() => {
      navigate('/login',replace)
    }, eTime);
  },[])

  return <div>your authorized</div>;
};

export default Dashboard;
