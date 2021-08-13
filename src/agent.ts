import {Config, Endpoints} from './config';
import Properties, {ClientProperties} from './properties';

enum ResponseStatus {
  Valid = 'VALID_CLIENT',
  Invalid = 'INVALID_CLIENT'
}

type AnalyzeResponse = {
  decision: string;
}

type AnalyzeRequest = {
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
  handleResponse(response: AnalyzeResponse): void {
    if (response.decision === ResponseStatus.Invalid) {
      // TODO/Brainstorm: Handle bots or bad clients correctly
      //  Questions here:
      //  1. What should we do if we know that the client is a bot? Captcha? Redirect? New page? Iframe?
      window.alert('You are bot!');
    }
  }

  /**
   * Prepare body with client's data
   */
  prepareRequestBody(): Promise<AnalyzeRequest> {
    // TODO/Brainstorm: Think about request format
    //  Questions here:
    //  1. Which parameters are required to correctly detect bots? UA is enough?
    //  2. Which window.*, document.* objects we need?

    return this._propertiesCollector.collect().then(collected_properties => {
      return {
        properties: collected_properties
      };
    });
  }

  /**
   * Send request with client's data and handle response
   */
  sendData(): void {
    this.prepareRequestBody().then(body => {
      return {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }).then(options =>
      fetch(Endpoints.analyze, options)
        .then(function (response: Response) {
          return response.json();
        }.bind(this))
        .then(function (response: AnalyzeResponse) {
          this.handleResponse(response);
        }.bind(this)));
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