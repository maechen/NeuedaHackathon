import React from 'react';
import { auth, database } from './firebase';
import { ref, set } from 'firebase/database';

function HomeLoanForm({ onBack, onSubmit }) {
  // ...existing form state code...

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is signed in');
        alert('Please sign in to submit a loan application');
        return;
      }

      console.log('Current user:', user.uid);

      // Create a unique ID for the loan application
      const loanId = Date.now();
      
      // Prepare form data
      const formData = {
        ...form,
        age: parseInt(form.age),
        income: parseFloat(form.income),
        familySize: parseInt(form.familySize),
        mortgageAmount: parseFloat(form.mortgageAmount),
        personalLoans: parseInt(form.personalLoans),
        securityAccounts: parseInt(form.securityAccounts),
        creditAccounts: parseInt(form.creditAccounts),
        ccUsage: parseFloat(form.ccUsage),
        type: 'home',
        timestamp: new Date().toISOString(),
        status: 'pending',
        userId: user.uid,
        userEmail: user.email,
        loanId: loanId
      };

      console.log('Prepared form data:', formData);

      // Create the database reference
      const dbPath = `loans/${user.uid}/home/${loanId}`;
      console.log('Database path:', dbPath);
      const loanRef = ref(database, dbPath);

      // Attempt to save the data
      console.log('Attempting to save data...');
      await set(loanRef, formData);
      console.log('Data saved successfully');

      // Clear the form
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

      alert('Home loan application submitted successfully!');

      if (onSubmit) {
        console.log('Calling onSubmit callback');
        onSubmit();
      }
    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      alert(`Failed to submit home loan application: ${error.message}`);
    }
  };

  // ...existing return JSX...
}

export default HomeLoanForm;