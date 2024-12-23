const express = require("express");
const router = express.Router();
const {
  getDeals,
  createDeal,
  addFavourite,
} = require("../controllers/dealController");

// Routes
router.get("/deals", getDeals);
router.post("/deals", createDeal);
router.patch("/deals/:dealId/favourite", addFavourite);

module.exports = router;
