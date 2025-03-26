import { Router } from "express";
import blogRoutes from "./blog.route.js";
import destinationRoutes from "./destination.route.js";
import tourPackageRoutes from "./package.route.js";
import formDataRoutes from "./formdata.route.js";
const router = Router();

router.use("/blogs", blogRoutes);
router.use("/destinations", destinationRoutes);
router.use("/packages", tourPackageRoutes);
router.use("/form", formDataRoutes);

export default router;
