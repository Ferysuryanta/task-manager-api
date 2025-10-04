import { Router} from "express";
import { authMiddleware} from "../middleware/auth";
import { taskController } from "../controllers/taskController";

const router = Router();
router.use(authMiddleware);
router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:taskId/status", taskController.update);
router.delete("/:taskId/deleted", taskController.delete);

export default router;