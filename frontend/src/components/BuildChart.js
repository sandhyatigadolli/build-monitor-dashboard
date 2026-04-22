/*import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { getSummary } from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function BuildChart({ darkMode }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    getSummary()
      .then(res => {
        const d = res.data;

        setData([
          { name: "Success", value: d.success },
          { name: "Failed", value: d.failed },
          { name: "In Progress", value: d.inProgress }
        ]);
      })
      .catch(err => console.error(err));
  }, []);

  const COLORS = ["#28a745", "#dc3545", "#ffc107"];

  return (
  <div style={{
    textAlign: "center",
    marginTop: "20px",
    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
    padding: "20px",
    borderRadius: "10px"
  }}>
      <h2>Build Status Chart</h2>

      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default BuildChart; */


import React, { useEffect, useState } from "react";
import { getSummary } from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function BuildChart({ darkMode }) {

  const [data, setData] = useState(null);

  useEffect(() => {
    getSummary()
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading chart...</p>;

  const chartData = [
    { name: "Success", value: data.success },
    { name: "Failed", value: data.failed },
    { name: "In Progress", value: data.inProgress }
  ];

  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  return (
   <div style={{
  background: darkMode ? "#1f2937" : "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  width: "420px",
  border: darkMode ? "1px solid #374151" : "none",
  boxShadow: darkMode
    ? "0 8px 20px rgba(0,0,0,0.6)"
    : "0 2px 8px rgba(0,0,0,0.1)"
}}>
      <h3 style={{ textAlign: "center" }}>Build Status</h3>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default BuildChart;