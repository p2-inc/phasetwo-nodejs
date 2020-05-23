import Keycloak from 'keycloak-connect';
import fetch from 'node-fetch';

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

  /*
    The method will probably need to take the Token and KeycloakConfig as parameters (unless you can get them from internal state).

    Expected result
    {
      username: 'user',
      firstName: 'Sample',
      lastName: 'User',
      email: 'sample-user@nodejs-example',
      emailVerified: false,
      attributes: {},
    }
  */
  /**
   * Create an Account object used to interact with the Keycloak Account API.
   *
   * @return {Account} An object used to call methods on the Keyclock Account REST API
   */
  accountApi(token) {
    const config = this.config;
    const account = {
      /**
       * Create an Account object used to interact with the Keycloak Account API.
       *
       * @return {Promise} A promise resolving to the JSON response the API request.
       */
      get: function get() {
        // TODO obtain these from config
        const accessToken = token;
        const { authServerUrl, realm } = config;

        // TODO URL builder function
        const url = `${authServerUrl}/realms/${realm}/account/`;

        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
          Authorization: `Bearer ${accessToken}`,
        };

        console.log('🔥 Fetching...');
        console.log('🔥 url', url);
        console.log('🔥 headers', headers);

        return fetch(url, { headers }).then((res) => res.json());
      },
    };

    return account;
  }
}

export default Phasetwo;
