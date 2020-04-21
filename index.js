const Keycloak = require('keycloak-connect');

class SomaKeycloak extends Keycloak {
  constructor(config) {
    super(config);

    const { soma } = config;
    this.soma = soma;
  }

  getSoma() {
    return 'got ' + this.soma;
  }
}

module.exports = SomaKeycloak;
