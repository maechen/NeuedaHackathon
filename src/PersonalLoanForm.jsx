import React from "react";

function PersonalLoanForm({ onBack, onSubmit, user }) {
    const [form, setForm] = React.useState({
        age: "",
        income: "",
        zip: "",
        familySize: "",
        education: "",
        mortgageAmount: "",
        personalLoans: "",
        securityAccounts: "",
        creditAccounts: "",
        ccUsage: "",
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [validationErrors, setValidationErrors] = React.useState({});

    const validateField = (name, value) => {
        const errors = { ...validationErrors };

        switch (name) {
            case "age":
                if (value && (value < 18 || value > 100)) {
                    errors.age = "Age must be between 18 and 100";
                } else {
                    delete errors.age;
                }
                break;
            case "income":
                if (value && value < 0) {
                    errors.income = "Income cannot be negative";
                } else {
                    delete errors.income;
                }
                break;
            case "familySize":
                if (value && value < 1) {
                    errors.familySize = "Family size must be at least 1";
                } else {
                    delete errors.familySize;
                }
                break;
            case "zip":
                if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
                    errors.zip = "Please enter a valid ZIP code";
                } else {
                    delete errors.zip;
                }
                break;
            case "ccUsage":
                if (value && (value < 0 || value > 100)) {
                    errors.ccUsage =
                        "Credit card usage must be between 0 and 100%";
                } else {
                    delete errors.ccUsage;
                }
                break;
            default:
                break;
        }

        setValidationErrors(errors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Real-time validation
        if (value) {
            validateField(name, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Map education values to match model expectations
            const educationMapping = {
                "No High School": "Undergrad",
                "High School Diploma or GED": "Undergrad",
                "Some College": "Undergrad",
                "Associate Degree": "Undergrad",
                "Bachelor's Degree": "Graduate",
                "Master's Degree": "Advanced/Professional",
                "Doctorate or Professional": "Advanced/Professional",
                Other: "Graduate",
            };

            const requestData = {
                ...form,
                education: educationMapping[form.education] || "Graduate",
                userId: user?.uid || "anonymous",
            };

            console.log("Sending request to API:", requestData);

            const response = await fetch("http://localhost:5002/api/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("API response:", result);

            if (onSubmit) {
                onSubmit(result.approval_percentage);
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError(`Failed to get prediction: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content">
            <div className="card signin-card" style={{ maxWidth: 500 }}>
                <h2>Step 2: Input Information</h2>
                {error && (
                    <p style={{ color: "red", marginBottom: 16 }}>{error}</p>
                )}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <div style={{ marginBottom: 12 }}>
                        <input
                            name="age"
                            type="number"
                            min="18"
                            max="100"
                            placeholder="Age"
                            value={form.age}
                            onChange={handleChange}
                            required
                            style={{
                                width: "100%",
                                padding: 8,
                                background: "#f3f4f6",
                                border: validationErrors.age
                                    ? "1px solid #ff4444"
                                    : "1px solid #cce7ff",
                                borderRadius: 8,
                            }}
                        />
                        {validationErrors.age && (
                            <p
                                style={{
                                    color: "#ff4444",
                                    fontSize: "0.8rem",
                                    margin: "4px 0 0 0",
                                }}
                            >
                                {validationErrors.age}
                            </p>
                        )}
                    </div>
                    <input
                        name="income"
                        type="number"
                        min="0"
                        placeholder="Annual Income ($)"
                        value={form.income}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <input
                        name="zip"
                        type="text"
                        placeholder="ZIP Code"
                        value={form.zip}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <input
                        name="familySize"
                        type="number"
                        min="1"
                        placeholder="Family Size"
                        value={form.familySize}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <select
                        name="education"
                        value={form.education}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                            color: form.education ? "#111" : "#888",
                        }}
                    >
                        <option value="" disabled style={{ color: "#888" }}>
                            Education Level
                        </option>
                        <option
                            value="No High School"
                            style={{ color: "#111" }}
                        >
                            No High School
                        </option>
                        <option
                            value="High School Diploma or GED"
                            style={{ color: "#111" }}
                        >
                            High School Diploma or GED
                        </option>
                        <option value="Some College" style={{ color: "#111" }}>
                            Some College
                        </option>
                        <option
                            value="Associate Degree"
                            style={{ color: "#111" }}
                        >
                            Associate Degree
                        </option>
                        <option
                            value="Bachelor's Degree"
                            style={{ color: "#111" }}
                        >
                            Bachelor's Degree
                        </option>
                        <option
                            value="Master's Degree"
                            style={{ color: "#111" }}
                        >
                            Master's Degree
                        </option>
                        <option
                            value="Doctorate or Professional"
                            style={{ color: "#111" }}
                        >
                            Doctorate or Professional
                        </option>
                        <option value="Other" style={{ color: "#111" }}>
                            Other
                        </option>
                    </select>
                    <input
                        name="mortgageAmount"
                        type="number"
                        min="0"
                        placeholder="Mortgage Amount ($)"
                        value={form.mortgageAmount}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <input
                        name="personalLoans"
                        type="number"
                        min="0"
                        placeholder="Personal Loans (count)"
                        value={form.personalLoans}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <input
                        name="securityAccounts"
                        type="number"
                        min="0"
                        placeholder="Security Accounts (count)"
                        value={form.securityAccounts}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <input
                        name="creditAccounts"
                        type="number"
                        min="0"
                        placeholder="Credit Accounts (count)"
                        value={form.creditAccounts}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 12,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <input
                        name="ccUsage"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Credit Card Usage Avg (%)"
                        value={form.ccUsage}
                        onChange={handleChange}
                        required
                        style={{
                            marginBottom: 20,
                            width: "100%",
                            padding: 8,
                            background: "#f3f4f6",
                            border: "1px solid #cce7ff",
                            borderRadius: 8,
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Analyzing..." : "Submit"}
                    </button>
                </form>
                <button
                    onClick={onBack}
                    style={{
                        marginTop: 16,
                        width: "100%",
                        background: "#eee",
                        color: "#003366",
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default PersonalLoanForm;
