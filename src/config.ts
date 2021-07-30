export class Config {
  static sendInterval = 5000;
  static host = new URL('http://localhost:8081').href;
}

export class Endpoints {
  static prefix = 'api/v1';
  static analyze = new URL(`${Endpoints.prefix}/analyze`, Config.host).href;
}