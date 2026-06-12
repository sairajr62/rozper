module.exports = {
  apps: [
    {
      name: "rozper-dev",
      script: "./start-dev.js",
      cwd: "C:\\Users\\Admin\\Downloads\\rozper 28-05\\rozper-main",
      watch: false,
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
      env: {
        NODE_ENV: "development",
        PORT: "3000",
      },
      error_file: "C:\\Users\\Admin\\.pm2\\logs\\rozper-dev-error.log",
      out_file: "C:\\Users\\Admin\\.pm2\\logs\\rozper-dev-out.log",
    },
  ],
}
