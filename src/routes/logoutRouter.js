const express = require("express");
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout:
 *  get:
 *    summary: Wylogowanie
 */
router.route("/")
  .get(logoutController.handleLogout);

module.exports = router;