import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({title}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/user');
  }, [navigate])

  return <div></div>;
};

export default Dashboard;
