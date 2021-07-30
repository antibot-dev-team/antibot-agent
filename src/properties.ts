export type ClientProperties = {
  languages: readonly string[]
  plugins: string[]
  window: string[]
  // TODO: Add more checks
}

class Properties {
  constructor() {
    // empty for now
  }

  /**
   * Returns user defined properties
   * Based on the: https://stackoverflow.com/questions/17246309/get-all-user-defined-window-properties
   */
  getUserDefinedProperties(): string[] {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    // get the current list of properties on window
    const currentWindow = Object.getOwnPropertyNames(window);
    // filter the list against the properties that exist in the clean window
    const results = currentWindow.filter(function (prop) {
      return iframe.contentWindow ? !iframe.contentWindow.hasOwnProperty(prop): false;
    });
    document.body.removeChild(iframe);

    return results;
  }

  /**
   * Return list of plugin names installed in the browser
   */
  getPlugins(): string[] {
    return Array.from(navigator.plugins, ({ name }) => name);
  }

  /**
   * Return available languages from the browser
   */
  getLanguages(): readonly string[] {
    return navigator.languages;
  }

  collect(): ClientProperties {
    return {
      languages: this.getLanguages(),
      plugins: this.getPlugins(),
      window: this.getUserDefinedProperties(),
      // TODO: Add more checks
    };
  }
}

export default Properties;