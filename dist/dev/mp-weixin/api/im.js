"use strict";
var utils_request = require("../utils/request.js");
const imLogin = (params) => {
  return utils_request.request(`/communications/imLogin`, "POST", params);
};
const imRegister = (params) => {
  return utils_request.request(`/communications/imRegister`, "POST", params);
};
exports.imLogin = imLogin;
exports.imRegister = imRegister;
//# sourceMappingURL=im.js.map
