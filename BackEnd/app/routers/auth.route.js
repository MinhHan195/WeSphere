const express = require("express");
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMediaMiddleware");
const cloudinaryRepsitory = require("../repository/cloudinary.respository");

const router = express.Router();

router.route("/login").post(authController.logIn);

router.route("/register").post(authController.signUp);

router.route("/checkUsername/:username").get(authController.checkUsername);

router.route("/login/instagram").post(authController.logInWithInstagram);

router.route("/GetProfileData/:userId").get(verifyToken, authController.getDetailUser);

router.route("/update").put(verifyToken, upload.single("file"), userController.updateUser);

router.route("/updatePrivateMode/:username/:privateMode").patch(authController.updatePrivateMode);

router.route("/updateOnlineStatus/:username/:onlineStatus").patch(authController.updateOnlineStatus);

router.route("/ListUserBlock").get(verifyToken, userController.getListUserBlock);

router.route("/ListUserLimit").get(verifyToken, userController.getListUserLimit);

router.route("/removeLimitedUser/:limitedUserId").patch(verifyToken, userController.removeLimitedUser);

router.route("/removeBlockedUser/:blockedUserId").patch(verifyToken, userController.removeBlockedUser);

router.route("/deactivateAccount").patch(verifyToken, authController.deactivateAccount);

router.route("/deleteAccount").delete(verifyToken, authController.deleteAccount);

router.route("/followUser/:username/:mode").post(verifyToken, authController.followUser);

router.route("/block/:userId").get(verifyToken, authController.blockUser);

router.route("/restric/:userId").get(verifyToken, authController.restricUser);

router.route("/isAlive").post((req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ isError: true, message: "User ID is required" });
    }
    // Simulate checking if user is alive
    res.sendStatus(200); // Tương đương với res.status(200).end();
});

router.route("/deleteImage").post(async (req, res) => {
    const Cloudinary = new cloudinaryRepsitory();
    const result = await Cloudinary.deleteImage(req.body.publicId);
    console.log(result);
    res.send(result);
});


module.exports = router;
