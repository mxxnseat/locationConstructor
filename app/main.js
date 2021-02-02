/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\n\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\n\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\n\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\n\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\n\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest(); // HTTP basic authentication\n\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS\n\n    request.timeout = config.timeout; // Listen for ready state\n\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      } // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n\n\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      } // Prepare the response\n\n\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n      settle(resolve, reject, response); // Clean up request\n\n      request = null;\n    }; // Handle browser request cancellation (as opposed to a manual cancellation)\n\n\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request\n\n      request = null;\n    }; // Handle low level network errors\n\n\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request)); // Clean up request\n\n      request = null;\n    }; // Handle timeout\n\n\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request\n\n      request = null;\n    }; // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n\n\n    if (utils.isStandardBrowserEnv()) {\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    } // Add headers to the request\n\n\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    } // Add withCredentials to request if needed\n\n\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    } // Add responseType to request if needed\n\n\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    } // Handle progress if needed\n\n\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    } // Not all browsers support upload events\n\n\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel); // Clean up request\n\n        request = null;\n      });\n    }\n\n    if (!requestData) {\n      requestData = null;\n    } // Send the request\n\n\n    request.send(requestData);\n  });\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\n\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\n\n\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance\n\n  utils.extend(instance, Axios.prototype, context); // Copy context to instance\n\n  utils.extend(instance, context);\n  return instance;\n} // Create the default instance to be exported\n\n\nvar axios = createInstance(defaults); // Expose Axios class to allow class inheritance\n\naxios.Axios = Axios; // Factory for creating new instances\n\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n}; // Expose Cancel & CancelToken\n\n\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\"); // Expose all/spread\n\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\n\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\"); // Expose isAxiosError\n\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\nmodule.exports = axios; // Allow use of default import syntax in TypeScript\n\nmodule.exports.default = axios;\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\n\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\nmodule.exports = Cancel;\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\n\n\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\n\n\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\n\n\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\n\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\n\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\n\n\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\n\n\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config); // Set config.method\n\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  } // Hook up interceptors middleware\n\n\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n}; // Provide aliases for supported request methods\n\n\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function (url, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: (config || {}).data\n    }));\n  };\n});\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function (url, data, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\nmodule.exports = Axios;\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\n\n\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\n\n\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\n\n\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\n\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\n\n\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n\n  return requestedURL;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\n\n\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\n\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\n\n\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\n\n\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config); // Ensure headers exist\n\n  config.headers = config.headers || {}; // Transform request data\n\n  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers\n\n  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);\n  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {\n    delete config.headers[method];\n  });\n  var adapter = config.adapter || defaults.adapter;\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config); // Transform response data\n\n    response.data = transformData(response.data, response.headers, config.transformResponse);\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config); // Transform response data\n\n      if (reason && reason.response) {\n        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\n\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n\n  return error;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\n\n\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n  var valueFromConfig2Keys = ['url', 'method', 'data'];\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];\n  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];\n  var directMergeKeys = ['validateStatus'];\n\n  function getMergedValue(target, source) {\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\n      return utils.merge(target, source);\n    } else if (utils.isPlainObject(source)) {\n      return utils.merge({}, source);\n    } else if (utils.isArray(source)) {\n      return source.slice();\n    }\n\n    return source;\n  }\n\n  function mergeDeepProperties(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    }\n  });\n  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n  utils.forEach(directMergeKeys, function merge(prop) {\n    if (prop in config2) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (prop in config1) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);\n  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {\n    return axiosKeys.indexOf(key) === -1;\n  });\n  utils.forEach(otherKeys, mergeDeepProperties);\n  return config;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\n\n\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));\n  }\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\n\n\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n  return data;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\n\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n\n    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {\n      return data;\n    }\n\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n\n    return data;\n  }],\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) {\n        /* Ignore */\n      }\n    }\n\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n  maxContentLength: -1,\n  maxBodyLength: -1,\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\nmodule.exports = defaults;\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n\n    return fn.apply(thisArg, args);\n  };\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');\n}\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\n\n\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\n\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '') : baseURL;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie\nfunction standardBrowserEnv() {\n  return {\n    write: function write(name, value, expires, path, domain, secure) {\n      var cookie = [];\n      cookie.push(name + '=' + encodeURIComponent(value));\n\n      if (utils.isNumber(expires)) {\n        cookie.push('expires=' + new Date(expires).toGMTString());\n      }\n\n      if (utils.isString(path)) {\n        cookie.push('path=' + path);\n      }\n\n      if (utils.isString(domain)) {\n        cookie.push('domain=' + domain);\n      }\n\n      if (secure === true) {\n        cookie.push('secure');\n      }\n\n      document.cookie = cookie.join('; ');\n    },\n    read: function read(name) {\n      var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n      return match ? decodeURIComponent(match[3]) : null;\n    },\n    remove: function remove(name) {\n      this.write(name, '', Date.now() - 86400000);\n    }\n  };\n}() : // Non standard browser env (web workers, react-native) lack needed support.\nfunction nonStandardBrowserEnv() {\n  return {\n    write: function write() {},\n    read: function read() {\n      return null;\n    },\n    remove: function remove() {}\n  };\n}();\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\n\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n/**\n * Determines whether the payload is an error thrown by Axios\n *\n * @param {*} payload The value to test\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\n */\n\nmodule.exports = function isAxiosError(payload) {\n  return typeof payload === 'object' && payload.isAxiosError === true;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test\n// whether the request URL is of the same origin as current location.\nfunction standardBrowserEnv() {\n  var msie = /(msie|trident)/i.test(navigator.userAgent);\n  var urlParsingNode = document.createElement('a');\n  var originURL;\n  /**\n  * Parse a URL to discover it's components\n  *\n  * @param {String} url The URL to be parsed\n  * @returns {Object}\n  */\n\n  function resolveURL(url) {\n    var href = url;\n\n    if (msie) {\n      // IE needs attribute set twice to normalize properties\n      urlParsingNode.setAttribute('href', href);\n      href = urlParsingNode.href;\n    }\n\n    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n\n    return {\n      href: urlParsingNode.href,\n      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n      host: urlParsingNode.host,\n      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n      hostname: urlParsingNode.hostname,\n      port: urlParsingNode.port,\n      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname\n    };\n  }\n\n  originURL = resolveURL(window.location.href);\n  /**\n  * Determine if a URL shares the same origin as the current location\n  *\n  * @param {String} requestURL The URL to test\n  * @returns {boolean} True if URL shares the same origin, otherwise false\n  */\n\n  return function isURLSameOrigin(requestURL) {\n    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;\n    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;\n  };\n}() : // Non standard browser envs (web workers, react-native) lack needed support.\nfunction nonStandardBrowserEnv() {\n  return function isURLSameOrigin() {\n    return true;\n  };\n}();\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\"); // Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\n\n\nvar ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\n\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) {\n    return parsed;\n  }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n  return parsed;\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\n\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n/*global toString:true*/\n// utils is a library of generic helper functions non-specific to axios\n\n\nvar toString = Object.prototype.toString;\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\n\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\n\n\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\n\n\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\n\n\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\n\n\nfunction isFormData(val) {\n  return typeof FormData !== 'undefined' && val instanceof FormData;\n}\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\n\n\nfunction isArrayBufferView(val) {\n  var result;\n\n  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = val && val.buffer && val.buffer instanceof ArrayBuffer;\n  }\n\n  return result;\n}\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\n\n\nfunction isString(val) {\n  return typeof val === 'string';\n}\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\n\n\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\n\n\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n/**\n * Determine if a value is a plain Object\n *\n * @param {Object} val The value to test\n * @return {boolean} True if value is a plain Object, otherwise false\n */\n\n\nfunction isPlainObject(val) {\n  if (toString.call(val) !== '[object Object]') {\n    return false;\n  }\n\n  var prototype = Object.getPrototypeOf(val);\n  return prototype === null || prototype === Object.prototype;\n}\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\n\n\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\n\n\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\n\n\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\n\n\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\n\n\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\n\n\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\n\n\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\n\n\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {\n    return false;\n  }\n\n  return typeof window !== 'undefined' && typeof document !== 'undefined';\n}\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\n\n\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  } // Force an array if not already something iterable\n\n\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\n\n\nfunction merge()\n/* obj1, obj2, obj3, ... */\n{\n  var result = {};\n\n  function assignValue(val, key) {\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\n      result[key] = merge(result[key], val);\n    } else if (isPlainObject(val)) {\n      result[key] = merge({}, val);\n    } else if (isArray(val)) {\n      result[key] = val.slice();\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n\n  return result;\n}\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\n\n\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n/**\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\n *\n * @param {string} content with BOM\n * @return {string} content value without BOM\n */\n\n\nfunction stripBOM(content) {\n  if (content.charCodeAt(0) === 0xFEFF) {\n    content = content.slice(1);\n  }\n\n  return content;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim,\n  stripBOM: stripBOM\n};\n\n//# sourceURL=webpack://map-drawing/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./src/camera/index.js":
/*!*****************************!*\
  !*** ./src/camera/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Camera\n/* harmony export */ });\nclass Camera {\n  constructor() {\n    this.x = 0;\n    this.y = 0;\n  }\n\n  getCord() {\n    return {\n      x: this.x,\n      y: this.y\n    };\n  }\n\n  moveCamera(locationSize, x, y) {\n    if (this.x + x > 0 && this.x + x < locationSize.width - innerWidth) {\n      this.x += x;\n    }\n\n    if (this.y + y > 0 && this.y + y < locationSize.height - innerHeight) {\n      this.y += y;\n    }\n  }\n\n}\n\n//# sourceURL=webpack://map-drawing/./src/camera/index.js?");

