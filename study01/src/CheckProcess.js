
/**
 * 用于定义责任链的处理器接口
 * @param {*} context 用于定义责任链中的上下文 
 */
function CheckHandler(context) {

    this.context = context;

    /**
     * 根据来访信息来处理器请求
     */
    this.handle = function (visitInfo) {
        throw "this is interface.";
    }

}

/**
 * 用于定义签核业务的处理器链
 */
function CheckProcessChain(context) {
    CheckHandler.apply(this, arguments);

    //模拟继承逻辑
    this.handle = function () {
        console.log("this method from CheckProcessChain.")
    }
}
// CheckProcessChain.prototype = CheckHandler.prototype;
// CheckProcessChain.prototype.constructor = CheckProcessChain;

let context = { name: "this is a context." };
let checkProcessChain = new CheckProcessChain(context);
let visitInfo = {}
checkProcessChain.handle(visitInfo);
console.log(JSON.stringify(checkProcessChain.context))
// let checkHandler = new CheckHandler({});
// checkHandler.handle({})


//当前代码主要用于模拟java中多态的
//通过函数定义成员函数，通过对模拟接口函数增加throw的业务逻辑阻止用户直接调用接口函数
//其他实现类通过apply函数完成模拟继承