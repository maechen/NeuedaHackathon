import React, { useState } from 'react';
import './App.css';
import carIcon from './assets/car.svg';
import houseIcon from './assets/house.svg';
import personalIcon from './assets/personal.svg';
import schoolIcon from './assets/school.svg';
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
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account?{' '}
          <button onClick={onSwitchToCreate}>Sign Up</button>
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
        <form onSubmit={handleCreate}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit">Create Account</button>
        </form>
        <p>
          Already have an account?{' '}
          <button onClick={onSwitchToSignIn}>Sign In</button>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('signin');
  const [user, setUser] = useState(null);

  const handleSignIn = (email) => {
    setUser({ email });
    setPage('main');
  };

  const handleCreate = (email) => {
    setUser({ email });
    setPage('main');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>ClearPath</h1>
      </header>
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
        <div>
          <h2>Welcome, {user?.email}</h2>
          {/* Add your main application content here */}
        </div>
      )}
    </div>
  );
}

export default App;