/***/ }),

/***/ "./src/gameObjects/index.js":
/*!**********************************!*\
  !*** ./src/gameObjects/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ GameObject\n/* harmony export */ });\nclass GameObject {\n  constructor(x, y, {\n    w,\n    h,\n    texture\n  }) {\n    this.size = {\n      w,\n      h\n    };\n    this.x = x;\n    this.y = y;\n    this.texture = texture;\n  }\n\n  select() {\n    this.selected = true;\n  }\n\n  selectCancel() {\n    this.selected = false;\n  }\n\n  getSize() {\n    return this.size;\n  }\n\n  build() {\n    const w = this.size.w;\n    const h = this.size.h;\n    const x = this.x;\n    const y = this.y;\n    const textureUrl = this.texture.src;\n    const pathToTexture = textureUrl.replace(/^[a-z]{4}\\:\\/{2}[a-z]+\\:[0-9]{1,4}.(.*)/, '$1');\n    return {\n      w,\n      h,\n      x,\n      y,\n      texture: pathToTexture\n    };\n  }\n\n  getCord() {\n    return {\n      x: this.x,\n      y: this.y\n    };\n  }\n\n  draw(ctx, camera) {\n    const x = this.x - camera.x;\n    const y = this.y - camera.y;\n    ctx.globalCompositeOperation = \"source-over\";\n\n    if (this.x >= camera.x - this.size.w && this.y >= camera.y - this.size.h && this.x + this.size.w <= camera.x + innerWidth + this.size.w && this.y + this.size.h <= camera.y + innerHeight + this.size.h) {\n      ctx.drawImage(this.texture, x, y, this.size.w, this.size.h);\n    }\n\n    if (this.selected) {\n      ctx.fillStyle = \"rgba(0,0,0,.3)\";\n      ctx.fillRect(x, y, this.size.w, this.size.w);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://map-drawing/./src/gameObjects/index.js?");

/***/ }),

