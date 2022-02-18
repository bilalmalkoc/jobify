import { useEffect } from 'react';

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const res = await fetch('/api/v1');
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h1>Dashboard</h1>;
};

export default Dashboard;
