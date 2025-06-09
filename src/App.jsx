import React, { useState } from 'react';
import './App.css';
import carIcon from './assets/car.svg';
import houseIcon from './assets/house.svg';
import personalIcon from './assets/personal.svg';
import schoolIcon from './assets/school.svg';

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

function HomeLoanForm({ onBack }) {
  const [form, setForm] = React.useState({
    age: '',
    income: '',
    zip: '',
    familySize: '',
    education: '',
    mortgageAmount: '',
    personalLoans: '',
    securityAccounts: '',
    creditAccounts: '',
    ccUsage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: handle form submission
    alert('Submitted!');
  };

  return (
    <div className="content">
      <div className="card signin-card" style={{maxWidth: 500}}>
        <h2>Step 2: Input Information</h2>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <input name="age" type="number" min="18" max="100" placeholder="Age" value={form.age} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="income" type="number" min="0" placeholder="Annual Income ($)" value={form.income} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="zip" type="text" placeholder="ZIP Code" value={form.zip} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="familySize" type="number" min="1" placeholder="Family Size" value={form.familySize} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <select name="education" value={form.education} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8, color: form.education ? '#111' : '#888'}}>
            <option value="" disabled style={{color: '#888'}}>Education Level</option>
            <option value="No High School" style={{color: '#111'}}>No High School</option>
            <option value="High School Diploma or GED" style={{color: '#111'}}>High School Diploma or GED</option>
            <option value="Some College" style={{color: '#111'}}>Some College</option>
            <option value="Associate Degree" style={{color: '#111'}}>Associate Degree</option>
            <option value="Bachelor's Degree" style={{color: '#111'}}>Bachelor's Degree</option>
            <option value="Master's Degree" style={{color: '#111'}}>Master's Degree</option>
            <option value="Doctorate or Professional" style={{color: '#111'}}>Doctorate or Professional</option>
            <option value="Other" style={{color: '#111'}}>Other</option>
          </select>
          <input name="mortgageAmount" type="number" min="0" placeholder="Mortgage Amount ($)" value={form.mortgageAmount} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="personalLoans" type="number" min="0" placeholder="Personal Loans (count)" value={form.personalLoans} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="securityAccounts" type="number" min="0" placeholder="Security Accounts (count)" value={form.securityAccounts} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="creditAccounts" type="number" min="0" placeholder="Credit Accounts (count)" value={form.creditAccounts} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="ccUsage" type="number" min="0" max="100" placeholder="Credit Card Usage Avg (%)" value={form.ccUsage} onChange={handleChange} required style={{marginBottom: 20, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <button type="submit" style={{width: '100%'}}>Submit</button>
        </form>
        <button onClick={onBack} style={{marginTop: 16, width: '100%', background: '#eee', color: '#003366'}}>Back</button>
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
        <h1>ClearPath</h1>
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
                <div className="loan-card" onClick={() => alert('You selected: Auto Loan')}>
                  <img src={carIcon} alt="Auto Loan" style={{width: '60%', height: '60%'}} />
                </div>
                <div className="loan-label">Auto Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => alert('You selected: School Loan')}>
                  <img src={schoolIcon} alt="School Loan" style={{width: '60%', height: '60%'}} />
                </div>
                <div className="loan-label">School Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => alert('You selected: Personal Loan')}>
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
    </div>
  );
}

export default App;