/***/ "./src/image/index.js":
/*!****************************!*\
  !*** ./src/image/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Texture\n/* harmony export */ });\n/* harmony import */ var _methods_paramsModalCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/paramsModalCreator */ \"./src/image/methods/paramsModalCreator.js\");\n\nclass Texture {\n  constructor() {\n    this.sizes = {\n      w: 60,\n      h: 60\n    };\n    this.textureParamsModalCreator = _methods_paramsModalCreator__WEBPACK_IMPORTED_MODULE_0__.default.bind(this);\n  }\n\n  getParams() {\n    return {\n      image: this.image,\n      width: this.sizes.w,\n      height: this.sizes.h\n    };\n  }\n\n  setSize(w, h) {\n    this.sizes.w = w;\n    this.sizes.h = h;\n  }\n\n  init(src, selectTexture, context) {\n    this.src = src;\n    this.image = new Image();\n    this.image.src = this.src;\n    this.selectTexture = selectTexture;\n    this.mainContext = context;\n\n    this.image.onload = () => {\n      const uploadTo = document.querySelector(\".uploaded-image\");\n      const imgElement = document.createElement(\"img\");\n      imgElement.classList.add(\"uploaded-image_item\");\n      imgElement.src = this.src;\n      imgElement.addEventListener(\"click\", e => this.selectTexture.call(this.mainContext, this.getParams()));\n      this.textureParamsModalCreator(imgElement);\n      uploadTo.append(imgElement);\n    };\n  }\n\n}\n\n//# sourceURL=webpack://map-drawing/./src/image/index.js?");

/***/ }),

