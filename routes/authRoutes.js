const express = require('express');

const { registerController, loginController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersControllers, orderStatusController } = require('../controllers/authControllers');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);

//FORGOT PASSWORD || METHOD POST
router.post('/forgot-password', forgotPasswordController);

//TEST || METHOD GET
// router.get('/test', requireSignIn, isAdmin, testController);

//PROTECTED USER ROUTE AUTH || METHOD GET
router.get('/user-auth', requireSignIn, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error });
  }
});

//PROTECTED ADMIN ROUTE AUTH || METHOD GET
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error });
  }
});

//UPDATE PROFILE || METHOD PUT
router.put('/profile', requireSignIn, updateProfileController);

//ORDERS FOR USERS || METHOD GET
router.get('/orders', requireSignIn, getOrdersController);

//ORDERS FOR ADMIN || METHOD GET
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersControllers);

//ORDER STATUS UPDATE || PUT
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

module.exports = router;