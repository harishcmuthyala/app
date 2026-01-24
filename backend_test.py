#!/usr/bin/env python3
"""
Backend API Testing Script for Portfolio Application
Tests Contact Form and Resume Download Tracking APIs
"""

import requests
import json
import sys
from datetime import datetime
import os
from pathlib import Path

# Load environment variables to get the backend URL
def load_env_file(file_path):
    """Load environment variables from .env file"""
    env_vars = {}
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    # Remove quotes if present
                    value = value.strip('"\'')
                    env_vars[key] = value
    return env_vars

# Get backend URL from frontend .env
frontend_env = load_env_file('/app/frontend/.env')
BACKEND_URL = frontend_env.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE_URL}")

class PortfolioAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'response_data': response_data,
            'timestamp': datetime.now().isoformat()
        })
        
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test("Root Endpoint", True, "Root endpoint working correctly", data)
                    return True
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_submission(self):
        """Test POST /api/contact endpoint"""
        test_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in your work and would like to discuss a potential project collaboration."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE_URL}/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                # Verify response structure
                required_fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Verify data matches input
                    if (data['name'] == test_data['name'] and 
                        data['email'] == test_data['email'] and
                        data['subject'] == test_data['subject'] and
                        data['message'] == test_data['message']):
                        self.log_test("Contact Form Submission", True, "Contact form submitted successfully", data)
                        return True, data['id']
                    else:
                        self.log_test("Contact Form Submission", False, "Response data doesn't match input")
                        return False, None
                else:
                    self.log_test("Contact Form Submission", False, f"Missing fields in response: {missing_fields}")
                    return False, None
            else:
                self.log_test("Contact Form Submission", False, f"HTTP {response.status_code}: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Request error: {str(e)}")
            return False, None
    
    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        invalid_test_cases = [
            {
                "name": "Invalid Email Test",
                "data": {
                    "name": "Test User",
                    "email": "invalid-email",
                    "subject": "Test",
                    "message": "Test message"
                },
                "expected_error": "email validation"
            },
            {
                "name": "Empty Name Test", 
                "data": {
                    "name": "",
                    "email": "test@example.com",
                    "subject": "Test",
                    "message": "Test message"
                },
                "expected_error": "name validation"
            },
            {
                "name": "Missing Fields Test",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com"
                    # Missing subject and message
                },
                "expected_error": "missing fields"
            }
        ]
        
        validation_passed = 0
        for test_case in invalid_test_cases:
            try:
                response = self.session.post(
                    f"{API_BASE_URL}/contact",
                    json=test_case["data"],
                    headers={'Content-Type': 'application/json'}
                )
                
                if response.status_code == 422:  # FastAPI validation error
                    validation_passed += 1
                    self.log_test(f"Contact Validation - {test_case['name']}", True, "Validation correctly rejected invalid data")
                else:
                    self.log_test(f"Contact Validation - {test_case['name']}", False, f"Expected 422, got {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Contact Validation - {test_case['name']}", False, f"Request error: {str(e)}")
        
        return validation_passed == len(invalid_test_cases)
    
    def test_get_contact_messages(self):
        """Test GET /api/contact endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/contact")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Contact Messages", True, f"Retrieved {len(data)} contact messages", {"count": len(data)})
                    return True, data
                else:
                    self.log_test("Get Contact Messages", False, "Response is not a list")
                    return False, None
            else:
                self.log_test("Get Contact Messages", False, f"HTTP {response.status_code}: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Get Contact Messages", False, f"Request error: {str(e)}")
            return False, None
    
    def test_resume_download_tracking(self):
        """Test POST /api/resume/download endpoint"""
        test_user_agent = "TestBrowser/1.0 (Testing Suite)"
        
        try:
            response = self.session.post(
                f"{API_BASE_URL}/resume/download",
                params={"user_agent": test_user_agent}
            )
            
            if response.status_code == 200:
                data = response.json()
                if 'message' in data and 'total_downloads' in data:
                    self.log_test("Resume Download Tracking", True, f"Download tracked successfully. Total downloads: {data['total_downloads']}", data)
                    return True, data['total_downloads']
                else:
                    self.log_test("Resume Download Tracking", False, "Missing expected fields in response")
                    return False, None
            else:
                self.log_test("Resume Download Tracking", False, f"HTTP {response.status_code}: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Resume Download Tracking", False, f"Request error: {str(e)}")
            return False, None
    
    def test_resume_stats(self):
        """Test GET /api/resume/stats endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/resume/stats")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['total_downloads', 'recent_downloads']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Resume Stats", True, f"Stats retrieved: {data['total_downloads']} total, {data['recent_downloads']} recent", data)
                    return True, data
                else:
                    self.log_test("Resume Stats", False, f"Missing fields in response: {missing_fields}")
                    return False, None
            else:
                self.log_test("Resume Stats", False, f"HTTP {response.status_code}: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Resume Stats", False, f"Request error: {str(e)}")
            return False, None
    
    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("PORTFOLIO BACKEND API TESTING")
        print("=" * 60)
        
        # Test basic connectivity
        if not self.test_root_endpoint():
            print("\n❌ CRITICAL: Cannot connect to backend API. Stopping tests.")
            return False
        
        print("\n" + "=" * 40)
        print("CONTACT FORM API TESTS")
        print("=" * 40)
        
        # Test contact form submission
        contact_success, contact_id = self.test_contact_form_submission()
        
        # Test contact form validation
        validation_success = self.test_contact_form_validation()
        
        # Test getting contact messages
        get_success, messages = self.test_get_contact_messages()
        
        print("\n" + "=" * 40)
        print("RESUME DOWNLOAD API TESTS")
        print("=" * 40)
        
        # Test resume download tracking
        download_success, total_downloads = self.test_resume_download_tracking()
        
        # Test resume stats
        stats_success, stats_data = self.test_resume_stats()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return failed_tests == 0

def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results_file = '/app/test_results_detailed.json'
    with open(results_file, 'w') as f:
        json.dump(tester.test_results, f, indent=2)
    
    print(f"\nDetailed results saved to: {results_file}")
    
    if success:
        print("\n🎉 ALL TESTS PASSED!")
        sys.exit(0)
    else:
        print("\n💥 SOME TESTS FAILED!")
        sys.exit(1)

if __name__ == "__main__":
    main()