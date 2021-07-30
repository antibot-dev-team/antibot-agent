import {Config, Endpoints} from './config';
import Properties, {ClientProperties} from './properties';

enum ResponseStatus {
  Valid = 'VALID',
  Invalid = 'INVALID'
}

type AntibotResponse = {
  status: string;
}

type AntibotRequest = {
  ua: string;
  properties: ClientProperties;
}

class Agent {
  private readonly _propertiesCollector: Properties;

  /**
   * Initialize template Agent structure
   */
  constructor() {
    this._propertiesCollector = new Properties();
  }

  /**
   * Handle response from the backend
   * @param response response from the backend
   */
  handleResponse(response: AntibotResponse): void {
    if (response.status === ResponseStatus.Invalid) {
      // TODO: Handle bot or bad client correctly
      alert('You are bot!');
    }
  }

  /**
   * Prepare body with client's data
   */
  prepareRequestBody(): AntibotRequest {
    return {
      ua: navigator.userAgent,
      properties: this._propertiesCollector.collect()
    };
  }

  /**
   * Send request with client's data and handle response
   */
  sendData(): void {
    const body = this.prepareRequestBody();

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(Endpoints.analyze, options).then(function (response: Response) {
      return response.json();
    }.bind(this)).then(function (response: AntibotResponse) {
      this.handleResponse(response);
    }.bind(this));
  }

  /**
   * Send requests with client's data to the backend regularly
   * @param sendInterval interval used to send data
   */
  initRegularSend(sendInterval = Config.sendInterval): void {
    window.setInterval(function () {
      this.sendData();
    }.bind(this), sendInterval);
  }
}

export default Agent;