export type ClientProperties = {
  languages: readonly string[]
  plugins: string[]
  custom_window: string[]
  ua: string
  webdriver: boolean
  has_window_chrome: boolean
  consistent_permissions: boolean
  eval_length: number
  product_sub: string
  // TODO: Add more checks: window size, navigator properties, etc. ...
}

// TODO/Brainstorm: Think about required custom properties
//  Question here:
//  1. Which custom properties are interesting for us?
const botProperties: string[] = [
  '_phantom',
  'callPhantom',
  'phantom',
  'awesomium',
  '__nightmare',
  '_Selenium_IDE_Recorder',
  '_selenium',
  'callSelenium',
  '__driver_evaluate',
  '__webdriver_evaluate',
  '__selenium_evaluate',
  '__fxdriver_evaluate',
  '__driver_unwrapped',
  '__webdriver_unwrapped',
  '__selenium_unwrapped',
  '__fxdriver_unwrapped',
  '__webdriver_script_func',
  '__webdriver_script_fn',
];

const chromeDriverPrefix = 'cdc_';

class Properties {
  constructor() {
    // empty for now
  }

  /**
   * Returns user defined properties
   * Based on the: https://stackoverflow.com/questions/17246309/get-all-user-defined-window-properties
   */
  getWindowCustomProperties(): string[] {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    // Get the current list of properties on window
    const currentWindow = Object.getOwnPropertyNames(window);
    // Filter the list against the properties that exist in the clean window
    const results = currentWindow.filter(function (prop) {
      return iframe.contentWindow ? !iframe.contentWindow.hasOwnProperty(prop) : false;
    });
    // Remove frame
    document.body.removeChild(iframe);
    // Add bot properties if they present
    results.push(...botProperties.filter(function (prop) {
      return window.hasOwnProperty(prop);
    }));
    // Check for selenium/chromedriver cdc_ substring
    for (const windowProperty of Object.keys(window)) {
      if (windowProperty.includes(chromeDriverPrefix)) { results.push(windowProperty); }
    }

    return results;
  }

  /**
   * Return list of plugin names installed in the browser
   */
  getPlugins(): string[] {
    return Array.from(navigator.plugins, ({name}) => name);
  }

  /**
   * Return available languages from the browser
   */
  getLanguages(): readonly string[] {
    return navigator.languages;
  }

  /**
   * Return user agent
   */
  getUserAgent(): string {
    return navigator.userAgent;
  }

  /**
   * Return value of webdriver property.
   */
  getWebdriver(): boolean {
    return navigator.webdriver;
  }

  /**
   * Return true if window.chrome is present.
   */
  hasWindowChrome(): boolean {
    return window.hasOwnProperty('chrome');
  }

  /**
   * Return false if attempt to ask for permission leads to inconsistent result.
   */
  checkPermissions(): Promise<boolean> {
    try {
      return navigator.permissions.query({name: 'notifications'})
        .then(permissionStatus => Notification.permission !== 'denied' || permissionStatus.state !== 'prompt');
    } catch (e) {
      // On browsers which don't support navigator.permission we suppose that permissions are consistent.
      return Promise.resolve(true);
    }
  }

  /**
   * Return length of eval source code.
   */
  getEvalLength(): number {
    return eval.toString().length;
  }

  /**
   * Return value of navigator.productSub
   */
  getProductSub(): string {
    return navigator.productSub;
  }

  async collect(): Promise<ClientProperties> {
    return {
      consistent_permissions: await this.checkPermissions(),
      languages: this.getLanguages(),
      plugins: this.getPlugins(),
      custom_window: this.getWindowCustomProperties(),
      ua: this.getUserAgent(),
      webdriver: this.getWebdriver(),
      has_window_chrome: this.hasWindowChrome(),
      eval_length: this.getEvalLength(),
      product_sub: this.getProductSub()
    };
  }
}

export default Properties;