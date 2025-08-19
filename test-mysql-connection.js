import { testConnection, healthCheck } from './server/db-mysql.ts';

async function main() {
  console.log('🔍 Testing MySQL connection to ienet.online database...');
  console.log('📊 Host: 5.181.218.15:3306');
  console.log('🗄️  Database: ienetdb');
  console.log('👤 User: netiedb');
  
  const connectionTest = await testConnection();
  if (connectionTest) {
    console.log('✅ Connection test passed');
    
    const health = await healthCheck();
    console.log('📊 Health status:', health);
    
    process.exit(0);
  } else {
    console.log('❌ Connection test failed');
    process.exit(1);
  }
}

main().catch(console.error);
