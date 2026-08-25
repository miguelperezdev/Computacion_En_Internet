"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
class ApiController {
    sayHello(request, response) {
        try {
            const responseApi = {
                status: 200,
                message: "Hello World"
            };
            return response.status(200).json(responseApi);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
}
exports.ApiController = ApiController;
//# sourceMappingURL=api.controllers.js.map