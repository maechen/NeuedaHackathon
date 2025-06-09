#!/bin/bash

echo "🚀 Starting Neueda Loan Pre-Approval System..."
echo "============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the NeuedaHackathon directory"
    exit 1
fi

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    # Kill all child processes
    if [ ! -z "$BACKEND_PID" ]; then
        echo "  Stopping backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "  Stopping frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID 2>/dev/null
    fi
    # Kill any remaining processes
    pkill -f "api_server.py" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set up signal handlers for graceful shutdown
trap cleanup SIGINT SIGTERM

# Ensure Python virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r api_requirements.txt
else
    echo "📦 Activating Python virtual environment..."
    source venv/bin/activate
fi

# Check if model exists, train if needed
if [ ! -f "best_model.joblib" ]; then
    echo "🤖 Training ML model (first time setup)..."
    python main.py
    echo "✅ Model training completed"
fi

# Start backend in background
echo "🔧 Starting Backend API Server..."
python api_server.py &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID"

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Check if backend started successfully
for i in {1..10}; do
    if curl -s http://localhost:5002/api/health > /dev/null 2>&1; then
        echo "✅ Backend API is ready!"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "❌ Backend failed to start after 30 seconds"
        cleanup
        exit 1
    fi
    echo "  Attempt $i/10 - waiting..."
    sleep 3
done

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
echo "🌐 Starting Frontend Development Server..."
npm run dev &
FRONTEND_PID=$!
echo "  Frontend PID: $FRONTEND_PID"

# Wait for frontend to start
echo "⏳ Waiting for frontend to initialize..."
sleep 5

# Show status
echo ""
echo "🎉 System is ready!"
echo "==================="
echo "📱 Frontend:    http://localhost:5173"
echo "🔧 Backend API: http://localhost:5002"
echo "❓ Health Check: http://localhost:5002/api/health"
echo ""
echo "💡 Usage:"
echo "  1. Open http://localhost:5173 in your browser"
echo "  2. Sign up for a new account or sign in"
echo "  3. Select 'Personal Loan' from the main menu"
echo "  4. Fill out the loan application form"
echo "  5. Get your AI-powered approval prediction!"
echo ""
echo "🛑 Press Ctrl+C to stop both servers"
echo ""

# Keep script running and wait for user to stop
while true; do
    # Check if processes are still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "❌ Backend process died unexpectedly"
        cleanup
        exit 1
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "❌ Frontend process died unexpectedly"
        cleanup
        exit 1
    fi
    sleep 5
done
