#!/bin/bash

# Startup script for Python backend with virtual environment
echo "🐍 Setting up Python virtual environment and starting Flask API..."

cd "$(dirname "$0")"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies in virtual environment
echo "📦 Installing Python dependencies in virtual environment..."
if [ -f "api_requirements.txt" ]; then
    pip install -r api_requirements.txt
    if [ $? -eq 0 ]; then
        echo "✅ Python dependencies installed successfully"
    else
        echo "⚠️  Some dependencies failed. Installing basic packages..."
        pip install flask flask-cors pandas numpy scikit-learn joblib
    fi
else
    echo "📦 Installing basic Python packages..."
    pip install flask flask-cors pandas numpy scikit-learn joblib
fi

# Start the Flask server
echo "🚀 Starting Flask API server..."
export FLASK_ENV=development
export DEBUG=True
python api_server.py
