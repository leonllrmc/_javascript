/*
* originaly a ts file in firebase SDK
* converted to plain javascript (types removing) by leonllrmc
*/


/**
 * Return UA (user agent) or empty string
 * @return user agent string or ''
 */
export function getUA() {
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator['userAgent'] === 'string'
  ) {
    return navigator['userAgent'];
  } else {
    return '';
  }
}

/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
export function isMobileCordova() {
  return (
    typeof window !== 'undefined' &&
    // @ts-ignore Setting up an broadly applicable index signature for Window
    // just to deal with this case would probably be a bad idea.
    !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA())
  );
}

/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
export function isNode() {
  try {
    return (
      Object.prototype.toString.call(global.process) === '[object process]'
    );
  } catch (e) {
    return false;
  }
}

/**
 * Detect Browser Environment
 */
export function isBrowser() {
  return typeof self === 'object' && self.self === self;
}

/**
 * Detect browser extensions (Chrome and Firefox at least).
 */
export function isBrowserExtension() {
  const runtime =
    typeof chrome === 'object'
      ? chrome.runtime
      : typeof browser === 'object'
      ? browser.runtime
      : undefined;
  return typeof runtime === 'object' && runtime.id !== undefined;
}

/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
export function isReactNative() {
  return (
    typeof navigator === 'object' && navigator['product'] === 'ReactNative'
  );
}

/** Detects Electron apps. */
export function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}

/** Detects Internet Explorer. */
export function isIE() {
  const ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}

/** Detects Universal Windows Platform apps. */
export function isUWP(): boolean {
  return getUA().indexOf('MSAppHost/') >= 0;
}

/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
export function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}

/** Returns true if we are running in Safari. */
export function isSafari() {
  return (
    !isNode() &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  );
}

/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
export function isIndexedDBAvailable() {
  return 'indexedDB' in self && indexedDB != null;
}

/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @return promise<boolean>
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
export function validateIndexedDBOpenable(): {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME =
        'validate-browser-context-for-indexeddb-analytics-module';
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        // delete database only when it doesn't pre-exist
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };

      request.onerror = () => {
        reject(request.error?.message || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */
export function areCookiesEnabled() {
  if (!navigator || !navigator.cookieEnabled) {
    return false;
  }
  return true;
}

/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */
export function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('Unable to locate global object.');
}
