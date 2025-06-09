#!/usr/bin/env python3
"""
Performance testing script for the loan prediction API
Tests caching, response times, and system load handling
"""

import requests
import time
import json
import statistics
from concurrent.futures import ThreadPoolExecutor, as_completed

API_BASE_URL = "http://localhost:5002"

def test_api_health():
    """Test API health endpoint"""
    print("🔍 Testing API Health...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Health: {data['status']}")
            print(f"📊 Model Loaded: {data['model_loaded']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_prediction_performance():
    """Test single prediction performance"""
    print("\n⚡ Testing Prediction Performance...")
    
    test_data = {
        "age": 35,
        "income": 75000,
        "familySize": 3,
        "education": "Graduate",
        "mortgageAmount": 200000,
        "personalLoans": 0,
        "securityAccounts": 1,
        "creditAccounts": 1,
        "ccUsage": 2.5,
        "userId": "performance-test"
    }
    
    times = []
    for i in range(10):
        start_time = time.time()
        try:
            response = requests.post(
                f"{API_BASE_URL}/api/predict",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            end_time = time.time()
            
            if response.status_code == 200:
                times.append(end_time - start_time)
                result = response.json()
                print(f"Request {i+1}: {(end_time - start_time)*1000:.1f}ms - {result['approval_percentage']}%")
            else:
                print(f"❌ Request {i+1} failed: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Request {i+1} error: {e}")
    
    if times:
        avg_time = statistics.mean(times)
        min_time = min(times)
        max_time = max(times)
        
        print(f"\n📈 Performance Summary:")
        print(f"   Average: {avg_time*1000:.1f}ms")
        print(f"   Min: {min_time*1000:.1f}ms")
        print(f"   Max: {max_time*1000:.1f}ms")
        print(f"   Requests/sec: {1/avg_time:.1f}")

def test_cache_performance():
    """Test caching effectiveness"""
    print("\n🧠 Testing Cache Performance...")
    
    test_data = {
        "age": 40,
        "income": 90000,
        "familySize": 4,
        "education": "Advanced/Professional",
        "mortgageAmount": 300000,
        "personalLoans": 0,
        "securityAccounts": 1,
        "creditAccounts": 2,
        "ccUsage": 4.0,
        "userId": "cache-test"
    }
    
    # First request (should compute)
    start_time = time.time()
    response1 = requests.post(f"{API_BASE_URL}/api/predict", json=test_data)
    time1 = time.time() - start_time
    
    # Second request (should be cached)
    start_time = time.time()
    response2 = requests.post(f"{API_BASE_URL}/api/predict", json=test_data)
    time2 = time.time() - start_time
    
    if response1.status_code == 200 and response2.status_code == 200:
        result1 = response1.json()
        result2 = response2.json()
        
        print(f"First request: {time1*1000:.1f}ms")
        print(f"Second request: {time2*1000:.1f}ms")
        print(f"Cache speedup: {time1/time2:.1f}x")
        print(f"Same result: {result1['timestamp'] == result2['timestamp']}")
    
def test_concurrent_load():
    """Test concurrent request handling"""
    print("\n🔄 Testing Concurrent Load (20 requests)...")
    
    def make_request(request_id):
        test_data = {
            "age": 25 + (request_id % 30),
            "income": 40000 + (request_id * 1000),
            "familySize": 1 + (request_id % 4),
            "education": ["Undergrad", "Graduate", "Advanced/Professional"][request_id % 3],
            "mortgageAmount": request_id * 5000,
            "personalLoans": request_id % 2,
            "securityAccounts": request_id % 2,
            "creditAccounts": 1 + (request_id % 2),
            "ccUsage": 1.0 + (request_id % 5),
            "userId": f"load-test-{request_id}"
        }
        
        start_time = time.time()
        try:
            response = requests.post(f"{API_BASE_URL}/api/predict", json=test_data)
            end_time = time.time()
            return {
                'id': request_id,
                'time': end_time - start_time,
                'status': response.status_code,
                'success': response.status_code == 200
            }
        except Exception as e:
            return {
                'id': request_id,
                'time': None,
                'status': None,
                'success': False,
                'error': str(e)
            }
    
    start_time = time.time()
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(make_request, i) for i in range(20)]
        results = [future.result() for future in as_completed(futures)]
    
    total_time = time.time() - start_time
    
    successful_requests = [r for r in results if r['success']]
    failed_requests = [r for r in results if not r['success']]
    
    print(f"Total time: {total_time:.2f}s")
    print(f"Successful requests: {len(successful_requests)}/20")
    print(f"Failed requests: {len(failed_requests)}")
    
    if successful_requests:
        times = [r['time'] for r in successful_requests if r['time']]
        if times:
            print(f"Average response time: {statistics.mean(times)*1000:.1f}ms")
            print(f"Throughput: {len(successful_requests)/total_time:.1f} req/s")

def main():
    """Run all performance tests"""
    print("🚀 Starting Performance Test Suite")
    print("=" * 50)
    
    if not test_api_health():
        print("❌ API not available. Please start the server first.")
        return
    
    test_prediction_performance()
    test_cache_performance()
    test_concurrent_load()
    
    print("\n" + "=" * 50)
    print("✅ Performance testing completed!")

if __name__ == "__main__":
    main()
