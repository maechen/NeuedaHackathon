#!/bin/bash

echo "🔍 Checking Loan Pre-Approval System Status..."

# Check frontend
echo ""
echo "📱 Frontend Status:"
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend is running at http://localhost:5173"
else
    echo "❌ Frontend is not accessible"
fi

# Check backend API
echo ""
echo "🔧 Backend API Status:"
if curl -s http://localhost:5002/api/health > /dev/null; then
    echo "✅ Backend API is running at http://localhost:5002"
    echo "📊 API Health Check:"
    curl -s http://localhost:5002/api/health | python3 -m json.tool 2>/dev/null || echo "Response received but not valid JSON"
else
    echo "❌ Backend API is not accessible (may still be starting up)"
fi

echo ""
echo "🌐 Access URLs:"
echo "  Frontend: http://localhost:5173"
echo "  API Health: http://localhost:5002/api/health"
echo "  API Docs: See LOAN_SYSTEM_README.md for all endpoints"

echo ""
echo "🚀 Next Steps:"
echo "  1. Sign up for a new account or sign in"
echo "  2. Select 'Personal Loan' from the main menu"
echo "  3. Fill out the loan application form"
echo "  4. Get your AI-powered approval prediction!"
