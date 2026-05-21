const CONFIG_SERVER = process.env.CONFIG_SERVER_URL || 'http://localhost:9000';

module.exports = {
  apps: [
    {
      name: 'config-server',
      script: 'java',
      args: '-jar ./config-server/target/config-server-1.0.0.jar',
      env: {
        SPRING_PROFILES_ACTIVE: process.env.CONFIG_SERVER_PROFILE || 'native',
      },
      log_file: './logs/config-server.log',
    },
    {
      name: 'service-registry',
      script: 'java',
      args: `-jar ./service-registry/target/service-registry-1.0.0.jar --spring.config.import=configserver:${CONFIG_SERVER}`,
      env: {
        CONFIG_SERVER_URL: CONFIG_SERVER,
      },
      log_file: './logs/service-registry.log',
    },
    {
      name: 'api-gateway',
      script: 'java',
      args: `-jar ./api-gateway/target/api-gateway-1.0.0.jar --spring.config.import=configserver:${CONFIG_SERVER}`,
      env: {
        CONFIG_SERVER_URL: CONFIG_SERVER,
      },
      log_file: './logs/api-gateway.log',
    },
  ],
};
