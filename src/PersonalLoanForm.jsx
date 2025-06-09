import React from 'react';

function PersonalLoanForm({ onBack, onSubmit }) {
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
    if (onSubmit) onSubmit();
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

export default PersonalLoanForm;
