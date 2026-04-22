import React, { useState } from "react";
import Summary from "./components/Summary";
import BuildList from "./components/BuildList";
import BuildChart from "./components/BuildChart";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  return (
  <div style={{
  display: "flex",
  minHeight: "100vh",
  background: darkMode ? "#0b1220" : "#f5f7fb",
  color: darkMode ? "#e5e7eb" : "#111827"  
}}>
      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: "220px",
          padding: "20px",
      background: darkMode ? "#111827"  : "#ffffff",
          borderRight: darkMode ? "1px solid #1f2937" : "1px solid #ddd",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}> Monitor</h2>

        {/* Dashboard */}
        <div
          onClick={() => setActivePage("dashboard")}
          style={{
            marginBottom: "15px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            background:
              activePage === "dashboard"
                ? darkMode
                  ? "#334155"
                  : "#e0e7ff"
                : "transparent",
            fontWeight: activePage === "dashboard" ? "bold" : "normal",
          }}
        >
           Dashboard
        </div>

        {/* Builds */}
        <div
          onClick={() => setActivePage("builds")}
          style={{
            marginBottom: "15px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            background:
              activePage === "builds"
                ? darkMode
                  ? "#334155"
                  : "#e0e7ff"
                : "transparent",
            fontWeight: activePage === "builds" ? "bold" : "normal",
          }}
        >
           Builds
        </div>


  
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, padding: "30px" }}>
        
        {/* HEADER */}
        <p style={{ fontSize: "12px", marginTop: "5px" }}>
  Last updated: {new Date().toLocaleTimeString()}
</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>
              {activePage === "dashboard" && "Dashboard"}
              {activePage === "builds" && "Builds"}

            </h2>

            <p style={{ color: darkMode ? "#cbd5f5" : "#555" }}>
              {activePage === "dashboard" && "Monitor your CI/CD pipeline"}
              {activePage === "builds" && "View all build logs"}
            </p>
          </div>

          <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: darkMode ? "#1f2937" : "#e2e8f0",
    color: darkMode ? "#fff" : "#000"
  }}
>
            {darkMode ? "Lightmode" : "Darkmode"}
          </button>
        </div>

        {/* ================= PAGE CONTENT ================= */}

        {activePage === "dashboard" && (
  <>
    <Summary darkMode={darkMode} />

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <BuildChart darkMode={darkMode} />
    </div>
  </>
)}

        {activePage === "builds" && (
          <BuildList darkMode={darkMode} />
        )}

        
      </div>
    </div>
  );
}

export default App;