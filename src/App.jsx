import React, { useState } from 'react';
import './App.css';
import carIcon from './assets/car.svg';
import houseIcon from './assets/house.svg';
import personalIcon from './assets/personal.svg';
import schoolIcon from './assets/school.svg';
import dollarSignImage from './assets/dollar-sign.png'; // Import the image

function SignIn({ onSignIn, onSwitchToCreate, onGoToVillageBank }) {
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
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 12, width: '100%', padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20, width: '100%', padding: 8 }}
        />
        <button onClick={() => onSignIn(email, password)} style={{ width: '100%' }}>
          Sign In
        </button>
        <p style={{ marginTop: 16, color: '#003366' }}>
          Don't have an account?{' '}
          <a href="#" onClick={onSwitchToCreate} style={{ color: '#003366', fontWeight: 600 }}>
            Sign Up
          </a>
        </p>
        {/* Placeholder button to navigate to Village Bank */}
        <button
          onClick={onGoToVillageBank}
          style={{
            marginTop: 20,
            backgroundColor: '#003366',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            width: '100%',
          }}
        >
          Go to Village Bank
        </button>
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

function VillageBankPage({ onBack }) {
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

  const [review, setReview] = React.useState(false); // Track if the review section is displayed
  const [result, setResult] = React.useState(null); // Track loan approval result

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setReview(true); // Show the review section
  };

  const handleApply = () => {
    const isApproved = Math.random() < 0.5; // 50/50 chance of approval
    setResult(isApproved ? 'approved' : 'rejected');
  };

  const handleReset = () => {
    setResult(null);
    setReview(false);
    setForm({
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
  };

  return (
    <div
      className="content"
      style={{
        backgroundColor: '#121212',
        backgroundImage: `url(${dollarSignImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        color: '#fff',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        flexDirection: 'column', // Stack form and review section vertically
      }}
    >
      {!review && !result && (
        <div
          className="form-container"
          style={{
            backgroundColor: 'rgba(44, 44, 44, 0.8)',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            width: '90%',
            maxWidth: '700px',
            marginBottom: '20px', // Add spacing between form and review section
          }}
        >
          <form onSubmit={handleContinue} className="form">
            <input name="age" type="number" min="18" max="100" placeholder="Age" value={form.age} onChange={handleChange} required className="wide-input" />
            <input name="income" type="number" min="0" placeholder="Annual Income ($)" value={form.income} onChange={handleChange} required className="wide-input" />
            <input name="zip" type="text" placeholder="ZIP Code" value={form.zip} onChange={handleChange} required className="wide-input" />
            <input name="familySize" type="number" min="1" placeholder="Family Size" value={form.familySize} onChange={handleChange} required className="wide-input" />
            <select name="education" value={form.education} onChange={handleChange} required className="wide-input">
              <option value="" disabled>Education Level</option>
              <option value="No High School">No High School</option>
              <option value="High School Diploma or GED">High School Diploma or GED</option>
              <option value="Some College">Some College</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate or Professional">Doctorate or Professional</option>
              <option value="Other">Other</option>
            </select>
            <input name="mortgageAmount" type="number" min="0" placeholder="Mortgage Amount ($)" value={form.mortgageAmount} onChange={handleChange} required className="wide-input" />
            <input name="personalLoans" type="number" min="0" placeholder="Personal Loans (count)" value={form.personalLoans} onChange={handleChange} required className="wide-input" />
            <input name="securityAccounts" type="number" min="0" placeholder="Security Accounts (count)" value={form.securityAccounts} onChange={handleChange} required className="wide-input" />
            <input name="creditAccounts" type="number" min="0" placeholder="Credit Accounts (count)" value={form.creditAccounts} onChange={handleChange} required className="wide-input" />
            <input name="ccUsage" type="number" min="0" max="100" placeholder="Credit Card Usage Avg (%)" value={form.ccUsage} onChange={handleChange} required className="wide-input" />
            <button type="submit" className="submit-button" style={{ backgroundColor: '#FF6600', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
              Continue
            </button>
            <button type="button" onClick={onBack} className="submit-button" style={{ marginTop: '12px', backgroundColor: '#d3d3d3', color: '#000', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {review && !result && (
        <div
          className="review-container"
          style={{
            backgroundColor: 'rgba(44, 44, 44, 0.8)',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            width: '90%',
            maxWidth: '700px',
          }}
        >
          <h2 style={{ color: '#FF6600', marginBottom: '20px' }}>Review Information</h2>
          <p>Age: {form.age}</p>
          <p>Annual Income: ${form.income}</p>
          <p>ZIP Code: {form.zip}</p>
          <p>Family Size: {form.familySize}</p>
          <p>Education Level: {form.education}</p>
          <p>Mortgage Amount: ${form.mortgageAmount}</p>
          <p>Personal Loans: {form.personalLoans}</p>
          <p>Security Accounts: {form.securityAccounts}</p>
          <p>Credit Accounts: {form.creditAccounts}</p>
          <p>Credit Card Usage Avg: {form.ccUsage}%</p>
          <textarea
            readOnly
            placeholder="Disclosure: Village Bank offers competitive loan rates tailored to your financial needs. By applying for a loan, you agree to our terms and conditions, including repayment schedules and interest rates. Ensure all provided information is accurate to avoid delays in processing. Village Bank reserves the right to verify your financial details and credit history. For further assistance, contact our support team."
            style={{
              width: '100%',
              height: '100px',
              marginTop: '20px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #66ccff',
              backgroundColor: '#1e1e1e',
              color: '#fff',
            }}
          />
          <button type="button" onClick={handleApply} className="submit-button" style={{ marginTop: '20px', backgroundColor: '#FF6600', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
            Apply
          </button>
          <button type="button" onClick={() => setReview(false)} className="submit-button" style={{ marginTop: '12px', backgroundColor: '#d3d3d3', color: '#000', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
            Edit Information
          </button>
        </div>
      )}

      {result === 'approved' && (
        <div
          className="result-container"
          style={{
            backgroundColor: '#121212',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            width: '90%',
            maxWidth: '700px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: '#66ccff', fontSize: '2.5rem' }}>🎉 Congratulations!</h1>
          <p style={{ color: '#fff', fontSize: '1.5rem', marginTop: '20px' }}>
            You have been approved for a loan amount of ${form.mortgageAmount}!
          </p>
          <button type="button" onClick={handleReset} className="submit-button" style={{ marginTop: '20px', backgroundColor: '#FF6600', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
            Start Fresh
          </button>
        </div>
      )}

      {result === 'rejected' && (
        <div
          className="result-container"
          style={{
            backgroundColor: '#121212',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            width: '90%',
            maxWidth: '700px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: '#FF6600', fontSize: '2.5rem' }}>😞 Sorry!</h1>
          <p style={{ color: '#fff', fontSize: '1.5rem', marginTop: '20px' }}>
            We can't approve your loan at this time.
          </p>
          <button type="button" onClick={handleReset} className="submit-button" style={{ marginTop: '20px', backgroundColor: '#FF6600', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
            Start Fresh
          </button>
        </div>
      )}
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
      {/* Conditionally render the ClearPath branding */}
      {page !== 'village-bank' && (
        <header className="header">
          <h1>ClearPath</h1>
        </header>
      )}
      {page === 'signin' && (
        <SignIn onSignIn={handleSignIn} onSwitchToCreate={() => setPage('create')} onGoToVillageBank={() => setPage('village-bank')} />
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
                  <img src={houseIcon} alt="Home Loan" style={{ width: '60%', height: '60%' }} />
                </div>
                <div className="loan-label">Home Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => alert('You selected: Auto Loan')}>
                  <img src={carIcon} alt="Auto Loan" style={{ width: '60%', height: '60%' }} />
                </div>
                <div className="loan-label">Auto Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => alert('You selected: School Loan')}>
                  <img src={schoolIcon} alt="School Loan" style={{ width: '60%', height: '60%' }} />
                </div>
                <div className="loan-label">School Loan</div>
              </div>
              <div className="loan-option">
                <div className="loan-card" onClick={() => alert('You selected: Personal Loan')}>
                  <img src={personalIcon} alt="Personal Loan" style={{ width: '48%', height: '48%' }} />
                </div>
                <div className="loan-label">Personal Loan</div>
              </div>
            </div>
            <button
              onClick={() => setPage('village-bank')}
              style={{ marginTop: 20, backgroundColor: '#003366', color: '#fff', padding: '10px 20px', borderRadius: '8px' }}
            >
              Go to Village Bank
            </button>
          </div>
        </div>
      )}
      {page === 'home-loan' && <HomeLoanForm onBack={() => setPage('main')} />}
      {page === 'village-bank' && <VillageBankPage onBack={() => setPage('main')} />}
    </div>
  );
}

export default App;
