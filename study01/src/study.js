/**
 * 责任链处理器
 */
Handler = function () {
  console.log('this is handler.')
}

/**
 * 责任器链
 */
HandlerChain = {
  handlers: [], //处理器列表
  currentIndex: 0, //当前处理器的下标

  addHandler: function (handler) {
    if (undefined === handler || handler == null) {
      throw 'handler 错误';
    }
    if (!Handler.isPrototypeOf(handler)) {
      throw 'handler 必须是handler类型';
    }
    this.handlers.push(handler);
  },

  remove: function (index) {
    if (index >= this.handlers.length) {
      throw "下标越界";
    }
    delete this.handlers[index];
  },

  next: function () {

    for (let handler of this.handlers) {
      if (handler === true) {
        this.currentIndex++;
      }
      break;
    }
  }

}


let handlerChain = new HandlerChain();
handlerChain.addHandler(new Handler());

