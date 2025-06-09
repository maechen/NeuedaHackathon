#!/bin/bash

# Startup script for Loan Pre-Approval System
# This script sets up the environment and starts both backend and frontend

echo "🚀 Starting Loan Pre-Approval System Setup..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3."
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed. Please install npm."
    exit 1
fi

echo "✅ Python 3, Node.js, and npm are available"

# Install Python dependencies
echo "📦 Installing Python dependencies..."
if [ -f "api_requirements.txt" ]; then
    pip3 install -r api_requirements.txt
    if [ $? -eq 0 ]; then
        echo "✅ Python dependencies installed successfully"
    else
        echo "⚠️  Some Python dependencies failed to install. Continuing with available packages."
    fi
else
    echo "⚠️  api_requirements.txt not found. Installing basic packages..."
    pip3 install flask flask-cors pandas numpy scikit-learn joblib
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Node.js dependencies installed successfully"
else
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi

# Create a script to start the backend and frontend
echo "🔧 Creating startup scripts..."

# Backend startup script
cat > start_backend.sh << 'EOF'
#!/bin/bash
echo "🐍 Starting Python Flask API server..."
cd "$(dirname "$0")"
export FLASK_ENV=development
export DEBUG=True
python3 api_server.py
EOF

# Frontend startup script
cat > start_frontend.sh << 'EOF'
#!/bin/bash
echo "⚛️  Starting React development server..."
cd "$(dirname "$0")"
npm run dev
EOF

# Make scripts executable
chmod +x start_backend.sh
chmod +x start_frontend.sh

echo ""
echo "🎉 Setup complete! "
echo ""
echo "To start the loan pre-approval system:"
echo ""
echo "1. Start the backend API (in one terminal):"
echo "   ./start_backend.sh"
echo ""
echo "2. Start the frontend React app (in another terminal):"
echo "   ./start_frontend.sh"
echo ""
echo "3. Open your browser to:"
echo "   Frontend: http://localhost:5173"
echo "   API Health Check: http://localhost:5000/api/health"
echo ""
echo "📋 System Features:"
echo "   • Firebase Authentication (Sign In/Sign Up)"
echo "   • Loan Application Form"
echo "   • ML Model Prediction (DecisionTree Classifier)"
echo "   • Real-time Approval Percentage"
echo "   • User Data Storage in Firebase"
echo ""
echo "🔧 API Endpoints:"
echo "   • POST /api/predict - Get loan approval prediction"
echo "   • GET /api/health - Health check"
echo "   • GET /api/model/stats - Model performance statistics"
echo "   • GET /api/user/history/<user_id> - User prediction history"
echo ""
echo "Note: The system will work with mock predictions if the ML model fails to load."
echo "Firebase integration requires proper credentials but will use mock data otherwise."
