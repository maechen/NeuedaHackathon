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
import ApprovalResult from './ApprovalResult';
import { auth, database } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

function SignIn({ onSignIn, onSwitchToCreate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSignIn(email);
    } catch (error) {
      setError('Failed to sign in: ' + error.message);
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="content">
      <div className="card signin-card">
        <h2>Sign In</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              fontSize: '1.05rem',
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 0,
              background: '#f3f4f6',
              border: '1.2px solid #cce7ff',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              fontSize: '1.05rem',
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 0,
              background: '#f3f4f6',
              border: '1.2px solid #cce7ff',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button type="submit" style={{ marginTop: 16, width: '100%' }}>Sign In</button>
        </form>
        <p style={{ marginTop: 16, color: '#003366' }}>
          Don't have an account?{' '}
          <button style={{ color: '#003366', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }} onClick={onSwitchToCreate}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

function CreateAccount({ onCreate, onSwitchToSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await set(ref(database, `users/${user.uid}`), {
        email: email,
        createdAt: new Date().toISOString()
      });
      onCreate(email);
    } catch (error) {
      setError('Failed to create account: ' + error.message);
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className="content">
      <div className="card signin-card">
        <h2>Create Account</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              fontSize: '1.05rem',
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 0,
              background: '#f3f4f6',
              border: '1.2px solid #cce7ff',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              fontSize: '1.05rem',
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 0,
              background: '#f3f4f6',
              border: '1.2px solid #cce7ff',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{
              fontSize: '1.05rem',
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 0,
              background: '#f3f4f6',
              border: '1.2px solid #cce7ff',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button type="submit" style={{ marginTop: 16, width: '100%' }}>Create Account</button>
        </form>
        <p style={{ marginTop: 16, color: '#003366' }}>
          Already have an account?{' '}
          <button style={{ color: '#003366', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }} onClick={onSwitchToSignIn}>Sign In</button>
        </p>
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
        color: '#fff',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        flexDirection: 'column',
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
            marginBottom: '20px',
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
  const [page, setPage] = useState('signin');
  const [approvalPercent, setApprovalPercent] = useState(90); // default for now
  const [showAccountCreated, setShowAccountCreated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = (email) => {
    setIsSignedIn(true);
    setUser({ email });
    setPage('main');
  };
  const handleCreate = (email) => {
    setShowAccountCreated(true);
    setTimeout(() => setShowAccountCreated(false), 3000);
    setPage('signin');
  };
  const handleSignOut = () => {
    setIsSignedIn(false);
    setUser(null);
    setPage('signin');
    setShowUserMenu(false);
  };
  const handleFormSubmit = () => {
    setPage('result');
  };

  return (
    <div className="app">
      {page !== 'bank' && (
        <header className="header">
          <h1
            style={{cursor: 'pointer'}}
            onClick={() => {
              if (isSignedIn) {
                setPage('main');
              } else {
                setPage('signin');
              }
            }}
          >
            ClearPath
          </h1>
          {isSignedIn && (
            <div style={{position: 'fixed', top: 18, right: 32, zIndex: 1200}}>
              <button
                style={{background: '#cce7ff', color: '#003366', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}
                onClick={() => setShowUserMenu(v => !v)}
              >
                ☰
              </button>
              {showUserMenu && (
                <div style={{position: 'absolute', top: 40, right: 0, background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', minWidth: 120, padding: 0, overflow: 'visible', zIndex: 1300}}>
                  <button
                    style={{width: '100%', background: 'none', border: 'none', color: '#003366', padding: '12px 18px', textAlign: 'left', fontSize: '1rem', cursor: 'pointer'}}
                    onClick={handleSignOut}
                  >Sign Out</button>
                </div>
              )}
            </div>
          )}
          {showAccountCreated && (
            <div className="account-created-notification" style={{position: 'fixed', top: 24, right: 32, background: '#d4f8e8', color: '#1a7f4d', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.10)', zIndex: 999, opacity: 1, transition: 'opacity 1.2s'}}>
              Account created!
            </div>
          )}
        </header>
      )}
      {page === 'signin' && (
        <SignIn 
          onSignIn={handleSignIn} 
          onSwitchToCreate={() => setPage('create')} 
        />
      )}
      {page === 'create' && (
        <CreateAccount 
          onCreate={handleCreate} 
          onSwitchToSignIn={() => setPage('signin')} 
        />
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
        <HomeLoanForm onBack={() => setPage('main')} onSubmit={handleFormSubmit} />
      )}
      {page === 'auto-loan' && (
        <AutoLoanForm onBack={() => setPage('main')} onSubmit={handleFormSubmit} />
      )}
      {page === 'school-loan' && (
        <SchoolLoanForm onBack={() => setPage('main')} onSubmit={handleFormSubmit} />
      )}
      {page === 'personal-loan' && (
        <PersonalLoanForm onBack={() => setPage('main')} onSubmit={handleFormSubmit} />
      )}
      {page === 'result' && (
        <ApprovalResult 
          percent={approvalPercent} 
          onBack={() => setPage('main')} 
          onPercentChange={setApprovalPercent}
          onGoToBank={() => setPage('bank')}
        />
      )}
      {page === 'bank' && <VillageBankPage onBack={() => setPage('main')} />}
    </div>
  );
}

export default App;