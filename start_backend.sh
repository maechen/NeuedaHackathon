#!/bin/bash
echo "🐍 Starting Python Flask API server..."
cd "$(dirname "$0")"
export FLASK_ENV=development
export DEBUG=True
python3 api_server.py
