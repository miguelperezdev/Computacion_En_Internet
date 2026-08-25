"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controllers_1 = require("../controllers/api.controllers");
const router = (0, express_1.Router)();
const apiController = new api_controllers_1.ApiController;
router.get("/hello", apiController.sayHello);
exports.default = router;
//# sourceMappingURL=api.routes.js.map