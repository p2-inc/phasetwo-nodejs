import Keycloak from 'keycloak-connect';

class Phasetwo extends Keycloak {
  constructor(config) {
    super(config);

    this.config = config;

    if (config && config.secretOption) {
      console.log('🔥 You provided a secret config option. Nice.');
    }

    if (config && config.augment) {
      this.augment = config.augment;
    }

    console.log('👌 Built Phasetwo object.');
  }

  getAugment() {
    return this.augment;
  }

  getConfig() {
    return this.config;
  }

  middleware(...args) {
    console.log('Called middleware with side effects');
    return super.middleware(...args);
  }
}

export default Phasetwo;
