import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();
const { handleGetUserProfiles, handleAddUserProfile, handleUpdateProfile, handleRemoveProfile, handleClearProfiles } = UserController;

router.get("/profiles", handleGetUserProfiles);
router.post("/profiles", handleAddUserProfile);
router.put("/profiles", handleUpdateProfile);
router.delete("/profiles", handleRemoveProfile);
router.delete("/profiles/all", handleClearProfiles);

export default router;