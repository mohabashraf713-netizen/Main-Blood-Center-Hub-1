import { Router, type IRouter } from "express";
import healthRouter from "./health";
import donorsRouter from "./donors";
import bloodRequestsRouter from "./blood-requests";
import hospitalsRouter from "./hospitals";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(donorsRouter);
router.use(bloodRequestsRouter);
router.use(hospitalsRouter);
router.use(dashboardRouter);

export default router;
