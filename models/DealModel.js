const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema({
  bannerImage: String,
  discount: String,
  dishName: String,
  locations: [String],
  moreLocations: {
    count: String,
    locations: [String],
  },
  chef: {
    chefPicture: String,
    chefName: String,
  },

  isFavourite: {
    type: Boolean,
    default: false,
  },
});

const DealModel = mongoose.model("Deal", DealSchema);
module.exports = DealModel;
