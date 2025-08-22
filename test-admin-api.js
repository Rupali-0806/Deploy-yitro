// Quick test to verify admin API endpoints are working
const API_BASE = 'http://localhost:3001';

async function testAdminAPI() {
  try {
    console.log('🧪 Testing Admin API endpoints...');
    
    // Step 1: Login as admin
    console.log('1. Testing login...');
    const loginResponse = await fetch(`${API_BASE}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@yitro.com',
        password: 'admin123'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful');
    
    const token = loginData.token;
    
    // Step 2: Test /api/admin/users endpoint
    console.log('2. Testing /api/admin/users...');
    const usersResponse = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!usersResponse.ok) {
      throw new Error(`Users endpoint failed: ${usersResponse.status}`);
    }
    
    const usersData = await usersResponse.json();
    console.log('✅ Users endpoint working:', usersData.users?.length, 'users found');
    
    // Step 3: Test /api/admin/metrics endpoint
    console.log('3. Testing /api/admin/metrics...');
    const metricsResponse = await fetch(`${API_BASE}/api/admin/metrics`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!metricsResponse.ok) {
      throw new Error(`Metrics endpoint failed: ${metricsResponse.status}`);
    }
    
    const metricsData = await metricsResponse.json();
    console.log('✅ Metrics endpoint working:', metricsData.data?.totalUsers, 'total users');
    
    console.log('\n🎉 All API endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAdminAPI();
