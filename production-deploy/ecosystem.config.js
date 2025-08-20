module.exports = {
  apps: [{
    name: 'ienet-production',
    script: 'dist/index.js',
    cwd: '/var/www/ienet.online',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