/***/ "./src/image/methods/paramsModalCreator.js":
/*!*************************************************!*\
  !*** ./src/image/methods/paramsModalCreator.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(imgElement) {\n  const body = document.querySelector(\"body\");\n  const imageParamModalHTML = `<ul class=\"options\">\n                                    <li class=\"option-item\" id=\"set-size\">Set size</li>\n                                    <li class=\"option-item\" id=\"delete\">Delete</li>\n                                 </ul>`;\n  const setSizeModalHTML = `\n        <span>\n            Width: <input type=\"text\" class=\"size-input\" id=\"width\">px\n        </span>\n        <span>\n            Height: <input type=\"text\" class=\"size-input\" id=\"height\">px\n        </span>\n        <button class=\"set-size_btn\">Apply</button>\n    `;\n  imgElement.addEventListener(\"mousedown\", e => {\n    if (e.button === 2) {\n      document.querySelector(\".image-settings-wrap\") && document.querySelector(\".image-settings-wrap\").remove();\n      const imageParamModal = document.createElement(\"div\");\n      window.addEventListener(\"click\", e => {\n        if (!document.querySelector(\".image-settings-wrap\")) return;\n        const optionsWrapper = document.querySelector(\".options\");\n        const {\n          target\n        } = e;\n\n        if (target != imageParamModal && !imageParamModal.contains(target) && !optionsWrapper.contains(target)) {\n          imageParamModal.remove();\n        }\n      });\n      imageParamModal.classList.add(\"image-settings-wrap\");\n      imageParamModal.classList.add(\"image-settings-modal\");\n      imageParamModal.innerHTML = imageParamModalHTML;\n      imageParamModal.style.left = `${e.clientX}px`;\n      imageParamModal.style.top = `${e.clientY}px`;\n      body.prepend(imageParamModal);\n      const optionSetSize = document.querySelector(\"#set-size\");\n      const optionDelete = document.querySelector(\"#delete\");\n      optionSetSize.addEventListener(\"click\", e => {\n        const setSizeModal = document.createElement(\"div\");\n        setSizeModal.classList.add(\"image-settings-modal\");\n        setSizeModal.classList.add(\"set-size_wrap\");\n        setSizeModal.innerHTML = setSizeModalHTML;\n        imageParamModal.prepend(setSizeModal);\n        const setBtn = document.querySelector(\".set-size_btn\");\n        setBtn.addEventListener(\"click\", () => {\n          const width = +document.querySelector(\"#width\").value;\n          const height = +document.querySelector(\"#height\").value;\n\n          if (width < 20 || width > 60 || height < 20 || height > 60) {\n            setTimeout(() => alert(\"Enter width and height in range from 20 to 60 px\"), 0);\n            return;\n          }\n\n          ;\n          this.setSize(width, height);\n          this.selectTexture.call(this.mainContext, this.getParams());\n          imageParamModal.remove();\n        });\n      });\n      optionDelete.addEventListener(\"click\", () => {\n        console.log(\"delete image from list\");\n      });\n    }\n  });\n}\n\n//# sourceURL=webpack://map-drawing/./src/image/methods/paramsModalCreator.js?");

/***/ }),

/***/ "./src/locationConstructor/index.js":
/*!******************************************!*\
  !*** ./src/locationConstructor/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ LocationConstructor\n/* harmony export */ });\n/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../camera */ \"./src/camera/index.js\");\n/* harmony import */ var _tools_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/grid */ \"./src/tools/grid/index.js\");\n/* harmony import */ var _tools_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/selection */ \"./src/tools/selection/index.js\");\n/* harmony import */ var _methods_listeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/listeners */ \"./src/locationConstructor/methods/listeners.js\");\n/* harmony import */ var _methods_init__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods/init */ \"./src/locationConstructor/methods/init.js\");\n/* harmony import */ var _methods_save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./methods/save */ \"./src/locationConstructor/methods/save.js\");\n/* harmony import */ var _gameObjects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gameObjects */ \"./src/gameObjects/index.js\");\n\n\n //methods\n\n\n\n\n\nclass LocationConstructor {\n  constructor(cnv, ctx, landscapeCnv, landscapeCtx, locSizes) {\n    this.cancelLoop = false;\n    this.cnv = cnv;\n    this.ctx = ctx;\n    this.landscapeCnv = landscapeCnv;\n    this.landscapeCtx = landscapeCtx;\n    this.locationSize = locSizes;\n    this.loadDir = \"landscape\";\n    this.listeners = _methods_listeners__WEBPACK_IMPORTED_MODULE_3__.default.bind(this);\n    this.collisionElement = _methods_init__WEBPACK_IMPORTED_MODULE_4__.collisionElement.bind(this);\n    this.getDirectories = _methods_init__WEBPACK_IMPORTED_MODULE_4__.getDirectories.bind(this);\n    this.getImages = _methods_init__WEBPACK_IMPORTED_MODULE_4__.getImages.bind(this);\n    this.submitingForm = _methods_init__WEBPACK_IMPORTED_MODULE_4__.submitingForm.bind(this);\n    this.save = _methods_save__WEBPACK_IMPORTED_MODULE_5__.default.bind(this);\n    this.assets = [];\n    this.selectedObjects = [];\n    this.gameObjects = [];\n    this.landscape = [];\n    this.keydown = {};\n  }\n\n  selectTexture({\n    image,\n    width,\n    height\n  }) {\n    this.textureParams = {\n      texture: image,\n      w: width,\n      h: height\n    };\n  }\n\n  setCanvasSize() {\n    this.cnv.width = this.landscapeCnv.width = innerWidth;\n    this.cnv.height = this.landscapeCnv.height = innerHeight;\n    window.addEventListener(\"resize\", () => {\n      this.cnv.width = this.landscapeCnv.width = innerWidth;\n      this.cnv.height = this.landscapeCnv.height = innerHeight;\n    });\n  }\n\n  init(loaded = null) {\n    if (loaded) {\n      loaded.landscape.map(i => {\n        new Promise(resolve => {\n          const texture = new Image();\n          texture.src = i.texture;\n\n          texture.onload = () => resolve(texture);\n        }).then(texture => {\n          this.landscape.push(new _gameObjects__WEBPACK_IMPORTED_MODULE_6__.default(i.x, i.y, {\n            w: i.w,\n            h: i.h,\n            texture\n          }));\n        });\n      });\n      loaded.gameObjects.map(i => {\n        new Promise(resolve => {\n          const texture = new Image();\n          texture.src = i.texture;\n\n          texture.onload = () => resolve(texture);\n        }).then(texture => {\n          this.gameObjects.push(new _gameObjects__WEBPACK_IMPORTED_MODULE_6__.default(i.x, i.y, {\n            w: i.w,\n            h: i.h,\n            texture\n          }));\n        });\n      });\n    }\n\n    this.getDirectories();\n    this.collisionElement();\n    this.submitingForm();\n    this.listeners();\n    this.save();\n    this.selection = new _tools_selection__WEBPACK_IMPORTED_MODULE_2__.default(this.ctx);\n    this.grid = new _tools_grid__WEBPACK_IMPORTED_MODULE_1__.default(this.ctx);\n    this.camera = new _camera__WEBPACK_IMPORTED_MODULE_0__.default();\n    this.setCanvasSize();\n    this.loop();\n  }\n\n  clear() {\n    this.ctx.clearRect(0, 0, innerWidth, innerHeight);\n    this.landscapeCtx.clearRect(0, 0, innerWidth, innerHeight);\n  }\n\n  draw() {\n    this.clear();\n    this.landscape.map(piece => piece.draw(this.landscapeCtx, this.camera.getCord()));\n    this.gameObjects.map(object => object.draw(this.ctx, this.camera.getCord()));\n    this.select && this.selection.draw(this.select);\n    this.grid.active() && this.grid.draw(this.locationSize, this.camera.getCord());\n    this.textureParams && this.ctx.drawImage(this.textureParams.texture, this.clientCursorPosition.x, this.clientCursorPosition.y, this.textureParams.w, this.textureParams.h);\n  }\n\n  loop() {\n    this.draw();\n    !this.cancelLoop && requestAnimationFrame(() => this.loop());\n  }\n\n}\n\n//# sourceURL=webpack://map-drawing/./src/locationConstructor/index.js?");

