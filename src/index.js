import Keycloak from 'keycloak-connect';

class SomaKeycloak extends Keycloak {
  constructor(config) {
    super(config);

    const { soma } = config;
    this.soma = soma;
  }

  getSoma() {
    return 'got ' + this.soma;
  }

  middleware(...args) {
    console.log('Called middleware with side effects');
    return super.middleware(...args);
  }
}

export default SomaKeycloak;
