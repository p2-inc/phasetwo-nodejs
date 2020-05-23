import Keycloak from 'keycloak-connect';

import Account from './api/Account';

class Phasetwo extends Keycloak {
  constructor(config) {
    super(config);

    if (config && config.secretOption) {
      console.log('🔥 You provided a secret config option. Nice.');
    }

    if (config && config.augment) {
      this.augment = config.augment;
    }

    console.log('👌 Built Phasetwo object.');
  }

  // Demonstrate getting a field set in this class
  getAugment() {
    return this.augment;
  }

  // Demonstrate getting a field set in superclass
  // NOTE: this is not the same object that was passed in to the constructor
  getConfig() {
    return this.config;
  }

  // Override a super function
  middleware(...args) {
    console.log('🌱 Phase Two middleware.');
    return super.middleware(...args);
  }

  // Override another super function
  protect(...args) {
    console.log('🔐 Phase Two protect(), called with', JSON.stringify(args));
    return super.protect(...args);
  }

  /**
   * Create an Account object used to interact with the Keycloak Account API.
   *
   * @return {Account} An object used to call methods on the Keyclock Account REST API
   */
  accountApi() {
    return new Account(this.config.realmUrl);
  }
}

export default Phasetwo;
