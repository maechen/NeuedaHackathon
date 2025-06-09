import React from 'react';

function PersonalLoanForm({ onBack }) {
  const [form, setForm] = React.useState({
    age: '',
    income: '',
    zip: '',
    employment: '',
    loanPurpose: '',
    loanAmount: '',
    existingDebt: '',
    housingStatus: '',
    yearsAtAddress: '',
    creditScore: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Personal Loan Application Submitted!');
  };

  return (
    <div className="content">
      <div className="card signin-card" style={{maxWidth: 500}}>
        <h2>Step 2: Input Information</h2>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <input name="age" type="number" min="18" max="100" placeholder="Age" value={form.age} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="income" type="number" min="0" placeholder="Annual Income ($)" value={form.income} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="zip" type="text" placeholder="ZIP Code" value={form.zip} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="employment" type="text" placeholder="Employment Status" value={form.employment} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="loanPurpose" type="text" placeholder="Purpose of Loan" value={form.loanPurpose} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="loanAmount" type="number" min="0" placeholder="Loan Amount Requested ($)" value={form.loanAmount} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="existingDebt" type="number" min="0" placeholder="Existing Debt ($)" value={form.existingDebt} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="housingStatus" type="text" placeholder="Housing Status (Own/Rent)" value={form.housingStatus} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="yearsAtAddress" type="number" min="0" placeholder="Years at Current Address" value={form.yearsAtAddress} onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <input name="creditScore" type="number" min="300" max="850" placeholder="Credit Score" value={form.creditScore} onChange={handleChange} required style={{marginBottom: 20, width: '100%', padding: 8, background: '#f3f4f6', border: '1px solid #cce7ff', borderRadius: 8}} />
          <button type="submit" style={{width: '100%'}}>Submit</button>
        </form>
        <button onClick={onBack} style={{marginTop: 16, width: '100%', background: '#eee', color: '#003366'}}>Back</button>
      </div>
    </div>
  );
}

export default PersonalLoanForm;
