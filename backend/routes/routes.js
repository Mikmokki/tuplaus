import { Router } from "../deps.js";
import * as gameController from "./controllers/gameController.js";

const router = new Router();

router.get("/players/:id", gameController.getPlayer);
router.post("/players", gameController.createPlayer);
router.post("/double", gameController.double);
router.post("/deposit", gameController.deposit);
router.post("/withdraw", gameController.withdraw);

export { router };
