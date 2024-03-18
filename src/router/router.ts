import { Router } from "express";
import { upload } from "../controllers/middleware/multer";
import path from "path";
import CreateUser from "../controllers/use-cases/users/create_user";
import LoginUser from "../controllers/use-cases/users/loginUser";
import NotificationRecoveryPassword from "../controllers/use-cases/users/notification-recovery";
import RecoveryPassword from "../controllers/use-cases/users/recovery-password";
import ValidatorTokenAcount from "../controllers/use-cases/users/validator-token-active";
export const router = Router();
router.get("/", (req, res) => {
  res.status(200).send("🔥http server running");
});

// router.post("/create_menu_product", upload.single("file"), CreateMenuProduct);

// router.put("/report", ReportMenu) -> pode usar..

// router.get("/tmp/uploads/:filename", (req, res) => {
//   const filename = req.params.filename;
//   res.sendFile(path.join(__dirname, "..", "..", "tmp", "uploads", filename));
// });

//user
router.post("/create_user", CreateUser);
router.post("/login", LoginUser);
router.put("/notification_recovery", NotificationRecoveryPassword);
router.put("/recovery", RecoveryPassword);
router.put("/validator", ValidatorTokenAcount);
