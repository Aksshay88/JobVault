// src/app/components/ViewEmployees.tsx

"use client"; // For client-side rendering in Next.js

import React, { useState, useEffect } from "react";

const ViewEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]); // State to store employee data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Define styles with proper CSS units and TypeScript compatibility
  const styles = {
    container: {
      maxWidth: "1200px", // Ensure CSS unit is correct
      margin: "0 auto",
      padding: "20px",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "20px",
      textAlign: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#f4f4f4",
      borderBottom: "2px solid #ddd",
      padding: "10px",
      textAlign: "left",
    },
    tableCell: {
      borderBottom: "1px solid #ddd",
      padding: "10px",
    },
    error: {
      color: "red",
      textAlign: "center",
    },
    loading: {
      textAlign: "center",
    },
  };

  // Fetch employees from the backend API
  useEffect(() => {
    fetch("/api/employees") // Adjust this endpoint if needed
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data); // Set employee data to state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employee List</h1>

      {/* Display loading state */}
      {loading && <p style={styles.loading}>Loading employees...</p>}

      {/* Display error state */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Display employee table */}
      {employees.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Employee ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Phone</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td style={styles.tableCell}>{employee.employeeId}</td>
                <td style={styles.tableCell}>{employee.name}</td>
                <td style={styles.tableCell}>{employee.email}</td>
                <td style={styles.tableCell}>{employee.phone}</td>
                <td style={styles.tableCell}>{employee.department}</td>
                <td style={styles.tableCell}>{employee.role}</td>
                <td style={styles.tableCell}>
                  {new Date(employee.dateOfJoining).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p style={styles.loading}>No employees found.</p>
      )}
    </div>
  );
};

export default ViewEmployees;
