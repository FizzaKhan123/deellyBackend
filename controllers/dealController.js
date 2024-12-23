const DealModel = require("../models/DealModel");

const getDeals = async (req, res) => {
  try {
    const deals = await DealModel.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const createDeal = async (req, res) => {
  try {
    // Destructure the incoming request body
    const { bannerImage, discount, dishName, locations, moreLocations, chef } =
      req.body;

    // Validate the data (ensure required fields are present)
    if (!dishName || !discount || !locations || !chef || !moreLocations) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new deal based on the request data
    const newDeal = new DealModel({
      bannerImage,
      discount,
      dishName,
      locations,
      moreLocations,
      chef,
    });

    // Save the new deal to the database
    const savedDeal = await newDeal.save();

    // Respond with the saved deal
    res.status(201).json({
      message: "Deal created successfully.",
      deal: savedDeal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const addFavourite = async (req, res) => {
  try {
    const { dealId } = req.params;
    const { isFavourite } = req.body;

    if (typeof isFavourite !== "boolean") {
      return res
        .status(400)
        .json({ message: "'isFavourite' must be a boolean" });
    }

    const updatedDeal = await DealModel.findByIdAndUpdate(
      dealId,
      { isFavourite },
      { new: true }
    );

    if (!updatedDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json(updatedDeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDeals, createDeal, addFavourite };
