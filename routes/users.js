const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/newAdminAdd", userCtrl.newAdminAdd);
router.post("/newMemberToAdminAdd", userCtrl.newMemberToAdminAdd);
router.post("/newAdminToMemberAdd", userCtrl.newAdminToMemberAdd);
router.post("/AdminRemove", userCtrl.AdminRemove);
router.post("/newMemberAdd", userCtrl.newMemberAdd);
router.post("/newMemberAddByAdmin", userCtrl.newMemberAddByAdmin);
router.post("/newPayment", userCtrl.newPayment);
router.post("/newOnlinePaymentByAdmin", userCtrl.newOnlinePaymentByAdmin);
router.post("/newOfflinePaymentByAdmin", userCtrl.newOfflinePaymentByAdmin);
router.post("/removeMemberByAdmin", userCtrl.removeMemberByAdmin);
router.post("/add", userCtrl.userAdd);
router.post("/addApp", userCtrl.userAddApp);
router.post("/delUser", userCtrl.delUser);
router.post("/delUserApp", userCtrl.delUserApp);

router.post("/emailSend", userCtrl.emailSend);
router.post("/emailSendApp", userCtrl.emailSendApp);
router.post("/forgotPassword", userCtrl.forgotPassword);
router.post("/forgotPasswordApp", userCtrl.forgotPasswordApp);
router.post("/updatePassword", userCtrl.updatePassword);

module.exports = router;
