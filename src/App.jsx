import React, { useState } from 'react';
import './App.css';
import carIcon from './assets/car.svg';
import houseIcon from './assets/house.svg';
import personalIcon from './assets/personal.svg';
import schoolIcon from './assets/school.svg';
import HomeLoanForm from './HomeLoanForm';
import AutoLoanForm from './AutoLoanForm';
import SchoolLoanForm from './SchoolLoanForm';
import PersonalLoanForm from './PersonalLoanForm';

function SignIn({ onSignIn, onSwitchToCreate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="content">
      <div className="card signin-card">
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginBottom: 12, width: '100%', padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: 20, width: '100%', padding: 8 }}
        />
        <button onClick={() => onSignIn(email, password)} style={{ width: '100%' }}>Sign In</button>
        <p style={{ marginTop: 16, color: '#003366' }}>
          Don't have an account?{' '}
          <a href="#" onClick={onSwitchToCreate} style={{ color: '#003366', fontWeight: 600 }}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}

function CreateAccount({ onCreate, onSwitchToSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  return (
    <div className="content">
      <div className="card signin-card">
        <h2>Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginBottom: 12, width: '100%', padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: 12, width: '100%', padding: 8 }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          style={{ marginBottom: 20, width: '100%', padding: 8 }}
        />
        <button onClick={() => onCreate(email, password, confirm)} style={{ width: '100%' }}>Create Account</button>
        <p style={{ marginTop: 16 }}>
          Already have an account?{' '}
          <a href="#" onClick={onSwitchToSignIn}>Sign In</a>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = React.useState('signin');

  const handleSignIn = (email, password) => {
    // Placeholder: Add authentication logic here
    setPage('main');
  };
  const handleCreate = (email, password, confirm) => {
    // Placeholder: Add account creation logic here
    if (password === confirm && password.length > 0) {
      setPage('main');
    } else {
      alert('Passwords do not match or are empty.');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 style={{cursor: 'pointer'}} onClick={() => setPage('main')}>ClearPath</h1>
      </header>
      {page === 'signin' && (
        <SignIn onSignIn={handleSignIn} onSwitchToCreate={() => setPage('create')} />
      )}
      {page === 'create' && (
        <CreateAccount onCreate={handleCreate} onSwitchToSignIn={() => setPage('signin')} />
      )}
      {page === 'main' && (
        <div className="content">
          <div className="card">
            <h2>Check Your Pre-Approval</h2>
            <p>Select a loan type to begin:</p>
            <div className="button-group loan-options">
              <div className="loan-option">
                <div className="loan-card" onClick={() => setPage('home-loan')}>
                  <img src={houseIcon} alt="Home Loan" style={{width: '60%', height: '60%'}} />
                </div>
                <div className="loan-label">Home Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => setPage('auto-loan')}>
                  <img src={carIcon} alt="Auto Loan" style={{width: '60%', height: '60%'}} />
                </div>
                <div className="loan-label">Auto Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => setPage('school-loan')}>
                  <img src={schoolIcon} alt="School Loan" style={{width: '60%', height: '60%'}} />
                </div>
                <div className="loan-label">School Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => setPage('personal-loan')}>
                  <img src={personalIcon} alt="Personal Loan" style={{width: '48%', height: '48%'}} />
                </div>
                <div className="loan-label">Personal Loan</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 'home-loan' && (
        <HomeLoanForm onBack={() => setPage('main')} />
      )}
      {page === 'auto-loan' && (
        <AutoLoanForm onBack={() => setPage('main')} />
      )}
      {page === 'school-loan' && (
        <SchoolLoanForm onBack={() => setPage('main')} />
      )}
      {page === 'personal-loan' && (
        <PersonalLoanForm onBack={() => setPage('main')} />
      )}
    </div>
  );
}

export default App;