/***/ }),

/***/ "./src/locationConstructor/methods/init.js":
/*!*************************************************!*\
  !*** ./src/locationConstructor/methods/init.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"collisionElement\": () => /* binding */ collisionElement,\n/* harmony export */   \"getImages\": () => /* binding */ getImages,\n/* harmony export */   \"getDirectories\": () => /* binding */ getDirectories,\n/* harmony export */   \"submitingForm\": () => /* binding */ submitingForm\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../image */ \"./src/image/index.js\");\n\n\n\nfunction clearNode(parent) {\n  while (parent.firstChild) {\n    parent.removeChild(parent.lastChild);\n  }\n}\n\nfunction collisionElement() {\n  const collision = document.querySelector(\"#landscape-checkbox\");\n  collision.addEventListener(\"click\", () => {\n    collision.firstChild.toggleAttribute(\"checked\");\n    this.loadDir = this.loadDir === \"landscape\" ? \"gameObjects\" : \"landscape\";\n  });\n} // COLLISON\n\nfunction getImages(directory) {\n  axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/openDirectory?dir=${directory}`).then(({\n    data\n  }) => {\n    const uploadTo = document.querySelector(\".uploaded-image\");\n    const exitUp = document.createElement(\"img\");\n    clearNode(uploadTo);\n    exitUp.classList.add(\"exit-up\");\n    exitUp.src = \"assets/exitUp.png\";\n    exitUp.addEventListener(\"click\", () => {\n      clearNode(uploadTo);\n      this.getDirectories();\n    });\n    uploadTo.prepend(exitUp);\n    data.map(image => {\n      const src = `${directory}/${image}`;\n      this.assets.push(new _image__WEBPACK_IMPORTED_MODULE_1__.default().init(src, this.selectTexture, this));\n    });\n  });\n} // GET IMAGES\n\nfunction getDirectories() {\n  axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"/directories\").then(({\n    data\n  }) => {\n    data.map(directory => {\n      const src = `assets/mapTextures/${directory}`;\n      const uploadTo = document.querySelector(\".uploaded-image\");\n      const dirHTML = document.createElement(\"div\");\n      const img = document.createElement(\"img\");\n      const dirNameHTML = document.createElement(\"span\");\n      dirNameHTML.classList.add(\"dir-name\");\n      dirNameHTML.innerText = directory;\n      img.src = \"assets/directory.png\";\n      dirHTML.classList.add(\"directory\");\n      dirHTML.append(dirNameHTML);\n      dirHTML.append(img);\n      dirHTML.addEventListener(\"click\", () => {\n        this.getImages(src);\n        this.objectType = directory; // В какой из 2х массивов закидывать текстуру\n\n        this.textureParams = null;\n      });\n      uploadTo.append(dirHTML);\n    });\n  });\n} // GET DIRECTORIES\n\nfunction submitingForm() {\n  document.querySelector(\"form\").addEventListener(\"submit\", e => {\n    const fd = new FormData();\n    const filesInput = document.querySelector(\".input-upload_images\");\n    fd.append(\"flag\", this.loadDir);\n\n    for (let i = 0; i < filesInput.files.length; i++) fd.append(\"images\", filesInput.files[i]);\n\n    axios__WEBPACK_IMPORTED_MODULE_0___default().post(\"/upload\", fd).then(({\n      data\n    }) => {\n      let src = `assets/mapTextures/${this.loadDir}/`;\n      data.map(image => {\n        this.assets.push(new _image__WEBPACK_IMPORTED_MODULE_1__.default().init(src + image, this.selectTexture, this));\n      });\n      this.getImages(src);\n    });\n    e.preventDefault();\n  });\n} // SUBMITING FORM\n\n//# sourceURL=webpack://map-drawing/./src/locationConstructor/methods/init.js?");

