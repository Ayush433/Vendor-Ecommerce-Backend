const express = require("express");

const router = express.Router();

// User Routes
const userRoutes = require("./api/userRoutes");
router.use("/user", userRoutes);

module.exports = router;
