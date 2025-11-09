// Quick test script to verify login endpoint
const axios = require('axios');

async function testLogin() {
  try {
    console.log('🧪 Testing login endpoint...\n');

    // Test with bob_stanford
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'bob@stanford.edu',
      password: 'password123'
    });

    if (response.data.success) {
      console.log('✅ Login SUCCESS!');
      console.log('User:', response.data.data.user.username);
      console.log('Token received:', response.data.data.token.substring(0, 20) + '...');
    } else {
      console.log('❌ Login FAILED:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
    console.log('Status:', error.response?.status);
  }
}

testLogin();