/***/ }),

/***/ "./src/locationConstructor/methods/listeners.js":
/*!******************************************************!*\
  !*** ./src/locationConstructor/methods/listeners.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _gameObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../gameObjects */ \"./src/gameObjects/index.js\");\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  window.addEventListener(\"mousemove\", e => {\n    this.clientCursorPosition = {\n      x: e.clientX,\n      y: e.clientY\n    };\n  });\n  window.addEventListener(\"keydown\", e => {\n    this.keydown[e.key] = true;\n    if (this.keydown[\"Escape\"]) delete this.textureParams;\n\n    if (this.keydown[\"Delete\"] && this.selectedObjects.length) {\n      this.gameObjects = this.objectType === \"gameObjects\" ? this.gameObjects.filter(obj => {\n        return this.selectedObjects.indexOf(obj) == -1;\n      }) : this.gameObjects;\n      this.landscape = this.objectType === \"landscape\" ? this.landscape.filter(obj => {\n        return this.selectedObjects.indexOf(obj) == -1;\n      }) : this.landscape;\n      this.selectedObjects = [];\n    }\n\n    if (this.keydown['Control'] && this.keydown['v']) {\n      if (this.textureParams && this.selectedArea) {\n        const w = this.selectedArea.x2 - this.selectedArea.x1;\n        const h = this.selectedArea.y2 - this.selectedArea.y1;\n\n        for (let i = 0; i < w / 60; i++) {\n          for (let j = 0; j < h / 60; j++) {\n            const {\n              x,\n              y\n            } = this.grid.attraction(this.selectedArea.x1, this.selectedArea.y1);\n            let gameObject = new _gameObjects__WEBPACK_IMPORTED_MODULE_0__.default(x + i * 60, y + j * 60, this.textureParams);\n            this.landscape ? this.landscape.push(gameObject) : this.gameObjects.push(gameObject);\n          }\n        }\n      }\n    }\n\n    if (this.keydown['Control'] && this.keydown['a']) {\n      this.selectedArea = this.selection.select({\n        x1: 0,\n        y1: 0,\n        x2: this.locationSize.width,\n        y2: this.locationSize.height\n      }, this.camera.getCord());\n    }\n  });\n  window.addEventListener(\"keyup\", e => {\n    delete this.keydown[e.key];\n  });\n  this.cnv.addEventListener(\"mousemove\", e => {\n    const {\n      clientX,\n      clientY\n    } = e;\n\n    if (this.select !== undefined) {\n      this.select.x2 = clientX;\n      this.select.y2 = clientY;\n    }\n\n    if (this.moveCamera !== undefined) {\n      this.moveCamera.endPointX = clientX;\n      this.moveCamera.endPointY = clientY;\n      const {\n        startPointX,\n        startPointY,\n        endPointX,\n        endPointY\n      } = this.moveCamera;\n      let offsetX = startPointX - endPointX,\n          offsetY = startPointY - endPointY;\n      this.camera.moveCamera(this.locationSize, offsetX, offsetY);\n      this.moveCamera.startPointX = clientX;\n      this.moveCamera.startPointY = clientY;\n    }\n  });\n  this.cnv.addEventListener(\"mousedown\", e => {\n    this.selectedObjects.length && this.selectedObjects.map(i => i.selectCancel());\n\n    switch (e.button) {\n      case 0:\n        const x = e.clientX + this.camera.getCord().x;\n        const y = e.clientY + this.camera.getCord().y;\n\n        if (this.selection.active()) {\n          this.select = {\n            x1: e.clientX,\n            y1: e.clientY\n          };\n          return;\n        }\n\n        if (this.textureParams) {\n          const gridCellCord = this.grid.attraction(x, y);\n          const gameObject = new _gameObjects__WEBPACK_IMPORTED_MODULE_0__.default(gridCellCord.x, gridCellCord.y, this.textureParams);\n          this.objectType === \"landscape\" ? this.landscape.push(gameObject) : this.gameObjects.push(gameObject);\n        }\n\n        break;\n\n      case 2:\n        this.moveCamera = {\n          startPointX: e.clientX,\n          startPointY: e.clientY\n        };\n        break;\n    }\n  });\n  this.cnv.addEventListener(\"mouseup\", e => {\n    e.button == 2 && delete this.moveCamera;\n\n    if (e.button == 0) {\n      if (this.select) {\n        this.selectedArea = this.selection.select(this.select, this.camera.getCord());\n        const {\n          x1,\n          y1,\n          x2,\n          y2\n        } = this.selectedArea;\n        this.selectedObjects = this.objectType === \"landscape\" ? this.landscape.filter(piece => {\n          const {\n            w,\n            h\n          } = piece.getSize();\n          const {\n            y,\n            x\n          } = piece.getCord();\n          return y < y2 && y + h > y1 && x < x2 && x + w > x1;\n        }) : this.gameObjects.filter(object => {\n          const {\n            w,\n            h\n          } = object.getSize();\n          const {\n            y,\n            x\n          } = object.getCord();\n          return y < y2 && y + h > y1 && x < x2 && x + w > x1;\n        });\n        this.selectedObjects.map(i => i.select());\n        delete this.select;\n      }\n    }\n  });\n}\n\n//# sourceURL=webpack://map-drawing/./src/locationConstructor/methods/listeners.js?");

