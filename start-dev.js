// PM2 entry point — spawns Next.js dev server
const { spawn } = require('child_process')
const path = require('path')

const cwd = path.join(__dirname)
const nextBin = path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next')

const child = spawn(process.execPath, [nextBin, 'dev'], {
  cwd,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development', PORT: '3000' },
})

child.on('exit', (code) => process.exit(code ?? 0))
