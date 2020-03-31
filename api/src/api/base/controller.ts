import { Router } from "express";

interface IBaseController {
    path: string;
    router: Router;

    intializeRoutes() : void;
}

export default IBaseController;