import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getSummary } from "../services/api";

const cardStyle = (darkMode) => ({
  width: "150px",
  height: "100px",
background: darkMode ? "#1f2937" : "#ffffff",
border: darkMode ? "1px solid #374151" : "none",
  color: darkMode ? "#e5e7eb" : "#111827",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: darkMode
  ? "0 6px 16px rgba(0,0,0,0.6)"
  : "0 2px 8px rgba(0,0,0,0.1)",
transform: "scale(1)",
transition: "0.3s"
});



function Summary({ darkMode }) {

  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = () => {
      getSummary()
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.error(err));
    };

    fetchData();

    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);

  }, []);

  if (!data) return <p>Loading...</p>;
  const successRate =
  data.total === 0
    ? 0
    : Math.round((data.success / data.total) * 100);


return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px"
  }}>

    
    <div style={cardStyle(darkMode)}>
      <p>Total</p>
      <h2>{data.total}</h2>
    </div>

    <div style={cardStyle(darkMode)}>
      <p>Success</p>
      <h2>{data.success}</h2>
    </div>

    <div style={cardStyle(darkMode)}>
      <p>Failed</p>
      <h2>{data.failed}</h2>
    </div>

    <div style={cardStyle(darkMode)}>
      <p>In Progress</p>
      <h2>{data.inProgress}</h2>
    </div>

<div style={{ marginTop: "20px", textAlign: "center" }}>
  <h3>Success Rate: {successRate}%</h3>
</div>
    
    
  </div>
);
}

export default Summary;