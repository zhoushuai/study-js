
/**
 * @return {string}
 */
IdentityChecks = function (checks) {
  if (checks.checkState === 'WaitingCheckin') {
    if (checks.checkinCertified) {
      console.log('人证比对通过');
    } else {
      console.log('人证比对未通过');
    }
  }
  return "next";
}

/**
 * @return {string}
 */
ConfirmEntrance = function (checks) {
  console.log(JSON.stringify(checks));
  checks.test = "1";
  if (checks.checkState === 'WaitingCheckin') {
    if (checks.checkinConsent) {
      console.log('访客已确认入场');
    } else {
      console.log('拒绝访客入场');
    }
  }
  return "next";
}

/**
 * @return {string}
 */
ConfirmDeparture = function (checks) {
  console.log(JSON.stringify(checks));
  if (checks.checkState === 'VisitingState') {
    console.log('访客拜访中');
  }
  return "next";
};

/**
 * 增加
 */
Function.prototype.addProcessHandler = function (fn) {
  let self = this;
  return function () {
    let ret = self.apply(this, arguments);
    if (ret === "next") {
      return fn.apply(this, arguments);
    }
    return ret;
  };
}

let chain = IdentityChecks
  .addProcessHandler(ConfirmEntrance)
  .addProcessHandler(ConfirmDeparture);

chain({
  "checkState": "VisitingState",
  "checkinCertified": true,
  "checkinConsent": true,
});

