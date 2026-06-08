#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function initPackage() {
  // 1. Locate the user's current project working directory
  const userProjectRoot = process.cwd();
  const targetPublicFolder = path.join(userProjectRoot, 'public', 'my-svg-package');

  // 2. Locate your package's asset folder inside node_modules
  const packageAssetFolder = path.join(__dirname, '../dist/svgs');

  try {
    // Create the target folder in their public directory if it doesn't exist
    if (!fs.existsSync(targetPublicFolder)) {
      fs.mkdirSync(targetPublicFolder, { recursive: true });
    }

    // 3. Copy the files over
    const files = fs.readdirSync(packageAssetFolder);
    for (const file of files) {
      fs.copyFileSync(
        path.join(packageAssetFolder, file),
        path.join(targetPublicFolder, file)
      );
    }

    console.log('✅ Successfully copied 100+ SVGs to your public/my-svg-package/ directory!');
  } catch (error) {
    console.error('❌ Failed to copy assets automatically:', error.message);
  }
}

initPackage();