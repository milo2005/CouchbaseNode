import { Router } from "express";
import { addWord, listWord, removeAll, removeWord, updateWord } from "../controllers/words/_index";

const router: Router = Router();

router.post("/", addWord);
router.put("/:id", updateWord);
router.get("/", listWord);
router.delete("/:id", removeWord);

export default router;