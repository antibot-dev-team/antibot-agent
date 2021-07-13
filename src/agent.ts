class Agent {
  private readonly _endpoint: string;

  /**
   * Initialize template Agent structure
   * @param endpoint antibot backend endpoint
   */
  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  /**
   * Collect data from the client (template)
   */
  collectData(): void {
    // TODO: Collect data from the browser somehow
    const body = {'data': 'anything'};

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(this._endpoint, options).then(function(response: Response) {
      // TODO: Process response somehow
      console.log(response);
    });
  }

  /**
   * Send requests with data to the backend regularly
   * @param sendInterval interval used to send data
   */
  initRegularSend(sendInterval = 5000): void {
    window.setInterval(function() {
      this.collectData();
    }.bind(this), sendInterval);
  }
}

export default Agent;