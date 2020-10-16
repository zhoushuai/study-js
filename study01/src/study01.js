/**
 * Check处理器接口，用于定义处理器的方法
 * @constructor 构造器
 */
import IdentityChecksCom from "../views/visit/components/IdentityChecksCom";
import ConfirmEntranceCom from "../views/visit/components/ConfirmEntranceCom";
import ConfirmDepartureCom from "../views/visit/components/ConfirmDepartureCom";


function Handler(component) {
  this.component = component;
}

Handler.prototype.handle = function (checkData) {
  console.log('this is a method.');
  return true;
}

//--------------------------checkHandlerChain-----------------------------------


function HandlerChain() {
  this.handlers = [];
}


HandlerChain.prototype.addHandler = function (handler) {
  if (undefined === handler || handler == null) {
    throw 'handler 错误';
  }
  if (handler instanceof Handler) {
    throw 'handler 必须是handler类型';
  }
  this.handlers.push(handler);
  return this;
}

HandlerChain.prototype.removeHandler = function (index) {
  if (this.handlers.length <= index) {
    throw '下标越界';
  }
  let deleteIndex = index;
  if (index !== this.handlers.length - 1) {
    for (let i = index; i < this.handlers.length - 1; i++) {
      this.handlers[i] = this.handlers[i + 1];
    }
    deleteIndex = this.handlers.length - 1;
  }
  delete this.handlers[deleteIndex];
  this.handlers.pop();
}

/**
 *
 * @param checkData
 */
HandlerChain.prototype.doHandle = function (checkData) {
  for (let handler of this.handlers) {
    if (!handler.handle(checkData)) {
      console.log(handler.component);
      break;
    }
  }
}


//------------------------------------------------

function IdentityCheck() {
  Handler.apply(this, arguments);
  this.component = IdentityChecksCom;
}

IdentityCheck.prototype.handle = function () {
  console.log("IdentityCheck Handle");
  return true;
};

function ConfirmEntrance(ConfirmEnt) {
  Handler.apply(this, arguments);
  this.component = ConfirmEntranceCom;
};

ConfirmEntrance.prototype.handle = function (checkData) {
  console.log("this is method of ConfirmEntrance.")
  return true;
};

function ConfirmDeparture() {
  Handler.apply(this, arguments);
  this.component = ConfirmDepartureCom;
};

ConfirmDeparture.prototype.handle = function (checkData) {
  console.log("this method from ConfirmDeparture.");
  return false;
};


let handlerChain = new HandlerChain();
handlerChain.addHandler(new IdentityCheck())
  .addHandler(new ConfirmEntrance())
  .addHandler(new ConfirmDeparture());
handlerChain.doHandle({})

