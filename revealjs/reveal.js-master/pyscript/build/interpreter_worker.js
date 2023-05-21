(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/logger.ts
  var _cache = /* @__PURE__ */ new Map();
  function getLogger(prefix) {
    let logger4 = _cache.get(prefix);
    if (logger4 === void 0) {
      logger4 = _makeLogger(prefix);
      _cache.set(prefix, logger4);
    }
    return logger4;
  }
  function _makeLogger(prefix) {
    prefix = `[${prefix}] `;
    function make(level) {
      const out_fn = console[level].bind(console);
      function fn(fmt, ...args) {
        out_fn(prefix + fmt, ...args);
      }
      return fn;
    }
    const debug = make("debug");
    const info = make("info");
    const warn = make("warn");
    const error = make("error");
    return { debug, info, warn, error };
  }

  // src/version.ts
  var version = "2022.12.1.dev";

  // src/exceptions.ts
  var CLOSEBUTTON = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill="currentColor" width="12px"><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/></svg>`;
  var UserError = class extends Error {
    constructor(errorCode, message, t = "text") {
      super(message);
      this.errorCode = errorCode;
      this.name = "UserError";
      this.messageType = t;
      this.message = `(${errorCode}): ${message}`;
      this.$$isUserError = true;
    }
  };
  var FetchError = class extends UserError {
    constructor(errorCode, message) {
      super(errorCode, message);
      this.name = "FetchError";
    }
  };
  var InstallError = class extends UserError {
    constructor(errorCode, message) {
      super(errorCode, message);
      this.name = "InstallError";
    }
  };
  function _createAlertBanner(message, level = "error", messageType = "text", logMessage = true) {
    switch (`log-${level}-${logMessage}`) {
      case "log-error-true":
        console.error(message);
        break;
      case "log-warning-true":
        console.warn(message);
        break;
    }
    const banner = document.createElement("div");
    banner.className = `alert-banner py-${level}`;
    if (messageType === "html") {
      banner.innerHTML = message;
    } else {
      banner.textContent = message;
    }
    if (level === "warning") {
      const closeButton = document.createElement("button");
      closeButton.id = "alert-close-button";
      closeButton.addEventListener("click", () => {
        banner.remove();
      });
      closeButton.innerHTML = CLOSEBUTTON;
      banner.appendChild(closeButton);
    }
    document.body.prepend(banner);
  }

  // src/fetch.ts
  async function robustFetch(url, options) {
    let response;
    try {
      response = await fetch(url, options);
    } catch (err) {
      const error = err;
      let errMsg;
      if (url.startsWith("http")) {
        errMsg = `Fetching from URL ${url} failed with error '${error.message}'. Are your filename and path correct?`;
      } else {
        errMsg = `PyScript: Access to local files
        (using [[fetch]] configurations in &lt;py-config&gt;)
        is not available when directly opening a HTML file;
        you must use a webserver to serve the additional files.
        See <a style="text-decoration: underline;" href="https://github.com/pyscript/pyscript/issues/257#issuecomment-1119595062">this reference</a>
        on starting a simple webserver with Python.
            `;
      }
      throw new FetchError("PY0001" /* FETCH_ERROR */, errMsg);
    }
    if (!response.ok) {
      const errorMsg = `Fetching from URL ${url} failed with error ${response.status} (${response.statusText}). Are your filename and path correct?`;
      switch (response.status) {
        case 404:
          throw new FetchError("PY0404" /* FETCH_NOT_FOUND_ERROR */, errorMsg);
        case 401:
          throw new FetchError("PY0401" /* FETCH_UNAUTHORIZED_ERROR */, errorMsg);
        case 403:
          throw new FetchError("PY0403" /* FETCH_FORBIDDEN_ERROR */, errorMsg);
        case 500:
          throw new FetchError("PY0500" /* FETCH_SERVER_ERROR */, errorMsg);
        case 503:
          throw new FetchError("PY0503" /* FETCH_UNAVAILABLE_ERROR */, errorMsg);
        default:
          throw new FetchError("PY0001" /* FETCH_ERROR */, errorMsg);
      }
    }
    return response;
  }

  // node_modules/synclink/dist/esm/synclink.mjs
  var synclink_exports = {};
  __export(synclink_exports, {
    FakeMessageChannel: () => FakeMessageChannel,
    Syncifier: () => Syncifier,
    createEndpoint: () => createEndpoint,
    expose: () => expose,
    interrupt_buffer: () => interrupt_buffer,
    proxy: () => proxy,
    proxyMarker: () => proxyMarker,
    releaseProxy: () => releaseProxy,
    setInterruptHandler: () => setInterruptHandler,
    transfer: () => transfer,
    transferHandlers: () => transferHandlers,
    windowEndpoint: () => windowEndpoint,
    wrap: () => wrap
  });
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __pow = Math.pow;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b ||= {})
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var wireValueTypeRecord = {
    [
      "RAW"
      /* RAW */
    ]: 1,
    [
      "PROXY"
      /* PROXY */
    ]: 1,
    [
      "THROW"
      /* THROW */
    ]: 1,
    [
      "HANDLER"
      /* HANDLER */
    ]: 1,
    [
      "ID"
      /* ID */
    ]: 1
  };
  var wireValueTypeSet = new Set(
    Object.keys(wireValueTypeRecord)
  );
  var messageTypeRecord = {
    [
      "SET"
      /* SET */
    ]: 1,
    [
      "GET"
      /* GET */
    ]: 1,
    [
      "APPLY"
      /* APPLY */
    ]: 1,
    [
      "CONSTRUCT"
      /* CONSTRUCT */
    ]: 1,
    [
      "ENDPOINT"
      /* ENDPOINT */
    ]: 1,
    [
      "RELEASE"
      /* RELEASE */
    ]: 1,
    [
      "DESTROY"
      /* DESTROY */
    ]: 1
  };
  var messageTypeSet = new Set(Object.keys(messageTypeRecord));
  function requestResponseMessageInner(ep) {
    const id = generateUUID();
    return [
      id,
      new Promise((resolve) => {
        ep.addEventListener("message", /* @__PURE__ */ __name(function l(ev) {
          if (!ev.data || !ev.data.id || ev.data.id !== id) {
            return;
          }
          ep.removeEventListener("message", l);
          resolve(ev.data);
        }, "l"));
        if (ep.start) {
          ep.start();
        }
      })
    ];
  }
  __name(requestResponseMessageInner, "requestResponseMessageInner");
  function requestResponseMessage(ep, msg, transfers) {
    let [id, promise] = requestResponseMessageInner(ep);
    ep.postMessage(__spreadValues({ id }, msg), transfers);
    return promise;
  }
  __name(requestResponseMessage, "requestResponseMessage");
  var UUID_LENGTH = 63;
  function randomSegment() {
    let result = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
    let pad = 15 - result.length;
    if (pad > 0) {
      result = Array.from({ length: pad }, (_) => 0).join("") + result;
    }
    return result;
  }
  __name(randomSegment, "randomSegment");
  function generateUUID() {
    let result = Array.from({ length: 4 }, randomSegment).join("-");
    if (result.length !== UUID_LENGTH) {
      throw new Error("synclink internal error: UUID has the wrong length");
    }
    return result;
  }
  __name(generateUUID, "generateUUID");
  var createEndpoint = Symbol("Synclink.endpoint");
  var releaseProxy = Symbol("Synclink.releaseProxy");
  var proxyMarker = Symbol("Synclink.proxy");
  var temp;
  if (typeof SharedArrayBuffer === "undefined") {
    temp = ArrayBuffer;
  } else {
    temp = SharedArrayBuffer;
  }
  var shared_array_buffer_default = temp;
  var decoder = new TextDecoder("utf-8");
  var encoder = new TextEncoder();
  var SZ_BUF_SIZE_IDX = 0;
  var SZ_BUF_FITS_IDX = 1;
  var SZ_BUF_DOESNT_FIT = 0;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  __name(sleep, "sleep");
  var SynclinkTask = class {
    constructor(endpoint, msg, transfers = [], extra = () => {
    }) {
      this.endpoint = endpoint;
      this.msg = msg;
      this.extra = extra;
      this.transfers = transfers;
      this._resolved = false;
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
    }
    schedule_async() {
      if (this.mode === "async") {
        return this;
      }
      if (this.mode === "sync") {
        throw new Error("Already synchronously scheduled");
      }
      this.mode = "async";
      this.do_async().then(
        (value) => {
          this._resolved = true;
          this._result = value;
          this._resolve(value);
        },
        (reason) => {
          this._exception = reason;
          this._reject(reason);
        }
      );
      return this;
    }
    then(onfulfilled, onrejected) {
      return __async(this, null, function* () {
        this.schedule_async();
        return this._promise.then(onfulfilled, onrejected);
      });
    }
    catch(onrejected) {
      this.schedule_async();
      return this._promise.catch(onrejected);
    }
    finally(onfinally) {
      this.schedule_async();
      return this._promise.finally(onfinally);
    }
    schedule_sync() {
      if (this.mode === "sync") {
        return this;
      }
      if (this.mode === "async") {
        throw new Error("Already asynchronously scheduled");
      }
      this.mode = "sync";
      Syncifier.scheduleTask(this);
      this._sync_gen = this.do_sync();
      this._sync_gen.next();
      return this;
    }
    isResolved() {
      return this._resolved;
    }
    poll() {
      if (this.mode != "sync") {
        throw new Error("Task not synchronously scheduled");
      }
      let { done, value } = this._sync_gen.next();
      if (!done) {
        return false;
      }
      try {
        this._resolved = true;
        this._result = fromWireValue(this.endpoint, value);
      } catch (e) {
        console.warn("synclink exception:", e);
        this._exception = e;
      }
      return true;
    }
    *do_sync() {
      let { endpoint, msg, transfers } = this;
      let size_buffer = new Int32Array(new shared_array_buffer_default(8));
      let signal_buffer = this.signal_buffer;
      let taskId = this.taskId;
      let data_buffer = acquireDataBuffer(UUID_LENGTH);
      endpoint.postMessage(
        __spreadProps(__spreadValues({}, msg), {
          size_buffer,
          data_buffer,
          signal_buffer,
          taskId,
          syncify: true
        }),
        transfers
      );
      yield;
      if (Atomics.load(size_buffer, SZ_BUF_FITS_IDX) === SZ_BUF_DOESNT_FIT) {
        const id = decoder.decode(data_buffer.slice(0, UUID_LENGTH));
        releaseDataBuffer(data_buffer);
        const size2 = Atomics.load(size_buffer, SZ_BUF_SIZE_IDX);
        data_buffer = acquireDataBuffer(size2);
        endpoint.postMessage({ id, data_buffer });
        yield;
      }
      const size = Atomics.load(size_buffer, SZ_BUF_SIZE_IDX);
      return JSON.parse(decoder.decode(data_buffer.slice(0, size)));
    }
    do_async() {
      return __async(this, null, function* () {
        let result = yield requestResponseMessage(
          this.endpoint,
          this.msg,
          this.transfers
        );
        this.extra();
        return fromWireValue(this.endpoint, result);
      });
    }
    get result() {
      if (this._exception) {
        throw this._exception;
      }
      if (this.isResolved()) {
        return this._result;
      }
      throw new Error("Not ready.");
    }
    syncify() {
      this.schedule_sync();
      Syncifier.syncifyTask(this);
      return this.result;
    }
  };
  __name(SynclinkTask, "SynclinkTask");
  function signalRequester(signal_buffer, taskId) {
    return __async(this, null, function* () {
      let index = (taskId >> 1) % 32;
      let sleepTime = 1;
      while (Atomics.compareExchange(signal_buffer, index + 1, 0, taskId) !== 0) {
        yield sleep(sleepTime);
        if (sleepTime < 32) {
          sleepTime *= 2;
        }
      }
      Atomics.or(signal_buffer, 0, 1 << index);
      Atomics.notify(signal_buffer, 0);
    });
  }
  __name(signalRequester, "signalRequester");
  function syncResponse(endpoint, msg, returnValue) {
    return __async(this, null, function* () {
      try {
        let { size_buffer, data_buffer, signal_buffer, taskId } = msg;
        let bytes = encoder.encode(JSON.stringify(returnValue));
        let fits = bytes.length <= data_buffer.length;
        Atomics.store(size_buffer, SZ_BUF_SIZE_IDX, bytes.length);
        Atomics.store(size_buffer, SZ_BUF_FITS_IDX, +fits);
        if (!fits) {
          let [uuid, data_promise] = requestResponseMessageInner(endpoint);
          data_buffer.set(encoder.encode(uuid));
          yield signalRequester(signal_buffer, taskId);
          data_buffer = (yield data_promise).data_buffer;
        }
        data_buffer.set(bytes);
        Atomics.store(size_buffer, SZ_BUF_FITS_IDX, 1);
        yield signalRequester(signal_buffer, taskId);
      } catch (e) {
        console.warn(e);
      }
    });
  }
  __name(syncResponse, "syncResponse");
  var dataBuffers = [];
  function acquireDataBuffer(size) {
    let powerof2 = Math.ceil(Math.log2(size));
    if (!dataBuffers[powerof2]) {
      dataBuffers[powerof2] = [];
    }
    let result = dataBuffers[powerof2].pop();
    if (result) {
      result.fill(0);
      return result;
    }
    return new Uint8Array(new shared_array_buffer_default(__pow(2, powerof2)));
  }
  __name(acquireDataBuffer, "acquireDataBuffer");
  function releaseDataBuffer(buffer) {
    let powerof2 = Math.ceil(Math.log2(buffer.byteLength));
    dataBuffers[powerof2].push(buffer);
  }
  __name(releaseDataBuffer, "releaseDataBuffer");
  var interrupt_buffer = new Int32Array(new shared_array_buffer_default(4));
  var handleInterrupt = /* @__PURE__ */ __name(() => {
    interrupt_buffer[0] = 0;
    throw new Error("Interrupted!");
  }, "handleInterrupt");
  function setInterruptHandler(handler) {
    handleInterrupt = handler;
  }
  __name(setInterruptHandler, "setInterruptHandler");
  var _Syncifier = class {
    constructor() {
      this.nextTaskId = new Int32Array([1]);
      this.signal_buffer = new Int32Array(new shared_array_buffer_default(32 * 4 + 4));
      this.tasks = /* @__PURE__ */ new Map();
    }
    scheduleTask(task) {
      task.taskId = this.nextTaskId[0];
      this.nextTaskId[0] += 2;
      task.signal_buffer = this.signal_buffer;
      this.tasks.set(task.taskId, task);
    }
    waitOnSignalBuffer() {
      let timeout = 50;
      while (true) {
        let status = Atomics.wait(this.signal_buffer, 0, 0, timeout);
        switch (status) {
          case "ok":
          case "not-equal":
            return;
          case "timed-out":
            if (interrupt_buffer[0] !== 0) {
              handleInterrupt();
            }
            break;
          default:
            throw new Error("Unreachable");
        }
      }
    }
    *tasksIdsToWakeup() {
      let flag = Atomics.load(this.signal_buffer, 0);
      for (let i = 0; i < 32; i++) {
        let bit = 1 << i;
        if (flag & bit) {
          Atomics.and(this.signal_buffer, 0, ~bit);
          let wokenTask = Atomics.exchange(this.signal_buffer, i + 1, 0);
          yield wokenTask;
        }
      }
    }
    pollTasks(task) {
      let result = false;
      for (let wokenTaskId of this.tasksIdsToWakeup()) {
        let wokenTask = this.tasks.get(wokenTaskId);
        if (!wokenTask) {
          throw new Error(`Assertion error: unknown taskId ${wokenTaskId}.`);
        }
        if (wokenTask.poll()) {
          this.tasks.delete(wokenTaskId);
          if (wokenTask === task) {
            result = true;
          }
        }
      }
      return result;
    }
    syncifyTask(task) {
      while (true) {
        if (this.pollTasks(task)) {
          return;
        }
        if (task.endpoint._bypass) {
          throw new Error("oops!");
        }
        this.waitOnSignalBuffer();
      }
    }
  };
  __name(_Syncifier, "_Syncifier");
  var Syncifier = new _Syncifier();
  (/* @__PURE__ */ __name(function syncifyPollLoop() {
    return __async(this, null, function* () {
      while (true) {
        Syncifier.pollTasks();
        yield sleep(20);
      }
    });
  }, "syncifyPollLoop"))();
  function innerMessageHandler(obj_arg, ep, message) {
    const { id, path, store_key } = __spreadValues({
      path: [],
      store_key: void 0
    }, message);
    let obj;
    if (store_key) {
      obj = storeGetValue(ep, store_key);
    } else {
      obj = obj_arg;
    }
    if (obj_arg === void 0 && store_key === void 0) {
      console.warn(obj_arg, message);
      throw new Error("Internal synclink error!");
    }
    const argumentList = (message.argumentList || []).map((v) => {
      if (v.type === "PROXY") {
        return innerMessageHandler(obj_arg, ep, v.message);
      } else {
        return fromWireValue(ep, v);
      }
    });
    const last = path.pop();
    let parent = path.reduce((obj2, prop) => obj2[prop], obj);
    const rawValue = last ? parent[last] : obj;
    if (!last) {
      parent = void 0;
    }
    if (rawValue === void 0) {
      switch (message.type) {
        case "GET":
        case "SET":
          break;
        default:
          console.warn("Undefined", obj, path, last);
          throw new Error(`undefined!! ${obj}, ${path}, ${last}`);
      }
    }
    switch (message.type) {
      case "GET":
        {
          return rawValue;
        }
        break;
      case "SET":
        {
          parent[last] = fromWireValue(ep, message.value);
          return true;
        }
        break;
      case "APPLY":
        {
          if (last) {
            return parent[last].apply(parent, argumentList);
          } else {
            return rawValue.apply(parent, argumentList);
          }
        }
        break;
      case "CONSTRUCT":
        {
          const value = new rawValue(...argumentList);
          return proxy(value);
        }
        break;
      case "ENDPOINT":
        {
          const { port1, port2 } = new MessageChannel();
          expose(obj, port2);
          return transfer(port1, [port1]);
        }
        break;
      case "RELEASE":
        {
          return void 0;
        }
        break;
      case "DESTROY":
        {
          storeDeleteKey(ep, store_key);
          return void 0;
        }
        break;
      default:
        return void 0;
    }
  }
  __name(innerMessageHandler, "innerMessageHandler");
  function expose(obj_arg, ep = globalThis) {
    const wrap2 = false;
    exposeInner(obj_arg, ep, wrap2);
  }
  __name(expose, "expose");
  function exposeInner(obj_arg, ep = globalThis, wrap2) {
    storeCreate(ep);
    ep.addEventListener("message", /* @__PURE__ */ __name(function callback(ev) {
      return __async(this, null, function* () {
        if (!ev || !ev.data) {
          return;
        }
        if (!messageTypeSet.has(ev.data.type)) {
          if (!wireValueTypeSet.has(ev.data.type) && !ev.data.data_buffer) {
            console.warn("Internal error on message:", ev.data);
            throw new Error(
              `Synclink Internal error: Expected message.type to either be a MessageType or a WireValueType, got '${ev.data.type}'`
            );
          }
          return;
        }
        const message = ev.data;
        const { id, type, store_key } = __spreadValues({ store_key: void 0 }, message);
        if (wrap2 && store_key === void 0) {
          return;
        }
        const sync = ev.data.syncify;
        let returnValue;
        try {
          returnValue = innerMessageHandler(obj_arg, ep, message);
          if (returnValue && returnValue.then) {
            if (sync && ep._bypass) {
              throw new Error("Cannot use syncify with bypass on an async method");
            }
            returnValue = yield returnValue;
          }
        } catch (value) {
          returnValue = { value, [throwMarker]: 0 };
        }
        const [wireValue, transferables] = toWireValue(ep, returnValue);
        if (sync) {
          syncResponse(ep, ev.data, wireValue);
        } else {
          ep.postMessage(__spreadProps(__spreadValues({}, wireValue), { id }), transferables);
        }
        if (type === "RELEASE") {
          ep.removeEventListener("message", callback);
          closeEndPoint(ep);
        }
      });
    }, "callback"));
    if (ep.start) {
      ep.start();
    }
  }
  __name(exposeInner, "exposeInner");
  function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
  }
  __name(isMessagePort, "isMessagePort");
  function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
      endpoint.close();
  }
  __name(closeEndPoint, "closeEndPoint");
  function wrap(ep, target) {
    const wrap2 = true;
    exposeInner(void 0, ep, wrap2);
    return createProxy(ep, { target });
  }
  __name(wrap, "wrap");
  function throwIfProxyReleased(isReleased) {
    if (isReleased) {
      throw new Error("Proxy has been released and is not usable");
    }
  }
  __name(throwIfProxyReleased, "throwIfProxyReleased");
  function createProxy(ep, {
    store_key = void 0,
    path = [],
    target = /* @__PURE__ */ __name(function() {
    }, "target")
  }) {
    let isProxyReleased = false;
    const proxy2 = new Proxy(target, {
      get(_target, prop) {
        throwIfProxyReleased(isProxyReleased);
        switch (prop) {
          case "$$ep":
            return ep;
          case Symbol.toStringTag:
            return "SynclinkProxy";
          case releaseProxy:
            return () => {
              return new SynclinkTask(
                ep,
                {
                  type: "RELEASE",
                  path: path.map((p) => p.toString())
                },
                [],
                () => {
                  closeEndPoint(ep);
                  isProxyReleased = true;
                }
              );
            };
          case "__destroy__":
            if (!store_key) {
              return () => {
              };
            }
            return () => {
              return new SynclinkTask(
                ep,
                {
                  type: "DESTROY",
                  store_key
                },
                [],
                () => {
                  isProxyReleased = true;
                }
              );
            };
          case "_as_message":
            return () => {
              return {
                type: "GET",
                store_key,
                path: path.map((p) => p.toString())
              };
            };
          case "then":
          case "schedule_async":
          case "schedule_sync":
          case "syncify":
            if (path.length === 0 && prop === "then") {
              return { then: () => proxy2 };
            }
            let r = new SynclinkTask(
              ep,
              {
                type: "GET",
                store_key,
                path: path.map((p) => p.toString())
              },
              [],
              void 0
            );
            return r[prop].bind(r);
          default:
            return createProxy(ep, { store_key, path: [...path, prop] });
        }
      },
      set(_target, prop, rawValue) {
        throwIfProxyReleased(isProxyReleased);
        const [value, transferables] = toWireValue(ep, rawValue);
        return requestResponseMessage(
          ep,
          {
            type: "SET",
            store_key,
            path: [...path, prop].map((p) => p.toString()),
            value
          },
          transferables
        ).then((v) => fromWireValue(ep, v));
      },
      apply(_target, _thisArg, rawArgumentList) {
        throwIfProxyReleased(isProxyReleased);
        const last = path[path.length - 1];
        if (last === createEndpoint) {
          return requestResponseMessage(ep, {
            type: "ENDPOINT"
            /* ENDPOINT */
          }).then((v) => fromWireValue(ep, v));
        }
        if (last === "bind") {
          return createProxy(ep, { store_key, path: path.slice(0, -1) });
        }
        if (last === "apply") {
          rawArgumentList = rawArgumentList[1];
          path = path.slice(0, -1);
        }
        const [argumentList, transferables] = processArguments(
          ep,
          rawArgumentList
        );
        return new SynclinkTask(
          ep,
          {
            type: "APPLY",
            store_key,
            path: path.map((p) => p.toString()),
            argumentList
          },
          transferables,
          void 0
        );
      },
      construct(_target, rawArgumentList) {
        throwIfProxyReleased(isProxyReleased);
        const [argumentList, transferables] = processArguments(
          ep,
          rawArgumentList
        );
        return requestResponseMessage(
          ep,
          {
            type: "CONSTRUCT",
            store_key,
            path: path.map((p) => p.toString()),
            argumentList
          },
          transferables
        ).then((v) => fromWireValue(ep, v));
      },
      ownKeys(_target) {
        return [];
      }
    });
    return proxy2;
  }
  __name(createProxy, "createProxy");
  function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
  }
  __name(myFlat, "myFlat");
  function processArguments(ep, argumentList) {
    const processed = argumentList.map((v) => toWireValue(ep, v));
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
  }
  __name(processArguments, "processArguments");
  function windowEndpoint(w, context = self, targetOrigin = "*") {
    return {
      postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
      addEventListener: context.addEventListener.bind(context),
      removeEventListener: context.removeEventListener.bind(context)
    };
  }
  __name(windowEndpoint, "windowEndpoint");
  var FakeMessagePort = class {
    constructor() {
      this._handlers = [];
      this._bypass = true;
      this._otherPort = this;
    }
    start() {
    }
    close() {
    }
    addEventListener(event, handler) {
      if (event === "message") {
        this._handlers.push(handler);
      }
    }
    removeEventListener(event, handler) {
      if (event !== "message") {
        return;
      }
      let idx = this._handlers.indexOf(handler);
      if (idx >= 0) {
        this._handlers.splice(idx, 1);
      }
    }
    postMessage(message, transfer2) {
      for (const h of this._otherPort._handlers) {
        h({ data: message });
      }
    }
  };
  __name(FakeMessagePort, "FakeMessagePort");
  var FakeMessageChannel = class {
    constructor() {
      this.port1 = new FakeMessagePort();
      this.port2 = new FakeMessagePort();
      this.port1._otherPort = this.port2;
      this.port2._otherPort = this.port1;
    }
  };
  __name(FakeMessageChannel, "FakeMessageChannel");
  var throwMarker = Symbol("Synclink.thrown");
  var transferCache = /* @__PURE__ */ new WeakMap();
  function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
  }
  __name(transfer, "transfer");
  var isObject = /* @__PURE__ */ __name((val) => typeof val === "object" && val !== null || typeof val === "function", "isObject");
  var transferHandlers = /* @__PURE__ */ new Map();
  function isArrayBufferOrView(obj) {
    return ArrayBuffer.isView(obj) || Object.prototype.toString.call(obj) === "[object ArrayBuffer]";
  }
  __name(isArrayBufferOrView, "isArrayBufferOrView");
  function isPlain(val) {
    return !val || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val) || isArrayBufferOrView(val) || !val.constructor || val.constructor === Object && Object.prototype.toString.call(val) === "[object Object]";
  }
  __name(isPlain, "isPlain");
  function isSerializable(obj, transfers = []) {
    if (transfers.includes(obj)) {
      return true;
    }
    if (!isPlain(obj)) {
      return false;
    }
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (!isPlain(obj[property])) {
          return false;
        }
        if (typeof obj[property] == "object") {
          if (!isSerializable(obj[property], transfers)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  __name(isSerializable, "isSerializable");
  var throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
      let serialized;
      if (value instanceof Error) {
        serialized = {
          isError: true,
          value: {
            message: value.message,
            name: value.name,
            stack: value.stack
          }
        };
      } else {
        serialized = { isError: false, value };
      }
      return [serialized, []];
    },
    deserialize(serialized) {
      if (serialized.isError) {
        throw Object.assign(
          new Error(serialized.value.message),
          serialized.value
        );
      }
      throw serialized.value;
    }
  };
  function toWireValue(ep, value) {
    if (value && value.$$ep === ep) {
      return [
        {
          type: "PROXY",
          message: value._as_message()
        },
        []
      ];
    }
    if (value && value.constructor && value.constructor.name === "SynclinkTask") {
      return [
        {
          type: "PROXY",
          message: value.msg
        },
        []
      ];
    }
    if (ep._bypass) {
      proxyFakeMessagePort = true;
    }
    try {
      for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
          const [serializedValue, transferables] = handler.serialize(value);
          return [
            {
              type: "HANDLER",
              name,
              value: serializedValue
            },
            transferables
          ];
        }
      }
    } finally {
      proxyFakeMessagePort = false;
    }
    if (isSerializable(value, transferCache.get(value))) {
      return [
        {
          type: "RAW",
          value
        },
        transferCache.get(value) || []
      ];
    }
    let store_key = storeNewValue(ep, value);
    return [
      {
        type: "ID",
        store_key,
        endpoint_uuid: ep[endpointUUID],
        ownkeys: Object.getOwnPropertyNames(value)
      },
      []
    ];
  }
  __name(toWireValue, "toWireValue");
  function fromWireValue(ep, value) {
    switch (value.type) {
      case "HANDLER":
        return transferHandlers.get(value.name).deserialize(value.value);
      case "RAW":
        return value.value;
      case "ID":
        let this_uuid = ep[endpointUUID];
        if (this_uuid === value.endpoint_uuid) {
          return storeGetValue(ep, value.store_key);
        } else {
          return createProxy(ep, { store_key: value.store_key });
        }
    }
  }
  __name(fromWireValue, "fromWireValue");
  var proxyStore = Symbol("Synclink.proxyStore");
  var endpointUUID = Symbol("Synclink.endpointUUID");
  function storeCreate(obj) {
    if (proxyStore in obj) {
      return;
    }
    obj[proxyStore] = { objects: /* @__PURE__ */ new Map(), counter: new Uint32Array([1]) };
    obj[endpointUUID] = generateUUID();
  }
  __name(storeCreate, "storeCreate");
  function storeGetValue(obj, key) {
    return obj[proxyStore].objects.get(key);
  }
  __name(storeGetValue, "storeGetValue");
  function storeNewValue(obj, value) {
    if (!(proxyStore in obj)) {
      storeCreate(obj);
    }
    let { objects, counter } = obj[proxyStore];
    while (objects.has(counter[0])) {
      counter[0] += 2;
    }
    let key = counter[0];
    counter[0] += 2;
    objects.set(key, value);
    return key;
  }
  __name(storeNewValue, "storeNewValue");
  function storeDeleteKey(obj, key) {
    let { objects } = obj[proxyStore];
    objects.delete(key);
    console.log("deleted", key, objects);
  }
  __name(storeDeleteKey, "storeDeleteKey");
  function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
  }
  __name(proxy, "proxy");
  var proxyFakeMessagePort = false;
  var proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
      const { port1, port2 } = proxyFakeMessagePort ? new FakeMessageChannel() : new MessageChannel();
      expose(obj, port1);
      return [port2, [port2]];
    },
    deserialize(port) {
      port.start();
      return wrap(port);
    }
  };
  transferHandlers.set("throw", throwTransferHandler);
  transferHandlers.set("proxy", proxyTransferHandler);
  transferHandlers.set("headers", {
    canHandle(value) {
      return Object.prototype.toString.call(value) === "[object Headers]";
    },
    serialize(value) {
      return [Array.from(value), []];
    },
    deserialize(value) {
      return new Headers(value);
    }
  });

  // node_modules/basic-devtools/esm/index.js
  var $ = (css, root = document) => root.querySelector(css);

  // src/utils.ts
  function showWarning(msg, messageType = "text") {
    _createAlertBanner(msg, "warning", messageType);
  }

  // src/plugin.ts
  var logger = getLogger("plugin");
  function define_custom_element(tag, pyElementClass) {
    logger.info(`creating plugin: ${tag}`);
    class ProxyCustomElement extends HTMLElement {
      constructor() {
        logger.debug(`creating ${tag} plugin instance`);
        super();
        this.wrapper = document.createElement("slot");
        this.attachShadow({ mode: "open" }).appendChild(this.wrapper);
        this.originalInnerHTML = this.innerHTML;
        this.pyElementInstance = pyElementClass(this);
      }
      connectedCallback() {
        const innerHTML = this.pyElementInstance.connect();
        if (typeof innerHTML === "string")
          this.innerHTML = innerHTML;
      }
    }
    customElements.define(tag, ProxyCustomElement);
  }

  // node_modules/not-so-weak/esm/index.js
  var { iterator, species } = Symbol;
  var refs = /* @__PURE__ */ new WeakMap();
  var set = (value) => {
    const ref = new WeakRef(value);
    refs.set(value, ref);
    return ref;
  };
  var get = (value) => refs.get(value) || set(value);
  var WSet = class extends Set {
    // <same>
    #registry = new FinalizationRegistry((ref) => super.delete(ref));
    #drop(ref) {
      const had = super.delete(ref);
      if (had)
        this.#registry.unregister(ref);
      return had;
    }
    get size() {
      return [...this].length;
    }
    delete(value) {
      return this.#drop(refs.get(value));
    }
    has(value) {
      return super.has(refs.get(value));
    }
    // </same>
    constructor(entries = []) {
      super();
      for (const value of entries)
        this.add(value);
    }
    clear() {
      for (const ref of super[iterator]())
        this.#registry.unregister(ref);
      super.clear();
    }
    add(value) {
      const ref = get(value);
      if (!super.has(ref)) {
        this.#registry.register(value, ref, ref);
        super.add(ref);
      }
      return this;
    }
    forEach(callback, thisArg) {
      for (const value of [...this])
        callback.call(thisArg, value, value, this);
    }
    *[iterator]() {
      for (const ref of super[iterator]()) {
        const value = ref.deref();
        if (value)
          yield value;
        else
          this.#drop(ref);
      }
    }
    *entries() {
      for (const value of this)
        yield [value, value];
    }
    *keys() {
      yield* this[iterator]();
    }
    *values() {
      yield* this[iterator]();
    }
  };
  var WKey = class extends Map {
    // <same>
    #registry = new FinalizationRegistry((ref) => super.delete(ref));
    #drop(ref) {
      const had = super.delete(ref);
      if (had)
        this.#registry.unregister(ref);
      return had;
    }
    get size() {
      return [...this].length;
    }
    delete(key) {
      return this.#drop(refs.get(key));
    }
    has(key) {
      return super.has(refs.get(key));
    }
    // </same>
    constructor(entries = []) {
      super();
      for (const [key, value] of entries)
        this.set(key, value);
    }
    clear() {
      for (const ref of super.keys())
        this.#registry.unregister(ref);
      super.clear();
    }
    forEach(callback, thisArg) {
      for (const [key, value] of [...this])
        callback.call(thisArg, value, key, this);
    }
    get(key) {
      return super.get(refs.get(key));
    }
    set(key, value) {
      const ref = get(key);
      if (!super.has(ref))
        this.#registry.register(key, ref, ref);
      return super.set(ref, value);
    }
    *[iterator]() {
      for (const [ref, value] of super[iterator]()) {
        const key = ref.deref();
        if (key)
          yield [key, value];
        else
          this.#drop(ref);
      }
    }
    *entries() {
      yield* this[iterator]();
    }
    *keys() {
      for (const [key] of this)
        yield key;
    }
    *values() {
      for (const [_, value] of this)
        yield value;
    }
  };
  var WValue = class extends Map {
    #registry = new FinalizationRegistry((key) => super.delete(key));
    get size() {
      return [...this].length;
    }
    #drop(key, ref) {
      const had = super.delete(key);
      if (had)
        this.#registry.unregister(ref);
      return had;
    }
    constructor(entries = []) {
      super();
      for (const [key, value] of entries)
        this.set(key, value);
    }
    clear() {
      for (const ref of super.values())
        this.#registry.unregister(ref);
      super.clear();
    }
    delete(key) {
      return this.#drop(key, super.get(key));
    }
    forEach(callback, thisArg) {
      for (const [key, value] of [...this])
        callback.call(thisArg, value, key, this);
    }
    get(key) {
      return super.get(key)?.deref();
    }
    set(key, value) {
      let ref = super.get(key);
      if (ref)
        this.#registry.unregister(ref);
      ref = get(value);
      this.#registry.register(value, key, ref);
      return super.set(key, ref);
    }
    *[iterator]() {
      for (const [key, ref] of super[iterator]()) {
        const value = ref.deref();
        if (value)
          yield [key, value];
        else
          this.#drop(key, ref);
      }
    }
    *entries() {
      yield* this[iterator]();
    }
    *keys() {
      for (const [key] of this)
        yield key;
    }
    *values() {
      for (const [_, value] of this)
        yield value;
    }
  };

  // src/shadow_roots.ts
  var shadowRoots = new WSet();
  var findInShadowRoots = (selector) => {
    for (const shadowRoot of shadowRoots) {
      const element = $(selector, shadowRoot);
      if (element)
        return element;
    }
    return null;
  };
  var deepQuerySelector = (selector) => $(selector, document) || findInShadowRoots(selector);

  // bundlePyscriptPythonPlugin:dummy
  var dummy_default = { dirs: ["pyscript"], files: [["pyscript/_deprecated_globals.py", `from _pyscript_js import showWarning


class DeprecatedGlobal:
    """
    Proxy for globals which are deprecated.

    The intendend usage is as follows:

        # in the global namespace
        Element = pyscript.DeprecatedGlobal('Element', pyscript.Element, "...")
        console = pyscript.DeprecatedGlobal('console', js.console, "...")
        ...

    The proxy forwards __getattr__ and __call__ to the underlying object, and
    emit a warning on the first usage.

    This way users see a warning only if they actually access the top-level
    name.
    """

    def __init__(self, name, obj, message):
        self.__name = name
        self.__obj = obj
        self.__message = message
        self.__warning_already_shown = False

    def __repr__(self):
        return f"<DeprecatedGlobal({self.__name!r})>"

    def _show_warning(self, message):
        """
        NOTE: this is overridden by unit tests
        """
        showWarning(message, "html")  # noqa: F821

    def _show_warning_maybe(self):
        if self.__warning_already_shown:
            return
        self._show_warning(self.__message)
        self.__warning_already_shown = True

    def __getattr__(self, attr):
        self._show_warning_maybe()
        return getattr(self.__obj, attr)

    def __call__(self, *args, **kwargs):
        self._show_warning_maybe()
        return self.__obj(*args, **kwargs)

    def __iter__(self):
        self._show_warning_maybe()
        return iter(self.__obj)

    def __getitem__(self, key):
        self._show_warning_maybe()
        return self.__obj[key]

    def __setitem__(self, key, value):
        self._show_warning_maybe()
        self.__obj[key] = value
`], ["pyscript/_html.py", `from textwrap import dedent

import js
from _pyscript_js import deepQuerySelector

from . import _internal
from ._mime import format_mime as _format_mime


class HTML:
    """
    Wrap a string so that display() can render it as plain HTML
    """

    def __init__(self, html):
        self._html = html

    def _repr_html_(self):
        return self._html


def write(element_id, value, append=False, exec_id=0):
    """Writes value to the element with id "element_id"""
    Element(element_id).write(value=value, append=append)
    js.console.warn(
        dedent(
            """PyScript Deprecation Warning: PyScript.write is
    marked as deprecated and will be removed sometime soon. Please, use
    Element(<id>).write instead."""
        )
    )


def display(*values, target=None, append=True):
    if target is None:
        target = _internal.DISPLAY_TARGET
    if target is None:
        raise Exception(
            "Implicit target not allowed here. Please use display(..., target=...)"
        )
    for v in values:
        Element(target).write(v, append=append)


class Element:
    def __init__(self, element_id, element=None):
        self._id = element_id
        self._element = element

    @property
    def id(self):
        return self._id

    @property
    def element(self):
        """Return the dom element"""
        if not self._element:
            self._element = deepQuerySelector(f"#{self._id}")
        return self._element

    @property
    def value(self):
        return self.element.value

    @property
    def innerHtml(self):
        return self.element.innerHTML

    def write(self, value, append=False):
        html, mime_type = _format_mime(value)
        if html == "\\n":
            return

        if append:
            child = js.document.createElement("div")
            self.element.appendChild(child)

        if append and self.element.children:
            out_element = self.element.children[-1]
        else:
            out_element = self.element

        if mime_type in ("application/javascript", "text/html"):
            script_element = js.document.createRange().createContextualFragment(html)
            out_element.appendChild(script_element)
        else:
            out_element.innerHTML = html

    def clear(self):
        if hasattr(self.element, "value"):
            self.element.value = ""
        else:
            self.write("", append=False)

    def select(self, query, from_content=False):
        el = self.element

        if from_content:
            el = el.content

        _el = el.querySelector(query)
        if _el:
            return Element(_el.id, _el)
        else:
            js.console.warn(f"WARNING: can't find element matching query {query}")

    def clone(self, new_id=None, to=None):
        if new_id is None:
            new_id = self.element.id

        clone = self.element.cloneNode(True)
        clone.id = new_id

        if to:
            to.element.appendChild(clone)
            # Inject it into the DOM
            to.element.after(clone)
        else:
            # Inject it into the DOM
            self.element.after(clone)

        return Element(clone.id, clone)

    def remove_class(self, classname):
        classList = self.element.classList
        if isinstance(classname, list):
            classList.remove(*classname)
        else:
            classList.remove(classname)

    def add_class(self, classname):
        classList = self.element.classList
        if isinstance(classname, list):
            classList.add(*classname)
        else:
            self.element.classList.add(classname)


def add_classes(element, class_list):
    classList = element.classList
    classList.add(*class_list.split(" "))


def create(what, id_=None, classes=""):
    element = js.document.createElement(what)
    if id_:
        element.id = id_
    add_classes(element, classes)
    return Element(id_, element)
`], ["pyscript/_mime.py", `import base64
import html
import io
import re

from js import console

MIME_METHODS = {
    "__repr__": "text/plain",
    "_repr_html_": "text/html",
    "_repr_markdown_": "text/markdown",
    "_repr_svg_": "image/svg+xml",
    "_repr_png_": "image/png",
    "_repr_pdf_": "application/pdf",
    "_repr_jpeg_": "image/jpeg",
    "_repr_latex": "text/latex",
    "_repr_json_": "application/json",
    "_repr_javascript_": "application/javascript",
    "savefig": "image/png",
}


def render_image(mime, value, meta):
    # If the image value is using bytes we should convert it to base64
    # otherwise it will return raw bytes and the browser will not be able to
    # render it.
    if isinstance(value, bytes):
        value = base64.b64encode(value).decode("utf-8")

    # This is the pattern of base64 strings
    base64_pattern = re.compile(
        r"^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$"
    )
    # If value doesn't match the base64 pattern we should encode it to base64
    if len(value) > 0 and not base64_pattern.match(value):
        value = base64.b64encode(value.encode("utf-8")).decode("utf-8")

    data = f"data:{mime};charset=utf-8;base64,{value}"
    attrs = " ".join(['{k}="{v}"' for k, v in meta.items()])
    return f'<img src="{data}" {attrs}></img>'


def identity(value, meta):
    return value


MIME_RENDERERS = {
    "text/plain": html.escape,
    "text/html": identity,
    "image/png": lambda value, meta: render_image("image/png", value, meta),
    "image/jpeg": lambda value, meta: render_image("image/jpeg", value, meta),
    "image/svg+xml": identity,
    "application/json": identity,
    "application/javascript": lambda value, meta: f"<script>{value}<\/script>",
}


def eval_formatter(obj, print_method):
    """
    Evaluates a formatter method.
    """
    if print_method == "__repr__":
        return repr(obj)
    elif hasattr(obj, print_method):
        if print_method == "savefig":
            buf = io.BytesIO()
            obj.savefig(buf, format="png")
            buf.seek(0)
            return base64.b64encode(buf.read()).decode("utf-8")
        return getattr(obj, print_method)()
    elif print_method == "_repr_mimebundle_":
        return {}, {}
    return None


def format_mime(obj):
    """
    Formats object using _repr_x_ methods.
    """
    if isinstance(obj, str):
        return html.escape(obj), "text/plain"

    mimebundle = eval_formatter(obj, "_repr_mimebundle_")
    if isinstance(mimebundle, tuple):
        format_dict, _ = mimebundle
    else:
        format_dict = mimebundle

    output, not_available = None, []
    for method, mime_type in reversed(MIME_METHODS.items()):
        if mime_type in format_dict:
            output = format_dict[mime_type]
        else:
            output = eval_formatter(obj, method)

        if output is None:
            continue
        elif mime_type not in MIME_RENDERERS:
            not_available.append(mime_type)
            continue
        break
    if output is None:
        if not_available:
            console.warn(
                f"Rendered object requested unavailable MIME renderers: {not_available}"
            )
        output = repr(output)
        mime_type = "text/plain"
    elif isinstance(output, tuple):
        output, meta = output
    else:
        meta = {}
    return MIME_RENDERERS[mime_type](output, meta), mime_type
`], ["pyscript/_internal.py", 'import ast\nfrom collections import namedtuple\nfrom contextlib import contextmanager\n\nfrom js import Object\nfrom pyodide.code import eval_code\nfrom pyodide.ffi import JsProxy\n\nfrom ._event_loop import (\n    defer_user_asyncio,\n    install_pyscript_loop,\n    schedule_deferred_tasks,\n)\n\nVersionInfo = namedtuple("version_info", ("year", "month", "minor", "releaselevel"))\n\n\ndef set_version_info(version_from_interpreter: str):\n    from . import __dict__ as pyscript_dict\n\n    """Sets the __version__ and version_info properties from provided JSON data\n    Args:\n        version_from_interpreter (str): A "dotted" representation of the version:\n            YYYY.MM.m(m).releaselevel\n            Year, Month, and Minor should be integers; releaselevel can be any string\n    """\n\n    version_parts = version_from_interpreter.split(".")\n    year = int(version_parts[0])\n    month = int(version_parts[1])\n    minor = int(version_parts[2])\n    if len(version_parts) > 3:\n        releaselevel = version_parts[3]\n    else:\n        releaselevel = ""\n\n    version_info = VersionInfo(year, month, minor, releaselevel)\n\n    pyscript_dict["__version__"] = version_from_interpreter\n    pyscript_dict["version_info"] = version_info\n\n\nclass TopLevelAwaitFinder(ast.NodeVisitor):\n    def is_source_top_level_await(self, source):\n        self.async_found = False\n        node = ast.parse(source)\n        self.generic_visit(node)\n        return self.async_found\n\n    def visit_Await(self, node):\n        self.async_found = True\n\n    def visit_AsyncFor(self, node):\n        self.async_found = True\n\n    def visit_AsyncWith(self, node):\n        self.async_found = True\n\n    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef):\n        pass  # Do not visit children of async function defs\n\n\ndef uses_top_level_await(source: str) -> bool:\n    return TopLevelAwaitFinder().is_source_top_level_await(source)\n\n\nDISPLAY_TARGET = None\n\n\n@contextmanager\ndef display_target(target_id):\n    global DISPLAY_TARGET\n    DISPLAY_TARGET = target_id\n    try:\n        yield\n    finally:\n        DISPLAY_TARGET = None\n\n\ndef run_pyscript(code: str, id: str = None) -> JsProxy:\n    """Execute user code inside context managers.\n\n    Uses the __main__ global namespace.\n\n    The output is wrapped inside a JavaScript object since an object is not\n    thenable. This is so we do not accidentally `await` the result of the python\n    execution, even if it\'s awaitable (Future, Task, etc.)\n\n    Parameters\n    ----------\n    code :\n       The code to run\n\n    id :\n       The id for the default display target (or None if no default display target).\n\n    Returns\n    -------\n        A Js Object of the form {result: the_result}\n    """\n    import __main__\n\n    with display_target(id), defer_user_asyncio():\n        result = eval_code(code, globals=__main__.__dict__)\n\n    return Object.new(result=result)\n\n\n__all__ = [\n    "set_version_info",\n    "uses_top_level_await",\n    "run_pyscript",\n    "install_pyscript_loop",\n    "schedule_deferred_tasks",\n]\n'], ["pyscript/_event_handling.py", `import inspect

import js
from pyodide.ffi.wrappers import add_event_listener


def when(event_type=None, selector=None):
    """
    Decorates a function and passes py-* events to the decorated function
    The events might or not be an argument of the decorated function
    """

    def decorator(func):
        elements = js.document.querySelectorAll(selector)
        sig = inspect.signature(func)
        # Function doesn't receive events
        if not sig.parameters:

            def wrapper(*args, **kwargs):
                func()

            for el in elements:
                add_event_listener(el, event_type, wrapper)
        else:
            for el in elements:
                add_event_listener(el, event_type, func)
        return func

    return decorator
`], ["pyscript/_event_loop.py", `import asyncio
import contextvars
from collections.abc import Callable
from contextlib import contextmanager
from typing import Any

from js import setTimeout
from pyodide.ffi import create_once_callable
from pyodide.webloop import WebLoop


class PyscriptWebLoop(WebLoop):
    def __init__(self):
        super().__init__()
        self._ready = False
        self._usercode = False
        self._deferred_handles = []

    def call_later(
        self,
        delay: float,
        callback: Callable[..., Any],
        *args: Any,
        context: contextvars.Context | None = None,
    ) -> asyncio.Handle:
        """Based on call_later from Pyodide's webloop

        With some unneeded stuff removed and a mechanism for deferring tasks
        scheduled from user code.
        """
        if delay < 0:
            raise ValueError("Can't schedule in the past")
        h = asyncio.Handle(callback, args, self, context=context)

        def run_handle():
            if h.cancelled():
                return
            h._run()

        if self._ready or not self._usercode:
            setTimeout(create_once_callable(run_handle), delay * 1000)
        else:
            self._deferred_handles.append((run_handle, self.time() + delay))
        return h

    def _schedule_deferred_tasks(self):
        asyncio._set_running_loop(self)
        t = self.time()
        for [run_handle, delay] in self._deferred_handles:
            delay = delay - t
            if delay < 0:
                delay = 0
            setTimeout(create_once_callable(run_handle), delay * 1000)
        self._ready = True
        self._deferred_handles = []


LOOP = None


def install_pyscript_loop():
    global LOOP
    LOOP = PyscriptWebLoop()
    asyncio.set_event_loop(LOOP)


def schedule_deferred_tasks():
    LOOP._schedule_deferred_tasks()


@contextmanager
def defer_user_asyncio():
    LOOP._usercode = True
    try:
        yield
    finally:
        LOOP._usercode = False


def run_until_complete(f):
    return LOOP.run_until_complete(f)
`], ["pyscript/__init__.py", `from _pyscript_js import showWarning

from ._event_handling import when
from ._event_loop import LOOP as loop
from ._event_loop import run_until_complete
from ._html import (
    HTML,
    Element,
    add_classes,
    create,
    display,
    write,
)
from ._plugin import Plugin

# these are set by _set_version_info
__version__ = None
version_info = None


def __getattr__(attr):
    if attr == "js":
        global js
        import js
        from _pyscript_js import showWarning

        # Deprecated after 2023.03.1
        showWarning(
            "<code>pyscript.js</code> is deprecated, please use <code>import js</code> instead.",
            "html",
        )
        return js
    raise AttributeError(f"module 'pyscript' has no attribute '{attr}'")


__all__ = [
    "HTML",
    "write",
    "display",
    "Element",
    "add_classes",
    "create",
    "run_until_complete",
    "loop",
    "Plugin",
    "__version__",
    "version_info",
    "showWarning",
    "when",
]
`], ["pyscript/_plugin.py", 'from _pyscript_js import define_custom_element\nfrom js import console\nfrom pyodide.ffi import create_proxy\n\n\nclass Plugin:\n    def __init__(self, name=None):\n        if not name:\n            name = self.__class__.__name__\n\n        self.name = name\n        self._custom_elements = []\n        self.app = None\n\n    def init(self, app):\n        self.app = app\n\n    def configure(self, config):\n        pass\n\n    def afterSetup(self, interpreter):\n        pass\n\n    def afterStartup(self, interpreter):\n        pass\n\n    def beforePyScriptExec(self, interpreter, src, pyScriptTag):\n        pass\n\n    def afterPyScriptExec(self, interpreter, src, pyScriptTag, result):\n        pass\n\n    def beforePyReplExec(self, interpreter, src, outEl, pyReplTag):\n        pass\n\n    def afterPyReplExec(self, interpreter, src, outEl, pyReplTag, result):\n        pass\n\n    def onUserError(self, error):\n        pass\n\n    def register_custom_element(self, tag):\n        """\n        Decorator to register a new custom element as part of a Plugin and associate\n        tag to it. Internally, it delegates the registration to the PyScript internal\n        [JS] plugin manager, who actually creates the JS custom element that can be\n        attached to the page and instantiate an instance of the class passing the custom\n        element to the plugin constructor.\n\n        Exammple:\n        >> plugin = Plugin("PyTutorial")\n        >> @plugin.register_custom_element("py-tutor")\n        >> class PyTutor:\n        >>     def __init__(self, element):\n        >>     self.element = element\n        """\n        # TODO: Ideally would be better to use the logger.\n        console.info(f"Defining new custom element {tag}")\n\n        def wrapper(class_):\n            # TODO: this is very pyodide specific but will have to do\n            #       until we have JS interface that works across interpreters\n            define_custom_element(tag, create_proxy(class_))  # noqa: F821\n\n        self._custom_elements.append(tag)\n        return create_proxy(wrapper)\n']] };

  // src/remote_interpreter.ts
  var logger2 = getLogger("pyscript/pyodide");
  var RemoteInterpreter = class extends Object {
    constructor(src = "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js") {
      super();
      this.src = src;
    }
    /**
     * loads the interface for the interpreter and saves an instance of it
     * in the `this.interface` property along with calling of other
     * additional convenience functions.
     * */
    /**
     * Although `loadPyodide` is used below,
     * notice that it is not imported i.e.
     * import { loadPyodide } from 'pyodide';
     * is not used at the top of this file.
     *
     * This is because, if it's used, loadPyodide
     * behaves mischievously i.e. it tries to load
     * `pyodide.asm.js` and `pyodide_py.tar` but
     * with paths that are wrong such as:
     *
     * http://127.0.0.1:8080/build/pyodide_py.tar
     * which results in a 404 since `build` doesn't
     * contain these files and is clearly the wrong
     * path.
     */
    async loadInterpreter(config, stdio) {
      const _pyscript_js_main = { define_custom_element, showWarning, deepQuerySelector };
      this.interface = proxy(
        await loadPyodide({
          stdout: (msg) => {
            stdio.stdout_writeline(msg).syncify();
          },
          stderr: (msg) => {
            stdio.stderr_writeline(msg).syncify();
          },
          fullStdLib: false
        })
      );
      this.interface.registerComlink(synclink_exports);
      this.FS = this.interface.FS;
      this.PATH = this.interface._module.PATH;
      this.PATH_FS = this.interface._module.PATH_FS;
      this.interpreter = this.interface;
      this.interface.registerJsModule("_pyscript_js", _pyscript_js_main);
      for (const dir of dummy_default.dirs) {
        this.FS.mkdir("/home/pyodide/" + dir);
      }
      for (const [path, value] of dummy_default.files) {
        this.FS.writeFile("/home/pyodide/" + path, value);
      }
      this.invalidate_module_path_cache();
      this.globals = proxy(this.interface.globals);
      logger2.info("importing pyscript");
      this.pyscript_internal = proxy(this.interface.pyimport("pyscript._internal"));
      this.pyscript_internal.set_version_info(version);
      this.pyscript_internal.install_pyscript_loop();
      if (config.packages) {
        logger2.info("Found packages in configuration to install. Loading micropip...");
        await this.loadPackage("micropip");
      }
      this.interface.runPython(`
        import js
        import pyscript
        from pyscript import Element, display, HTML
        `);
      logger2.info("pyodide loaded and initialized");
    }
    /**
     * delegates the registration of JS modules to
     * the underlying interface.
     * */
    registerJsModule(name, module) {
      this.interface.registerJsModule(name, module);
    }
    /**
     * delegates the loading of packages to
     * the underlying interface.
     * */
    async loadPackage(names) {
      logger2.info(`pyodide.loadPackage: ${names.toString()}`);
      const messageCallback = logger2.info.bind(logger2);
      if (this.interpreter.version.startsWith("0.22")) {
        await this.interface.loadPackage(names, {
          messageCallback,
          errorCallback: messageCallback
        });
      } else {
        await this.interface.loadPackage(names, messageCallback, messageCallback);
      }
    }
    /**
     * delegates the installation of packages
     * (using a package manager, which can be specific to
     * the interface) to the underlying interface.
     *
     * For Pyodide, we use `micropip`
     * */
    async installPackage(package_name) {
      if (package_name.length > 0) {
        logger2.info(`micropip install ${package_name.toString()}`);
        const micropip = this.interface.pyimport("micropip");
        try {
          await micropip.install(package_name);
          micropip.destroy();
        } catch (err) {
          const e = err;
          let fmt_names;
          if (Array.isArray(package_name)) {
            fmt_names = package_name.join(", ");
          } else {
            fmt_names = package_name;
          }
          let exceptionMessage = `Unable to install package(s) '${fmt_names}'.`;
          if (e.message.includes("Can't find a pure Python 3 wheel")) {
            exceptionMessage += ` Reason: Can't find a pure Python 3 Wheel for package(s) '${fmt_names}'.See: https://pyodide.org/en/stable/usage/faq.html#micropip-can-t-find-a-pure-python-wheel for more information.`;
          } else if (e.message.includes("Can't fetch metadata")) {
            exceptionMessage += " Unable to find package in PyPI. Please make sure you have entered a correct package name.";
          } else {
            exceptionMessage += ` Reason: ${e.message}. Please open an issue at https://github.com/pyscript/pyscript/issues/new if you require help or you think it's a bug.`;
          }
          logger2.error(e);
          throw new InstallError("PY1001" /* MICROPIP_INSTALL_ERROR */, exceptionMessage);
        }
      }
    }
    /**
     *
     * @param path : the path in the filesystem
     * @param url : the url to be fetched
     *
     * Given a file available at `url` URL (eg: `http://dummy.com/hi.py`), the
     * function downloads the file and saves it to the `path` (eg:
     * `a/b/c/foo.py`) on the FS.
     *
     * Example usage: await loadFromFile(`a/b/c/foo.py`,
     * `http://dummy.com/hi.py`)
     *
     * Write content of `http://dummy.com/hi.py` to `a/b/c/foo.py`
     *
     * NOTE: The `path` parameter expects to have the `filename` in it i.e.
     * `a/b/c/foo.py` is valid while `a/b/c` (i.e. only the folders) are
     * incorrect.
     *
     * The path will be resolved relative to the current working directory,
     * which is initially `/home/pyodide`. So by default `a/b.py` will be placed
     * in `/home/pyodide/a/b.py`, `../a/b.py` will be placed into `/home/a/b.py`
     * and `/a/b.py` will be placed into `/a/b.py`.
     */
    async loadFileFromURL(path, url) {
      path = this.PATH_FS.resolve(path);
      const dir = this.PATH.dirname(path);
      this.FS.mkdirTree(dir);
      const response = await robustFetch(url);
      const buffer = await response.arrayBuffer();
      const data = new Uint8Array(buffer);
      this.FS.writeFile(path, data, { canOwn: true });
    }
    /**
     * delegates clearing importlib's module path
     * caches to the underlying interface
     */
    invalidate_module_path_cache() {
      const importlib = this.interface.pyimport("importlib");
      importlib.invalidate_caches();
    }
    pyimport(mod_name) {
      return proxy(this.interface.pyimport(mod_name));
    }
    setHandler(func_name, handler) {
      const pyscript_module = this.interface.pyimport("pyscript");
      pyscript_module[func_name] = handler;
    }
  };

  // src/interpreter_worker/worker.ts
  var logger3 = getLogger("worker");
  logger3.info("Interpreter worker starting...");
  async function worker_initialize(cfg) {
    const remote_interpreter = new RemoteInterpreter(cfg.src);
    logger3.info(`Downloading ${cfg.name}...`);
    importScripts(cfg.src);
    logger3.info("worker_initialize() complete");
    return proxy(remote_interpreter);
  }
  expose(worker_initialize);
})();
/*! Bundled license information:

not-so-weak/esm/index.js:
  (*! (c) Andrea Giammarchi - ISC *)
*/
