import { Router } from "express";
import { upload } from "../controllers/middleware/multer";
import path from "path";
import CreateUser from "../controllers/use-cases/users/create_user";
import LoginUser from "../controllers/use-cases/users/loginUser";
import NotificationRecoveryPassword from "../controllers/use-cases/users/notification-recovery";
import RecoveryPassword from "../controllers/use-cases/users/recovery-password";
import ValidatorTokenAcount from "../controllers/use-cases/users/validator-token-active";
import CreateNewPoint from "../controllers/use-cases/points/create-new-post";
import RemovePoint from "../controllers/use-cases/points/remove-post";
import GetInformationUser from "../controllers/use-cases/users/get-information-user";
import GetPoints from "../controllers/use-cases/points/get-post";
import addFriends from "../controllers/use-cases/users/addFriends";
import AcceptInvit from "../controllers/use-cases/users/Accept-invite";
import GetUserId from "../controllers/use-cases/users/get-userID";
export const router = Router();
router.get("/", (req, res) => {
  res.status(200).send("🔥http server running");
});
router.post("/create_point", upload.array("files"),   CreateNewPoint)
router.delete("/remove_point", RemovePoint)
// router.post("/create_menu_product", upload.single("file"), CreateMenuProduct);

// router.put("/report", ReportMenu) -> pode usar..

router.get("/posts", GetPoints)

router.get("/tmp/posts/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "..", "..", "tmp", "points", filename));
});

//user
router.post("/create_user", CreateUser);
router.post("/login", LoginUser);
router.post("/get-user", GetInformationUser)
router.put("/notification_recovery", NotificationRecoveryPassword);
router.put("/recovery", RecoveryPassword);
router.put("/validator", ValidatorTokenAcount);
router.put("/add", addFriends)
router.put("/accept", AcceptInvit)
router.get("/friends/:id", GetUserId)
