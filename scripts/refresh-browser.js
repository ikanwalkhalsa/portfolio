#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🔄 Refreshing content API...');

// Refresh the content API to ensure latest data is loaded
exec('curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/content', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ Content API refresh failed:', error.message);
    return;
  }
  
  const statusCode = stdout.trim();
  if (statusCode === '200') {
    console.log('✅ Content API refreshed - please manually refresh your browser to see changes');
  } else {
    console.log('⚠️ Content API responded with status:', statusCode);
  }
});
