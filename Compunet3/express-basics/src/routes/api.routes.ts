import { Router } from "express";
import { ApiController } from "../controllers/api.controllers";

const router = Router ();
const apiController= new ApiController;

router.get("/hello", apiController.sayHello);

export default router;