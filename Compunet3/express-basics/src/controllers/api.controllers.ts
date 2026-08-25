export class ApiController {
    sayHello(request:Request, response:Response){
    
        try {
            const responseApi = {
                status: 200,
                message: "Hello World"
            }
            return response.status(200).json(responseApi);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }
}