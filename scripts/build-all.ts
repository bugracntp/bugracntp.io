import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

console.log('🧹 Cleaning dist directory...');
fs.removeSync(distDir);
fs.ensureDirSync(distDir);

const projects: Array<{ name: string; path: string }> = [
  { name: 'portfolio', path: 'packages/portfolio' },
  { name: 'calendar', path: 'packages/calendar' }
];

projects.forEach((project) => {
  console.log(`\n🔨 Building ${project.name}...`);
  try {
    execSync(`npm --workspace=${project.name} run build`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log(`✅ ${project.name} built successfully!`);
  } catch (error) {
    console.error(`❌ Error building ${project.name}`);
    process.exit(1);
  }
});

console.log('\n🎉 All projects built successfully!');

