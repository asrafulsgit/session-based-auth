// frontend/src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/dashboard', { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setData('Unauthorized');
      });
  }, []);

  return <div>{data}</div>;
};

export default Dashboard;