/***/ }),

/***/ "./src/locationConstructor/methods/save.js":
/*!*************************************************!*\
  !*** ./src/locationConstructor/methods/save.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  const saveBtn = document.querySelector(\".save\");\n  saveBtn.addEventListener(\"click\", () => {\n    const locName = prompt(\"Enter location name\");\n\n    if (locName.length) {\n      this.cancelLoop = true;\n      const map = {\n        locSize: this.locationSize,\n        landscape: this.landscape.map(piece => {\n          return piece.build();\n        }),\n        gameObjects: this.gameObjects.map(piece => {\n          return piece.build();\n        })\n      };\n      axios__WEBPACK_IMPORTED_MODULE_0___default().post(`/save?locname=${locName}`, JSON.stringify(map), {\n        headers: {\n          'Content-Type': 'application/json'\n        }\n      }).then(({\n        data\n      }) => {\n        alert(data);\n      });\n    }\n\n    this.cancelLoop = false;\n  });\n}\n\n//# sourceURL=webpack://map-drawing/./src/locationConstructor/methods/save.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/index.scss */ \"./src/scss/index.scss\");\n/* harmony import */ var _locationConstructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locationConstructor */ \"./src/locationConstructor/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst cnv = document.querySelector(\"#main\");\nconst ctx = cnv.getContext(\"2d\");\nconst landscape = document.querySelector(\"#landscape\");\nconst landscapeCtx = landscape.getContext(\"2d\");\n\nfunction toggleMenu() {\n  const openBtn = document.querySelector(\".open\");\n  const menu = document.querySelector(\".menu-wrapper\");\n  openBtn.addEventListener(\"click\", () => {\n    menu.classList.toggle(\"active\");\n    openBtn.classList.toggle(\"active\");\n  });\n}\n\nfunction modalRender() {\n  const modal = document.createElement(\"div\");\n  modal.classList.add(\"canvas-size-wrapper\");\n  let formHTML = `\n        <input type=\"text\" class=\"canvas-size-input\" value=\"5000\" id=\"width\" placeholder=\"Canvas Width\">\n        <input type=\"text\" class=\"canvas-size-input\" value=\"5000\" id=\"height\" placeholder=\"Canvas Height\">\n        <button class=\"button canvas-size\">Set canvas size</button>\n\n        <input type=\"file\" id=\"load-map\" name=\"map-loader\">\n        <button id=\"load\">load</load>\n    `;\n  modal.innerHTML = formHTML;\n  document.querySelector(\"body\").prepend(modal);\n}\n\nfunction canvasInit() {\n  const inputs = document.querySelectorAll(\".canvas-size-input\");\n  const btn = document.querySelector(\".canvas-size\");\n  const loadBtn = document.querySelector(\"#load\");\n\n  for (let input of inputs) {\n    input.addEventListener(\"input\", e => {\n      e.target.value = e.target.value.replace(/\\D/g, '');\n    });\n  }\n\n  loadBtn.addEventListener(\"click\", e => {\n    const file = document.querySelector(\"#load-map\");\n    const data = {\n      filename: file.files[0].name\n    };\n\n    if (data.filename.split('.')[1] !== \"json\") {\n      alert(\"Choose .json file\");\n      return;\n    }\n\n    axios__WEBPACK_IMPORTED_MODULE_2___default().post(\"/loadMap\", JSON.stringify(data), {\n      headers: {\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(({\n      data\n    }) => {\n      console.log(data);\n      const sizes = {\n        width: data.locSize.width,\n        height: data.locSize.height\n      };\n      const loaded = {\n        landscape: data.landscape,\n        gameObjects: data.gameObjects\n      };\n      toggleMenu();\n      document.querySelector(\".canvas-size-wrapper\").remove();\n      new _locationConstructor__WEBPACK_IMPORTED_MODULE_1__.default(cnv, ctx, landscape, landscapeCtx, sizes).init(loaded);\n    });\n  });\n  btn.addEventListener(\"click\", () => {\n    let sizes = {};\n\n    for (let input of inputs) {\n      if (input.value > 50000 || input.value < 1000) {\n        alert(\"Enter canvas size in range: [1000;50000]\");\n        return;\n      }\n\n      sizes[input.getAttribute(\"id\")] = Math.floor(+input.value);\n    }\n\n    document.querySelector(\".canvas-size-wrapper\").remove();\n    toggleMenu();\n    new _locationConstructor__WEBPACK_IMPORTED_MODULE_1__.default(cnv, ctx, landscape, landscapeCtx, sizes).init();\n  });\n}\n\nfunction preloader() {\n  return new Promise((resolve, reject) => {\n    if (document.readyState || document.body.readyState === \"complete\") {\n      modalRender();\n      resolve();\n    }\n  });\n}\n\npreloader().then(() => {\n  document.querySelector(\"body\").oncontextmenu = () => false;\n\n  canvasInit();\n  document.querySelector(\".loader\").remove();\n});\n\n//# sourceURL=webpack://map-drawing/./src/main.js?");

