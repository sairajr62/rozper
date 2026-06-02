import { watch } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const PROJECT_DIR = resolve('.');
const DEBOUNCE_MS = 3000;
const IGNORE = new Set(['.next', 'node_modules', '.vercel', '.git']);

let timer = null;
let deploying = false;

function shouldIgnore(filename) {
  if (!filename) return true;
  return IGNORE.has(filename.split(/[\\/]/)[0]);
}

function deploy() {
  if (deploying) return;
  deploying = true;
  console.log(`\n[${new Date().toLocaleTimeString()}] Changes detected — deploying to Vercel...`);
  try {
    execSync('vercel --prod --yes', { stdio: 'inherit', cwd: PROJECT_DIR });
    console.log(`[${new Date().toLocaleTimeString()}] Deployment complete.`);
  } catch (e) {
    console.error(`[${new Date().toLocaleTimeString()}] Deployment failed.`);
  }
  deploying = false;
}

watch(PROJECT_DIR, { recursive: true }, (_, filename) => {
  if (shouldIgnore(filename)) return;
  clearTimeout(timer);
  timer = setTimeout(deploy, DEBOUNCE_MS);
});

console.log(`Watching for changes in ${PROJECT_DIR}`);
console.log('Will auto-deploy to https://v0-rozper.vercel.app on save (3s debounce).');
console.log('Press Ctrl+C to stop.\n');
