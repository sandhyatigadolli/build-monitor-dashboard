import React, { useEffect, useState } from "react";
import { getBuilds } from "../services/api";

function BuildList({ darkMode }) {

  const [builds, setBuilds] = useState([]);

  useEffect(() => {

    const fetchData = () => {
      getBuilds()
        .then(res => setBuilds(res.data))
        .catch(err => console.error(err));
    };

    fetchData();

    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div style={{
      background: darkMode ? "#1e293b" : "#ffffff",
      color: darkMode ? "#e5e7eb" : "#111827",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      height: "90%",
      overflowY: "auto"
    }}>
      
      <h3>Build List</h3>

      {builds.map((b) => {

        let color =
          b.conclusion === "success"
            ? "#22c55e"
            : b.conclusion === "failure"
            ? "#ef4444"
            : "#facc15";

        return (
          <div key={b.id} style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "8px",
            background: darkMode ? "#0f172a" : "#f9f9f9",
            color: darkMode ? "#e5e7eb" : "#111827"
          }}>
            <p><b>Name:</b> {b.name}</p>
            <p><b>Status:</b> {b.status}</p>
            <p>
              <b>Result:</b>{" "}
              <span style={{ color }}>{b.conclusion}</span>
            </p>
            <p><b>Duration:</b> {b.duration}</p>
          </div>
        );
      })}

    </div>
  );
}

export default BuildList;