/***/ }),

/***/ "./src/tools/grid/index.js":
/*!*********************************!*\
  !*** ./src/tools/grid/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Grid\n/* harmony export */ });\nclass Grid {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.gridStep = 20;\n    this.activity = true;\n    this.init();\n  }\n\n  init() {\n    const gridCheckbox = document.querySelector(\"#turn-grid\");\n    this.activity && gridCheckbox.setAttribute(\"checked\", '');\n    gridCheckbox.addEventListener(\"change\", () => {\n      this.toggleGrid();\n    });\n  }\n\n  toggleGrid() {\n    this.activity = !this.activity;\n  }\n\n  active() {\n    return this.activity;\n  }\n\n  attraction(locationX, locationY) {\n    if (!this.activity) return {\n      x: locationX,\n      y: locationY\n    };\n    const calcGridCellX = Math.floor(locationX / this.gridStep);\n    const calcGridCellY = Math.floor(locationY / this.gridStep);\n    const cellCord = {\n      x: this.gridStep * calcGridCellX,\n      y: this.gridStep * calcGridCellY\n    };\n    return cellCord;\n  }\n\n  draw(locSize, cameraCord) {\n    const cols = locSize.width / this.gridStep;\n    const rows = locSize.height / this.gridStep;\n    this.ctx.strokeStyle = \"rgba(0,0,0,.5)\";\n    this.ctx.lineWidth = .3;\n    this.ctx.globalCompositeOperation = \"source-over\";\n\n    for (let i = 0; i < cols; i++) {\n      for (let j = 0; j < rows; j++) {\n        let x = i * this.gridStep;\n        let y = j * this.gridStep;\n\n        if (x + this.gridStep <= cameraCord.x + innerWidth + this.gridStep && x >= cameraCord.x - this.gridStep && y + this.gridStep <= cameraCord.y + innerWidth + this.gridStep && y >= cameraCord.y - this.gridStep) {\n          this.ctx.strokeRect(x - cameraCord.x, y - cameraCord.y, this.gridStep, this.gridStep);\n        }\n      }\n    }\n  }\n\n}\n\n//# sourceURL=webpack://map-drawing/./src/tools/grid/index.js?");

/***/ }),

/***/ "./src/tools/selection/index.js":
/*!**************************************!*\
  !*** ./src/tools/selection/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Selection\n/* harmony export */ });\nclass Selection {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.fillStyle = \"rgba(0, 17, 204, 0.3)\";\n    this.activity = false;\n    this.init();\n  }\n\n  init() {\n    const selectionCheckbox = document.querySelector(\"#turn-select\");\n    selectionCheckbox.addEventListener(\"change\", () => {\n      this.toggleSelection();\n    });\n  }\n\n  active() {\n    return this.activity;\n  }\n\n  toggleSelection() {\n    this.activity = !this.activity;\n  }\n\n  select({\n    x1,\n    y1,\n    x2,\n    y2\n  }, {\n    x,\n    y\n  }) {\n    x1 += x;\n    x2 += x;\n    y1 += y;\n    y2 += y;\n    return {\n      x1,\n      y1,\n      x2,\n      y2\n    };\n  }\n\n  draw({\n    x1,\n    y1,\n    x2,\n    y2\n  }) {\n    this.ctx.globalCompositeOperation = \"source-over\";\n    this.ctx.fillStyle = this.fillStyle;\n    let w = x2 - x1;\n    let h = y2 - y1;\n    this.ctx.fillRect(x1, y1, w, h);\n  }\n\n}\n\n//# sourceURL=webpack://map-drawing/./src/tools/selection/index.js?");

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://map-drawing/./src/scss/index.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;