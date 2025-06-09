import React from 'react';
import './App.css';
//import banner from './assets/loan-banner.png'; // make sure you placed your image here

function App() {
  const handleLoanClick = (type) => {
    alert(`You selected: ${type} Loan`);
    // In production: replace this with navigation or state logic
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Loan Pre-Approval Checker</h1>
      </header>

      <div className="container">
        <h2>Check Your Pre-Approval</h2>
        <p>Select a loan type to begin:</p>
        <div className="button-group">
          <button onClick={() => handleLoanClick("Home")}>Home Loan</button>
          <button onClick={() => handleLoanClick("Auto")}>Auto Loan</button>
          <button onClick={() => handleLoanClick("School")}>School Loan</button>
        </div>
      </div>
    </div>
  );
}

export default App;
