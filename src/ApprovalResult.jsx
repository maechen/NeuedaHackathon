import React from 'react';

// Helper to interpolate color from red to green
function getApprovalColor(percent) {
  // 0-50: red to yellow, 50-100: yellow to green
  if (percent <= 50) {
    // Red (255, 77, 77) to Yellow (255, 204, 0)
    const r = 255;
    const g = Math.round(77 + (127 * (percent / 50)));
    const b = Math.round(77 - (77 * (percent / 50)));
    return `rgb(${r},${g},${b})`;
  } else {
    // Yellow (255, 204, 0) to Green (60, 200, 90)
    const r = Math.round(255 - (195 * ((percent - 50) / 50)));
    const g = Math.round(204 + ( (200-204) * ((percent - 50) / 50) ));
    const b = Math.round(0 + (90 * ((percent - 50) / 50)));
    return `rgb(${r},${g},${b})`;
  }
}

function ApprovalResult({ percent = 90, onBack, onPercentChange }) {
  const size = 220;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const approvalColor = getApprovalColor(percent);

  return (
    <div className="content">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 0 24px rgba(0,0,0,0.08)',
          padding: 36,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 32
        }}>
          <svg width={size} height={size} style={{ marginBottom: 24 }}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e6f0fa"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={approvalColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.7s, stroke 0.5s' }}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy="0.3em"
              fontSize="2.5rem"
              fontWeight="bold"
              fill="#003366"
              fontFamily="'Orbitron', 'Montserrat', 'Segoe UI', sans-serif"
            >
              {percent}%
            </text>
          </svg>
          <h2 style={{ color: '#003366', fontFamily: 'Montserrat, Segoe UI, sans-serif', marginBottom: 8, marginTop: 0, fontSize: '1.4rem' }}>Estimated Approval Chance</h2>
          <p style={{ color: '#00509e', fontSize: '1.1rem', marginBottom: 0, textAlign: 'center' }}>Based on your information, you have a {percent}% chance of approval.</p>
        </div>
        <div style={{marginBottom: 32, width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label htmlFor="approval-slider" style={{color: '#003366', fontWeight: 600, marginBottom: 8}}>Test Approval %</label>
          <input
            id="approval-slider"
            type="range"
            min={0}
            max={100}
            value={percent}
            onChange={e => onPercentChange && onPercentChange(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <button onClick={onBack} style={{ width: 180, background: '#eee', color: '#003366' }}>Back to Home</button>
      </div>
    </div>
  );
}

export default ApprovalResult;
