#!/usr/bin/env node

/**
 * Content Validator Script
 * Validates that all content files have the required structure and fields
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../src/content');
const requiredFiles = [
  'hero.ts',
  'about.ts', 
  'contact.ts',
  'navigation.ts',
  'footer.ts',
  'demos.ts',
  'resume-chat.ts',
  'metadata.ts'
];

console.log('🔍 Validating content files...\n');

let hasErrors = false;

// Check if all required files exist
requiredFiles.forEach(file => {
  const filePath = path.join(contentDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    hasErrors = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

// Basic validation for each file
requiredFiles.forEach(file => {
  const filePath = path.join(contentDir, file);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for export statement
      if (!content.includes('export const')) {
        console.error(`❌ ${file}: Missing export statement`);
        hasErrors = true;
      } else {
        console.log(`✅ ${file}: Has export statement`);
      }
      
      // Check for basic structure
      if (!content.includes('{') || !content.includes('}')) {
        console.error(`❌ ${file}: Invalid object structure`);
        hasErrors = true;
      }
      
    } catch (error) {
      console.error(`❌ ${file}: Error reading file - ${error.message}`);
      hasErrors = true;
    }
  }
});

console.log('\n📊 Content Validation Summary:');
if (hasErrors) {
  console.log('❌ Some content files have issues. Please fix them before building.');
  process.exit(1);
} else {
  console.log('✅ All content files are valid!');
  process.exit(0);
}
