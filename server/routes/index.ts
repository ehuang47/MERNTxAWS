import { Router } from 'express';
const router: Router = Router();

import UserRouter from "./UserRouter";

router.use("/user", UserRouter);

export default router;