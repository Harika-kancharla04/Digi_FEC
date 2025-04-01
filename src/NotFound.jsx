import React from "react";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <a href="/home" style={styles.link}>Go back home</a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f8f8",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft:"20rem"
  },
  heading: {
    fontSize: "72px",
    color: "#ff4d4d",
    marginBottom: "10px",
  },
  text: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default NotFound;
