"use client";
import { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import styles from "./page.module.css";

function Home() {
  const [designData, setDesignData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/");
        console.log("responseData", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Expected data to be an array");
        }
        console.log("DesignSystem", data);
        setDesignData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>Hai World</div>
      <Container>
        <Grid container spacing={3}>
          {designData?.map((employee, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={3}
                className={styles.employeeDetails}
                sx={{ padding: 2 }}
              >
                <Typography variant="h6">
                  {employee.FirstName} {employee.LastName}
                </Typography>
                <Typography variant="body2">Email: {employee.Email}</Typography>
                <Typography variant="body2">
                  Phone: {employee.PhoneNumber}
                </Typography>
                <Typography variant="body2">
                  Job Title: {employee.JobTitle}
                </Typography>
                <Typography variant="body2">
                  Salary: ${employee.Salary.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Department ID: {employee.DepartmentID}
                </Typography>
                <Typography variant="body2">
                  Hire Date: {new Date(employee.HireDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Status: {employee.IsActive ? "Active" : "Inactive"}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
